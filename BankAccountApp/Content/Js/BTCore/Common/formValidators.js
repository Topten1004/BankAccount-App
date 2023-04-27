
var BT = BT || {};
BT.Angular =  BT.Angular || {};
BT.Angular.Validators = {};
BT.Angular.Validators.inject = function ($app) {

	$app.directive('inputNumeric', BT.Angular.Validators.inputNumeric);
	$app.directive('inputInteger', BT.Angular.Validators.inputInteger);
	$app.directive('inputPercent', BT.Angular.Validators.inputPercent);
	$app.directive('inputCurrency', BT.Angular.Validators.inputCurrency);
	$app.directive('inputDate', BT.Angular.Validators.inputDate);

};

BT.Angular.Validators.inputCurrency = function () {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function (p_scope, p_elem, p_attrs, p_ctrl) {
			var displayBlankValue = p_attrs.displayBlank ? true: false;
			var allowEmptyValue = p_attrs.allowEmpty ? true : false;
			var decimal = !BT.Util.IsNullOrEmpty(p_attrs.inputCurrency) ? BT.Util.parseNumber(p_attrs.inputCurrency) : 2;
			p_ctrl.$parsers.push(function (viewValue) {
				if (viewValue == '.' || viewValue == '-' || viewValue == '-.' || viewValue.length == 1) { return viewValue; }
				if (allowEmptyValue && viewValue == "") { return viewValue; }
				return BT.Util.parseNumber(viewValue);
			});
			p_ctrl.$formatters.push(function (modelValue) {
				if (allowEmptyValue && (typeof (modelValue) === 'undefined' || modelValue == null)) {
					return "";
				}
				return BT.Util.formatCurrency(modelValue, decimal, 2, displayBlankValue);
			});
			p_elem.on('blur', function () {
				//need to add this as well in order to format the field once the user is done editing it.
				if (allowEmptyValue && (typeof(p_ctrl.$modelValue) ==='undefined' || p_ctrl.$modelValue == '')) {
					p_ctrl.$viewValue = "";
				} else {
					p_ctrl.$viewValue = BT.Util.formatCurrency(p_ctrl.$modelValue, decimal, 2, displayBlankValue);
				}
				p_ctrl.$render();
			});
		}
	};
};

BT.Angular.Validators.inputNumeric = function () {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function (p_scope, p_elem, p_attrs, p_ctrl) {
			p_ctrl.$parsers.push(function (viewValue) {
				if (viewValue == '.' || viewValue == '-' || viewValue == '-.' || viewValue.length == 1) { return viewValue; }
				return BT.Util.parseNumber(viewValue);
			});
			p_ctrl.$formatters.push(function (modelValue) {
				return BT.Util.formatNumber(modelValue, 2, 2);
			});
			p_elem.on('blur', function () {
				//need to add this as well in order to format the field once the user is done editing it.
				p_ctrl.$viewValue = BT.Util.formatNumber(p_ctrl.$modelValue, 2, 2);
				p_ctrl.$render();
			});
		}
	};
};

BT.Angular.Validators.inputPercent = function () {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function (p_scope, p_elem, p_attrs, p_ctrl) {
			var displayBlankValue = p_attrs.displayBlank ? true : false;
			var decimal = !BT.Util.IsNullOrEmpty(p_attrs.inputPercent) ? BT.Util.parseNumber(p_attrs.inputPercent) : 0;
			p_ctrl.$parsers.push(function (viewValue) {
				if (viewValue == '.' || viewValue == '-' || viewValue == '-.' || viewValue.length == 1) { return viewValue; }
				return BT.Util.parseNumber(viewValue);
			});
			p_ctrl.$formatters.push(function (modelValue) {
				nVal = parseFloat(BT.Util.formatNumber(modelValue, decimal, 4, displayBlankValue));
				if (isNaN(nVal)) { return ''; }
				if (nVal > 0 && nVal < 1) { nVal = parseInt(100 * nVal); }
				return BT.Util.formatNumber(nVal, decimal, 4, displayBlankValue) + '%';
			});
			p_elem.on('blur', function () {
				//need to add this as well in order to format the field once the user is done editing it.
				nVal = parseFloat(BT.Util.formatNumber(p_ctrl.$modelValue, decimal, 4, displayBlankValue));
				if (isNaN(nVal)) {
					p_ctrl.$viewValue = '';
				} else {
					if (nVal > 0 && nVal < 1) { nVal = parseInt(100 * nVal); }
					p_ctrl.$viewValue = BT.Util.formatNumber(nVal, decimal, 4, displayBlankValue) + '%';
				}
				p_ctrl.$render();
			});
		}
	};
};

