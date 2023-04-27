'use strict';

// polyfill fill for missing Math functionallity in all browsers.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round#Decimal_rounding
(function () {
	function decimalAdjust(type, value, exp) {
		// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// If the value is negative...
		if (value < 0) {
			return -decimalAdjust(type, -value, exp);
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function (value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}
	// Decimal floor
	if (!Math.floor10) {
		Math.floor10 = function (value, exp) {
			return decimalAdjust('floor', value, exp);
		};
	}
	// Decimal ceil
	if (!Math.ceil10) {
		Math.ceil10 = function (value, exp) {
			return decimalAdjust('ceil', value, exp);
		};
	}
})();

// polyfill for toISOString
if (!Date.prototype.toISOString) {
    (function () {
        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        Date.prototype.toISOString = function () {
            return this.getUTCFullYear() +
              '-' + pad(this.getUTCMonth() + 1) +
              '-' + pad(this.getUTCDate()) +
              'T' + pad(this.getUTCHours()) +
              ':' + pad(this.getUTCMinutes()) +
              ':' + pad(this.getUTCSeconds()) +
              '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
              'Z';
        };
    }());
}

// polyfill for hashCode
String.prototype.hashCode = function () {
	var hash = 0, i, chr;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

//polyfill for String includes (added in EMCAScript 2015, not supported in IE)
if (!String.prototype.includes) {
	Object.defineProperty(String.prototype, 'includes', {
		value: function (search, start) {
			if (typeof start !== 'number') {
				start = 0
			}

			if (start + search.length > this.length) {
				return false
			} else {
				return this.indexOf(search, start) !== -1
			}
		}
	})
}

//prevents errors when calling console.log from browsers that don't support it
if (console === undefined || !console.log) { var console = { log: function () { }, error: function () { }, warn: function () { } }; }

//for fixing digit length left of the decimal point '0001,'0002', etc...
if (!Number.prototype.formatLeft) {

	Number.prototype.formatLeft = function (maxIn) {
		Math.floor(this);
		var strNum = this.toString(),
        max = maxIn || 0,
        dif = max - strNum.length;
		if (dif >= 0) {
			while (dif--) { strNum = ['0', strNum].join(''); }
			return strNum;
		}
		else {
			return strNum;
		}
	}

}
if (!String.prototype.formatLeft) {
	String.prototype.formatLeft = Number.prototype.formatLeft;
}
if (!String.prototype.safeValue) {
    String.prototype.safeValue = function (removeHtml) {
        var retVal = DOMPurify.sanitize(this, { SAFE_FOR_JQUERY: true })
        if (removeHtml && retVal.length>0) {
            retVal = retVal
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }
        return retVal;
    }
}

if (!Date.diff) {
	Date.diff = function (date1, date2, datepart) {
		///<summary>Calculates the difference between two dates and returns the quantity of specified datepart between date1 and date2</summary>
		///<param name="datepart">The string date part you want the difference of, i.e. "m" for months, "d" for days, "y" for years."</param>
		var d1Y = date1.getFullYear();
		var d1M = date1.getMonth();
		var d2Y = date2.getFullYear();
		var d2M = date2.getMonth();

		switch (datepart.toLowerCase()) {
			case "d":
				var one_day = 1000 * 60 * 60 * 24;
				return Math.ceil10(((date2 - date1) / one_day));
			case "w":
				var one_week = 7 * 24 * 60 * 60 * 1000;
				return Math.ceil10(((date2 - date1) / one_week));
			case "m":
				return ((12 * d2Y) + d2M) - ((12 * d1Y) + d1M);
			case "y":
				return (d2Y - d1Y);
		}
	}
}

Date.prototype.convertToUTC = (typeof Date.prototype.convertToUTC === 'function') ? Date.prototype.convertToUTC : function () {
	var timeZoneOffset = this.getTimezoneOffset();

	return new Date(this.getFullYear(),
		this.getMonth(),
		this.getDate(),
		this.getHours(),
		this.getMinutes() + timeZoneOffset,
		this.getSeconds(),
		1);
}

Date.prototype.startOfWeek = function (start) {
	///<summary>Returns the Date of the start of the week based on the starting day passed to the function.</summary>
	///<param name="start" type="Number">The day that is the START of the week as an integer, i.e. Sunday = 0, Monday = 1, etc.</param>
	///<returns type="Date">The date of the start of the week based on the starting DAY passed to the extension.</returns>
	var diff = (7 + (this.getDay() - start)) % 7;
	return this.addDays(-1 * diff);
}

if (!Date.prototype.dateOnly) {
	Date.prototype.dateOnly = function () {
		var d = new Date(this);
		d.setHours(0, 0, 0, 0);
		return d;
	}
}

//removes array elements that match params
//usage: arrayX.clean(undefined,false,'',null);
if (!Array.prototype.clean) {

	Array.prototype.clean = function () {
		var len = this.length;

		while (len--) {
			var argLen = arguments.length;
			while (argLen--) {
				if (this[len] == arguments[argLen]) {
					this.splice(len, 1);
					break;
				}
			}
		}
		return this;
	};

}

//convert an array of items to a comma delimited string
if (!Array.prototype.toCommaDelimitedString) {
	Array.prototype.toCommaDelimitedString = function () {
		var stringId = '';
		for (var id = 0; id < this.length; id++) {
			stringId += this[id];
			if (id !== this.length - 1) {
				stringId += '.';
			}
		}
		return stringId;
	}
}

// attach the .equals method to Array's prototype to call it on any array
if (!Array.prototype.equals) {
	Array.prototype.equals = function (array) {

		if (!array || (this.length != array.length)) { return false; }

		for (var i = 0, l = this.length; i < l; i++) {
			// Check if we have nested arrays
			if (this[i] instanceof Array && array[i] instanceof Array) {
				// recurse into the nested arrays
				if (!this[i].equals(array[i])) { return false; }
			} else if (this[i] != array[i]) {
				// Warning - two different object instances will never be equal: {x:20} != {x:20}
				return false;
			}
		}
		return true;
	}
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

// polyfill for String includes (added in EMCAScript 2015, not supported in IE)
// taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
		value: function (searchElement, fromIndex) {

			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			// 1. Let O be ? ToObject(this value).
			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;

			// 3. If len is 0, return false.
			if (len === 0) {
				return false;
			}

			// 4. Let n be ? ToInteger(fromIndex).
			//    (If fromIndex is undefined, this step produces the value 0.)
			var n = fromIndex | 0;

			// 5. If n ≥ 0, then
			//  a. Let k be n.
			// 6. Else n < 0,
			//  a. Let k be len + n.
			//  b. If k < 0, let k be 0.
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

			function sameValueZero(x, y) {
				return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
			}

			// 7. Repeat, while k < len
			while (k < len) {
				// a. Let elementK be the result of ? Get(O, ! ToString(k)).
				// b. If SameValueZero(searchElement, elementK) is true, return true.
				if (sameValueZero(o[k], searchElement)) {
					return true;
				}
				// c. Increase k by 1. 
				k++;
			}

			// 8. Return false
			return false;
		}
	});
}
//When we feed dates to/from the server, we often do so in yyyyMMdd format.  These prototype functions allow us to easily flip between an integer in yyyyMMdd format and a date
Date.prototype.yyyymmdd = function () {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd = this.getDate().toString();
	return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]); // padding
};
Date.fromInt = Date.prototype.fromInt = function (yyyyMMdd) {
	yyyyMMdd = yyyyMMdd + '';
	return new Date(
      parseInt(yyyyMMdd.slice(0, 4), 10),
      parseInt(yyyyMMdd.slice(4, 6), 10) - 1,
      parseInt(yyyyMMdd.slice(6, 8), 10)
   );
}
Date.prototype.toRegionalString = function () {
	var sFmt = 'MM/dd/yy'
	if (BT.Globals.dateFormat) { sFmt = BT.Globals.dateFormat; }
	return new Date(this).toString(sFmt);
}

