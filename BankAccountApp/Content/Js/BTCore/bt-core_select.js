/// <summary>
/// Creates a bound btSelect box based on the options passed to this function.  Note that ComboType and Options are the two parameters for this function, but options is an object with multiple properties (see below)
/// </summary>
/// <param name="comboType" mayBeNull="false">Inline, Ajax, Lazy or Bound</param>
/// <param name="options" parameterType="ComboOptions" mayBeNull="false">A list of the options that can be used with this combo box.  See Remarks.</param>
/// <remarks>
///   Id					the id of the combo box, and the id that will be assigned to the HiddenField			
///   hiddenName		the name that will be assigned to this combo's hidden field (if blank, Id will be used instead)
///   renderTo			domElement
///   initialValue	{id: '', name: '' }
///   emptyText
///   maxWidth
///   maxHeight
///   container
///   ajaxUrl
/// </remarks>

if(typeof BT === 'undefined') { BT = {}; }
BT.Select = BT.Select ? BT.Select : {};
BT.Select.localDataStore = BT.Select.localDataStore ? BT.Select.localDataStore : {};

//--------------------------------------------------------------------------------
// jquery function called to GENERATE a btSelect box from any div.bt-select
//--------------------------------------------------------------------------------
(function ($) {
	$.fn.btSelect = function (option) {
		return this.each(function () {
			if ($(this).hasClass('bt_select_box')==false) { BT.Select.Create($(this)); }	
		});
	}
})(jQuery);                                        //this ends the JQuery form extensions

//--------------------------------------------------------------------------------
// Called from jquery initialization routine(s) in order to convert any div with a 
// bt-select class designation into a bt-combo;
//--------------------------------------------------------------------------------
BT.Select.convertSelects = function (p_$form) {
	/// <summary>
	/// Pass a container control to this function and all of the bt-select objects are converted from SELECT boxes to btSelect objects. 
	/// The conversion process is based on the parameters attached to the SELECT object:
	/// data-combo-type  ajax, lazy, bound (or blank)
	/// data-combo-url   the url from which content for lazy/ajax/bound combo boxes is pulled
	/// note that the select boxes need to have a bt-select class in order to be converted
	/// </summary>
	p_$form.find('.bt-select').each(function () {
		if ($(this).hasClass('bt_select_box')==false) { BT.Select.Create($(this)); }
	});	//end of Selects.each()
}

//--------------------------------------------------------------------------------
//BTSelectBox Creation functions (1 for each type of combo box we support)
//--------------------------------------------------------------------------------
BT.Select.Create = function(p_$wrapper) {
//get the combo options from the initial set of dom elements used as placeholders for a btSelect:
// <div class=bt-select data-combo-type='ajax' data-combo-url='...'><select id=ComboId name=HiddenIdFieldNm><option id=InitialValue>InitialValueText</option></select></div>
// we create a set of initial objects like that (instead of just adding properties to a div) so that this process degrades well (the user is left looking at a select box, not an empty div)

	var $_select = p_$wrapper.find('select'),
		comboType = p_$wrapper.attr('data-combo-type'),
		comboOptions = {
			'id': false,
			'container': 'auto',
			'maxWidth': 450,
			'renderTo': p_$wrapper,
			'placeholder': $_select.attr('placeholder'),
			'dependentField': '',
			'initialValue': {
				'id': '',
				'name': ''
			},
			editorLink: ''
		}

	if (p_$wrapper.closest('.bt-select-parent').length>0) {
		comboOptions.maxWidth='100%';
	}
	if(comboOptions.placeholder=='') { comboOptions.placeholder = p_$wrapper.attr('placeholder');}
	// show the "editor-link", but only if the user can edit firm system settings.
	if(BT && BT.Globals) {
		if(p_$wrapper.attr('data-editor-link')!='' && BT.Globals.CanEditSettings) {
			comboOptions.editorLink = p_$wrapper.attr('data-editor-link'); 
		}
	} else {
		if(p_$wrapper.attr('data-editor-link')!='') { comboOptions.editorLink = p_$wrapper.attr('data-editor-link'); }
	}

	//set the INITIAL VALUE (if one was specified -- eg:  if the html currently has OPTIONS in the select list with one that is SELECTED)
	var mySelectedValue = undefined;
	if($_select.attr('data-value') != undefined) { mySelectedValue = $_select.find('option[value="' + $_select.attr('data-value') + '"]'); }
	if(mySelectedValue==undefined) { mySelectedValue = $_select.find('option:selected'); }
	if(mySelectedValue.length>0) {
		comboOptions.initialValue.id=mySelectedValue.attr('value');
		comboOptions.initialValue.name=mySelectedValue.text();
	}

	//remove "undefined" value for comboType
	comboType = comboType ? comboType : '';
	//select Id/Name based on the SELECT object's properties
	if ($_select[0].id) { comboOptions.Id = $_select[0].id; }
	if ($_select[0].name) { comboOptions.hiddenName = $_select[0].name; }

	if (comboOptions.Id && comboOptions.Id !== false) {
		p_$wrapper[0].id = comboOptions.Id + '_wrapper';
	}
	//Finally, create the correct TYPE of combo box.
	switch (comboType.toLowerCase()) {
		case 'ajax':
			comboOptions.ajaxUrl = p_$wrapper.attr('data-combo-url');
			comboOptions.dependentField = p_$wrapper.attr('data-dependent');
			if (comboOptions.ajaxUrl == undefined) { console.warn('unable to load data for pick list (invalid data-combo-url parameter)'); }
			BT.Select.createAjax(comboOptions);
			break;

		case 'lazy':
			comboOptions.ajaxUrl = p_$wrapper.attr('data-combo-url');
			comboOptions.dependentField = p_$wrapper.attr('data-dependent');
			if (comboOptions.ajaxUrl == undefined) { console.warn('unable to load data for pick list (invalid data-combo-url parameter)'); }
			BT.Select.createLazy(comboOptions);
			break;

		default:
			BT.Select.createSimple(comboOptions);
			break;

	}

}	//end of BT.Select.Create

