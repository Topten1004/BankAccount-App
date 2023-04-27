if (typeof BT === 'undefined') { BT = {}; }
BT.Angular = BT.Angular ? BT.Angular : {}
BT.Angular.Directives = BT.Angular.Directives ? BT.Angular.Directives : {}

BT.Select = BT.Select ? BT.Select : {};
BT.Select.localDataStore = BT.Select.localDataStore ? BT.Select.localDataStore : {};
BT.Select.angular = {};

BT.Angular.Directives.btSelectBox = function ($compile, $filter) {

	if (BT.Angular.Directives.btSelectBoxTemplates === undefined) {
		BT.Angular.Directives.btSelectBoxTemplates = {
			multi: BT.Util.getContent(BT.Globals.baseUrl + 'Template/Common/MultiSelectBox'),
			standard: BT.Util.getContent(BT.Globals.baseUrl + 'Template/Common/SelectBox')
		}
	}

	return {
		restrict: 'A',
		priority: 1100,
		template: function (element, attr) { return (attr.multiselect ? BT.Angular.Directives.btSelectBoxTemplates.multi : BT.Angular.Directives.btSelectBoxTemplates.standard); },
		replace: true,
		scope: {
			tabindex: '=',
			container: '@',
			maxWidth: '@',
			maxHeight: '@',
			placeholder: '@',
			ngPlaceholder: '=?',
			idValue: '=',
			textValue: '=?',
			comboType: '@',
			comboUrl: '@',
			comboData: '=?',
			minVisible: '@',
			dependentField: '@',
			editorLink: '@',
			entryValue: '@',
			textValueName: '@textValue',
			idValueName: '@idValue',
			emptyLine: '@',
			cssClass: '@',
			multiselect: '@',
			simpleName: '@',
			disabled: '=?',
			excludeId: '=?',
			excludeIds: '=?',
			includeIds: '=?',
			enableInactive: '=?',			
			suggestSettings: '=',
			suppressInitialSet: '@'
		},
		link: function ($scope, $element, p_attrs, p_ctrl) {

			$scope.dependentComboUrl = '';
			$scope.myDefaultValue = undefined;
			if ($scope.textValue === '') {
				$scope.entryValue = '';
			} else {
				$scope.entryValue = $scope.textValue;
			}
			var myOptions = {
				container: $scope.container ? $scope.container : 'auto',
				maxWidth: $scope.maxWidth,
				maxHeight: $scope.maxHeight ? $scope.maxHeight : 'auto',
				placeholder: $scope.placeholder ? $scope.placeholder : '',
				comboType: $scope.comboType ? $scope.comboType.replace(/\s/g, '') : 'ajax',
				comboUrl: $scope.comboUrl.trim(),
				comboData: $scope.comboData,
				minVisible: $scope.minVisible ? $scope.minVisible : 5,
				dependentField: $scope.dependentField ? $scope.dependentField : '',
				editorLink: $scope.editorLink ? $.trim($scope.editorLink) : '',
				parentIsNull: false,
				emptyLine: $scope.emptyLine ? true : false,
				multiselect: $scope.multiselect ? true : false,
				excludeId: $scope.excludeId,
				excludeIds: $scope.excludeIds,
				includeIds: $scope.includeIds,
				enableInactive: $scope.enableInactive,
				useSimpleDisplayName: $scope.simpleName ? BT.Util.toBoolean($scope.simpleName) : false,
				suppressInitialSet: $scope.suppressInitialSet ? BT.Util.toBoolean($scope.suppressInitialSet) : false
		};
			var InitialValueSet = false,
				myTextInpuCtrl = $element.find('.text_input');

			// show the "editor-link" only if the user can edit firm system settings.
			if (BT && BT.Globals) {
				if (!BT.Globals.CanEditSettings) { myOptions.editorLink = ''; }
			}

			// renderTo == _myEl
			if (!myOptions.maxWidth) {
				myOptions.maxWidth = '100%';
			}
			var _myEl = $element;
			$scope.placeholder = _myEl.attr('placeholder');
			if (_myEl.closest('.bt-select-parent').length > 0) { $scope.maxWidth = '100%'; }
			var _combo;
			if (myOptions.comboData) {
				_combo = BT.Select.angular.createLocal($scope, myOptions, $element);
			} else if ($scope.textValueName) {
				_combo = BT.Select.angular.createLazy($scope, myOptions, $element);
			} else {
				_combo = BT.Select.angular.createAjax($scope, myOptions, $element);
			}
			if (p_attrs['btValidateModel']) {
				_myEl.find('.text_input').attr('bt-validate-model', p_attrs['btValidateModel']);
			} else {
				if (p_attrs['idValue']) { _myEl.find('.text_input').attr('bt-validate-model', p_attrs['idValue']); }
			}
			if ($scope.disabled) {
				// set 'disable' after angular compile html element
				setTimeout(function () {
					_combo.disable();
				}, 0);
			}

			// If this is a CHILD property, then only set the value if the PARENT OBJECT is not undefined.
			if ($scope.idValueName.indexOf('.') > 0) {
				var sParentName = BT.Select.getParentObject($scope.idValueName);
				$scope.$parent.$watch(sParentName, function (val) {
					myOptions.parentIsNull = (val === undefined);
				});
			}

			$scope.$watch('ngPlaceholder', function (val) {
				if (val !== undefined) {
					myTextInpuCtrl.attr('placeholder', val);
				}
			});

			var _dependentTimeout = undefined;
			$scope.$watch('idValue', function (val, oldVal) {
				if (!myOptions.multiselect) { // Do nothing if multiselect
					if (val !== oldVal || InitialValueSet === false) {
						if (val !== undefined && val !== null) {
							//							if ($scope.dependentField && $scope.dependentField != '') {
							//								_combo.clearComboData(true);
							//							}
							if ($scope.textValueName && $scope.textValueName !== '' && ($scope.textValue || myOptions.comboType === "lazy")) {
								//If this is a DEPENDENT combo box, then we can't simply SET VALUE -- because the system may clear this value
								//once the page is loaded.  Instead, wait a beat.  Then, set the value.  The show/hide is to avoid flicker on screen.
								if ($scope.dependentField && $scope.dependentField !== '') {
									myTextInpuCtrl.hide();
									//store $scope.textValue here because we will clear it elsewhere when the comboUrl values are cleared.
									var myCurrentValue = angular.copy($scope.textValue);
									if (_dependentTimeout) { clearTimeout(_dependentTimeout); }
									_dependentTimeout = setTimeout(function () {
										_combo.setValue(val, myCurrentValue);
										myTextInpuCtrl.show();
										_dependentTimeout = undefined;
									}, 100);
								} else {
									//added this setTimeout in order to overcome a dialog $digest problem.
									setTimeout(function () {
										_combo.setValue(val, $scope.textValue);
									}, 10);
								}
							} else {
								//If this is a DEPENDENT combo box, then we can't simply SET VALUE -- because the system may clear this value
								//once the page is loaded.  Instead, wait a beat.  Then, set the value.  The show/hide is to avoid flicker on screen.
								if ($scope.dependentField && $scope.dependentField !== '') {
									myTextInpuCtrl.hide();
									if (_dependentTimeout) { clearTimeout(_dependentTimeout); }
									_dependentTimeout = setTimeout(function () {
										_combo.setValue(val);
										myTextInpuCtrl.show();
										_dependentTimeout = undefined;
									}, 100);
								} else {
									//for every OTHER type of combo, we simply SET VALUE -- the system will load data automatically.
									_combo.setValue(val);
								}
							}
							InitialValueSet = true;
						} else {
							if (!myOptions.parentIsNull && ($scope.dependentField === undefined || $scope.dependentField === '')) {
								_combo.setValue('');
							}
						}
					}
				} else {
					if (val !== oldVal && (!val || val.length === 0)) {
						if (!myOptions.parentIsNull) {
							_combo.setValue('');
						}
					} else if (val !== oldVal) {
						if (!myOptions.parentIsNull) {
							_combo.setValues(val);
						}
					}
				}
			}, true);

			if (myOptions.multiselect) {
				$scope.values = [];
			}
			$scope.unselectOption = function (itemId) {
				_combo.setValue(itemId);
			}

			//If this is a dependent combo, then we need to (a) clear out the combo data when the dependent field changes and (b) watch for the combo's URL to update.
			//note that the heartbeat "wait" on clear combo is needed to enable angular to "hear" the updates to this field.  It creates some complexity, however, with
			//default values on a combo box (see above).
			if ($scope.dependentField && $scope.dependentField !== '') {
				$scope.$watch('comboUrl', function (val, oldVal) {
					myOptions.comboUrl = val;
				});
				$scope.$parent.$watch($scope.dependentField, function (val, oldVal) {
					if (val !== undefined && val !== oldVal /* && _combo.isDataLoaded()*/) {
						setTimeout(function () {
							_combo.clearComboData();
						}, 50);
					}
				});
			}

			// if select box has suggest link, we have to set some functions to the settings object to be able to call it from suggestLink directive
			if ($scope.suggestSettings) {
				$scope.suggestSettings.findMatches = _combo.findMatches;
				$scope.suggestSettings.filterMatches = _combo.filterMatches;
				$scope.suggestSettings.setTextValue = _combo.setTextValue;
				$scope.suggestSettings.setSelected = _combo.setSelected;
				$scope.suggestSettings.clearValues = _combo.clearValues;
			}

			$scope.$on('updateList', function (e, args) {
				var bReset = true;
			    if (args && args.url && args.url.toLowerCase() !== myOptions.comboUrl.toLowerCase()) { bReset = false; }			    
				if (bReset) {	    
					_combo.clearComboData(true);
					_combo.clearCachedData();
				    _combo.getData();
				}
			});

			$scope.$on('clearSelectBox-' + BT.Select.getChildObject($scope.idValueName), function (e) {
				setTimeout(function () {
					_combo.clearComboData(false);
				}, 10);
			});

		} 	//end of LINK function
	}			//end of return
}                 				//end of btSelectBox directive


