if(typeof(window.BT)=='undefined') {var BT = {};}
BT.Form = BT.Form ? BT.Form : {};

//Used to make the "page selector" drop down that sometimes appears on our BigTime forms work.
$(document).ready(function () {

	$('html').off('click.dropdown.btdata-api.bigtime', '.form_header_toolbar .dropdown-menu li, div.bt-pulldown .dropdown-menu li');
	$('html').on('click.dropdown.btdata-api.bigtime', '.form_header_toolbar .dropdown-menu li, div.bt-pulldown .dropdown-menu li', function (e) {
		if ($(e.target).attr('data-toggle') == 'none') { return; }
		$(e.target).parents('.dropdown').find('.dropdown-menu>li.active').removeClass('active');
		$(e.target).parents('.dropdown').find('.dropdown-toggle .dropdown-label').html(e.target.innerHTML);
	});

	$('html').off('click.dropdown.data-api.bigtime.ajax');
	$('html').on('click.dropdown.data-api.bigtime.ajax', ".form_header_toolbar .js-ajax-detail, div.bt-pulldown .js-ajax-detail", function (e) {
		var target = e.target;
		var $target = $(target);
		if ($target.attr('data-toggle') != 'tab' || $target.attr('data-target') === undefined || $target.data('isLoaded')) { return; }
		if (target.nodeName === 'A' && $target.attr('data-target') != '' && target.hash === '' && target.href != '') {
			$.ajax({
				url: target.href,
				success: function (result) {
					$($target.attr('data-target')).html(result).initForm();
					//If we have the BT.Message namespace loaded, then we can check the newly loaded content for ads that need to be served.
					try { if (BT.Message) { BT.Message.initContent($($target.attr('data-target'))); } } catch (err) { }
					if ($target.attr('data-cache')) { $target.data('isLoaded', true); }
				},
				error: function (errResult) {
					$($target.attr('data-target')).html('');
				}
			});
		}
	});


});