BT.Select.createSimple = function (options) {
	//generate a data object from the select box's Option elements and load that object into the combo
	var MyData = {'data':[]}, 
		mySelect = options.renderTo.find('select');
	if (mySelect.length>0) {
		//Generate a data object from the select element's Options list
		MyData = BT.Select.getDataFromOptionList(mySelect);				
		//Get the initial value from the select element's value property
		if ((options.initialValue.id=='' || options.initialValue.id=='0') && mySelect.attr('data-value')) {
			options.initialValue.id=mySelect.attr('data-value');
		}
	}
	//Create a standard comboBase object
	var myNewCombo = BT.Select.ComboBase(options);
	myNewCombo.init();
	if(MyData.data.length>0) {myNewCombo.setData(MyData);}
	return myNewCombo;
}


BT.Select.createLocal = function (options) {
	//generate a data object from the select box's Option elements and load that object into the combo
	var MyData = options.comboData;
	//Create a standard comboBase object
	var myNewCombo = BT.Select.ComboBase(options);
	myNewCombo.init();
	if(MyData.data.length>0) {myNewCombo.setData(MyData);}
	return myNewCombo;
}

BT.Select.createAjax = function (options) {
	/// <summary>Called by create to generate an AJAX-type of combo box</summary>
	var myNewCombo = BT.Select.ComboBase(options);
	myNewCombo.init();
	window.setTimeout(myNewCombo.getData, 1000);
	return myNewCombo;
}

BT.Select.createLazy = function (options) {
	/// <summary>Called by create to generate an AJAX-type of combo box</summary>
	var myNewCombo = BT.Select.ComboBase(options);
	myNewCombo.init();
	return myNewCombo;
}