BT.Select.angular.createAjax = function ($scope, myOptions, $element) {
	var myNewCombo = BT.Select.angular.ComboBase($scope, myOptions, $element);
	myNewCombo.init();
	if (myOptions.multiselect) {
		setTimeout(myNewCombo.getData, 1000);
	}
	return myNewCombo;
};

BT.Select.angular.createLocal = function ($scope, myOptions, $element) {
	var myData = myOptions.comboData;
	var myNewCombo = BT.Select.angular.ComboBase($scope, myOptions, $element);
	myNewCombo.init();
	if (myOptions.multiselect) { setTimeout(myNewCombo.getData, 1000); }
	if (myData && myData.length > 0) { myNewCombo.setRawData(myData); }

	return myNewCombo;
};

BT.Select.angular.createLazy = function ($scope, myOptions, $element) {
	var myNewCombo = BT.Select.angular.ComboBase($scope, myOptions, $element);
	myNewCombo.init();
	return myNewCombo;
};

BT.Select.angular.setDataToLocalDataStore = function (listJson, src, dependentFilterVal, useSimpleNames) {
	//Initial prep work to read the data returned and see what element in the data array corresponds to each 
	//relevent piece of data (we are looking for the select list ID, name and GROUPINGS (up to 5 levels)
	//to really understand what's happening in this routine, you'll need to take a look at the raw data feed 
	//we get from the server.
	var finishedData = [];
	if (listJson && listJson.hasOwnProperty('data') === false && listJson.length > 0) {
		listJson = {
			data: listJson,
			displayValue: 'Name',
			id: 'Id',
			isInactive: 'IsInactive',
			grouping: []
		};
		if (_.find(listJson.data, function (x) { return !BT.Util.IsUndefined(x.Group) && x.Group != ""; })) {
			listJson.grouping.push("Group");
		}
	}
	listJson = $.extend({ 'data': [], 'displayValue': 1, 'id': 0, 'grouping': [], 'isInactive': 6 }, listJson);

	var keys = {
		id: listJson.id,
		nm: listJson.displayValue,
		isInactive: listJson.isInactive,
		group: [-1, -1, -1, -1, -1]
	},
			groupLen = listJson.grouping.length,
			rows = listJson.data,
			TotalRows = listJson.data.length;
	//step through the GROUPINGS collection and get a column reference to use for the group 
	//(note that the combo will only support up to 5 group levels)		
	for (var iCnt = 0; iCnt < groupLen && iCnt < 5; iCnt++) {
		keys.group[iCnt] = listJson.grouping[iCnt];
	}

	//step through the data rows and add groups/subgroups
	for (iCnt = 0; iCnt < TotalRows; iCnt++) {
		var myCurrentGroup = finishedData;
		myCurrentItem = rows[iCnt],
				myGroupString = '';
		//this row can have groups nested up to 5 levels deep... the EACH below will
		//descend through the existing finishedData object and return the lowest SUBITEMS list
		//into which the current row's ITEM should be placed.  If the group hierarchy doesnt 
		//exist yet, then the system adds it within the traverse.
		$.each(keys.group, function (i, GroupVal) {
			//return false (end the each) if the group value is -1 (no grouping column) or the item 
			//doesn't have grouping data this deep (eg - the row's array is too shallow)
			if (GroupVal === -1 || myCurrentItem.length < GroupVal - 1) { return false; }
			//try to find that group in finishedData using the Group value we are currently looking at
			var sGroupNm = $.trim(myCurrentItem[GroupVal]);
			if (sGroupNm === '') { return false; }
			myGroupString += sGroupNm + ':';
			myCurrentGroup = FindGroupItemOrAdd(myCurrentGroup, sGroupNm).subitems;
		});
		//if the group iterator fails (eg - returns an non-existant group), then reset current to the main level.
		if (myCurrentGroup === undefined) { myCurrentGroup = finishedData; }
		//One we have the appropriate group added to the finishedData object, we can insert this item into the bottom of that group
		if (myGroupString === myCurrentItem[keys.nm] + ':') { myGroupString = ''; }
		var displayAs = myGroupString + myCurrentItem[keys.nm];
		if (useSimpleNames) { displayAs = myCurrentItem[keys.nm]; }
		myCurrentGroup.push({ id: myCurrentItem[keys.id], nm: myCurrentItem[keys.nm], displayNm: displayAs, isInactive: myCurrentItem[keys.isInactive] });
	}

	//store this finished set of data in the local cache (so we dont have to go through this more than once per page refresh
	BT.Select.angular.cachedData(finishedData, src, dependentFilterVal);
	return finishedData;

	//This  is an internal(private) sub-function used to find/add a group to an array 
	function FindGroupItemOrAdd(ListToSearch, ValueToFind) {
		//First, find the value in the subitems element we are examining
		var returnedValue = undefined;
		$.each(ListToSearch, function (i, ItemValue) {
			if (ItemValue.nm === ValueToFind) {
				returnedValue = ItemValue;
				return false;
			}
		});
		//if the item coulnt be found, then add it 
		if (returnedValue === undefined) {
			returnedValue = { nm: ValueToFind, subitems: [] };
			ListToSearch.push(returnedValue);
		} else if (returnedValue.subitems === undefined) {
			var thisItem = $.extend(true, {}, returnedValue);
			returnedValue.subitems = [];
			returnedValue.subitems.push(thisItem);
		}
		//return the found/added element
		return returnedValue;
	}
}