BT.Angular.Validators.inputInteger = function () {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function (p_scope, p_elem, p_attrs, p_ctrl) {
			p_ctrl.$parsers.push(function (viewValue) {
				if (viewValue == '.' || viewValue == '-' || viewValue == '-.' || viewValue.length == 1) { return viewValue; }
				return parseInt(BT.Util.parseNumber(viewValue));
			});
			p_ctrl.$formatters.push(function (modelValue) {
				return parseInt(BT.Util.parseNumber(modelValue));
			});
			p_elem.on('blur', function () {
				//need to add this as well in order to format the field once the user is done editing it.
				p_ctrl.$viewValue = parseInt(BT.Util.parseNumber(p_ctrl.$modelValue));
				p_ctrl.$render();
			});
		}
	};
};

BT.Angular.Validators.inputDate = function () {
	return {
		require: 'ngModel',
		/*scope: { ngModel: '=' },*/
		restrict: 'A',
		link: function (p_scope, p_elem, p_attrs, p_ctrl) {
			var byPeriodDate = p_attrs['inputDatePeriod'] === 'true';
			p_ctrl.$parsers.push(function (viewValue) {
				if (byPeriodDate && viewValue) {
					return BT.Util.DateFromString(viewValue, BT.Globals.dateFormatYearMonth) ? BT.Util.DateFromString(viewValue, BT.Globals.dateFormatYearMonth).toString(BT.Globals.dateFormat) : '';
				}
				if (viewValue) {
					return BT.Util.DateFromString(viewValue) ? BT.Util.DateFromString(viewValue).toString(BT.Globals.dateFormat) : '';
				}
			});
			p_ctrl.$formatters.push(function (modelValue) {
				if (modelValue == undefined || modelValue == '') {
					p_elem.val('');
					$(p_elem).datepicker('setValue', new Date.today());
					return '';
				}
				var dtVal = BT.Util.DateFromString(modelValue) ? BT.Util.DateFromString(modelValue).toString(BT.Globals.dateFormat) : '';
				if (byPeriodDate) { dtVal = BT.Util.DateFromString(dtVal, BT.Globals.dateFormat).toString(BT.Globals.dateFormatYearMonth); }
				p_elem.val(dtVal);
				$(p_elem).datepicker('setValue', dtVal);
				return dtVal;
			});
			p_elem.off('change.datepicker').on('change.datepicker', function () {
				var newVal;
				// If user types in YearMonth format ie. M/YY or YY/M; auto resolve by passing the yearMonth format to the DateFromString function.
				if (byPeriodDate) {
					var sDtVal = BT.Util.DateFromString(p_elem.val(), BT.Globals.dateFormatYearMonth);
					if (sDtVal === undefined) sDtVal = BT.Util.DateFromString(p_elem.val(), BT.Globals.dateFormat);
					newVal = sDtVal.toString(BT.Globals.dateFormat);
				}
				else {
					// If user types in month day ie. 1/1 only; auto resolve by adding the year to the remaining date.
					if (p_elem.val() && p_elem.val().split('/').length === 2) {
						var modelValue = p_elem.val() + '/' + Date.today().getFullYear().toString();
						var dtVal = BT.Util.DateFromString(modelValue) ? BT.Util.DateFromString(modelValue).toString(BT.Globals.dateFormat) : '';

						if (dtVal !== '') {
							p_elem.val(dtVal);
							$(p_elem).datepicker('setValue', dtVal);
						}
					}
					var sDtVal = (p_elem.val() ? BT.Util.DateFromString(p_elem.val()) ? BT.Util.DateFromString(p_elem.val()).toString(BT.Globals.dateFormat) : '' : '');
					newVal = sDtVal;
				}

				// deeply getting ngModel, because ngModel attr may be in format "Object.field.field"
				var fields = p_attrs['ngModel'].split('.'),
				    obj = p_scope;
				var oldVal = undefined;
				try {
					for (var i = 0; i < fields.length - 1; i++) { obj = obj[fields[i]]; }
					oldVal = obj[fields[i]]; // value from ngModel
				} catch (err) { }

				if (newVal != oldVal) {
					if (!p_scope.$$phase && !p_scope.$root.$$phase) {
						//need to add this as well in order to format the field once the user is done editing it.
						if (obj != undefined) { obj[fields[i]] = newVal; } // value from ngModel
						p_scope.$apply();
					} else {
						if (obj != undefined) { obj[fields[i]] = newVal; } // value from ngModel
					}
				}
			});
			var options = byPeriodDate ? { format: BT.Globals.dateFormatYearMonth.toLowerCase(), viewMode: 'months', minViewMode: 'months' } : { format: BT.Globals.dateFormat.toLowerCase() };
			$(p_elem).datepicker(options);
		}
	};
};