//--------------------------------------------------------------------------------
//The BASE combo class (used to manage ui and data for BTSelects of all types)
//--------------------------------------------------------------------------------
BT.Select.ComboBase = function (options) {
	/// <summary>This is the class definition for a generic BTSelect box.  Created automatically by the other functions.</summary>
	var _$thisCombo = {},
		defaultOptions = {
			Id: '',
			hiddenName: '',
			renderTo: undefined,
			initialValue: { id: '', name: '' },
			emptyText: '',
			maxWidth: 'auto',
			maxHeight: 'auto',
			minVisible: 5,
			container: $('body'),
			ajaxUrl: '',
			placeholder: '',
			required: false,
			dependentField: '',
			editorLink: ''
		},
		_myOptions = $.extend(defaultOptions, options),
		_$myWrapper = _myOptions.renderTo,
		_$mySelectedText = undefined, _$mySelectedValue = undefined, _$myUList = undefined,
		_myData = [],
		_ulPadding = _$myWrapper.outerHeight() - 1,
		_IsUserInputDirty = false,
		_IsDataLoaded = false,
		_myUUid = "btselect_" + Math.round(1000000 * Math.random()),
		_hMatchEntry=null,
		_dependentFilterVal=null;

	_$thisCombo.options = _myOptions;
	_$thisCombo.html = {
		'value': function() { return _$mySelectedValue; },
		'text': function() { return _$mySelectedText; },
		'wrapper': function() { return _$myWrapper; }
	}

	if (_myOptions.Id && !_myOptions.hiddenName) { _myOptions.hiddenName = _myOptions.Id; }
	//determine what html element the combo should automatically snap within.
	if (_myOptions.container === 'auto') {
		if (_$myWrapper.parents('.bt-select-parent, .md-form, body').length > 0) {
			_myOptions.container = $(_$myWrapper.parents('.bt-select-parent, .md-form, body')[0]);
		} else {
			_myOptions.container = $('body');
		}
	}
	if(_myOptions.container.is('body')) { _myOptions.container = $(document); }

	//Set default 'maxHeight'
	if(_myOptions.maxHeight=='auto') { _myOptions.maxHeight=300; }

	function init_Listeners() {
		///<summary>all of the dom event WIRES are created within this function.  It's a single location where any interaction with the dom is documented and controlled.</summary>

		//User clicks the down arrow on a select box
		_$myWrapper.off('click.btSelect').on('click.btSelect', '.btn_select', function (e) {
			if(_$myWrapper.hasClass('disabled')) { return; }
			tryGetLazyData(function() {
				openSelect(false);
			});
		});
		//User clicks the select box text field and we SELECT the whole text
		_$mySelectedText.off('click.btSelect').on('click.btSelect', function(e) {
			if(_$myWrapper.hasClass('disabled')) { return; }
			_$mySelectedText[0].select();
		});
		//types into the select box's input 
		_$mySelectedText.off('keydown.btSelect').on('keydown.btSelect', function(e) {
			if(_$myWrapper.hasClass('disabled')) { return; }
			if (e.keyCode === 9) {
				verifySelected();
				closeAndCancel();
			} else {
				//note that we wrap the key capture inside of a GETDATA call (in case the select isn't initialized yet)
				tryGetLazyData(function() { InputBoxKeyCapture(e); });
			}
		});
		//User clicks a select list item to actually SELECT it
		_$myUList.off('click.btSelect').on('click.btSelect', 'li', function(e) {
			if(_$myWrapper.hasClass('disabled') || $(this).hasClass('group') || $(this).hasClass('editor-link')) { return; }
			setSelected($(this).attr('data-btid'));
			closeAndCancel();
		});

		//Other clicks are ignored
		_$myWrapper.click(function (e) { 
			if($(e.target).closest('.editor-link').length>0) { return; }
			if($(e.target).closest('.bt-select-toolbar').length==0) { e.stopPropagation(); }
		});
		//clicking elsewhere in the dom with CLOSE the open select box.
		$(document).off('click.' + _myUUid).on('click.' + _myUUid, function () {
			if (_$myWrapper.closest('body').length==0) { 
				$(document).off('click.' + _myUUid);
				return;
			}
			verifySelected();
			closeAndCancel();
		});

		//If another combo box is opened on screen, it sends out the close.btSelect event to other opened boxes 
		//on the page.  We listen for that event and close in response
		_$myWrapper.off('close.btSelect').on('close.btSelect', function() {
			closeAndCancel();
		});

		//If this is a dependent combo, then listen for the dependent field to change
		if(_myOptions.dependentField != '') {
			_$myWrapper.off('dependentChange').on('dependentChange.btSelect.' + _myOptions.dependentField, function(e,val) {
				clearComboData();
				_dependentFilterVal=val;
			});
		}

	}

	_$thisCombo.init = init;
	function init() {
	///<summary>Called by the creation functions to generate a new select box.  This function generates the initial html and sets up some class-level variables.
	///Note that you would need to call the getData() function separately if you need to load the combo with information.
	///</summary>

		//Create an li element with the initial value id/name (if an initial value exists)
		var initialItem = '';
		if (_myOptions.initialValue.id!='') {
			'<li data-btid="' + _myOptions.initialValue.id + '" class="select">' + _myOptions.initialValue.name + '</li>';
		}
		//clear out what used to be in the "wrapper" element and replace it with the btSelect build block:
		//   <div class=input-wrap><input type=text /></div><ul/><a class=btn /><input type=hidden />
		_$myWrapper.addClass('bt_select_box');
		var sBaseContent = 
			'<div class="input_wrap"><input class="text_input" placeholder="' + BT.Select.cleanHtml(_myOptions.placeholder) + '" type="text" /></div><ul>' + initialItem + 
			'</ul><a class="btn_select" href="javascript:;" tabindex="-1"></a><input class="js-comboValue" value=""';
			if(_myOptions.Id && _myOptions.Id !='') { 
				sBaseContent += ' id="' + _myOptions.Id + '"';
			}
			sBaseContent += ' name="' + _myOptions.hiddenName + '" type="hidden" tabindex="-1" />';
		_$myWrapper.html(sBaseContent);

		//set the _$mySelected convenience variables, and then set their values IF we have specified a default value for this combo box 
		_$mySelectedText = _$myWrapper.find('input.text_input');
		_$mySelectedValue = _$myWrapper.find('input.js-comboValue');
		_$myUList = _$myWrapper.find('ul');
		if (_myOptions.initialValue) {
			_$mySelectedText.val(_myOptions.initialValue.name);
			_$mySelectedValue.val(_myOptions.initialValue.id);
		}

		//apply the "maxWidth" property (eg - the UL can stretch beyond the boundaries of the SELECT BOX
		if (_myOptions.maxWidth!='auto') {
			_$myUList.addClass('nowrap');
			_$myUList.css('max-width', _myOptions.maxWidth);
		}
		//Add listeners once the object is setup
		init_Listeners();
	}

	_$thisCombo.setData = setDataFromJSon
	function setDataFromJSon(p_JSonData) {
		if (_myOptions.ajaxUrl == '') {_myOptions.ajaxUrl==_myUUid}
		_myData = processRawDataFeed(p_JSonData);
		createSelectUL(_myData);
		_$myWrapper.trigger('dataLoaded.btSelect');
	}

	_$thisCombo.clearComboData = function() { clearComboData(); }
	function clearComboData() {
		_$mySelectedText.val('');
		_$mySelectedValue.val('');
		_$myUList.empty();

		_myData = [],
		_IsUserInputDirty = false,
		_IsDataLoaded = false,
		_hMatchEntry=null;
	}

	function cachedData(p_Data) {
		///<summary>Gets/Sets CACHED version of the ajax data used to populate this select box.  
		///We cache data locally so that we dont need to make the same ajax call over and over in order to retrieve the same data.  
		///This isn't the same thing as a browser cache (since the cache only lasts as long as the next page refresh), but its 
		///helpful in screens where we ajax in multiple copies of the same select box (eg - time entry screens).
		///NOTE that we use the ajaxUrl option property to identify the data, so if you want to cache non-ajax data -- you should 
		//give the combo a unique "faux-url" so the system has a way to reference it uniquely.
		///<summary>
		var sDataPropertyName = getAjaxUrl().replace(/[/]/g, '_');
		if (sDataPropertyName=='') {return undefined;}
		if(BT.Select.localDataStore.hasOwnProperty(sDataPropertyName) && p_Data==undefined) {
			return BT.Select.localDataStore[sDataPropertyName];
		} else if (p_Data != undefined ) {
			BT.Select.localDataStore[sDataPropertyName] = p_Data;
			return p_Data;
		} else {
			return undefined;
		}
	}

	_$thisCombo.getData = getData;
	function getData() {
		/// <summary>This function is largely an algorythm:  Pulls data (ajax) from the server, converts that raw feed into an array of SelectListData objects, and then converts that data into an html <ul> element chain</summary>

		//if the data has already been setup once, don't try to pull it again.  Just use the local copy
		_myData = cachedData();
		if (_myData!=undefined) {
			_IsDataLoaded = true;
			createSelectUL(_myData);
			//note that we trigger this dataLoaded event so that the "tryGetLazyData" function works.
			_$myWrapper.trigger('dataLoaded.btSelect');
		} else {
			//Otherwise, pull data from the server for this combo box
			BT.Select.getAjaxData({
				url: getAjaxUrl(),
				dataType: 'json',
				success: function (ajaxResult) {
					//once the data comes back, use it to (a) create a valid store for this combo and (b) create the UL list for the select box.
					_myData = processRawDataFeed(ajaxResult);
					createSelectUL(_myData);
					//note that we trigger this dataLoaded event so that the "tryGetLazyData" function works.
					_$myWrapper.trigger('dataLoaded.btSelect');
				},
				error: function(err) {
					_$mySelectedText.css('cursor','');
					_$myWrapper.find('.btn_select').css('cursor','');
					console.warn('Failed to load select box data');
				}
			});
		}
	}
	
	function getAjaxUrl() {
		var url = _myOptions.ajaxUrl
		//add "&filterid=XX" if this is a filtered combo box.
		if (_dependentFilterVal!=null) {url +=  (url.indexOf('?')>0 ? '&' : '?') + 'filterid=' + _dependentFilterVal; }
		return url;
	}
	function tryGetLazyData(onSuccess) {
	///<summary>Most of the time, we load combo box data when the control is initialized.  For LAZY combo boxes, however, we don't load select list data until it is required.
	///To accomodate that feature, we SKIP getData() when a combo is loaded and we add this try function to the pick list interaction events (clicking the down arrow, beginning a text match)
	///The function calls GETDATE and THEN executes a success function.
	///call example:  tryGetLazyData(function() { //this is executed once data has been successfully loaded; });
	///</summary>

		if(_IsDataLoaded==false) {
			_$mySelectedText.css('cursor','wait');
			_$myWrapper.find('.btn_select').css('cursor','wait');
			_$myWrapper.off('dataLoaded.btSelect').on('dataLoaded.btSelect', function() {
				onSuccess();
				_$mySelectedText.css('cursor','');
				_$myWrapper.find('.btn_select').css('cursor','');
			});
			getData();
		} else {
			onSuccess();
		}

	}

	function openSelect(noTextSelect) {
	///<summary>This is the function that is called to open/close the select list ITEMS.  The css class 'open' is added to the wrapper, so we know (elsewhere in the system) if a combo list is open or closed. css can also be attached to .bt-combo.open element(s) to effect the way an open combo list is displayed.</summary>

		//TOGGLE OFF
		if (_$myWrapper.hasClass('open')) {
			closeAndCancel();
			return;
		}

		//TOGGLE ON
		_$myUList.css('height', 'auto').css('max-height','');
		var offset = { top: 0 },
			comboHeight = _$myWrapper.outerHeight(),
			minHeight = _myOptions.minVisible * _ulPadding,
			ListHeight = _$myUList.height();

		//If _ulPadding hasn't been set properly yet, then set it here
		_ulPadding = _$myWrapper.outerHeight() - 1;

		//Compute the HEIGHT and the POSITION of the select list
		if (_myOptions.maxHeight !== 'auto' && (ListHeight > _myOptions.maxHeight)) { ListHeight = _myOptions.maxHeight;}
		if(_myOptions.container.is(document)) {
			offset.top = _$myWrapper.offset().top; 
		} else {
			offset.top = _$myWrapper.offset().top - _myOptions.container.offset().top;
		}
		//set the object's height to CONTAINER.HEIGHT - SELECT.TOP - (ROWHEIGHT*2) 
		//the last item gives us a little padding at the bottom of the container.
		var thisHeight = _myOptions.container.innerHeight() - offset.top - (2 * _$myWrapper.height());
		if (thisHeight < minHeight) { thisHeight = minHeight; } else if (thisHeight > ListHeight) { thisHeight = ListHeight; }
		if (thisHeight > _myOptions.maxHeight) { thisHeight = _myOptions.maxHeight; }
		_$myUList.css('max-height', thisHeight);

		//Note:  if the select needs to open UP instead of DOWN (because it's at the bottom of it's container), 
		//make that change here.
		if (offset.top + thisHeight + _ulPadding > _myOptions.container.height()) {
			_$myUList.css({ top: 'auto', 'z-index': 500, bottom: _ulPadding + 'px', 'max-height': _myOptions.maxHeight });
			_$myWrapper.addClass('up');
		} else {
			_$myUList.css({ marginTop: _ulPadding + 'px', top: '0px', 'z-index': 500, bottom: 'auto' });
			_$myWrapper.removeClass('up');
		}
		//close any OTHER open combo boxes
		$('.bt_select_box.open').trigger('close.btSelect');
		//open THIS combo box;
		_$myWrapper.addClass('open');
		scrollSelectedIntoView();
		//Highlight the input box text (unless we say not to)
		if (!noTextSelect) { selectText(); }
	
	}

	function filterMatches(p_sSeek) {
	///<summary>Called internally in order to hide any LI elements/parents without a matching element
	///Note that p_sSeek is typically the INPUT TEXT box value
	///</summary>

		if (!_$myWrapper.hasClass('open')) { openSelect(true); } //true arg prevents textselection
		_IsUserInputDirty = true;
		 
		//Seek should be case-insensitive and should TRIM out the user's entry
		p_sSeek=$.trim(p_sSeek).toLowerCase();

		var AllItems = _$myUList.find('li');
		_$myUList.find('li.selected').removeClass('selected');
		AllItems.removeClass('filter-matched');

		//If the user has CLEARED out the seek field, then show ALL items and exit
		if($.trim(p_sSeek)=='') {
			AllItems.removeClass('filtered');
			_hMatchEntry=null;
			return;
		}

		//loop through every list item to see if there is a match and mark the unmatched items with a class of 'filtered'
		$.each(AllItems, function(idx, p_liElement) {
			var thisLi = $(p_liElement), isMatchingItem = false;
			if(thisLi.hasClass('group')) {
				isMatchingItem = thisLi.find('span:first').text().toLowerCase().indexOf(p_sSeek)>=0 ? true: false;
			} else {
				isMatchingItem = thisLi.text().toLowerCase().indexOf(p_sSeek)>=0 ? true: false;
			}
			if (isMatchingItem)  { thisLi.addClass('filter-matched'); }
		});

		//show any items that are contained WITHIN a matched group
		_$myUList.find('li.group.filter-matched li').addClass('filter-matched');
		//show the PARENTS of any sub-items that are matched group
		_$myUList.find('li.filter-matched').parents('li.group').addClass('filter-matched');
		//show items that WERE filtered and are not visible
		_$myUList.find('li.filter-matched').removeClass('filtered');
		//Add the "hide" function to everything else
		(_$myUList.find('li').not('.filter-matched')).addClass('filtered');
		//Make the first NON-GROUP li "active"
		(_$myUList.find('li').not('.filtered, .group')).first().addClass('selected');
		//finally, remove the 'filter-matched' class... it was just used in transition
		_$myUList.find('li.filter-matched').removeClass('filter-matched');
		_hMatchEntry=null;

	}

	_$thisCombo.closeList = closeAndCancel;
	function closeAndCancel() {
	///<summary>Used to close the select list (toggle "off" the list)</summary>
		_$myUList.find('li').removeClass('filtered');
		//$_selected.addClass('selected');
		_$myWrapper.removeClass('open').removeClass('up');
		_$myUList.css({'margin-top': '0px', 'height': '0px', 'z-index':5});
		_IsUserInputDirty=false;
	}

	_$thisCombo.setValue = setValue;
	function setValue (id, txt, SupressEvents) {
	///<summary>This function provides a public way to set the value of the combo box.  Note that SuppressEvents=true will prevent the onChange function from being fired during this process.</summary>
		if(_IsDataLoaded==false) {
			//If this is a lazy-loaded combo, then the we dont want setting the value to fire the getData function.
			_$mySelectedValue.val(id);
			_$mySelectedText.val(txt);
			if(SupressEvents==undefined || SupressEvents==false) { 
				//_$mySelectedValue.trigger('change'); 
				$('.bt_select_box.dependent').trigger('dependentChange.btSelect.' + _$mySelectedValue.attr('name').toLowerCase(), _$mySelectedValue.val());
			}
		} else {
			setSelected(id, SupressEvents);
		}
	}

	function setSelected(p_SelectedId, SupressEvents) {
	///<summary>Sets the combo box "value" to the id/text from the currently selected LI in the select list.
	///We call this function from just about anywhere that the user "selects" an item (typing a match, clicking an item, etc).
	///</summary>
	///<param name="p_SelectedId">The ID portion of the id/name selection (eg. the CatSid of a labor code).  We use this to zero in on a specific element in the select list and "activate" it.</param>

		//If no SELECTED ID is passed, then assume the selected value is the combo's INITIAL value
		if (p_SelectedId === undefined) { p_SelectedId = _myOptions.initialValue.id; }
		//get an "item selector" for this value, but note that any "." in the itemId will have been converted to a "_" character when we created the li elements
		var sItemSelector = '#' + _myUUid + '_' + p_SelectedId;
		sItemSelector = sItemSelector.replace(/[.]/g,'_');
		var $selectedItem = _$myUList.find(sItemSelector);

		//Assuming we FOUND a selected item, use it to fill in the combo box data
		if ($selectedItem.length > 0) {
			_$mySelectedText.val($selectedItem.data('display-name'));
			//clear both FILTERS and the prior SELECTION from the list items
			_$myUList.find('li').removeClass('filtered selected');
			//Mark this list item as "selected"
			$selectedItem.addClass('selected');
			//Since we've selected an item, user "text" field input is no longer dirty
			_IsUserInputDirty = false;
			//Set the value of the hidden input that contains the select box's id value (and trigger CHANGE event, since setting the value in code doesn't fire that event and other classes/form controls may be relying on that event to track a change)
			if (_$mySelectedValue.val() != p_SelectedId) {
				_$mySelectedValue.val(p_SelectedId);
				if(SupressEvents==undefined || SupressEvents==false) { 
					_$mySelectedValue.trigger('change'); 
					$('.bt_select_box.dependent').trigger('dependentChange.btSelect.' + _$mySelectedValue.attr('name').toLowerCase(), _$mySelectedValue.val());
				}
			}
		} else if (p_SelectedId === _myOptions.initialValue.id) {
			//if NO selected value is found, then use the combo box's initial value
			_$mySelectedText.val(_myOptions.initialValue.name);
			_$mySelectedValue.val(_myOptions.initialValue.id);
			_IsUserInputDirty=false;
		}
	}

	function verifySelected() {
	///<summary>When the user clicks ENTER or TAB, this function is called to verify that any partial entries are completed.
	///1. Partial matches are reversed out and the last good selection is entered into the select box.
	///2. an EMPTY field is assumed to mean we should CLEAR the selection.  Note that if an entry is REQUIRED, then an empty field is the same as a partial match.
	///</summary>

		if(_IsUserInputDirty) {
			var sEnteredVal = _$mySelectedText.val();
			if((sEnteredVal.length>0 | _myOptions.required) && _$mySelectedValue.val()) {
				setSelected(_$mySelectedValue.val(), true);
			} else {
				_$mySelectedValue.val('');
			//	_$mySelectedValue.trigger('change'); 
				$('.bt_select_box.dependent').trigger('dependentChange.btSelect.' + _$mySelectedValue.attr('name').toLowerCase(), _$mySelectedValue.val());
			}	
		}

	}

	function scrollSelectedIntoView() {
	///<summary>Scrolls the currently SELECTED li item into view if the select list is partially hidden inside the viewport</summary>
			var $_targetItem = _$myUList.find('.selected');
			if ($_targetItem.length>0) {
				var scrollTop = _$myUList.scrollTop(),
					selectedPos = $_targetItem.position().top,
					listHeight = _$myUList.height();

					//If the element (selected) is inside of a multi-level ul, then we need to climb up the dom tree to get TOTAL offset from the base UL
					if($_targetItem.parent()[0]!=_$myUList[0]) {
						$.each($_targetItem.parents(), function(idx, item) {
							if(item==_$myUList[0]) { return false; }
							selectedPos += $(item).position().top;
						});
					}

					if (selectedPos <= scrollTop || selectedPos > (listHeight - _$myWrapper.height())) {
						if (selectedPos > 0) {
							_$myUList.scrollTop(scrollTop + (selectedPos - listHeight + _$myWrapper.height()));
						} else {
							_$myUList.scrollTop(scrollTop + selectedPos);
						}
					}
			}
	}

	// Properties
	_$thisCombo.val = function (p_value) {
	///<summary>Get/Set the currently selected comboBox value from outside the control.</summary>
		if(p_value) {
			setSelected(p_value);
		}
		return _$mySelectedValue.val();
	}
	_$thisCombo.selectedText = function () {
		return _$mySelectedText.val();
	}

	_$thisCombo.disable = disable;
	function disable() {
		///<summary>DISABLE UI interaction for the combo box (user can't click/make changes).</summary>
		_$myWrapper.addClass('disabled');
	}

	_$thisCombo.enable = enable;
	function enable() {
		///<summary>UNDO the "DISABLE" property (user can then click/make changes).</summary>
		_$myWrapper.removeClass('disabled');
	}
	
	//--------------------------------------------------------------------------------------------------------------------
	//Deep functionality (the rest of these functions are supporting functions which are called from the methods above.)
	//--------------------------------------------------------------------------------------------------------------------

	function InputBoxKeyCapture(e) {
	///<summary>Called from the dom "wires" function to process a keypress event in the combo box's INPUT TEXT field.</summary>


		var $selected = _$myUList.find('li.selected');
		if(_$myWrapper.hasClass('disabled')) {return false;}

		var keyCode=e.keyCode;
		if (keyCode === 27) {																			//ESC
			if (_IsUserInputDirty) {
				setSelected(_$mySelectedValue.val());
			} else { clearList(); }

		} else if (keyCode === 13) {																	//ENTER

			//If the user hit enter with an EMPTY input box, EDITED by the user and NO selected item, 
			//then we can assume they want to clear out their entry.
			if(_$mySelectedText.val().length==0 && _IsUserInputDirty && ($selected==undefined || $selected.length==0)) {
				verifySelected();
			} else if(_IsUserInputDirty || ($selected!=undefined && $selected.length>0)) {
				_IsUserInputDirty=false;
				setSelected($selected.attr('data-btid'));
			}
			openSelect();

		} else if (_$myWrapper.hasClass('open') && (keyCode === 33 || keyCode === 34)) {	//PageUp or PageDown
			var scrollTop = _$myUList.scrollTop(),
				listHeight = _$myUList.innerHeight(),
				scrollChange = (keyCode === 33) ? -listHeight : listHeight;
			_$myUList.scrollTop(scrollTop + scrollChange);

		} else if (_$myWrapper.hasClass('open') && (keyCode === 36 || keyCode === 35)) {	//Home or End (yes 36 then 35)
			var newPosition = (keyCode === 36) ? 0 : _$myUList[0].scrollHeight;
			_$myUList.scrollTop(newPosition);

		} else if (keyCode === 40 || keyCode === 38) {											//DOWN/UP arrows
			try { e.preventDefault(); } catch(err) { console.warn('preventDefault failed'); }
			if (!_$myWrapper.hasClass('open') && keyCode === 40) { //DOWN
				//If the list isn't OPEN, and the user click DOWN... we assume they want to open the list
				_$myUList.find('.filtered').removeClass('filtered');
				openSelect();
			} else { // both the UP and DOWN key should also move up/down the list
				var MoveDirection = keyCode === 40 ? 1 : -1,
					selectableLIs = _$myUList.find('li').not('.group, .filtered, .val_default'),
					selIndex = selectableLIs.index($selected);
				if ((MoveDirection === 1 && selIndex < (selectableLIs.length - 1)) || (MoveDirection === -1 && selIndex > 0)) {
					$selected.removeClass('selected');
					selectableLIs.eq(selIndex + MoveDirection).addClass('selected');
					scrollSelectedIntoView();
				}
			}
		} else if (																							//all characters that trigger automatching:
		(48 <= keyCode && keyCode <= 90) ||															//a-z, top row 0-9
		(96 <= keyCode && keyCode <= 105) ||														//numpad 0-9
		(186 <= keyCode && keyCode <= 222) ||														//punctuation
		keyCode === 46 || keyCode === 8) {															//delete, backspace
			if (_hMatchEntry) {
				clearTimeout(_hMatchEntry);
			}
			_hMatchEntry = setTimeout(function() {filterMatches(_$mySelectedText.val())}, 200);
		}

	}

	function selectText() {
		if (_$mySelectedValue.val() == 0 || _$mySelectedValue.val() === '') {
			_$mySelectedText.val('').focus();
		}
		else {
			_$mySelectedText.select();
		}
	}

	function processRawDataFeed(p_ItemListJson) {

		//Initial prep work to read the data returned and see what element in the data array corresponds to each 
		//relevent piece of data (we are looking for the select list ID, name and GROUPINGS (up to 5 levels)
		//to really understand what's happening in this routine, you'll need to take a look at the raw data feed 
		//we get from the server.
		var finishedData = [];
		_IsDataLoaded = true;
		if (p_ItemListJson.hasOwnProperty('data')==false) {return finishedData;}
		p_ItemListJson = $.extend({'data':[],'displayValue':1,'id':0,'grouping':[]},p_ItemListJson)
		
		var keys = {
				id: p_ItemListJson.id,
				nm: p_ItemListJson.displayValue,
				group: [-1,-1,-1,-1,-1]
			},
			groupLen = p_ItemListJson.grouping.length,
			rows = p_ItemListJson.data,
			TotalRows = p_ItemListJson.data.length;
		//step through the GROUPINGS collection and get a column reference to use for the group 
		//(note that the combo will only support up to 5 group levels)		
		for(var iCnt=0; iCnt<groupLen && iCnt<5; iCnt++) {
			keys.group[iCnt]=p_ItemListJson.grouping[iCnt];
		} 

		//step through the data rows and add groups/subgroups
		for(var iCnt=0; iCnt<TotalRows; iCnt++) {
			var myCurrentGroup=finishedData;
				myCurrentItem=rows[iCnt],
				myGroupString='';
			//this row can have groups nested up to 5 levels deep... the EACH below will
			//descend through the existing finishedData object and return the lowest SUBITEMS list
			//into which the current row's ITEM should be placed.  If the group hierarchy doesnt 
			//exist yet, then the system adds it within the traverse.
			$.each(keys.group, function(i, GroupVal) {
				//return false (end the each) if the group value is -1 (no grouping column) or the item 
				//doesn't have grouping data this deep (eg - the row's array is too shallow)
				if(GroupVal==-1 || myCurrentItem.length<GroupVal-1){ return false; }
				//try to find that group in finishedData using the Group value we are currently looking at
				var sGroupNm = $.trim(myCurrentItem[GroupVal]);
				if (sGroupNm=='') {return false;}
				myGroupString += sGroupNm + ':';
				myCurrentGroup=FindGroupItemOrAdd(myCurrentGroup, sGroupNm).subitems;
			});
			//if the group iterator fails (eg - returns an non-existant group), then reset current to the main level.
			if(myCurrentGroup==undefined) {myCurrentGroup=finishedData;}
			//One we have the appropriate group added to the finishedData object, we can insert this item into the bottom of that group
			if(myGroupString==myCurrentItem[keys.nm]+':') { myGroupString=''; }
			myCurrentGroup.push({id: myCurrentItem[keys.id], nm: myCurrentItem[keys.nm], displayNm: myGroupString+myCurrentItem[keys.nm] });
		}

		//store this finished set of data in the local cache (so we dont have to go through this more than once per page refresh
		cachedData(finishedData);
		return finishedData;

		//This  is an internal(private) sub-function used to find/add a group to an array 
		function FindGroupItemOrAdd(ListToSearch, ValueToFind) {
			//First, find the value in the subitems element we are examining
			var returnedValue=undefined;
			$.each(ListToSearch, function(i, ItemValue) {
				if(ItemValue.nm==ValueToFind) {
					returnedValue=ItemValue;
					return false;
				}
			});
			//if the item coulnt be found, then add it 
			if(returnedValue==undefined) {
				returnedValue = {nm: ValueToFind, subitems: []};
				ListToSearch.push(returnedValue);
			} else if(returnedValue.subitems==undefined) {
				var thisItem = $.extend(true,{},returnedValue);
				returnedValue.subitems = [];
				returnedValue.subitems.push(thisItem);
			}
			//return the found/added element
			return returnedValue;
		}

	}

	function createSelectUL(p_myDataJson) {
	///<summary>Called internally in order to create the list of <li> items that make up a select list.
	///This function will generate that list, add it to the bt-select's <ul> element</summary>

		var finalHtml=[],
		hasDefaultValue = _myOptions.initialValue.id=='' ? false : true;
		
		$.each(p_myDataJson, function(i, subItem) {
			finalHtml.push(createSelectItemOrGroup(subItem));
		});

		//add the 'edit these values' item to the bottom of the select box as required.
		if (_myOptions.editorLink && _myOptions.editorLink !='') {
			finalHtml.push('<li class="editor-link"><a class="js-ajax-settings" data-target="' + BT.Globals.baseUrl + 'Settings/Page/Index?subView=Lookups#/' + _myOptions.editorLink + '"><span class="icon-bt-edit2 icon-left-align"></span>Edit these values...</a></li>')
		}

		_$myUList.html(finalHtml.join(''));

		function createSelectItemOrGroup(p_SubItem) {
			if (p_SubItem.hasOwnProperty('subitems')) {
				return '<li class="group"><span>'+BT.Select.cleanHtml(p_SubItem.nm)+'</span><ul>' +
					createSubItems_inner(p_SubItem.subitems) + 
					'</ul></li>'
			} else {
				return createItem_inner(p_SubItem);
			}
		}

		function createSubItems_inner(p_subItemsList) {
			var subItemHtml = [];
			$.each(p_subItemsList, function(i, p_subItemToCreate) {
				subItemHtml.push(createSelectItemOrGroup(p_subItemToCreate));
			});
			return subItemHtml.join('');
		}

		function createItem_inner(p_ItemToCreate) {
			if(_myOptions.initialValue.id==p_ItemToCreate.id && _myOptions.initialValue.name=='') {
				_myOptions.initialValue.name=BT.Select.cleanHtml(p_ItemToCreate.nm); 
				_$mySelectedText.val(_myOptions.initialValue.name);
			}
			//Note that we are replacing the jquery-specific character of "." with "_" to make selecting by Id easier.
			//every element will have an id of UNIQUEID_ItemID, but ItemId can't have a "." in the name of it will throw off jquery.
			return '<li id="' + _myUUid + '_' + (''+p_ItemToCreate.id).replace(/[.]/g,'_') + '" data-btid="' + p_ItemToCreate.id + '"' + 
				(hasDefaultValue && _myOptions.initialValue.id==p_ItemToCreate.id ? ' class="selected"' : '') +
				'data-display-name = "' + BT.Select.cleanHtml(p_ItemToCreate.displayNm) + '"' + 
				'>' + BT.Select.cleanHtml(p_ItemToCreate.nm) + '</li>';
		}

	}

	//This is the end of the BT.Select.ComboBase function, so we are returning the object we have created to the calling program
	return _$thisCombo;
}