BT.Select.angular.cachedData = function (p_Data, src, dependentFilterVal) {
	///<summary>Gets/Sets CACHED version of the ajax data used to populate this select box.  
	///We cache data locally so that we dont need to make the same ajax call over and over in order to retrieve the same data.  
	///This isn't the same thing as a browser cache (since the cache only lasts as long as the next page refresh), but its 
	///helpful in screens where we ajax in multiple copies of the same select box (eg - time entry screens).
	///NOTE that we use the comboUrl option property to identify the data, so if you want to cache non-ajax data -- you should 
	//give the combo a unique "faux-url" so the system has a way to reference it uniquely.
	///<summary>

	var sDataPropertyName = BT.Util.GetNameByUrl(src, dependentFilterVal);
	if (sDataPropertyName === '') { return undefined; }
	if (BT.Select.localDataStore.hasOwnProperty(sDataPropertyName) && (p_Data === undefined || p_Data === null)) {
		return BT.Select.localDataStore[sDataPropertyName];
	} else if (p_Data !== undefined && p_Data !== null) {
		BT.Select.localDataStore[sDataPropertyName] = p_Data;
		return p_Data;
	} else {
		return undefined;
	}
}

BT.Select.angular.ComboBase = function ($scope, p_options, $element) {

	/// <summary>This is the class definition for a generic BTSelect box.  Created automatically by the other functions.</summary>
	var _$thisCombo = {},
		_$myWrapper = $element,
		_$mySelectedText = undefined, _$mySelectedValue = undefined, _$myUList = undefined, _$mySelectedValues = [],
		_myData = [],
		_ulPadding = _$myWrapper.outerHeight() - 1,
		_IsUserInputDirty = false,
		_IsDataLoaded = false,
		_myUUid = "btselect_" + Math.round(1000000 * Math.random()),
		_hMatchEntry = null,
		_dependentFilterVal = null,
		_myOptions = p_options;

	_$thisCombo.html = {
		'value': function () { return $scope.idValue; },
		'text': function () { return $scope.entryValue; },
		'wrapper': function () { return _$myWrapper; }
	}


	//determine what html element the combo should automatically snap within.
	if (_myOptions.container === 'auto') {
		if (_$myWrapper.parents('.bt-select-parent, .md-form, body').length > 0) {
			_myOptions.container = $(_$myWrapper.parents('.bt-select-parent, .md-form, body')[0]);
		} else {
			_myOptions.container = $('body');
		}
	}
	if (_myOptions.container.is('body')) { _myOptions.container = $(document); }

	//Set default 'maxHeight'
	if (_myOptions.maxHeight === 'auto') { _myOptions.maxHeight = 300; }

	function init_Listeners() {
		///<summary>all of the dom event WIRES are created within this function.  It's a single location where any interaction with the dom is documented and controlled.</summary>

		//User clicks the down arrow on a select box
		_$myWrapper.off('click.btSelect').on('click.btSelect', '.btn_select', function (e) {
			if (_$myWrapper.hasClass('disabled')) { return; }
			tryGetLazyData(function () {
				openSelect(false);
			});
		});
		//User clicks the select box text field and we SELECT the whole text
		_$mySelectedText.off('click.btSelect').on('click.btSelect', function (e) {
			if (_$myWrapper.hasClass('disabled')) { return; }
			_$mySelectedText[0].select();
		});
		//types into the select box's input 
		_$mySelectedText.off('keydown.btSelect').on('keydown.btSelect', function (e) {
			if (_$myWrapper.hasClass('disabled')) { return false; }
			if (e.keyCode === 9 && (_$myUList && _$myUList.find('li.selected').length === 0)) {
				verifySelected();
				closeAndCancel();
			} else {
				//note that we wrap the key capture inside of a GETDATA call (in case the select isn't initialized yet)
				tryGetLazyData(function () { InputBoxKeyCapture(e); });
			}
		});
		//User clicks a select list item to actually SELECT it
		_$myUList.off('click.btSelect').on('click.btSelect', 'li', function (e) {
			if (_$myWrapper.hasClass('disabled') || $(this).hasClass('group') || $(this).hasClass('editor-link')) { return; }
			setSelected($(this).attr('data-btid'));
			if (!_myOptions.multiselect) {
				closeAndCancel();
			} else {
				// Realign UL list because multiselect can change it height when we add/remove items
				alignULList();
			}
		});

		//Other clicks are ignored
		_$myWrapper.click(function (e) {
			if ($(e.target).closest('.editor-link').length > 0) { return; }
			if ($(e.target).hasClass('text_input')) { return; } // Propagating direct click on text input to fix issue with not working ng-click on parent element
			if ($(e.target).closest('.bt-select-toolbar').length === 0) { e.stopPropagation(); }
		});
		//clicking elsewhere in the dom with CLOSE the open select box.


		//If another combo box is opened on screen, it sends out the close.btSelect event to other opened boxes 
		//on the page.  We listen for that event and close in response
		_$myWrapper.off('close.btSelect').on('close.btSelect', function () {
			closeAndCancel();
		});

		//If this is a dependent combo, then listen for the dependent field to change
		if (_myOptions.dependentField !== '') {
			_$myWrapper.off('dependentChange').on('dependentChange.btSelect.' + _myOptions.dependentField, function (e, val) {
				clearComboData();
				_dependentFilterVal = val;
			});
		}
	}

	_$thisCombo.init = init;
	function init() {
		///<summary>Called by the creation functions to generate a new select box.  This function generates the initial html and sets up some class-level variables.
		///Note that you would need to call the getData() function separately if you need to load the combo with information.
		///</summary>

		//mark this box with a class so we dont re-create it
		_$myWrapper.addClass('bt_select_box');

		//set the _$mySelected convenience variables, and then set their values IF we have specified a default value for this combo box 
		_$mySelectedText = _$myWrapper.find('input.text_input');
		_$mySelectedValue = _$myWrapper.find('input.js-comboValue');
		_$myUList = _$myWrapper.find('ul');

		//apply the "maxWidth" property (eg - the UL can stretch beyond the boundaries of the SELECT BOX
		if (_myOptions.maxWidth !== 'auto') {
			_$myUList.addClass('nowrap');
			_$myUList.css('max-width', _myOptions.maxWidth);
		}
		//Add listeners once the object is setup
		init_Listeners();
	}

	_$thisCombo.setData = setDataFromJSon;
	_$thisCombo.setRawData = setDataFromObject;
	function setDataFromJSon(p_JSonData) {
		if (_myOptions.comboUrl === '') { _myOptions.comboUrl === _myUUid }
		_myData = BT.Select.angular.setDataToLocalDataStore(p_JSonData, _myOptions.comboUrl, _dependentFilterVal, _myOptions.useSimpleDisplayName);
		_IsDataLoaded = true;
		createSelectUL(_myData);
		_$myWrapper.trigger('dataLoaded.btSelect');
	}
	function setDataFromObject(p_Data) {
		_myData = BT.Select.FormatRawJsonData(p_Data);
		createSelectUL(_myData);
		_$myWrapper.trigger('dataLoaded.btSelect');
	}

	_$thisCombo.isDataLoaded = function () { return _IsDataLoaded; }
	_$thisCombo.clearComboData = function (DoNotReset) {
		if (DoNotReset) {
			_$myUList.empty();
			_myData = [];
			_IsUserInputDirty = false;
			_IsDataLoaded = false;
			_hMatchEntry = null;
		} else {
			clearComboData();
		}
	}
	function clearComboData() {
		clearValues();
		_$myUList.empty();
		if (!$scope.$$phase && !$scope.$root.$$phase) { $scope.$apply(); }

		_myData = [];
		_IsUserInputDirty = false;
		_IsDataLoaded = false;
		_hMatchEntry = null;
	}

	_$thisCombo.clearCachedData = clearCachedData;
	function clearCachedData() {
		var sDataPropertyName = BT.Util.GetNameByUrl(_myOptions.comboUrl, _dependentFilterVal);
		if (sDataPropertyName === '') { return; }
		if (BT.Select.localDataStore.hasOwnProperty(sDataPropertyName)) {
			delete BT.Select.localDataStore[sDataPropertyName];
		}
	}

	_$thisCombo.getData = getData;
	function getData(options) {

	    if (options) { $.extend(_myOptions, options); }

		//if the data has already been setup once, don't try to pull it again.  Just use the local copy
		var rawData = _myOptions.comboData || BT.Select.angular.cachedData(null, _myOptions.comboUrl, _dependentFilterVal);
		_myData = BT.Select.FormatRawJsonData(rawData);	    

		if (_myData !== undefined && _myData !== null) {
			_IsDataLoaded = true;
			createSelectUL(_myData);
			//note that we trigger this dataLoaded event so that the "tryGetLazyData" function works.
			_$myWrapper.trigger('dataLoaded.btSelect');
		} else {
			//if the call was already made to the server once, dont do it again
			BT.Select.DataService.addCall({
			    url: BT.Util.GetAjaxUrl(_myOptions.comboUrl, _dependentFilterVal),
				comboUrl: _myOptions.comboUrl,
				dependentFilterVal: _dependentFilterVal,
				useSimpleDisplayName: _myOptions.useSimpleDisplayName,
				success: function (ajaxResult, originalOptions) {
					//once the data comes back, use it to (a) create a valid store for this combo and (b) create the UL list for the select box.
					_myData = BT.Select.angular.cachedData(null, originalOptions.comboUrl, originalOptions.dependentFilterVal);
					_IsDataLoaded = true;
					createSelectUL(_myData);
					//note that we trigger this dataLoaded event so that the "tryGetLazyData" function works.
					_$myWrapper.trigger('dataLoaded.btSelect');
					_$mySelectedText.css('cursor', '');
					_$myWrapper.find('.btn_select').css('cursor', '');
				},
				error: function (err, originalOptions) {
					_$mySelectedText.css('cursor', '');
					_$myWrapper.find('.btn_select').css('cursor', '');
					console.warn('Failed to load select box data');
				}
			});
		}
	}

	function tryGetLazyData(onSuccess) {
		///<summary>Most of the time, we load combo box data when the control is initialized.  For LAZY combo boxes, however, we don't load select list data until it is required.
		///To accomodate that feature, we SKIP getData() when a combo is loaded and we add this try function to the pick list interaction events (clicking the down arrow, beginning a text match)
		///The function calls GETDATE and THEN executes a success function.
		///call example:  tryGetLazyData(function() { //this is executed once data has been successfully loaded; });
		///</summary>

		if (_IsDataLoaded === false) {
			_$mySelectedText.css('cursor', 'wait');
			_$myWrapper.find('.btn_select').css('cursor', 'wait');
			_$myWrapper.off('dataLoaded.btSelect').on('dataLoaded.btSelect', function () {
				onSuccess();
				_$mySelectedText.css('cursor', '');
				_$myWrapper.find('.btn_select').css('cursor', '');
			});
			getData();
		} else {
			onSuccess();
		}

	}

	function alignULList() {
		//TOGGLE ON
		_$myUList.css('height', 'auto').css('max-height', '');
		var offset = { top: 0 },
			comboHeight = _$myWrapper.outerHeight(),
			minHeight = _myOptions.minVisible * _ulPadding,
			ListHeight = _$myUList.height() + 5;

		//If _ulPadding hasn't been set properly yet, then set it here
		_ulPadding = _$myWrapper.outerHeight() - 1;

		//Compute the HEIGHT and the POSITION of the select list
		if (_myOptions.maxHeight !== 'auto' && (ListHeight > _myOptions.maxHeight)) { ListHeight = _myOptions.maxHeight; }
		if (_myOptions.container.is(document)) {
			offset.top = _$myWrapper.offset().top;
		} else {
			offset.top = _$myWrapper.offset().top - _myOptions.container.offset().top;
		}
		//set the object's height to CONTAINER.HEIGHT - SELECT.TOP - (ROWHEIGHT*2) 
		//the last item gives us a little padding at the bottom of the container.
		var thisHeight = _myOptions.container.innerHeight() - offset.top - (2 * _$myWrapper.height());
		if (thisHeight < minHeight) { thisHeight = minHeight; } else if (thisHeight > ListHeight) { thisHeight = ListHeight; }
		if (thisHeight > _myOptions.maxHeight) { thisHeight = _myOptions.maxHeight; }
		_$myUList.css('max-height', parseInt(thisHeight));

		//Note:  if the select needs to open UP instead of DOWN (because it's at the bottom of it's container), 
		//make that change here.
		if (offset.top + parseInt(thisHeight) + _ulPadding > _myOptions.container.height()) {
			_$myUList.css({ top: 'auto', 'z-index': 500, bottom: _ulPadding + 'px', 'max-height': _myOptions.maxHeight });
			_$myWrapper.addClass('up');
		} else {
			_$myUList.css({ marginTop: _ulPadding + 'px', top: '0px', 'z-index': 500, bottom: 'auto' });
			_$myWrapper.removeClass('up');
		}
	}

	function openSelect(noTextSelect) {
		///<summary>This is the function that is called to open/close the select list ITEMS.  The css class 'open' is added to the wrapper, so we know (elsewhere in the system) if a combo list is open or closed. css can also be attached to .bt-combo.open element(s) to effect the way an open combo list is displayed.</summary>

		//TOGGLE OFF
		if (_$myWrapper.hasClass('open')) {
			closeAndCancel();
			return;
		}
		// this is attempt to fix problem of hundreds of click handlers attached to document because of hundreds of select boxes on a page
		// when select box is opened attach one click handler and dispose when select box is closed
		$(document).off('click.' + _myUUid).on('click.' + _myUUid, function () {
			if (_$myWrapper.closest('body').length === 0) {
				$(document).off('click.' + _myUUid);
				return;
			}
			verifySelected();
			closeAndCancel();
		});
		alignULList();

		//close any OTHER open combo boxes
		$('.bt_select_box.open').trigger('close.btSelect');
		//open THIS combo box;
		_$myWrapper.addClass('open');
		$('body').addClass('bt-select-open');
		scrollSelectedIntoView();
		//Highlight the input box text (unless we say not to)
		if (!noTextSelect) { selectText(); }

	}

	_$thisCombo.setTextValue = setTextValue;
	function setTextValue(textValue) {
		$scope.entryValue = textValue;
		_$mySelectedText.val(textValue);
	}

	_$thisCombo.findMatches = findMatches;
	function findMatches(name, partialMatchLength) {
		name = name.toLowerCase();
		var isExactMatch = false, itemId = null;
		var items = _$myUList.find('li.option');

		var filteredItems = _.filter(items, function (item) { return $(item).text().toLowerCase() === name; });
		if (filteredItems.length > 0) {
			isExactMatch = true;
			itemId = $(filteredItems[0]).attr('data-btid');
		} else {
			name = name.substr(0, partialMatchLength);
			filteredItems = _.filter(items, function (item) {
				return $(item).text().toLowerCase().indexOf(name) >= 0;
			});
		}
		return { isExactMatch: isExactMatch, itemId: itemId, key: name, count: filteredItems.length };
	}

	_$thisCombo.filterMatches = filterMatches;
	function filterMatches(p_sSeek) {
		///<summary>Called internally in order to hide any LI elements/parents without a matching element
		///Note that p_sSeek is typically the INPUT TEXT box value
		///</summary>

		if (!_$myWrapper.hasClass('open')) { openSelect(true); } //true arg prevents textselection
		_IsUserInputDirty = true;

		//Seek should be case-insensitive and should TRIM out the user's entry
		p_sSeek = $.trim(p_sSeek).toLowerCase();

		var AllItems = _$myUList.find('li.option,li.group');
		_$myUList.find('li.selected').removeClass('selected');
		AllItems.removeClass('filter-matched');

		//If the user has CLEARED out the seek field, then show ALL items and exit
		if ($.trim(p_sSeek) === '') {
			AllItems.removeClass('filtered');
			_hMatchEntry = null;
			if (_myOptions.multiselect) {
				alignULList();
			}
			return;
		}

		//loop through every list item to see if there is a match and mark the unmatched items with a class of 'filtered'
		$.each(AllItems, function (idx, p_liElement) {
			var thisLi = $(p_liElement), isMatchingItem = false;
			if (thisLi.hasClass('group')) {
				isMatchingItem = thisLi.find('span:first').text().toLowerCase().indexOf(p_sSeek) >= 0 ? true : false;
			} else {
				isMatchingItem = thisLi.text().toLowerCase().indexOf(p_sSeek) >= 0 ? true : false;
			}
			if (isMatchingItem) { thisLi.addClass('filter-matched'); }
		});

		//show any items that are contained WITHIN a matched group
		_$myUList.find('li.group.filter-matched li').addClass('filter-matched');
		//show the PARENTS of any sub-items that are matched
		_$myUList.find('li.option.filter-matched').parents('li.group').addClass('filter-matched');
		//show items that WERE filtered and are not visible
		_$myUList.find('li.filter-matched').removeClass('filtered');
		//Add the "hide" function to everything else
		(_$myUList.find('li.option, li.group').not('.filter-matched')).addClass('filtered');
		//Make the first NON-GROUP li "active"
		if (!_myOptions.multiselect) { // Select nothing if multiselect
			(_$myUList.find('li.option').not('.filtered, .group')).first().addClass('selected');
		}
		//finally, remove the 'filter-matched' class... it was just used in transition
		_$myUList.find('li.filter-matched').removeClass('filter-matched');
		_hMatchEntry = null;
	}

	_$thisCombo.closeList = closeAndCancel;
	function closeAndCancel() {
		$(document).off('click.' + _myUUid);
		closeComboBox();
		_IsUserInputDirty = false;
	}

	function closeComboBox() {
		///<summary>Used to close the select list (toggle "off" the list)</summary>
		_$myUList.find('li').removeClass('filtered');
		//$_selected.addClass('selected');
		_$myWrapper.removeClass('open').removeClass('up');
		$('body').removeClass('bt-select-open');
		_$myUList.css({ 'margin-top': '0px', 'height': '0px', 'z-index': 5 });
	}

	_$thisCombo.setValue = setValue;
	function setValue(id, txt, SupressEvents) {
		///<summary>This function provides a public way to set the value of the combo box.  Note that SuppressEvents=true will prevent the onChange function from being fired during this process.</summary>
		if (!BT.Select.angular.cachedData(null, _myOptions.comboUrl, _dependentFilterVal)) {
			_IsDataLoaded = false;
		}

		if (_IsDataLoaded === false && txt === undefined && _myOptions.comboType !== "lazy") {
			tryGetLazyData(function () {
				setSelected(id, SupressEvents);
			});
			return;
		}

		if (_IsDataLoaded === false) {
			//If this is a lazy-loaded combo, then the we dont want setting the value to fire the getData function.
			$scope.$evalAsync(function() {
				$scope.idValue = id;
				$scope.entryValue = txt;
				$scope.textValue = txt;
			});
			if ((SupressEvents === undefined || SupressEvents === false) && !_myOptions.suppressInitialSet) {
				//If we don't suppress (1) all events and (2) the initial SET events, then trigger a change to all event listeners.
				_$mySelectedValue.trigger('change');
				if (_$mySelectedValue.attr('name')) {
					$('.bt_select_box.dependent').trigger('dependentChange.btSelect.' + _$mySelectedValue.attr('name').toLowerCase(), _$mySelectedValue.val());
				}
			}
		} else {
			setSelected(id, SupressEvents);
		}
	}

	//this is the multi-select version of .setValue (needed to add it for dialogs where a multi-select has an initial value set more than once - eg more often than just when it's loaded)
	_$thisCombo.setValues = setValues;
	function setValues(idList, SupressEvents) {
		if (_IsDataLoaded === false) { return; }
		//1.  Clear OLD checkboxes and values
		_$myUList.find('input[type="checkbox"]').prop('checked', false);
		$scope.textValue = '';
		$scope.values = [];
		//2.  For each item in the new list, select value
		$.each(idList, function (idx, el) {
			var itemId = parseInt(el),
				$item = _$myUList.find(('#' + _myUUid + '_' + itemId).replace(/[.]/g, '_')),
				newName = $item.data('display-name'),
				isInactive = $item.data('is-inactive');
			if (isInactive && !_myOptions.enableInactive) { return; }
			if ($scope.textValue === '') {
				$scope.textValue = newName;
			} else {
				$scope.textValue += ', ' + newName;
			}
			$scope.values.push({ id: itemId, text: newName, item: $item, isInactive: isInactive });
			$('input[type="checkbox"]', $item).prop('checked', true);
		});
	}

	_$thisCombo.setSelected = setSelected;
	function setSelected(p_SelectedId, SupressEvents) {
		///<summary>Sets the combo box "value" to the id/text from the currently selected LI in the select list.
		///We call this function from just about anywhere that the user "selects" an item (typing a match, clicking an item, etc).
		///</summary>
		///<param name="p_SelectedId">The ID portion of the id/name selection (eg. the CatSid of a labor code).  We use this to zero in on a specific element in the select list and "activate" it.</param>
		if (p_SelectedId === undefined) {
			return;
		}

		if (_myOptions.multiselect) {
			if (p_SelectedId === '') {
				$.each($scope.values, function (idx, el) {
					$('input[type="checkbox"]', el.item).prop('checked', false);
				});
				$scope.values.length = 0;
			} else {
				var itemId = parseInt(p_SelectedId);
				var selectedIdIndex = _.indexOf($scope.idValue, itemId);
				var $item = _$myUList.find(('#' + _myUUid + '_' + itemId).replace(/[.]/g, '_'));
				var newName = $item.data('display-name');
				var isInactive = $item.data('is-inactive');

				if (selectedIdIndex > -1) {
					$scope.idValue.splice(selectedIdIndex, 1);

					if ($scope.textValue) {
						var arrayNames = $scope.textValue.toString().split(', ').clean('');
						var selectedName = _.find(arrayNames, function (value) { return value === newName; });
						if (selectedName) {
							arrayNames.splice(_.indexOf(arrayNames, selectedName), 1);
							$scope.textValue = arrayNames.join(', ');
						}
					}

					var selectedValue = _.find($scope.values, function (value) { return value.id === itemId; });
					if (selectedValue) {
						$scope.values.splice(_.indexOf($scope.values, selectedValue), 1);
					}

					if (isInactive && !_myOptions.enableInactive) {
						$($item).remove();
					}
				} else {

					if (isInactive && !_myOptions.enableInactive) {
						return;
					}

					$scope.idValue.push(itemId);

					if ($scope.textValue === '') {
						$scope.textValue = newName;
					} else {
						$scope.textValue += ', ' + newName;
					}

					$scope.values.push({ id: itemId, text: newName, item: $item, isInactive: isInactive });
				}

				$('input[type="checkbox"]', $item).prop('checked', selectedIdIndex === -1);
			}
		} else {
			//If no SELECTED ID is passed, then assume the selected value is the combo's INITIAL value
			if (p_SelectedId === undefined) { p_SelectedId = $scope.idValue; }
			if (p_SelectedId === undefined) { return; }

			//get an "item selector" for this value, but note that any "." in the itemId will have been converted to a "_" character when we created the li elements
			var sItemSelector = '#' + _myUUid + '_' + p_SelectedId;
			sItemSelector = sItemSelector.replace(/[.]/g, '_');
			sItemSelector = sItemSelector.replace(/([\(\)\+])/g, '\\$1');
			var $selectedItem = _$myUList.find(sItemSelector);

			//Assuming we FOUND a selected item, use it to fill in the combo box data
			if ($selectedItem.length > 0) {
				$scope.entryValue = $selectedItem.data('display-name');
				$scope.textValue = $scope.entryValue;

				//if this has a validation error class, then clear it when the user makes a selection.
				_$mySelectedText.removeClass('input-validation-error');
				_$myWrapper.removeClass('input-validation-error');

				//clear both FILTERS and the prior SELECTION from the list items
				_$myUList.find('li').removeClass('filtered selected');
				//Mark this list item as "selected"
				$selectedItem.addClass('selected');
				//Since we've selected an item, user "text" field input is no longer dirty
				_IsUserInputDirty = false;
				//Set the value of the hidden input that contains the select box's id value (and trigger CHANGE event, since setting the value in code doesn't fire that event and other classes/form controls may be relying on that event to track a change)
				if ($scope.idValue !== p_SelectedId) {
					$scope.idValue = p_SelectedId;
					if (SupressEvents === undefined || SupressEvents === false) {
						_$mySelectedValue.trigger('change');
						_$mySelectedText.trigger('change');
						//					$('.bt_select_box.dependent').trigger('dependentChange.btSelect.' + _$mySelectedValue.attr('name').toLowerCase(), _$mySelectedValue.val());
						$('.bt-autocomplete').trigger('dependentChange.btAuoComplete.' + _$myWrapper.attr('data-id-value').toLowerCase(), [$scope.idValue]);
					}
				}
			} else if (p_SelectedId === $scope.idValue && p_SelectedId !== null && p_SelectedId !== '') {
				//if NO selected value is found, then use the combo box's initial value
				$scope.entryValue = $scope.textValue;
				_IsUserInputDirty = false;
			} else {
				// setting empty value
				$scope.entryValue = "";
				_IsUserInputDirty = true;
			}
		}

		try {
			if (!$scope.$$phase && !$scope.$root.$$phase) { $scope.$apply(); }
		} catch (err) {
			//Ignoring this error 
		}

	}

	_$thisCombo.clearValues = clearValues;
	function clearValues() {
		$scope.idValue = _myOptions.multiselect ? [] : null;
		$scope.textValue = '';
		$scope.entryValue = '';
	}

	function verifySelected() {
		///<summary>When the user clicks ENTER or TAB, this function is called to verify that any partial entries are completed.
		///1. Partial matches are reversed out and the last good selection is entered into the select box.
		///2. an EMPTY field is assumed to mean we should CLEAR the selection.  Note that if an entry is REQUIRED, then an empty field is the same as a partial match.
		///</summary>
		if (_myOptions.multiselect) {
			$scope.entryValue = '';
			$scope.$apply();
		} else if (_IsUserInputDirty) {
			var sEnteredVal = _$mySelectedText.val();
			if ((sEnteredVal.length > 0 | _myOptions.required) && $scope.idValue) {
				setSelected($scope.idValue, true);
			} else {
				clearValues();
				_$mySelectedValue.trigger('change');
				if (!$scope.$$phase && !$scope.$root.$$phase) { $scope.$apply(); }
				//				$('.bt_select_box.dependent').trigger('dependentChange.btSelect.' + _$mySelectedValue.attr('name').toLowerCase(), _$mySelectedValue.val());
			}
		}

	}

	function scrollSelectedIntoView(p_id) {
		///<summary>Scrolls the currently SELECTED li item into view if the select list is partially hidden inside the viewport</summary>
		var $_targetItem = undefined;

		if (p_id && p_id.length > 0) {
			//if I pass a specific element ID into the function, then select it
			$_targetItem = _$myUList.find('#' + p_id);
		} else {
			//otherwise, select "selected" or the current element
			var targetSelector = '.selected' + (_myOptions.multiselect == false && $scope.idValue ? ', #' + _myUUid + '_' + $scope.idValue : '');
			$_targetItem = _$myUList.find(targetSelector);
		}
		if ($_targetItem.length > 0) {
			$_targetItem.addClass('selected');
			var scrollTop = _$myUList.scrollTop(),
					selectedPos = $_targetItem.position().top,
					listHeight = _$myUList.height(),
					parentHeight = 0,
					parentTop = 0;

			//If the element (selected) is inside of a multi-level ul, then we need to climb up the dom tree to get TOTAL offset from the base UL
			if ($_targetItem.parent()[0] !== _$myUList[0]) {
				var parent = $_targetItem.parents("li.group");
				if (parent.length > 0) {
					parentHeight = $(parent[0]).height();
					parentTop = $(parent[0]).position().top;
				}
			}

			if (selectedPos <= scrollTop || selectedPos > (listHeight - _$myWrapper.height())) {
				if (selectedPos > 0) {
					_$myUList.scrollTop(scrollTop + (selectedPos - listHeight + _$myWrapper.height()));
				} else {
					_$myUList.scrollTop(scrollTop + selectedPos);
				}
			}

			//Now, scroll the item to the top if we can
			if (parentTop > _$myUList.scrollTop()) {
				_$myUList.scrollTop(parentTop);
			}

		}
	}

	// Properties
	_$thisCombo.val = function (p_value) {
		///<summary>Get/Set the currently selected comboBox value from outside the control.</summary>
		if (p_value) {
			setSelected(p_value);
		}
		return $scope.idValue;
	}
	_$thisCombo.selectedText = function () {
		return $scope.textValue;
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
		if (_$myWrapper.hasClass('disabled')) { return false; }

		var keyCode = e.keyCode;

		if (keyCode === 27) {																			//ESC
			if (_IsUserInputDirty) {
				setSelected($scope.idValue);
			}
			closeComboBox();

		} else if (keyCode === 13 || keyCode === 9) {											//ENTER/TAB

			//If the user hit enter with an EMPTY input box, EDITED by the user and NO selected item, 
			//then we can assume they want to clear out their entry.
			if ($scope.entryValue.length === 0 && _IsUserInputDirty && ($selected === undefined || $selected.length === 0)) {
				verifySelected();
				closeComboBox();											//If we selected an item, then we can close the combo box as well.
			} else if (_IsUserInputDirty || ($selected !== undefined && $selected.length > 0)) {
				_IsUserInputDirty = false;
				setSelected($selected.attr('data-btid'));
				closeComboBox();											//If we selected an item, then we can close the combo box as well.
			} else {
				openSelect();
			}

		} else if (_$myWrapper.hasClass('open') && (keyCode === 33 || keyCode === 34)) {	//PageUp or PageDown
			var scrollTop = _$myUList.scrollTop(),
				listHeight = _$myUList.innerHeight(),
				scrollChange = (keyCode === 33) ? -listHeight : listHeight;
			_$myUList.scrollTop(scrollTop + scrollChange);

		} else if (_$myWrapper.hasClass('open') && (keyCode === 36 || keyCode === 35)) {	//Home or End (yes 36 then 35)
			var newPosition = (keyCode === 36) ? 0 : _$myUList[0].scrollHeight;
			_$myUList.scrollTop(newPosition);

		} else if (keyCode === 40 || keyCode === 38) {											//DOWN/UP arrows
			try { e.preventDefault(); } catch (err) { console.warn('preventDefault failed'); }
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
					var mySelectedId = selectableLIs.eq(selIndex + MoveDirection).attr('id');
					scrollSelectedIntoView(mySelectedId);
				}
			}
		} else if (																							//all characters that trigger automatching:
		(48 <= keyCode && keyCode <= 90) || 														//a-z, top row 0-9
		(96 <= keyCode && keyCode <= 105) || 													//numpad 0-9
		(186 <= keyCode && keyCode <= 222) || 													//punctuation
		keyCode === 46 || keyCode === 8) {															//delete, backspace
			if (_hMatchEntry) {
				clearTimeout(_hMatchEntry);
			}
			_hMatchEntry = setTimeout(function () { filterMatches($scope.entryValue) }, 200);
		}

	}

	function selectText() {
		if ($scope.idValue === 0 || $scope.idValue === '') {
			$scope.entryValue = '';
			_$mySelectedText.focus();
		} else {
			_$mySelectedText.select();
		}
	}

	function createSelectUL(p_myDataJson) {
		///<summary>Called internally in order to create the list of <li> items that make up a select list.
		///This function will generate that list, add it to the bt-select's <ul> element</summary>

		var finalHtml = [],
			hasDefaultValue = ($scope.idValue === 0 || $scope.idValue === '') ? false : true;

		if (_myOptions.emptyLine) {
			finalHtml.push(createSelectItemOrGroup({ id: "-1", nm: "", displayNm: "" }));
		}

		$.each(p_myDataJson, function (i, subItem) {
			if (_myOptions.excludeId) {
				if (subItem.subitems) {
					subItem = {
						nm: subItem.nm,
						subitems: _.filter(subItem.subitems, function (itm) { return itm.id !== _myOptions.excludeId; })
					};
					if (!subItem.subitems || !subItem.subitems.length) { return; }
				} else if (_myOptions.excludeId.toString() === subItem.id) {
					return;
				}
			}

			if (_myOptions.excludeIds) {
				if (_.some(_myOptions.excludeIds, function (excludeId) { return subItem.id === excludeId })) {
					return;
				}
			}

			if (_myOptions.includeIds) {
				if (_.some(_myOptions.includeIds, function (item) { return item === subItem.id; })) {
					finalHtml.push(createSelectItemOrGroup(subItem));
					return;
				}
			} else {
				finalHtml.push(createSelectItemOrGroup(subItem));
			}
		});

		//add the 'edit these values' item to the bottom of the select box as required.
		if (_myOptions.editorLink && _myOptions.editorLink !== '') {
			finalHtml.push('<li class="editor-link"><a class="js-ajax-settings" data-target="' + BT.Globals.baseUrl + 'Settings/Page/Index?subView=Lookups#/' + _myOptions.editorLink + '"><span class="icon-bt-edit2 icon-left-align"></span>Edit these values...</a></li>')
			_$myUList.off('settingsUpdated', '.js-ajax-settings').on('settingsUpdated', '.js-ajax-settings', function () {
				_myData = undefined;
				clearCachedData();
				getData();
			});
		}

		_$myUList.children('li').remove();

		if (BT.Util.isIEBrowser() && $('.ie-hack-required').length > 0) {
			finalHtml.push('<iframe class="ie-hack-cover" src="about:blank"></iframe ><object class="ie-hack-cover" data="about:blank"></object>');
		}

		_$myUList.append(finalHtml.join(''));

		function createSelectItemOrGroup(p_SubItem) {
			if (p_SubItem.hasOwnProperty('subitems')) {
				return '<li class="group"><span>' + BT.Select.cleanHtml(p_SubItem.nm) + '</span><ul>' +
					createSubItems_inner(p_SubItem.subitems) +
					'</ul></li>'
			} else {
				return createItem_inner(p_SubItem);
			}
		}

		function createSubItems_inner(p_subItemsList) {
			var subItemHtml = [];
			$.each(p_subItemsList, function (i, p_subItemToCreate) {
				subItemHtml.push(createSelectItemOrGroup(p_subItemToCreate));
			});
			return subItemHtml.join('');
		}

		function createItem_inner(p_ItemToCreate) {
			if ($scope.idValue === p_ItemToCreate.id) {
				var entryValue = BT.Select.cleanHtml(p_ItemToCreate.nm);
				if (entryValue !== _$mySelectedText.val()) {
					$scope.$evalAsync(function() {
						$scope.entryValue = entryValue;
						$scope.textValue = $scope.entryValue;
					});
				}
			}

			//Note that we are replacing the jquery-specific character of "." with "_" to make selecting by Id easier.
			//every element will have an id of UNIQUEID_ItemID, but ItemId can't have a "." in the name of it will throw off jquery.
			var itemId = _myUUid + '_' + ('' + p_ItemToCreate.id).replace(/[.]/g, '_');
			var itemHtml;
			var isSelected;

			if (p_ItemToCreate.hasOwnProperty("isInactive") === false) { p_ItemToCreate.isInactive = false; }

			if (_myOptions.multiselect) {
				isSelected = hasDefaultValue && _.contains($scope.idValue, parseInt(p_ItemToCreate.id));

				if (p_ItemToCreate.isInactive && !isSelected && !_myOptions.enableInactive) {
					return;
				}

				itemHtml = '<li id="' + itemId + '" class="option' + (p_ItemToCreate.isInactive ? ' inactive' : '') + '" data-btid="' + p_ItemToCreate.id + '"' +
				'data-display-name = "' + BT.Select.cleanHtml(p_ItemToCreate.displayNm, true) + '"' + 'data-is-inactive = "' + BT.Select.cleanHtml(p_ItemToCreate.isInactive, true) + '"' +
				'><input tabindex="-1" type="checkbox" id="' + itemId + '_check' + '"' + (isSelected ? 'checked="checked"' : '') + ((p_ItemToCreate.isInactive && !_myOptions.enableInactive && !isSelected) ? 'disabled="disabled"' : '') + ' style="vertical-align: top;" />' +
				'<span for="' + itemId + '_check' + '">' + BT.Select.cleanHtml(p_ItemToCreate.nm) + '</span></li>';

				if (isSelected) {
					if (!$scope.values) { $scope.values = []; }
					$scope.values.push({ id: parseInt(p_ItemToCreate.id), text: p_ItemToCreate.displayNm, isInactive: p_ItemToCreate.isInactive });
					$scope.$evalAsync($scope.values);
				}
			} else {
				isSelected = hasDefaultValue && $scope.idValue === p_ItemToCreate.id;
				itemHtml = '<li id="' + itemId + '" class="option' + (p_ItemToCreate.isInactive ? ' inactive' : '') + '" data-btid="' + p_ItemToCreate.id + '"' +
				(isSelected ? ' class="selected"' : '') +
				'data-display-name = "' + BT.Select.cleanHtml(p_ItemToCreate.displayNm, true) + '"' +
				'>' + BT.Select.cleanHtml(p_ItemToCreate.nm) + '</li>';
			}

			return itemHtml;
		}

	}

	//This is the end of the BT.Select.ComboBase function, so we are returning the object we have created to the calling program
	return _$thisCombo;

}