(function ($) {

	String.prototype.escapeId = function () {
		return this.replace(/\./g, '\\.');
	};

	//extension used to set the value of a hidden field which will TRIGGER the onchange event.
	$.fn.setVal = function (value) {
		try {
			$(this).val(value);
			$(this).trigger('innerChange');
		} catch (err) { console.warn('failed to set element.value.'); }
	}

	$.fn.cloneForm = function() {
		var result = this.clone(),
			my_textareas = this.find('textarea').add(this.filter('textarea')),
			result_textareas = result.find('textarea').add(result.filter('textarea')),
			my_selects = this.find('select').add(this.filter('select')),
			result_selects = result.find('select').add(result.filter('select'));

		for (var i = 0, l = my_textareas.length; i < l; ++i) $(result_textareas[i]).val($(my_textareas[i]).val());
		for (var i = 0, l = my_selects.length; i < l; ++i) result_selects[i].selectedIndex = my_selects[i].selectedIndex;

		return result;

	}

	$.fn.serializeObject = function () {
		//first - for dataRows, we need to add the prefix for each row so that posted values have a unique Id
		AppendModifier(this);
		//then, create a CLONE of this form so that we can remove checkboxes from it.
		var o = {}, $postForm = this.cloneForm();
		//next - checkboxes are merged with both a checked and unchecked value.  Remove the unchecked value (if appropriate) to avoid duplicates in the array.
		findAndRemoveUncheckedCheckboxes($postForm);
		//Serialize the form values and then convert the array to a data object
		var a = $postForm.serializeArray();
		$.each(a, function () {
			this.name = this.name.replace("_enum","");
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		//if we are tracking changes on this form, then loop through the changed fields and add a string list of EDITS to the data object
		o.editedFields = getChangedArray(this);
		//If there is an onAfterSerialize function attached to this form object, then call it now
		BT.Form.onAfterSerialize(this)(o);
		//return the final data object
		$postForm.remove();
		return o;

		// When mvs adds a checkbox object, it adds a HIDDEN field with the value "false" alongside it.
		// since we are getting a list of a form's values -- we don't want BOTH, we just want the one
		//that will actually be submitted.  If we don't do this, the form submits BOTH values:  true (the checkbox) AND false (the hidden field).
		function findAndRemoveUncheckedCheckboxes(p_frm) {
			// first, remove UNCHECKED check boxes
			// then, remove the HIDDEN field added to the form if the box is checked
			$.each(p_frm.find(':checkbox'), function () {
				try {
					if (this.checked == true) {
						p_frm.find("[name='" + this.name + "'][type='hidden']").remove();
					} else {
						if(p_frm.find("[name='" + this.name + "'][type='hidden']").length==0) {
							p_frm.append('<input type="hidden" name="' + this.name + '" value="false" />');
						}
						this.remove();
					}
				} catch (err) { }
			});
		}

		function AppendModifier(p_frm) {
			$.each(p_frm.find('.js-subForm'), function () {
				var subForm = $(this);
				var sPrefix = subForm.data('form-prefix');
				$.each(subForm.find('input, select, textarea'), function () {
					sNm = $(this).attr('name') ? $(this).attr('name') : $(this).attr('id');
					if (sNm) {
						if (sNm.indexOf(sPrefix) == -1) {
							$(this).attr('name', sPrefix + '.' + sNm);
						}
					}
				});
			});
		}


		function getChangedArray(p_frm) {

			var aChanged = [],
				myEdits = p_frm.data('formEdits');
			if (myEdits == undefined || p_frm.hasClass('post-all-fields')) { return aChanged; }
			$.each(myEdits, function (idx, item) {
				aChanged.push(item.name);
			});

			return aChanged;

		}

	};

	$('body').off('click.doublecheck').on('click.doublecheck', '.js-btdoublecheck', function(e) {
		BT.Form.doubleCheck($(this));	
	});

	$.fn.initForm = function (options) {
	    var _$self = $(this);

	    options = $.extend({}, options);

		BT.Form.trackChanges($(this));

		//If this form has an js-ajaxSave button(s), then assume we are expecting to post (via ajax) when a user click it.
		_$self.find('button.js-ajaxSave, a.js-ajaxSave').off('click.ajaxSave').on('click.ajaxSave', function (e) {
			BT.Form.ajaxSave({
				status: $(this),
				form: $(this).closest('form, .form'),
				method: $(this).attr('data-method')
			});
		});

		//If this form has an js-ajaxSave button(s), then assume we are expecting to post (via ajax) when a user click it.
		_$self.find('button.js-ajaxDelete, a.js-ajaxDelete').off('click.ajaxDelete').on('click.ajaxDelete', function (e) {
			var myButton = $(this);
			e.preventDefault();
			BT.Form.confirmAndDelete({
				status: $(this),
				url: myButton.attr('href'),
				item: myButton.attr('data-name'),
				method: myButton.attr('data-method')
			});
		});

		//convert BTComboBox divs (format:  <div class="">)
		_$self.find('.bt-select').btSelect();

		//convert date picker input boxes (eg - any input with bt-validate-date)
		$('input.bt-validate-date').datepicker(options.datepicker || {});

		//set textboxes to AUTO-SIZE unless explicitly indicated
		if($.fn.hasOwnProperty('autosize')) { _$self.find('textarea:not(.fixed-size)').autosize(); }
		
		//If there are file upload boxes on the form, then listen for changes so we display a file name.
		_$self.off('change.filename focus.filename click.filename', 'input[type=file]').on('change.filename focus.filename click.filename', 'input[type=file]', function () { 
			$(this).showFileName() 
		});

		//initialize bt-switch objects
		BT.Form.Switch(_$self);

		//attach client-side validation to currency, float and integer input elements
		_$self.off('blur.bigtime.formUI', 'input.bt-validate-currency, input.bt-validate-currency-long, input.bt-validate-float, input.bt-validate-float-long, input.bt-validate-int');
		_$self.on('blur.bigtime.formUI', 'input.bt-validate-currency-long', function () {
			$(this).val(BT.Util.formatCurrency($(this).val(), 4));
		});
		_$self.on('blur.bigtime.formUI', 'input.bt-validate-currency', function () {
			$(this).val(BT.Util.formatCurrency($(this).val(), 2));
		});
		_$self.on('blur.bigtime.formUI', 'input.bt-validate-float-long', function () {
			$(this).val(BT.Util.formatNumber($(this).val(), 4));
		});
		_$self.on('blur.bigtime.formUI', 'input.bt-validate-float', function () {
			$(this).val(BT.Util.formatNumber($(this).val(), 2));
		});
		_$self.on('blur.bigtime.formUI', 'input.bt-validate-int', function () {
			$(this).val(BT.Util.formatNumber($(this).val(), 0));
		});
		//trigger blur event to format these currency, float and integer input elements
		_$self.find('input.bt-validate-currency, input.bt-validate-currency-long, input.bt-validate-float, input.bt-validate-float-long, input.bt-validate-int').trigger('blur');

		//initialize NakedGrid editor functionality (if a nakedGridEditor exists in the form)
		$.each(_$self.find('table.naked-grid'), function (idx, item) {
			BT.Form.initNakedGridEditor($(item));
		});

	}; //initForm close



})(jQuery);                                        //this ends the JQuery form extensions


// a convenience function used to attach a callback to a form which will be call in the serializeObject function
BT.Form.onAfterSerialize = function (p_$form, p_callback) {
	if (p_$form==undefined) { return; }
	if(p_callback) {
		p_$form.data('onAfterSerialize', p_callback);			
		return;
	} else {
		var myCallback = p_$form.data('onAfterSerialize');
		if(myCallback==undefined) { myCallback=function(o) { return; }}
		return myCallback;
	}
}

//Used to create a formEdits data object (attached to the "closest" form object) 
//which will contain an array of edited input, select or textarea objects
BT.Form.trackChanges = function (p_$container) {

	//get the nearest form based on the container we are setting up as a form.
	var myForm = p_$container.closest('form');
	if (myForm.length == 0) { return; }

	//setup a CHANGE event that will track a list of changed field names at the form level.
	myForm.off('change.BigTime.form');
	myForm.on('change.BigTime.form', 'input, select, textarea', function (e) {
		trackChanges_inner((e.target || e.srcElement));
	});
	myForm.off('innerChange.BigTime.form');
	myForm.on('innerChange.BigTime.form', 'input, select, textarea', function (e) {
		trackChanges_inner((e.target || e.srcElement));
	});


	function trackChanges_inner(p_source) {

		var myEdits = myForm.data('formEdits');
		if (myEdits == undefined) { myEdits = []; }
		//We only need to add this element to the list of CHANGED fields if it doesn't already exist
		if (myEdits.indexOf(p_source) == -1) {
			myEdits.push(p_source);
			myForm.data('formEdits', myEdits);
		}

	}

};

BT.Form.initNakedGridEditor = function (p_$table) {
	if (p_$table == undefined) { return; }
	p_$table.off('click.bigtime.naked.delete', '.js-DeleteRow');
	p_$table.on('click.bigtime.naked.delete', '.js-DeleteRow', function () {
		MarkRowDeleted($(this))
	});

	p_$table.off('click.bigtime.naked.add', '.js-addNakedGrid-row');
	p_$table.on('click.bigtime.naked.add', '.js-addNakedGrid-row', function () {
		addNewRow($(this));
	});

	p_$table.off('focus.bigtime.naked').on('focus.bigtime.naked', '.js-subForm input, .js-subForm select, .js-subForm textarea', function () {
		p_$table.find('tr.focus').removeClass('focus');
		$(this).closest('tr.js-subForm').addClass('focus');
	});

	function MarkRowDeleted(p_$this) {
		var sInputName = p_$this.attr('data-btid');
		var $myRow = p_$this.closest('tr.naked-gridEditor');
		if (BT.Util.parseNumber($myRow.attr('data-btid')) < 0) {
			//This row was added locally and not yet saved...so we can just remove it from the table
			$myRow.remove();
		} else {
			//This row has been saved to the invoice object, so we post the IsDeleted value back to the server to remove it.
			$myRow.hide();
			$myRow.find('input').remove();
			$myRow.find('select').remove();
			if (p_$table.find('#' + sInputName.escapeId()).length == 0) {
				$('<input id="' + sInputName + '" name="' + sInputName + '" value="1" type="hidden" />').appendTo(p_$table).trigger('change');
			}
		}
		$myRow.trigger('dataChanged.bigtime.naked');
	}

	//Called when a user clicks ADD ROW to a naked gridEditor.  Gets a blank row from the server, 
	//appends that row to the table and INITIALIZES it.
	function addNewRow(p_$this) {

		// Pull the "add row" href from the button.
		var sUrl = p_$this.attr('data-href');
		var $lastItem = undefined, $myNewRow = undefined, nLastAdded = 0;

		//Loop through all of the EXISTING rows and get the LOWEST data-btid value that is
		//less than 0.  That is the ID we are going to use to create a new line item.
		$.each(p_$table.find('tr.naked-gridEditor'), function (idx, item) {
			var nLineNbr = BT.Util.parseNumber($(item).attr('data-btid'))
			if (nLineNbr < nLastAdded) { nLastAdded = nLineNbr; }
			$lastItem = $(item);
		});

		//		var newRowHtml = p_$table.data('newRowHtml');
		//		if (newRowHtml == undefined) {
		$.ajax({
			url: sUrl,
			success: function (result) {
				p_$table.data('newRowHtml', result);
				AddNewRow_inner(result);
			},
			error: function (err) {

			}
		});
		//		} else {
		//			AddNewRow_inner(newRowHtml);
		//		}

		function AddNewRow_inner(rowHtml) {
			//Once we get back the new row HTML, append it to the table's body
			if ($lastItem == undefined) {
				$myNewRow = $(rowHtml).appendTo(p_$table.find('tbody'));
			} else {
				$myNewRow = $(rowHtml).insertAfter($lastItem);
			}

			//Then, update data-btid and data-form-prefix with the value from nLastAdded
			nLastAdded -= 1;
			$myNewRow.attr('data-btid', nLastAdded);
			var sNewBtId = $myNewRow.attr('data-form-prefix').replace('.0', '.' + nLastAdded);
			$myNewRow.attr('data-form-prefix', sNewBtId);
			//call InitForm on this new html (in case it contains pick list or validated data)
			$myNewRow.initForm();

			//finally, trigger an event so that the rest of the UI can react to the addition of a new line item
			p_$table.trigger('addRow.bigtime.naked');
			if ($myNewRow.find('input').length > 0) { $myNewRow.find('input')[0].focus(); }
		}
	}
};          //end: BT.Form.initNakedGridEditor

// Auto-resize function for textarea's:  call it to enable text areas to expand automatically to contain their content (+1 line) just like a block element.
// usage:  $('textarea').autoresize();
(function ($) {
	var 
	hidden = 'hidden',
	borderBox = 'border-box',
	lineHeight = 'lineHeight',
	copy = '<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>',
	// line-height is omitted because IE7/IE8 doesn't return the correct value.
	copyStyle = [
		'fontFamily',
		'fontSize',
		'fontWeight',
		'fontStyle',
		'letterSpacing',
		'textTransform',
		'wordSpacing',
		'textIndent'
	],
	oninput = 'oninput',
	onpropertychange = 'onpropertychange',
	test = $(copy)[0];

	// For testing support in old FireFox
	test.setAttribute(oninput, "return");

	if ($.isFunction(test[oninput]) || onpropertychange in test) {

		// test that line-height can be accurately copied to avoid
		// incorrect value reporting in old IE and old Opera
		$(test).css(lineHeight, '99px');
		if ($(test).css(lineHeight) === '99px') {
			copyStyle.push(lineHeight);
		}

		$.fn.autosize = function (className) {
			return this.each(function () {
				var 
				ta = this,
				$ta = $(ta),
				mirror,
				minHeight = $ta.height(),
				maxHeight = parseInt($ta.css('maxHeight'), 10),
				active,
				i = copyStyle.length,
				resize,
				boxOffset = 0,
				value = ta.value;

				if ($ta.css('box-sizing') === borderBox || $ta.css('-moz-box-sizing') === borderBox || $ta.css('-webkit-box-sizing') === borderBox) {
					boxOffset = $ta.outerHeight() - $ta.height();
				}

				if ($ta.data('mirror') || $ta.data('ismirror')) {
					// if autosize has already been applied, exit.
					// if autosize is being applied to a mirror element, exit.
					return;
				} else {
					mirror = $(copy).data('ismirror', true).addClass('autosizejs')[0];

					resize = $ta.css('resize') === 'none' ? 'none' : 'none';

					$ta.data('mirror', $(mirror)).css({
						overflow: hidden,
						overflowY: hidden,
						wordWrap: 'break-word',
						resize: resize
					});
				}

				// Opera returns '-1px' when max-height is set to 'none'.
				maxHeight = maxHeight && maxHeight > 0 ? maxHeight : 9e4;

				// Using mainly bare JS in this function because it is going
				// to fire very often while typing, and needs to very efficient.
				function adjust() {
					var height, overflow;
					// the active flag keeps IE from tripping all over itself.  Otherwise
					// actions in the adjust function will cause IE to call adjust again.
					if (!active) {
						active = true;
						mirror.value = ta.value;
						mirror.style.overflowY = ta.style.overflowY;

						// Update the width in case the original textarea width has changed
						mirror.style.width = $ta.css('width');

						// Needed for IE to reliably return the correct scrollHeight
						mirror.scrollTop = 0;

						// Set a very high value for scrollTop to be sure the
						// mirror is scrolled all the way to the bottom.
						mirror.scrollTop = 9e4;

						height = mirror.scrollTop;
						overflow = hidden;
						if (height > maxHeight) {
							height = maxHeight;
							overflow = 'scroll';
						} else if (height < minHeight) {
							height = minHeight;
						}
						ta.style.overflowY = overflow;

						ta.style.height = height + boxOffset + 'px';

						// This small timeout gives IE a chance to draw it's scrollbar
						// before adjust can be run again (prevents an infinite loop).
						setTimeout(function () {
							active = false;
						}, 1);
					}
				}

				// mirror is a duplicate textarea located off-screen that
				// is automatically updated to contain the same text as the
				// original textarea.  mirror always has a height of 0.
				// This gives a cross-browser supported way getting the actual
				// height of the text, through the scrollTop property.
				while (i--) {
					mirror.style[copyStyle[i]] = $ta.css(copyStyle[i]);
				}

				$('body').append(mirror);

				if (onpropertychange in ta) {
					if (oninput in ta) {
						// Detects IE9.  IE9 does not fire onpropertychange or oninput for deletions,
						// so binding to onkeyup to catch most of those occassions.  There is no way that I
						// know of to detect something like 'cut' in IE9.
						ta[oninput] = ta.onkeyup = adjust;
					} else {
						// IE7 / IE8
						ta[onpropertychange] = adjust;
					}
				} else {
					// Modern Browsers
					ta[oninput] = adjust;
				}

				$(window).resize(adjust);

				// Allow for manual triggering if needed.
				$ta.bind('autosize', adjust);

				// The textarea overflow is now hidden.  But Chrome doesn't reflow the text after the scrollbars are removed.
				// This is a hack to get Chrome to reflow it's text.
				ta.value = '';
				ta.value = value;

				// Call adjust in case the textarea already contains text.
				adjust();
			});
		};
	} else {
		// Makes no changes for older browsers (FireFox3- and Safari4-)
		$.fn.autosize = function () {
			return this;
		};
	}

} (jQuery));


BT.Form.Switch = function (p_$ParentFrm) {

	$.each(p_$ParentFrm.find('.bt-switch'), function (idx, span) {
		initializeSwitch($(span));
	});

	p_$ParentFrm.off('click.activatetile.form', '.js-tile-activate').on('click.activatetile.form', '.js-tile-activate', function () {
		//when a tile is activated, create a hidden input if one does not already exist.  Then, set that input's value to "true"
		var $_thisTile = $(this).closest('.bt-switch.action-link');
		if($_thisTile.length==0) { return; }
		if ($_thisTile.find('input').length == 0) { $_thisTile.append('<input type="hidden" name="' + $_thisTile.attr('data-btid') + '" value="false"/>'); }
		$_thisTile.find('input').val('true').trigger('change.BigTime.form');
	});

	p_$ParentFrm.off('click.deactivatetile.form', '.js-tile-deactivate').on('click.deactivatetile.form', '.js-tile-deactivate', function () {
		//when a tile is de-activated, create a hidden input if one does not already exist.  Then, set that input's value to "false"
		var $_thisTile = $(this).closest('.bt-switch.action-link');
		if($_thisTile.length==0) { return; }
		if ($_thisTile.find('input').length == 0) { $_thisTile.append('<input type="hidden" name="' + $_thisTile.attr('data-btid') + '" value="false"/>'); }
		$_thisTile.find('input').val('false').trigger('change.BigTime.form');
	});

	function initializeSwitch(p_$el) {
		p_$el.addClass("btn-group action-link")
		p_$el.html('<span class="btn btn-mini js-tile-deactivate">off</span><span class="btn btn-mini js-tile-activate">on</span>');
		if (BT.Util.parseBool(p_$el.attr('data-value'))) {
			p_$el.find('.js-tile-activate').addClass('active');
		} else {
			p_$el.find('.js-tile-deactivate').addClass('active');
		}
	}

}


BT.Form.ajaxSave = function (options) {

	options = $.extend({ form: [], method: '', status: [] }, options);
	if (options.form.length == 0) { return; }
	if (options.status.length > 0) { options.status.html('Saving...').addClass('disabled'); }
	formData = options.form.serializeObject();
	$.ajax({
		url: options.form.attr('action'),
		type: 'post',
		data: formData,
		success: function (result) {
			try { BT.Util.hideErrors(options.form); } catch (err) { }
			switch (options.method.toLowerCase()) {
				case 'refresh':
					document.location.reload();
					break;
				case 'follow':
					if (result != '') { document.location.replace(result); }
					break;
				default:
					options.form.trigger('bt.ajax.saved', result);
					break;
			}
			if (options.status.length > 0) {
				options.status.html('Save').removeClass('disabled');
				myTT = options.status.tooltip({
					title: 'The changes you made were saved successfully.',
					delay: { show: 500, hide: 2000 },
					animation: true
				});
				myTT.tooltip('show');
			}
		},
		error: function (response) {
			try { BT.Util.showErrors(response, options.form); } catch (err) { }
			if (options.status.length > 0) {
				options.status.html('Save').removeClass('disabled');
			}
		}
	});

}


BT.Form.confirmAndDelete = function (options) {

	options = $.extend({ url: '', item: 'Item', method: '', status: [] }, options);
	options.status.attr('data-confirm', 'Click YES below if you are you sure you want to delete this ' + options.item + ' (any information associated with it will be permanantly removed from the system).');

	//Instead of popping up a "delete confirm" dialog, we are listening for doublecheck and then
	//firing doubleCheck() for this element.  When the user clicks YES in the doublecheck popover, 
	//the 'doublecheck' event will be fired and the code inside the block below will be executed.
	options.status.off('doublecheck').on('doublecheck', function() {
		$.ajax({
			url: options.url,
			type: 'POST',
			success: function (result) {
				btModal.close();
				switch (options.method.toLowerCase()) {
					case 'refresh':
						document.location.reload();
						break;
					case 'follow':
						if (result != '') { document.location.replace(result); }
						break;
					case 'md-close':
						try { options.status.closest('.md-form').parent().trigger('md-reloadAndClose'); } catch (err) { }
						break;
				}
			},
			error: function (errResult) {
				btModal.showErrors(errResult);
			}
		});

	});

	//Finally, manually fire doubleCheck for the delete button/link passed to this function.
	BT.Form.doubleCheck(options.status);

}

BT.Form.doubleCheck = function (p_$el) {

	var sConfirmationText = p_$el.attr('data-confirm');
	if ($('.popover').hasClass('in') == true) { //check if another popover is open
		return false;
	} else {
		var myPopover = p_$el.popover({
			title: 'Are you sure?',
			placement: 'bottom', //must be on bottom or popover gets lost under the main nav
			html: true,
			trigger: 'manual',
			content: sConfirmationText.safeValue() +
				'<div class="btn-toolbar"><a class="js-cancelPopover cancel_btn_sm">No</a>' +
				'<a class="btn btn-mini btn-primary js-confirmPopover">Yes</a></div>'
		});

		p_$el.popover('show');
		var myPop = p_$el.data('popover').$tip;
		//We don't want popover to be cut off
		if (myPop.offset().left < 0) { myPop.css('left', '0px'); } //left-side correction
		if (myPop.parents().hasClass('pull-right') == true) { //right-side correction
			myPop.css({ 'left': 'auto', 'right': '0px' });
			myPop.find('.arrow').css({ 'left': '185px' });
		}

		//event listener for OK/CANCEL (ONLY listening with the popover)	
		myPop.off('click', '.js-cancelPopover').on('click', '.js-cancelPopover', function () {
			p_$el.popover('destroy');
			$(document).off('click.doublecheck.off');
		});
		myPop.off('click', '.js-confirmPopover').on('click', '.js-confirmPopover', function () {
			p_$el.popover('destroy');
			$(document).off('click.doublecheck.off');
			p_$el.trigger('doublecheck');
		});
		//If the user clicks outside of the popover, then close it...we're done.
		$(document).off('click.doublecheck.off').on('click.doublecheck.off', function (e) {
			if (e.target != p_$el[0] && $(e.target).closest('.popover-inner').length == 0) {
				$(document).off('click.doublecheck.off');
				try { p_$el.popover('destroy'); } catch (err) { }
			}
		});

	}
}