BT.Select.getCachedData = function(p_url, p_callback) {

		if (p_callback==undefined || p_url==undefined) { return; }

		//if the data has already been setup once, don't try to pull it again.  Just use the local copy
		var _url = p_url,
			myData = cachedData();		
		if (myData!=undefined && p_callback) { 
			p_callback(myData);
			return;
		}
		
		//Otherwise, pull data from the server for this combo box
		$.ajax({
			url: p_url,
			dataType: 'json',
			success: function (ajaxResult) {
				var result = BT.Select.angular.setDataToLocalDataStore(ajaxResult, _url, null);
				p_callback(result);
			},
			error: function(err) {
				p_callback(undefined);
			}
		});

		function cachedData(p_Data) {
		///<summary>Gets/Sets CACHED version of the ajax data used to populate this select box.  
		///We cache data locally so that we dont need to make the same ajax call over and over in order to retrieve the same data.  
		///This isn't the same thing as a browser cache (since the cache only lasts as long as the next page refresh), but its 
		///helpful in screens where we ajax in multiple copies of the same info (eg - grids).
		///<summary>
		var sDataPropertyName = _url.replace(/[/]/g, '_');
		if (sDataPropertyName=='') {return undefined;}
		if(BT.Select.localDataStore.hasOwnProperty(sDataPropertyName) && p_Data==undefined) {
			return BT.Select.localDataStore[sDataPropertyName];
		} else if (p_Data != undefined ) {
			BT.Select.localDataStore[sDataPropertyName] = p_Data;
			return p_Data;
		} else {
			return undefined;
		}
	}

}

//--------------------------------------------------------------------------------
//UTILITY FUNCTIONS:  Used throughout btSelect processing
//--------------------------------------------------------------------------------
BT.Select.getAjaxData = function (ajaxOptions) {
	/// <summary>Overridable wrapper function that calls jquery ajax method to pull ajax data for combo contents</summary>
	return $.ajax(ajaxOptions);
}
// Use "isAttribute" when cleaning a string that will be the value of an html attribute.
BT.Select.cleanHtml = function (html, isAttribute) {
    var result = html.toString().replace(/(<[\s]*script[\s]*>[^<]*<[\s]*\/[\s]*script[^>]*>|<[^>]*>)/g, '');
    if (isAttribute) {
        result = result.replace(/["]/g, '&quot;');
    }
    return result;
}
BT.Select.getDataFromOptionList = function (p_$select) {
	var ReturnData = {"id":0, "displayValue":1, "grouping":[],"data":[]};
	$.each(p_$select.find('option'), function(p_idx, p_optionElement) {
		ReturnData.data.push([$(p_optionElement).attr('value'), $(p_optionElement).text()]);
	});
	return ReturnData;
}