BT.Select.getParentObject = function (propertyName) {

	var propertyValues = propertyName.split('.');
	propertyValues.pop();
	return propertyValues.join('.');

}

BT.Select.getChildObject = function (propertyName) {
	return propertyName.split('.').pop();
}

BT.Select.FormatRawJsonData = function(p_data) {

	if (_.find(p_data, function (x) { return x.group != undefined; }) == undefined) {
		return p_data;
	}

	var finalData = [];
	var currentGroupElement = undefined;

	_.each(p_data, function (el) {
		if (el.group == undefined) {
			finalData.push(el);
			currentGroupElement = undefined;
		} else if (currentGroupElement != undefined && el.group.toLowerCase() == currentGroupElement.nm.toLowerCase()) {
			currentGroupElement.subitems.push(el);
		} else {
			var newGroup = { nm: el.group, subitems: [el] };
			finalData.push(newGroup);
			currentGroupElement = newGroup;
		}
	});

	return finalData;

}

BT.Select.DataService = {

	addCall: function (options) {
		/*
		Options = {
			url:'',
			comboUrl: _myOptions.comboUrl,
			dependentFilterVal: _dependentFilterVal, 
			useSimpleDisplayName: _myOptions.useSimpleDisplayName,
			success:callback, 
			error: callback
		}
		*/
		sUrlName = BT.Util.GetNameByUrl(options.url);
		BT.Select.localDataStore.DataCallbacks = BT.Select.localDataStore.DataCallbacks ? BT.Select.localDataStore.DataCallbacks : {};
		if (!BT.Select.localDataStore.DataCallbacks.hasOwnProperty(sUrlName)) {
			//if the ajax call to the server has never been made, then I need to make it here
			BT.Select.getAjaxData({
				url: window.location.protocol + '//' + window.location.host + '/' +  options.url,
				dataType: 'json',
				success: function(ajaxResult) {
					sUrlName = BT.Util.GetNameByUrl(options.url);
					//once the data comes back, use it to (a) create a valid store for this combo and (b) execute each of the SUCCESS methods we cached
					var data = BT.Select.angular.setDataToLocalDataStore(ajaxResult,
						options.comboUrl,
						options.dependentFilterVal,
						options.useSimpleDisplayName);
					_.each(BT.Select.localDataStore.DataCallbacks[sUrlName],
						function(el) {
							if (el.options.success) {
								el.options.success(ajaxResult, options);
							}
						});
				},
				error: function(err) {
					sUrlName = BT.Util.GetNameByUrl(options.url);
					//if we get an error back, log that error and then run the ERROR for each callback we've cached.
					console.warn('Failed to load select box data for ' + options.url);
					_.each(BT.Select.localDataStore.DataCallbacks[sUrlName],
						function(el) {
							if (el.options.error) {
								el.options.error(err, options);
							}
						});
				},
				complete: function() {
					//finally, clear the callback list so we can make this set of calls again if we need to.
					delete BT.Select.localDataStore.DataCallbacks[sUrlName];
				}
			});
			//add the "callbacks" property so I know what to do once the ajax request returns
			BT.Select.localDataStore.DataCallbacks[sUrlName] = [];
		}
		//log the success/error as one of the items to be completed once ajax returns
		BT.Select.localDataStore.DataCallbacks[sUrlName].push({ options: options });
	}

}