if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}

String.prototype.toProperCase = function () {
	return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

if (!Object.propertyByString) {
	Object.propertyByString = function (o, s) {
		s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
		s = s.replace(/^\./, '');           // strip a leading dot
		var a = s.split('.');
		for (var i = 0, n = a.length; i < n; ++i) {
			var k = a[i];
			if (k in o) {
				o = o[k];
			} else {
				return;
			}
		}
		return o;
	}
}

//---------------------------------------------
//	Create the BT namespace
//------------------------------------------
if (typeof BT === 'undefined') { window.BT = {}; }
BT.getType = function (obj) {
	if (obj && obj.jquery !== undefined) { return 'jquery'; }
	try {
		if (typeof (obj) == 'undefined') { return 'undefined'; }
		if (obj === null) { return 'null'; }
		return obj.constructor.name.toLowerCase();
	} catch (err) { return 'undefined'; }
}

//	Encoding helpers for html generation
BT.htmlEncode = function (v) {
	return $('<div/>').text(v).html();
};
BT.htmlDecode = function (v) {
	return $('<div/>').html(v).text();
};
BT.htmlAttrEncode = function (v) {
	return BT.htmlEncode(v.replace(/'/g, '&apos;').replace(/"/g, '&quot;'));
};
BT.htmlAttrDecode = function (v) {
	return v;
};

BT.Util = BT.Util ? BT.Util : {};
if (!BT.Globals) { BT.Globals = {}; }
BT.Util.cleanHtml = function (html) {
	if (html == undefined) { return '' }
	var sClean = html.toString().replace(/(<[\s]*script[\s]*>[^<]*<[\s]*\/[\s]*script[^>]*>|<[^>]*>)/g, '');
	return sClean.replace(/["]/g, "&quot;").replace(/[']/g, '&#39;');
}

BT.Util.dateCompare = function (dt1, dt2) {
	if (dt1.toString('yyyyMMdd') < dt2.toString('yyyyMMdd')) { return -1; }
	if (dt1.toString('yyyyMMdd') > dt2.toString('yyyyMMdd')) { return 1; }
	return 0;
}

// encapsulate null/undefined check
BT.Util.IsUndefined = function (val) {
	return val == undefined || val == null;
}

// encapsulate null/undefined/empty string check
BT.Util.IsNullOrEmpty = function (val) {
	if (!val) { return true; }
	else if (typeof val === 'string' && ! /\S/.test(val)) { return true; }
	return false;
}

BT.Util.getScrollPosition = function (selector) {
	try {
		return document.querySelector(selector).scrollTop;
	} catch (ex) { return 0; }
}

BT.Util.setScrollPosition = function (selector, position) {
	try {
		document.querySelector(selector).scrollTop = position;
	} catch (ex) {/* log error */ }
}

BT.Util.baseUrl = function () {
	var host = window.location.origin;
	var pathname = window.location.pathname;
	var result = pathname.toLowerCase().indexOf('bigtime') !== -1 ? host + '/Bigtime/' : host + '/';
	return result;
}

//Used to parse a number from user entered text (eg - $45.67 --> 45.67)
BT.Util.parseNumber = function (value) {
	try {
		if (isNaN(value)) {
			value = value.replace(/[^0-9\.\-]+/g, '');
		} else {
			value = value.toString();
		}
		if (value == '' || value == '-') { return 0; }
		return parseFloat(value);
	} catch (err) { return 0 }
}

BT.Util.toBoolean = function (value) {
	if (value && value.length !== 0) {
		var v = ('' + value).toLowerCase();
		value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]' || v == '');
	} else {
		value = false;
	}
	return value;
}

//Used to return a DATE from a variable
BT.Util.parseDate = function (value) {
	try {
		if (value.getMonth) {
			return value;
		} else if (typeof value === 'string' && value.indexOf('T') > 0 && value.length > 10) {
			try {
				return new Date(value)
			} catch (ex) {
				return BT.Util.DateFromString(value)
			}
		} else {
			return BT.Util.DateFromString(value);
		}
	} catch (err) { return undefined; }
}
BT.Util.parseDateYMD = function (value) {
	try {
		if (value.getMonth) {
			return value;
		} else {
			value = value.replace(/-/g, '/');
			return new Date(value);
		}
	} catch (err) { return undefined; }
}

BT.Util.parseDateUnixTimestamp = function (value) {
	try {
		if (!isNaN(value)) {
			//presumably unix timestamp to date object
			var timestamp = BT.Util.parseNumber(value);
			return new Date(timestamp * 1000);
		} else {
			return undefined;
		}
	} catch (err) { return undefined; }
}

//Used to trim a number to a given precison (eg - $45.6733 --> 45.67)
BT.Util.formatNumber = function (value, precision, minPrecision, displayBlank) {

	try {

		if (precision == undefined) { precision = 2; } else { precision = parseInt(precision); }

		var sDecVal = '';
		var nRawVal = BT.Util.parseNumber(value);
		if (nRawVal == 0) { return !displayBlank ? '' : nRawVal + '.' + ('0000000000').substr(0, precision); }
		nRawVal = Math.round(nRawVal * Math.pow(10, precision)) / Math.pow(10, precision);
		var sRawVal = nRawVal.toString();

		//Separate out the decimal portion of the number
		if (sRawVal.indexOf('.') > -1) {
			sDecVal = sRawVal.substr(sRawVal.indexOf('.'));
			sRawVal = sRawVal.substring(0, sRawVal.indexOf('.'));
		} else {
			sDecVal = precision == 0 ? '' : '.';
		}
		if (precision > 0) {
			sDecVal = (sDecVal + '0000000000').substr(0, precision + 1);
			var decArray = sDecVal.split(''), nCnt = minPrecision ? minPrecision : precision;
			for (var iCntDecimals = decArray.length; iCntDecimals > 0; iCntDecimals--) {
				if (parseInt(decArray[iCntDecimals - 1]) > 0 || iCntDecimals == nCnt + 1) {
					nCnt = iCntDecimals;
					break;
				}
			}
			sDecVal = sDecVal.substr(0, nCnt);
		}

		//add a thousands separator
		var sRetVal = '', sSep = '', iCnt = 0, nSepCnt = 0;
		for (iCnt = sRawVal.length - 1; iCnt >= 0; iCnt--) {
			sRetVal = sRawVal.charAt(iCnt) + sSep + sRetVal;
			if (++nSepCnt == 3) {
				nSepCnt = 0;
				sSep = ',';
			} else {
				sSep = '';
			}
		}
		if (sRetVal.substr(0, 1) == ',') { sRetVal = sRetVal.substr(1); }
		if (sRetVal.substr(0, 2) == '-,') { sRetVal = '-' + sRetVal.substr(2); }
		//Return to the calling program
		if (sDecVal == '') {
			return sRetVal;
		} else {
			return sRetVal + sDecVal;
		}
	} catch (err) { return ''; }

}

BT.Util.formatCurrency = function (value, precision, minPrecision, displayBlank) {
    try {
        if (value === 0) { return BT.Globals.Currency + (precision == 0 ? '0' : '0.00'); }
		var sRetVal = BT.Util.formatNumber(value, precision, minPrecision, displayBlank);
		if (sRetVal == '') { return '' }
		if (BT.Util.parseNumber(value) >= 0) {
			return BT.Globals.Currency + sRetVal;
		} else {
			return '-' + BT.Globals.Currency + sRetVal.replace('-', '');
		}
	} catch (err) { return '' }
}

BT.Util.formatDate = function (dateObj, locale) {
	//if this isn't a date - return empty string
	if (dateObj.hasOwnFunction('getFullYear') == false) { return ''; }
	var year = dateObj.getFullYear(),
	month = (dateObj.getMonth() + 1).formatLeft(2),
	d8 = dateObj.getDate().formatLeft(2);

	if (!locale) {
		dateObj;
		return [year, month, d8].join('');
	}
}

//	converts an array to a json object
BT.Util.convertArrayToObject = function (xs) {
	var obj = {},
    xsLen = xs.length;

	while (xsLen--) {
		var pair = xs[xsLen];
		obj[pair.name] = pair.value;
	}

	/*
	//while loop replaces this - Erik
	for (var i = 0; i < xs.length; i++) {
	var pair = xs[i];
	obj[pair.name] = pair.value;
	}
	*/
	return obj;
};

BT.Util.getContent = function (url) {
	return $.ajax({ url: url, type: 'GET', async: false }).responseText;
};

//Async call for RememberSessionAsync and RememberAsync functions
//Fix firefox's synchronous call
BT.Util.getContentAsync = function (url, successCallback, errorCallback) {
	$.ajax({
		url: url,
		type: 'GET',
		success: function (result) {
			if (successCallback && typeof (successCallback) == "function") { successCallback(result); }
		},
		error: function (result) {
			if (errorCallback && typeof (errorCallback) == "function") { errorCallback(result); }
		}
	});
};

//Used to parse a potential boolean value
BT.Util.parseBool = function (value) {
	try {
		if (value != undefined && (value == 1 || value == true || value.toLowerCase() == 'true' || value.toLowerCase() == 'on')) {
			return true;
		} else {
			return false;
		}
	} catch (err) { return false; }
}

//Returns an offset that will allow you to place a div below/right of an element.
//If, however, that div would fall outside of p_parent, then the function will adjust that offset
// (moving it to right and/or upper-right as required).
BT.Util.getVisibleOffset = function (p_div, p_parent, p_el) {

	var myNewOffset = p_el.offset();
	myNewOffset.top += p_el.outerHeight() + 5;

	var myPointer = { a: 'top', b: 'Left' },
		ContainerRightEdge = p_parent.outerWidth() + p_parent.offset().left,
		myRightEdge = p_div.outerWidth() + p_el.offset().left,
		alignRightEdge = p_el.offset().left - p_div.outerWidth() + 15,
		ContainerBottomEdge = p_parent.outerHeight() + p_parent.offset().top,
		myBottomEdge = p_div.outerHeight() + p_el.offset().top,
		alignTopEdge = p_el.offset().top - p_div.outerHeight() - 5;

	if (myRightEdge > ContainerRightEdge) {
		myNewOffset.left = alignRightEdge;
		myPointer.b = 'Right';
	}
	if (myBottomEdge > ContainerBottomEdge) {
		myNewOffset.top = alignTopEdge;
		myPointer.a = 'bottom';
	}
	p_div.removeClass('pointer-topLeft pointer-topRight pointer-bottomLeft pointer-bottomRight').addClass('pointer-' + myPointer.a + myPointer.b);

	return myNewOffset;

}

BT.Util.Copy = function (p_originalObject) {
	if (p_originalObject == undefined) { return undefined; }
	return JSON.parse(JSON.stringify(p_originalObject)); //This is 50-100x faster at deep cloning than angular.copy
}



BT.Util.Math = {}

//	used to round a float to the Nth decimal position
BT.Util.Math.round = function (value, decimalPlaces) {
	return Math.round(parseFloat(value) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
};


//	used to round timesheet entries
//	increment (.1,.25,.5)
BT.Util.Math.roundTo = function (value, increment) {
	// value will be the number we'll round
	// increment will be the 'round to' - in your case, .25
	var remain;
	var roundvalue;
	var result;
	remain = value % increment; // this will be somewhere between 0 and .25
	remain = BT.Util.Math.round(remain, 2); //	used to fix modulous floating point errors
	roundvalue = increment / 2;

	if (remain >= roundvalue) { // rounding up
		result = value - remain;
		result += increment;
	}
	else { // rounding down }
	}
};

BT.Util.Math.divideIfNotZero = function(numerator, denominator) {
	///<summary>Divides the provided input, provided that the denominator is non-zero and not NaN.  Will return null if denominator is invalid.</summary>
	///<param name="numerator">The divident or 'top' of the fraction</param>	
	///<param name="denominator">The divisor or 'bottom' of the fraction, cannot be zero.</param>
	return (denominator === 0 || isNaN(denominator)) ? null : numerator / denominator;
}

BT.Util.Walkthrough = (BT.Util.Walkthrough ? BT.Util.Walkthrough : {});
BT.Util.Walkthrough.status = {
	enabled: 0,
	disabled: 1
};
BT.Util.Walkthrough.inProgress = false;
BT.Util.Walkthrough.cacheManager = (function () {
	var cache = {};
	return {
		get: function (key) {
			return cache[key];
		},
		set: function (key, value) {
			cache[key] = value;
		}
	};
})();
BT.Util.Walkthrough.initialize = (function () {
	var tooltipType = {
		initial: 'Initial',
		interim: 'Interim',
		final: 'Final'
	};

	function getId(config) {
		var id = config.id;
		if (config.subView && config.subView !== '') {
			id += '.' + config.subView;
		}
		return id;
	};

	function create(config) {
		var currentIndex, options = config.options;

		function setConfig(configuration) {
			config = configuration;
		};

		function current() {
			return options[currentIndex];
		};

		function isLast() {
			return currentIndex === options.length - 1;
		};

		function hide() {
			$('.getting-started.wrapper').remove();
			if (currentIndex == -1) { return; }
			var currentEl = current();
			if (!currentEl) { return; }
			if (currentEl.Type != 'Initial') { $(currentEl.Selector).popover('hide'); }
			if (currentEl.EvalOnNext && currentEl.EvalOnNext != '' && config.parentScope) {
				try {
					config.parentScope.$eval(currentEl.EvalOnNext);
				} catch (err) { console.warn(err); }	//ignore this error
			}
			if (currentEl.ScriptOnNext && currentEl.ScriptOnNext != '') {
				eval(currentEl.ScriptOnNext);
			}
			if (currentEl.PageForwardOnNext) {
				window.location.replace(currentEl.PageForwardOnNext);
			}
		};

		function loadGettingStarted(tooltip) {

			var $introScreen = $(
				'<div class="getting-started wrapper">' +
				'	<div class="screen">' +
						'<button class="walkthrough-action walkthrough-close">x</button>' +
				'		<p class="title">GETTING STARTED</p>' +
				'		<p class="description">Click the button below to see a brief overview of this screen.</p>' +
				'		<div class="action-button"><a class="btn btn-xl btn-primary" id="tutorialLaunch">SHOW ME</a></div>' +
				'	</div>' +
				'	<div class="close-wrapper"><a id="tutorialCancel" class="naked">Dismiss this tutorial.</a></div>' +
				'</div>');

			$introScreen.find('.title').html(tooltip.Title);
			$introScreen.find('.description').html(tooltip.Content);
			$introScreen.find('#tutorialLaunch').html(tooltip.Trigger);
			$introScreen.find('#tutorialCancel').html(tooltip.Footer);

			$(tooltip.Container).append($introScreen);
		}

		function initializeContent(tooltip) {
			var content = tooltip.Content;
			if (tooltip.AddNext) {
				switch (tooltip.Type) {
					case tooltipType.initial:
						content += "<div class='walkthrough-action begin-walkthrough'><a>Show Me How</button></a>";
						break;
					case tooltipType.interim:
						content += "<div class='walkthrough-action next-walkthrough-step'><a>Next Tip ></a></div>";
						break;
					case tooltipType.final:
						content += "<div class='walkthrough-action finish-walkthrough'><a>CLOSE</a></div>";
						break;
				}
			}
			return content;
		};

		function initializeTemplate(tooltip) {
			var css = tooltip.Css ? tooltip.Css : "";
			var footer = tooltip.Footer ? tooltip.Footer : "";
			return '<div class="popover walkthrough-popover ' + css + '"><button class="walkthrough-action walkthrough-close">x</button><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div>' +
				'<div class="popover-footer"><a class="walkthrough-action">' + footer + '</a></div></div>';
		};

		var overlayManager = (function () {
			var deleteOverlay = function () {
				$('.walkthrough-overlay').remove();
			};
			var createOverlay = function (tooltip) {
				deleteOverlay();
				var overlay = $('<div/>', { 'class': 'walkthrough-overlay' });
				$(tooltip.Container).prepend(overlay);
				$(tooltip.Container).one('click', '.walkthrough-action', function () {
					deleteOverlay();
				});
			};

			return {
				createOverlay: createOverlay,
				deleteOverlay: deleteOverlay
			}
		})();

		function next() {
			BT.Util.Walkthrough.inProgress = true;
			var nCountRetries = 0;
			try {
				if (currentIndex !== -1) {
					hide();
					var myCurrentElement = current();
					if (myCurrentElement.EvalOnNext && myCurrentElement.EvalOnNext != '' || myCurrentElement.PageForwardOnNext) {
						setTimeout(next_internal, 1000);
						return;
					}
				}
				next_internal();
			} catch (err) {
				//Ignoring this error 
			}

			function next_internal() {
				try {
					currentIndex++;
					if (currentIndex < options.length) {
						var tooltip = current();
						if (tooltip.Type === 'Initial') {
							loadGettingStarted(tooltip);
						} else {
							if ($(tooltip.Selector).length > 0) {
								createPopover(tooltip);
							} else {
								setTimeout(function () {
									if ($(tooltip.Selector).length > 0) {
										createPopover(tooltip);
									} else {
										next();
									}
								}, 1000);
							}
						}
					}
				} catch (err) {
					//Ignoring this error 
				}
			}

			function createPopover(tooltip) {
				nCountRetries += 1;
				if ($(tooltip.Selector).length > 0) {
					showTooltip(tooltip)
					return;
				} else if (nCountRetries < 5) {
					setTimeout(function () {
						createPopover(tooltip);
					}, 1000);
				}
			}
		};

		function showTooltip(tip) {

			$(tip.Selector).popover({
				content: initializeContent(tip),
				title: tip.Title && typeof tip.Title == 'string' ? tip.Title.safeValue() : tip.Title,
				html: tip.Html && typeof tip.Html == ' string' ? tip.Html.safeValue() : tip.Html,
				container: tip.Container,
				placement: tip.Placement,
				trigger: tip.Trigger,
				template: initializeTemplate(tip)
			});
			
			if (tip.IsOverlay) {
				overlayManager.createOverlay(tip);
			}
			$(tip.Selector).popover('show');
		}

		function reset() {
			currentIndex = -1;
			overlayManager.deleteOverlay();
			BT.Util.Walkthrough.inProgress = false;
		};

		function initializeEvents() {
			var initAddNextEvents = options.some(function (element) {
				return element.AddNext === true;
			});
			$('body').off('click.tutorial.close').on('click.tutorial.close', '.walkthrough-close', function () {
				hide();
				BT.Util.Walkthrough.inProgress = false;
				if (config.statusChanged) {
					config.statusChanged(BT.Util.Walkthrough.status.disabled);
				}
			});
			if (initAddNextEvents) {
				$('body').off('click.tutorial.hide1').on('click.tutorial.hide1', '.finish-walkthrough > a', function () {
					hide();
					BT.Util.Walkthrough.inProgress = false;
					BT.Message.RememberAsync('walkthrough.' + config.id + 'Passed', "1");
					config.statusChanged(BT.Util.Walkthrough.status.disabled);
				});
				$('body').off('click.tutorial.hide2').on('click.tutorial.hide2', '#tutorialCancel', function () {
					hide();
					BT.Util.Walkthrough.inProgress = false;
					BT.Message.RememberAsync('walkthrough.' + config.id + 'Passed', "1");
					config.statusChanged(BT.Util.Walkthrough.status.disabled);
					if (config.options.length > 1 && config.options[config.options.length - 1].Selector == '#settingsBar_help') {
						currentIndex = config.options.length - 1;
						showTooltip(config.options[config.options.length - 1]);
					}
				});
				$('body').off('click.tutorial.next').on('click.tutorial.next', '#tutorialLaunch, .begin-walkthrough > a, .next-walkthrough-step > a', function () { next(); });
			}
		};

		function initialize() {
			initializeEvents();
			reset();
			if (config.showOnLoad) {
				//if the selector isn't loaded yet, wait 1 second and let angular load the views.
				if ($(options[0].Selector).length === 0) {
					setTimeout(next, 1000);
				} else {
					next();
				}
			}
		};

		initialize();
		return {
			next: next,
			reset: reset,
			current: current,
			hide: hide,
			isLast: isLast,
			initialize: initialize,
			setConfig: setConfig
		};
	};

	return function (config) {
		var id = getId(config);
		var cached = BT.Util.Walkthrough.cacheManager.get(id);
		if (!cached) {
			cached = create(config);
			BT.Util.Walkthrough.cacheManager.set(id, cached);
		} else {
			cached.setConfig(config);
			cached.initialize();
		}
		return cached;
	};
})();

BT.Dialog = {};
BT.Dialog.DateRange = function (options) {

	var _self = $(this);

	//supply default values for properties
	var defaults = {
		actionLabel: 'Ok',
		startDate: '',
		endDate: ''        
	}

	options = $.extend(defaults, options);

    var formsOptions = {
        datepicker: {}
    };    
    switch(options.viewMode) {
        case 'months':
            formsOptions.datepicker = {                          
                viewMode: "months",
                minViewMode: "months"
            }
            break;        
    }    

	//Creating the object
	var sDatePickerDiv = BT.Util.getContent(BT.Globals.baseUrl + 'Settings/Webpart/DualDatePicker');
	var myDiv = $(sDatePickerDiv).appendTo($('body'));
	if (options.actionLabel) {
		myDiv.find('.title').html(options.actionLabel);
	}

	//getting the right position
	var myNewOffset = options.target.offset();
	myNewOffset.top += options.target.height() + 2;

	//left/right aligned
	if (myNewOffset.left > $(window).width() / 2) {
		myNewOffset.left -= (myDiv.outerWidth(false) - options.target.outerWidth(false));
	}

	//putting it in the right place.
	myDiv.offset(myNewOffset);

	myDiv.find('input[name="StartDate"]').val(options.startDate);
	myDiv.find('input[name="EndDate"]').val(options.endDate);    

	myDiv.initForm(formsOptions);

	myDiv.find('.btn-primary').on('click', function () {
		var result = {}
		result.startDate = myDiv.find('input[name="StartDate"]').val();
		result.endDate = myDiv.find('input[name="EndDate"]').val();
		if (options.success) {
			options.success(result);
			myDiv.remove();
		} else {
			myDiv.remove();
		}
	});

	myDiv.find('.cancel_btn_sm').on('click', function () {
		myDiv.remove();
	});

	_self.unload = function () {
		myDiv.remove();
	}

	return _self;
}


BT.Util.showErrors = function (p_jqXHR, p_$container) {

	//	display form errors
	try {

		//clear any PRIOR error related data
		p_$container.find('div.bt-errorMain').remove();
		p_$container.find('.inline-error').remove();
		p_$container.find('.input-validation-error').removeClass('input-validation-error').attr('title', '');

		//convert the response text to a json object
		var cResponseError = (new Function('return ' + p_jqXHR.responseText))();

		//add the generic 'description' error to the top of the dialog
		if (cResponseError.model_errors == undefined || Object.keys(cResponseError.model_errors).length == 0) {
			if (p_$container.find('.js-errorMain-Parent').length > 0) {
				p_$container.find('.js-errorMain-Parent').prepend('<div class="bt-errorMain ui-widget ui-state-error ui-corner-all">' + cResponseError.description + '</div>');
			} else {
				p_$container.prepend('<div class="bt-errorMain ui-widget ui-state-error ui-corner-all">' + cResponseError.description + '</div>');
			}
		}
		// loop through each model_error and flag problem objects (locate elements by NAME=model_errors.key and attach an "error" class to them)
		// the model_error detail is saved to the element's TITLE property.
		for (var sKey in cResponseError.model_errors) {
			if (cResponseError.model_errors.hasOwnProperty(sKey) && p_$container.find("*[name='" + sKey + "']").length > 0) {
				var cInvalidField = p_$container.find("*[name='" + sKey + "']");
				cInvalidField.addClass('input-validation-error');
				if (cInvalidField.closest('.bt-select, .simple-select').length > 0) {
					cInvalidField.closest('.bt-select, .simple-select').addClass('input-validation-error');
				} else {
					cInvalidField.parent().append('<p class="inline-error">' + cResponseError.model_errors[sKey] + '</p>');
				}
			} else {
				try { console.log(cResponseError.model_errors[sKey]); } catch (logErr) {
					//Ignoring this error 
				}
			}
		}
		// loop through each generic error log it
		try {
			for (var iCntErr = 0; iCntErr < cResponseError.errors.length; iCntErr++) {
				console.log(cResponseError.errors[iCntErr]);
			}
		} catch (logErr) {
			//Ignoring this error 
		}
	} catch (err) {
		//Ignoring this error 
	}
}

//This is the second half of "showErrors" .... Once the user submits a form and the data is saved, we want to CLEAR OUT the old error data from the UI
//(eg - turn off the "error" flags on fields, remove the error divs/p's from the UI, etc.). 
BT.Util.hideErrors = function (p_$container) {
	try {
		//clear any PRIOR error related data
		p_$container.find('div.bt-errorMain').remove();
		p_$container.find('.input-validation-error').removeClass('input-validation-error').attr('title', '');
	} catch (err) { }
}


BT.Util.getProperty = function (obj, propertyName) {
	var arr = propertyName.split(".");
	while (arr.length && (obj = obj[arr.shift()]));
	return obj;
};

// DETECT IE FAMILY BROWSERS
BT.Util.isIEBrowser = function () {
	return ((navigator.appName == 'Microsoft Internet Explorer') //IE
		|| ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)) //Netscape
		|| (document.documentMode || /Edge/.test(navigator.userAgent))); //Edge
}

BT.Util.setSessionVal = function (name, value, path) {
	path = path !== undefined ? path : '/';
	if (BT.Util.isIEBrowser()) {
		document.cookie = name + '=' + value + '; ' + path;
	} else {
		document.cookie = name + '=' + value + '; expires=0; ' + path;
	}
}

BT.Util.getSessionVal = function (cookieName) {
	var cookieArray = document.cookie.split(';'),
	i = cookieArray.length,
	cookieMatch = new RegExp('^ *' + cookieName + '=', 'g');
	while (i--) {
		var thisCookie = cookieArray[i];
		if (thisCookie.match(cookieMatch)) {
			return thisCookie.split('=')[1];
		}
	}
	return null;
}

// Helper function to chain prototypes
BT.Util.extend = function (Child, Parent) {
	var F = function () { };
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.superclass = Parent.prototype;
}

BT.Util.WarnUnsavedChanges = function ($scope, options) {
	var self = this;
	var originals = {};
	var removeFunctions = [];
	var defaultOptions = {
		message: 'Are you sure want to dismiss your changes and leave the page?',
		routeEvents: ['$locationChangeStart', '$stateChangeStart']
	};

	options = angular.extend(defaultOptions, options);

	this.saveOriginal = function (key, value) {
		originals[key] = angular.copy(value);
	};

	this.hasChanges = function () {
		return _.some(originals, function (value, key) {
			var newValue = $scope[key];
			return newValue === undefined || !angular.equals(value, newValue);
		});
	};

	this.tearUp = function () {
		window.onbeforeunload = function () {
			if (self.hasChanges()) {
				return options.message;
			}
			self.tearDown();
		}

		_.each(options.routeEvents, function (routeEvent) {
			var removeFn = $scope.$root.$on(routeEvent, function (event) {
				if (self.hasChanges() && !confirm(options.message)) {
					event.preventDefault();
				} else {
					self.tearDown();
				}
			});
			removeFunctions.push(removeFn);
		});
	}

	this.tearDown = function () {
		_.each(removeFunctions, function (fn) {
			fn();
		});
		window.onbeforeunload = null;
	}

	this.tearUp();
}

BT.Util.defaultPageWidth = 1050;
BT.Util.setupMainPaneWidth = function (width) {
	var newWidth = width;
	if (newWidth < BT.Util.defaultPageWidth) { newWidth = BT.Util.defaultPageWidth; }
	$('#main-pane').width(newWidth);
	return newWidth;
};

BT.Util.GetAjaxUrl = function (url, dependentFilterVal) {
	url = url.trim();
	//add "&filterid=XX" if this is a filtered combo box.
	if (dependentFilterVal != null) {
		url += (url.indexOf('?') > 0 ? '&' : '?') + 'filterid=' + dependentFilterVal;
	}
	return url;
};

BT.Util.GetNameByUrl = function (url, dependentFilterVal) {
	url = BT.Util.GetAjaxUrl(url, dependentFilterVal);

	return url.replace(/[/]/g, '_');
};

BT.Util.DateFromString = function (p_dt, p_format) {

	try {

		if (p_dt == undefined || p_dt == '') { return undefined; }
		if (p_format == undefined || p_format == '') {
			if (BT && BT.Globals) {
				p_format = BT.Globals.dateFormat
			} else {
				p_format = 'MM/dd/yyyy'
			}
		}

		var today = new Date(),
			separator = p_format.match(/[.\/\-\s].*?/),
			parts = p_format.split(/\W+/),
			dateParts = p_dt.split(/\W+/),
			yr = -1, mo = -1, dt = -1;

		// account for YearMonth datetime format when we specify a format with only two parts, and a date with only two parts
		if (dateParts.length === 2 && parts.length === 2) {
			parts.push('d'); // add a day format to the format
			dateParts.push('1'); // the day is always going to be the first of the month
		}

		//ALWAYS account for the YYYY-MM-DD format (the native Date("") parser)
		if (dateParts.length == 3 && dateParts[0].length == 4) {
			return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
		}

		if (dateParts.length == 1) {
			if (parts[1].substr(0, 1).toLowerCase() == 'm') { dateParts.push(today.getMonth() + 1); }
			if (parts[1].substr(0, 1).toLowerCase() == 'd') { dateParts.push(today.getDate() + 1); }
		}
		if (dateParts.length == 2) {
			dateParts.push(today.getFullYear());
		}

		for (var iCnt = 0; iCnt <= 2; iCnt++) {
			switch (parts[iCnt].substr(0, 1).toLowerCase()) {
				case 'y':
					yr = parseInt(dateParts[iCnt]);
					break;
				case 'm':
					mo = parseInt(dateParts[iCnt]);
					break;
				case 'd':
					dt = parseInt(dateParts[iCnt]);
					break;
			}
		}

		if (yr > -1 && mo > -1 && dt > -1) {
			if (yr < 1000) { yr += parseInt(today.getFullYear() / 100) * 100; }
			return new Date(yr, mo - 1, dt);
		} else {
			return today;
		}
	} catch (err) {
		console.warn('Failed to parse date string: ' + p_dt);
		return undefined;
	}

}

Number.prototype.toMonthString = function () {
	if (this < 10) { return '0' + this; }
	else { return this.toString(); }
}







