BT.Angular = BT.Angular ? BT.Angular : {};
BT.Angular.Directives = BT.Angular.Directives ? BT.Angular.Directives : {};
BT.Angular.localData = BT.Angular.localData ? BT.Angular.localData : {};

BT.Angular.Directives.inject = function ($app) {

	$app.directive('btCreateDraggable', BT.Angular.Directives.createDraggable);
	$app.directive('multiLine', BT.Angular.Directives.multiLine);
	$app.directive('autoGrow', BT.Angular.Directives.autoGrow);
	$app.directive('ajaxLoad', BT.Angular.Directives.ajaxLoadView);
	$app.directive('datePickerButton', BT.Angular.Directives.datePickerButton);
	$app.directive('dualDatePicker', BT.Angular.Directives.dualDatePicker);
	$app.directive('doubleCheck', BT.Angular.Directives.doubleCheck);
	$app.directive('doubleAction', BT.Angular.Directives.doubleAction);
	$app.directive('btProcess', BT.Angular.Directives.processClick);
	$app.directive('tinyScroll', BT.Angular.Directives.tinyScroll);
	$app.directive('btPopover', BT.Angular.Directives.btPopover);
	$app.directive('btDataPager', BT.Angular.Directives.btDataPager);
	$app.directive('btSelectBox', BT.Angular.Directives.btSelectBox);
	$app.directive('btAutoComplete', BT.Angular.Directives.btAutoComplete);
	$app.directive('btClearSelectBoxCache', BT.Angular.Directives.btClearSelectBoxCache);
	$app.directive('btSelectBoxSuggestLink', BT.Angular.Directives.btSelectBoxSuggestLink);
	$app.directive('btObjectTable', BT.Angular.Directives.objectTable);
	$app.directive('btReportTable', BT.Angular.Directives.reportTable);
	$app.directive('btSidebarAlert', BT.Angular.Directives.btSidebarAlert);
	$app.directive('btHrefSubview', BT.Angular.Directives.btHrefSubview);
	$app.directive('btCarousel', BT.Angular.Directives.carousel);
	$app.directive('btBlur', BT.Angular.Directives.onBlur);
	$app.directive('btScrollTableBody', BT.Angular.Directives.scrollBody);
	$app.directive('btButtonGroup', BT.Angular.Directives.btButtonGroup);
	$app.directive('btTableSearch', BT.Angular.Directives.btTableSearch);
	$app.directive('btLoader', BT.Angular.Directives.btLoader);
	$app.directive('btDateType', BT.Angular.Directives.btDateType);
	$app.directive('btSettingsHref', BT.Angular.Directives.btSettingsHref);
	$app.directive('btHref', ['$window', BT.Angular.Directives.btHref]);
	$app.directive('btTooltip', BT.Angular.Directives.btTooltip);
	$app.directive('btTooltipEasy', BT.Angular.Directives.btTooltipEasy);
	$app.directive('btTooltipContentParser', BT.Angular.Directives.btTooltipContentParser);
	$app.directive('btFileUploader', BT.Angular.Directives.ajaxFileUploader);
	$app.directive('btInclude', BT.Angular.Directives.btInclude);
	$app.directive('ngBlur', ['$parse', BT.Angular.Directives.ngBlur]);
	$app.directive('ngFocus', ['$parse', BT.Angular.Directives.ngFocus]);
	$app.directive('btSizer', BT.Angular.Directives.btSizer);
	$app.directive('btFocusSelect', BT.Angular.Directives.focusSelect);
	$app.directive('btRangeSlider', ['$timeout', BT.Angular.Directives.rangeSlider]);
	$app.directive('btEditInPlace', BT.Angular.Directives.btEditInPlace);
	$app.directive('btAutoFocus', BT.Angular.Directives.btAutoFocus);
	$app.directive('btUdf', BT.Angular.Directives.btUdf);
	$app.directive('btValue', BT.Angular.Directives.btValue);
	$app.directive('btDisputeList', BT.Angular.Directives.btDisputeList);
	$app.directive('btWalkthrough', ['communicationService', '$window', '$rootScope', BT.Angular.Directives.btWalkthrough]);
	$app.directive('btSwitchView', ['$window', '$location', '$timeout', BT.Angular.Directives.btSwitchView]);
	$app.directive('btChildHref', BT.Angular.Directives.childHref);
	$app.directive('btAuditUnlock', ['$timeout', BT.Angular.Directives.AuditUnlockButton]);
	$app.directive('btChangeAll', ['$timeout', BT.Angular.Directives.TrackRowChanges]);
	$app.directive('btDragdrop', ['$timeout', BT.Angular.Directives.CreateDragdrop]);
	$app.directive('btHotkeyNavigation', BT.Angular.Directives.UseHotkeyNavigation);
	$app.directive('btHotkeyCombos', BT.Angular.Directives.UseHotkeyCombos);
	$app.directive('btSyncScroll', BT.Angular.Directives.SynchroniseScroll);
	$app.directive('flexTable', BT.Angular.Directives.flexTable);
	$app.directive('btResizableFlexTable', BT.Angular.Directives.ResizableFlexTable);
	$app.directive('dynamicColumnCalculator', ['$timeout', BT.Angular.Directives.dynamicColumnCalculator]);
	$app.directive('selectOnFocus', BT.Angular.Directives.SelectOnFocus);
	$app.directive('convertToNumber', BT.Angular.Directives.ConvertToNumber);
	$app.directive('scrollOnFocus', BT.Angular.Directives.ScrollOnFocus);
	$app.directive('triggerClick', ['$parse', BT.Angular.Directives.TriggerClick]);
	$app.directive('clickOut', BT.Angular.Directives.ClickOut);
	$app.directive('gaugeChart', BT.Angular.Directives.GaugeChart);
	$app.directive('btPrint', BT.Angular.Directives.Print);
	$app.directive('btMarkdown', ['$compile', '$timeout', '$rootScope', BT.Angular.Directives.Markdown]);
	$app.directive('btEditReportColumns', BT.Angular.Directives.EditReportColumns);
	$app.directive('btPdf', BT.Angular.Directives.PDF);
	$app.directive('ieModalHack', BT.Angular.Directives.IEModalHack);
	if (BT.Angular.Directives.GanttChart) {
		$app.directive('btGanttChart', BT.Angular.Directives.GanttChart);
	}
	BT.Angular.registerParentWindowService($app);

	$app.controller('ConfirmationDialogController', ['$scope', '$rootScope', '$uibModalInstance', 'settings', BT.Angular.Directives.confirmDialogController]);

	$app.filter('unsafe', function ($sce) {
		return function (val) {
			return $sce.trustAsHtml(val);
		};
	});
	$app.filter('parseUrl', function () {
		return function (val) {
			if (typeof (val) === 'undefined' || val == null) {
				return '';
			}
			if (!val.match(/^[a-zA-Z]+:\/\//)) { // Checking http prefix for url value and add it to url if missing.
				val = 'http://' + val;
			}
			return val;
		};
	});
	$app.filter('shortNumber', function () {
		return function (val, digitLimit, rounding) {
			if (val === undefined) return;
			if (val.toString().length > digitLimit) {
				if (Math.abs(val) >= 1000000000) { // billion
					return BT.Globals.Currency + (val / 1000000000).toFixed(rounding) + "B";
				}
				if (Math.abs(val) >= 1000000) { // million
					return BT.Globals.Currency + (val / 1000000).toFixed(rounding) + "M";
				}
				if (Math.abs(val) >= 1000) { // thousand
					return BT.Globals.Currency + (val / 1000).toFixed(rounding) + "K";
				}
			}
			return BT.Globals.Currency + val.toLocaleString(undefined, { minimumFractionDigits: 0 });
		};
	});

	$app.filter('numberNonZero', ['$filter', function ($filter) {
		return function (val, fractionSize) {
			if (val === undefined || parseFloat(val) == 0) return '';
			return $filter('number')(val, fractionSize);
		};
	}]);

	$app.run(function ($rootScope, $locale, $http) {
		$locale.NUMBER_FORMATS.CURRENCY_SYM = BT.Globals.Currency;
		$rootScope.$on("$routeChangeStart", function (event, next, current) {
			//IF the BT.Globals object needs to be reloaded, then this will RELOAD the page automatically.
			if (BT.Globals.reloadRequired == true) {
				document.location.reload(true);
			}
		});
		$rootScope.btVocab = BT.Angular.getVocabValue;
		$rootScope.IsAdminUser = (BT.Globals.IsAdmin == 1);
		$rootScope.IsExpress = (BT.Globals.SubscriptionType < 20);

		$rootScope.BTGlobals = function (propertyName) {
			if (BT.Globals.hasOwnProperty(propertyName) == false) { return null; }
			return BT.Globals[propertyName];
		}

		$rootScope.btRegionalDate = function (dt) {
			if (dt == undefined) { return ''; }
			return BT.Util.parseDate(dt).toRegionalString();
		}



		// usage: $rootScope.btDrillDown('OpenStaffToUserRights', { staffSid: 1 });
		$rootScope.btDrillDown = function (actionType, params) {
			BT.DrillDown.drillDown(actionType, params);
		};

		$http.defaults.headers.post = { 'x-bt-viewstate': BT.Globals.MyTicket };
		$http.defaults.headers.get = { 'x-bt-viewstate': BT.Globals.MyTicket };
	});

};

BT.Angular.MenuHack = function () {
	//This script is used to protect main-menu drop down from being covered by iframe (only a valid problem in IE6-9)
	if (BT.Util.isIEBrowser() && $('.nav_app>.dropdown-menu>.ie-hack-cover').length == 0) {
		$('.nav_app>.dropdown-menu').append('<iframe class="ie-hack-cover" src="about:blank"></iframe ><object class="ie-hack-cover" data="about:blank"></object>');
	}
}

//args: {scope: $scope, permitId: ##, success: function () { } , error: function { } });

BT.Angular.IsPermitted = function (args) {

	args = $.extend({ scope: undefined, permitId: 0, success: undefined, error: undefined }, args);

	$.ajax({
		url: BT.Globals.baseUrl + 'Rest/Settings/IsPermitted/' + args.permitId,
		type: 'GET',
		success: function (res) {
			if (res && res.length > 0 && args.success) {
				if ($.parseJSON(res).result) { args.success(); }
				if (args.scope) { args.scope.$apply(); }
			}
		},
		error: function () {
			if (args.error) {
				args.error();
				if (args.scope) { args.scope.$apply(); }
			}
		}
	});
};

BT.Angular.Directives.ConvertToNumber = function () {
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ngModel) {
			ngModel.$parsers.push(function (val) {
				return parseInt(val, 10);
			});
			ngModel.$formatters.push(function (val) {
				return '' + val;
			});
		}
	};
}

BT.Angular.Directives.SelectOnFocus = function ($window, $timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.off('focus').on('focus', function (e) {
				$(e.currentTarget).select();
			});
		}
	};
}

/* <bt-pdf src="/rest/Invoice/etc..." data-pdf-id="..."></bt-pdf> */
BT.Angular.Directives.PDF = function () {
	///<summary>A cross browser object that can display a PDF based on an angular scope variable.  Specify data-pdf-id if using more than 1 pdf object on your page.</summary>
	return {
		restrict: 'E',
		link: function (scope, element, attrs) {
			if (!attrs.id || attrs.id == "") {
				attrs.id = "pdf-object";
			}

			var currentElement = undefined;
			scope.$watch(attrs.src, function (newVal, oldVal) {
				if (newVal) {
					//If we've already called element.replaceWith, the original element is no longer part of the DOM, so use the element we inserted
					if (currentElement) { element = currentElement; }
					var url = scope.$eval(attrs.src);
					var classList = (attrs.class ? attrs.class : "");
					//if (BT.Util.isIEBrowser()) { classList += " hide-on-btopen"; }
					element.replaceWith('<object id="' + attrs.id + '" type="application/pdf" data="' + url + '" style="height:100%; width:100%;" class="' + classList + '"></object>');
					//Update the element we added to be the current element
					currentElement = $(document.getElementById(attrs.id)); 
					scope.$applyAsync();
				}
			});
		}
	};
}

/* <a bt-process="save()" data-processing="Save..." data-completed="Saved" bt-clear-select-box-cache="@Url.Action("ClientList", "Picklist"); @(Url.Action("ProjectList", "Picklist"))?staffSid={{staffSid}}">Save Changes</a> */
BT.Angular.Directives.btClearSelectBoxCache = function () {
	return {
		restrict: 'A',
		priority: 5,
		link: function (scope, $element, p_attrs) {
				$element.bind('click', function () {
				_.each(p_attrs.btClearSelectBoxCache.split(';'), function (item) {
					var name = BT.Util.GetNameByUrl(item);
					delete BT.Select.localDataStore[name];
				});
			});
		}
	};
};

/* <a bt-process="save()" data-processing="Save..." data-completed="Saved" bt-clear-select-box-cache="@Url.Action("ClientList", "Picklist")">Save Changes</a> */
BT.Angular.Directives.btSelectBoxSuggestLink = function ($timeout) {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			suggestSettings: '=',
			linkText: '@?',
			partialMatchLength: '@?',
			exactMsg: '@?',
			partialMsg: '@?',
			emptyMsg: '@?',
			matchValue: '='
		},
		template: '<label class="bt-suggest-link">' +
			'<a class="naked" ng-hide="resultMessage" href="javascript:;" ng-click="findSuggestValues($event)">{{settings.linkText}}</a>' +
			'<span ng-hide="!resultMessage" >{{resultMessage}}</span>' +
			'</label>',
		link: function ($scope) {
			var defaultSettings = {
				linkText: 'Suggest a match...',
				partialMatchLength: 5,
				exactMessage: 'BigTime found a match.',
				partialMesasge: 'BigTime found <Count> match(es). Choose one to continue.',
				emptyMessage: 'BigTime couldn\'t find any matches.'
			};

			$scope.settings = {
				linkText: $scope.linkText,
				exactMessage: $scope.exactMsg,
				partialMesasge: $scope.partialMsg,
				emptyMessage: $scope.emptyMsg,
				partialMatchLength: parseInt($scope.partialMatchLength) || defaultSettings.partialMatchLength
			};
			$scope.settings = $.extend({}, defaultSettings, $scope.settings);
		},
		controller: function ($scope) {
			$scope.findSuggestValues = function (e) {
				e.stopImmediatePropagation();
				var suggestValues = $scope.suggestSettings.findMatches($scope.matchValue, $scope.settings.partialMatchLength);
				if (suggestValues.isExactMatch && suggestValues.count == 1) {
					$scope.resultMessage = $scope.settings.exactMessage;
					$scope.suggestSettings.setSelected(suggestValues.itemId);
				} else if (suggestValues.count > 0) {
					var partialMesasge = $scope.settings.partialMesasge.replace('<Count>', suggestValues.count);
					$scope.resultMessage = partialMesasge;
					$scope.suggestSettings.clearValues();
					$timeout(function () {
						$scope.suggestSettings.setTextValue(suggestValues.key);
						$scope.suggestSettings.filterMatches(suggestValues.key);
					}, 10);
				} else {
					$scope.resultMessage = $scope.settings.emptyMessage;
				}
			};
		}
	};
};

BT.Angular.Directives.btDisputeList = function ($btInvoiceRepo, $timeout) {
	return {
		restrict: 'A',
		templateUrl: BT.Globals.baseUrl + 'Template/Common/disputeList',
		scope: { disputeSettings: '=btDisputeList' },
		link: function ($scope, $element) {

			var containerSelector = '#disputeList';
			var commentListsSelector = '.disputeList';
			var $listContainer = $element.find(containerSelector);

			$scope.disputeSettings.dispute = function (invoiceSid, element) {
				$scope.invoiceSid = invoiceSid;
				clearCommentArea();
				$btInvoiceRepo.disputeComments($scope.invoiceSid, function (disputeComments) {
					$scope.comments = disputeComments;
					$timeout(function () { showDisputeList(element); }, 0);
				});
			};

			function clearCommentArea() {
				$scope.comment = "";
			}

			function showDisputeList(element) {
				$listContainer.show();
				setPostition(element);
			}

			function setPostition(element) {
				// set new position based on target element
				var $element = $(element);
				var offset = $element.offset();
				$listContainer.removeClass('top bottom');
				$listContainer.find(commentListsSelector).scrollTop(0);
				if (offset.top + $element.height() / 2 < $(window).height() / 2) {
					$listContainer.offset({ top: offset.top + $element.height(), left: offset.left - $element.outerWidth() / 2 });
					$listContainer.addClass('bottom');
				} else {
					$listContainer.offset({ top: offset.top - $listContainer.height(), left: offset.left - $element.outerWidth() / 2 });
					$listContainer.addClass('top');
				}

				$('html').on('click.disputeList', function (e) {
					if ($(e.target).parents(containerSelector).length == 0) {
						close();
					}
				});
				$('.btt-canvas-vertical').on('scroll.disputeList', function (e) {
					close();
				});

				function close() {
					// hide popup and unbind events
					$listContainer.hide();
					$('html').off('click.disputeList');
					$('.btt-canvas-vertical').off('scroll.disputeList');
				}
			}

		},
		controller: function ($scope) {
			BT.Angular.formValidators($scope);

			$scope.addComment = function () {
				BT.Angular.checkFormValidators($scope);
				if (!$scope.hasValidationErrors) {
					$btInvoiceRepo.dispute([$scope.invoiceSid], $scope.comment, function (disputedInvoices) {
						if (disputedInvoices.indexOf($scope.invoiceSid) > -1) {
							$scope.comments.splice(0, 0, { Nt: $scope.comment, FullName: BT.Globals.ContactNm, Dt: Date.now().toString(BT.Globals.dateFormat) });
							$scope.comment = '';
						}
					}, function (result) {
						BT.Angular.getValidationErrors(result, $scope);
					});
				}
			};
		}
	};
};

BT.Angular.getVocabValue = function (p_Value, p_case, p_isPossessive, p_isPlural) {
	var sVal = p_Value;
	if (BT.Globals.vocab.hasOwnProperty(p_Value.toUpperCase())) {
		sVal = BT.Globals.vocab[p_Value.toUpperCase()];
	}
	if (p_isPlural != undefined && p_isPlural == true) {
		/* behold.. the pluralizer */
		if (sVal.substr(sVal.length - 1).toLowerCase() == 'y') {
			if ((/^[aeiou]$/i).test(sVal.substr(sVal.length - 2).toLowerCase())) {
				sVal += "s";
			}
			else {
				sVal = sVal.substr(0, sVal.length - 1) + "ies";
			}
		}
		else {
			sVal += "s";
		}
	}
	if (p_isPossessive != undefined && p_isPossessive == true) {
		if (sVal.substr(sVal.length - 1).toLowerCase() == 's') {
			sVal += "'";
		} else {
			sVal += "'s";
		}
	}
	if (p_case) {
		switch (p_case) {
			case 1:
				sVal = sVal.toLowerCase();
				break;
			case 2:
				sVal = sVal.toUpperCase();
				break;
			case 3:
				sVal = sVal.toProperCase();
				break;
		}
	}

	return sVal;

};
BT.Angular.Directives.carousel = function ($compile) {
	return {
		restrict: 'A',
		transclude: true,
		replace: true,
		template: '<div class="bt-carousel-wrapper">' +
			'<div class="bt-carousel"><ul  ng-transclude></ul></div>' +
			'<a class="bt-carousel-control prev" ng-click="moveSlides(-1)">‹</a>' +
			'<a class="bt-carousel-control next" ng-click="moveSlides(1)">›</a>' +
			'</div>',
		link: function ($scope, $element, p_attrs, p_ctrl) {

			var _currentSlide = 0,
				_maxSlides = $element.find('.bt-carousel>ul>li').length,
				_paginating = false;

			$element.addClass(p_attrs.carouselClass);
			$element.find('.bt-carousel>ul>li').hide();

			if (p_attrs.carouselPaginate) {
				_paginating = true;
				$element.append('<p class="bt-carousel-pagination" data-jcarouselpagination="true"></p>');
				var $pageList = $element.find('.bt-carousel-pagination'),
					sPagesHtml = '';
				for (iCnt = 1; iCnt <= _maxSlides; iCnt++) {
					sPagesHtml += '<a data-btid="' + iCnt + '">' + iCnt + '</a>';
				}
				$pageList.html(sPagesHtml);

				$element.off('click.jsGotoSlide', '.bt-carousel-pagination>a').on('click.jsGotoSlide', '.bt-carousel-pagination>a', function (el) {
					var nSlide = parseInt($(this).attr('data-btid')) - 1;
					$scope.gotoSlide(nSlide);
				});
			}

			$scope.moveSlides = function (p_direction) {
				_currentSlide = _currentSlide + parseInt(p_direction);
				$scope.gotoSlide(_currentSlide);
			};
			$scope.gotoSlide = function (p_slideNbr) {

				if (p_slideNbr >= _maxSlides) {
					p_slideNbr = _maxSlides - 1;
				} else if (p_slideNbr < 0) {
					p_slideNbr = 0;
				}

				_currentSlide = p_slideNbr;
				$element.find('.bt-carousel>ul>li').hide();
				$element.find('.bt-carousel>ul>li:eq(' + _currentSlide + ')').show();
				if (_paginating) {
					$element.find('.bt-carousel-pagination>a.active').removeClass('active');
					$element.find('.bt-carousel-pagination>a:eq(' + _currentSlide + ')').addClass('active');
				}

				$element.find('.bt-carousel-control.inactive').removeClass('inactive');
				if (p_slideNbr == _maxSlides - 1) {
					$element.find('.bt-carousel-control.next').addClass('inactive');
				} else if (p_slideNbr == 0) {
					$element.find('.bt-carousel-control.prev').addClass('inactive');
				}


			};
			$scope.currentSlide = function () { return _currentSlide; };
			$scope.gotoSlide(0);

		} // end link
	}; // end return
}; //end carousel directive.

BT.Angular.Directives.btHrefSubview = function ($compile) {
	return {
		restrict: 'A',
		link: function ($scope, $element, $attributes) {
			var $myTarget = $($attributes.target);
			if ($myTarget.length > 0) {
				$element.off('click.btHrefSubview').on('click.btHrefSubview', function () {
					var sUrl = $attributes.btHrefSubview;
					$.ajax({
						url: sUrl,
						dataType: 'html',
						success: function (p_shtml) {
							//merge the resulting html into the target object
							$myTarget.html($compile(p_shtml)($scope));
							//if there is an "after html loads" function, then call it on the parent scope before exiting
							if ($attributes.afterLoad) {
								try {
									$scope.$apply($attributes.afterLoad);
								} catch (err) {
									console.warn(err);
								}
							}
						},
						failure: function () {
							console.warn('failed to load ' + sUrl);
						}
					});
				});
			}
		} //end link
	}; //end return
};
BT.Angular.Directives.btSidebarAlert = function () {
	return {
		restrict: 'A',
		link: function ($scope, $element, $attributes) {
			$element.appendTo('#sidebarAlerts');
		} //end link
	}; //end return
};
BT.Angular.Directives.btPopover = function ($compile) {
	return {
		restrict: 'A',
		scope: { onLoad: '&onLoad', popoverUrl: '@btPopover' },
		link: function ($scope, $element, $attributes) {
			var sTarget = $attributes['popoverTarget'];
			$element.bind('click', function () {
				$target = $(sTarget);
				if (sTarget == '' || $scope.popoverUrl == '' || $target.length == 0) {
					return;
				}
				var sHtml = BT.Util.getContent($scope.popoverUrl);
				if (sHtml == '') {
					return;
				}
				$target.html($compile(sHtml)($scope));
				$scope.$apply(function () {
					var addedValues = $scope.onLoad()();
					for (var key in addedValues) {
						if (addedValues.hasOwnProperty(key)) {
							$scope[key] = addedValues[key];
						}
					}
				});
			});
		}
	};
}; /* <a bt-process="{EVENT}" data-icon-css="" data-processing="" data-processing-icon-css="" watch-property="watching...">TEXT</a> */
BT.Angular.Directives.processClick = function ($parse, $rootScope) {

	return {
		restrict: 'A',
		priority: 1,
		link: function ($scope, $element, $attributes, onTransclude) {

			var onClick = ($attributes['btProcess'] ? $attributes['btProcess'] : function () { }),
				watchProperty = ($attributes['watchProperty'] ? $attributes['watchProperty'] : ''),
				originalContent = $element.html(),
				originalIconCss = ($attributes['iconCss'] ? $attributes['iconCss'] : ''),
				processingLabel = ($attributes['processing'] ? $attributes['processing'] : 'Processing...'),
				processingIconCss = ($attributes['processingIconCss'] ? $attributes['processingIconCss'] : originalContent + '...'),
				processingHtml = '<i class="' + processingIconCss + '"></i>' + processingLabel,
				originalHtml = '<i class="' + originalIconCss + '"></i>' + originalContent,
				completedHtml = ($attributes['completed'] ? $attributes['completed'] : ''),
				parentGroup = undefined,
				dropDownElement = undefined,
				originalParentHtml = '',
				originalParentNgBind = undefined;

			if ($element.closest('.btn-group').find('.btn.dropdown-toggle').length > 0) {
				parentGroup = $element.closest('.btn-group');
				if (parentGroup.children('.btn').length > 0) {
					dropDownElement = $(parentGroup.children('.btn')[0]);
					originalParentNgBind = dropDownElement.attr('ng-bind');
					originalParentHtml = dropDownElement.html();
				}
			}

			//this "invoker" syntax is needed in order to get the event object and the scope passed into angular's method.
			var onClickInvoker = $parse(onClick);
			if (originalIconCss == '') {
				originalHtml = originalContent;
				processingHtml = processingLabel;
			}
			if (originalIconCss != '') {
				$element.html(originalHtml);
				$scope.$apply();
			}

			//on click, change the element to show the PROCESSING html and kick off the event handler
			$element.off('click.processing').on('click.processing', function (event) {
				if ($element.hasClass('disabled')) {
					return;
				}
				$element.addClass('is-processing');
				originalHtml = $element.html();
				$element.html(processingHtml).addClass('disabled');

				if (parentGroup) {
					parentGroup.addClass('disabled');
				}
				if (dropDownElement) {
					originalParentNgBind = dropDownElement.attr('ng-bind');
					originalParentHtml = dropDownElement.html();

					dropDownElement.html(processingHtml);
				}

				// RJM_2016-10-12 -- Add a timeout to let other .on('click') events fire 
				//					 (and effect the scope) before invoking the event.
				//					 Specifically in the case of clicking off an autocomplete
				//					 field onto a bt-process button in one click.
				setTimeout(
					function () {
						$scope.$apply(function () {
							onClickInvoker($scope, { $event: event });
						});
					}, 10);
			});

			//if the handler triggers a FAILED event, then dont show "completed"
			$element.off('failed.processing').on('failed.processing', function () {
				if ($element.hasClass('is-processing') == false) {
					return;
				}
				if (dropDownElement) {
					dropDownElement.html(originalParentHtml);
				}
				$element.removeClass('is-processing');
				$element.html(originalHtml).removeClass('disabled');
				if (parentGroup) {
					parentGroup.removeClass('disabled');
				}
				if (!$scope.$$phase && !$scope.$root.$$phase) {
					$scope.$apply();
				}
			});

			//if the handler triggers a "complete" event, then go back to default view
			$element.off('complete.processing').on('complete.processing', function () {
				if ($element.hasClass('is-processing') == false) {
					return;
				}
				$element.removeClass('is-processing');
				if (completedHtml != '') {
					$element.html(completedHtml).addClass('btn-completed');
					if (parentGroup) {
						parentGroup.addClass('btn-completed');
					}
					if (dropDownElement) {
						dropDownElement.html(completedHtml);
					}
					//originalParentHtml

					window.setTimeout(function () {
						$element.html(originalHtml).removeClass('disabled').removeClass('btn-completed').addClass('return');
						if (parentGroup) {
							parentGroup.removeClass('disabled').removeClass('btn-completed').addClass('return');
						}
						if (dropDownElement) {
							dropDownElement.html(originalParentHtml);
							dropDownElement.html($scope.$eval(originalParentNgBind));
						}
						window.setTimeout(function () {
							$element.removeClass('return');
							if (parentGroup) {
								parentGroup.removeClass('return');
							}
						}, 1000);
					}, 2000);
				} else {
					$element.html(originalHtml).removeClass('disabled');
					if (parentGroup) {
						parentGroup.removeClass('disabled');
					}
					if (dropDownElement) {
						dropDownElement.html(originalParentHtml);
						dropDownElement.html($scope.$eval(originalParentNgBind));
					}
				}
				if (!$scope.$$phase && !$scope.$root.$$phase) {
					$scope.$apply();
				}
			});

			//We use endProcessing() to clear out the processing state of clicked elements.  If this scope 
			//hasn't been setup to track processing elements, then set it up here.
			if ($rootScope.processingElements == undefined) {
				$rootScope.processingElements = [];
			}
			var endProcessing = function (pSuccess) {
				var sEventName = '';
				if (pSuccess != undefined && pSuccess == false) {
					sEventName = 'failed.processing';
				} else {
					sEventName = 'complete.processing';
				}
				$.each($rootScope.processingElements, function (idx, el) {
					try {
						if ($(el).hasClass('is-processing')) {
							el.trigger(sEventName);
						}
					} catch (err) {
						//no need to process error if we cant find the element
					}
				});
				//$rootScope.processingElements = [];
			};
			if ($rootScope.endProcessing == undefined) {
				$rootScope.endProcessing = endProcessing;
			}
			//add this element to the list of elements that will revert when $scope.endProcessing() is called.
			$rootScope.processingElements.push($element);

		} //end link
	}; //end return

}; //end processClick

BT.Angular.Directives.ScrollOnFocus = function () {
	return {
		scope: { scrollRight: '&callbackFn' },
		link: function ($scope, $element, $attributes, ctrl) {
			$element.off('keydown').on('keydown',
				function (e) {
					var left = e.currentTarget.offsetLeft;
					var parentLeft = e.currentTarget.offsetParent.offsetLeft;
					var rowId = e.currentTarget.id.split('.');
					var myBtSelect = document.getElementById(rowId[0] + '.' + rowId[1] + '.0');

					if (e.which === 9 || e.which === 39) {
						// right arrow or tab
						if (left + parentLeft > 703) {
							e.preventDefault();
							return false;
						}
					} else if (e.which === 37) {
						// left arrow
						if (left + parentLeft <= 204) {
							e.preventDefault();
							if (myBtSelect) {
								myBtSelect.children[2].focus();
							}
							return false;
						}
					}
				}
			);
		}
	}
}

//double-check="FunctionToRun()" data-confirm="Click YES Below to confirm." container="body" (false - default)
BT.Angular.Directives.doubleCheck = function () {
	return {
		restrict: 'A',
		priority: 0,
		link: function ($scope, $element, $attributes, $controller) {
			var onClick = $attributes['doubleCheck'],
				onBeforeClick = $attributes['beforeClick'],
				sTitleText = $attributes.confirmTitle ? $attributes.confirmTitle : 'Are you sure?',
				sPlacement = $attributes.confirmPlacement ? $attributes.confirmPlacement : '',
				sInputFieldNm = $attributes.confirmInput ? $attributes.confirmInput : '',
				sInputField = '',
				// Appends the popover to a specific element
				sContainer = $attributes.container ? $attributes.container : false,
				parent = $attributes.parent,
				popElementParentId = undefined;

			if (onClick == undefined) {
				onClick = function () { };
			}
			$element.off('click.doublecheck').on('click.doublecheck', function (event) {
				event.stopImmediatePropagation();
				if ($('.popover.in .btn-toolbar.doublecheck').length > 0) { //check if another popover is open
					return false;
				}
				if (onBeforeClick) {
					$scope.$apply(onBeforeClick);
				}
				var popElement = $element;
				if (popElement.is(':hidden') && parent) {
					popElement = $(parent);
				}
				var popPlacement = sPlacement == '' ? 'bottom' : sPlacement,
					popContainer = sContainer;
				if (popElement.offset().top > $(window).height() / 2 && sPlacement == '') {
					popPlacement = 'top';
				}
				var sConfirmationText = $attributes['confirm'];
				if (sConfirmationText == undefined) {
					sConfirmationText = "Click YES below to confirm your selection.";
				}
				if (sInputFieldNm && sInputFieldNm.toLowerCase().indexOf('note') > 0 || sInputFieldNm.indexOf('Nt') > 0) {
					sInputField = '<textarea class="form-control double-check-input"></textarea>';
				} else {
					sInputField = '<input class="form-control double-check-input" />';
				}

				var ieContent = BT.Util.isIEBrowser() && $('.ie-hack-required').length>0 ? '<iframe class="ie-hack-cover" src="about:blank"></iframe ><object class="ie-hack-cover" data="about:blank"></object>' : '';
				var popoverContent = '<div class="double-check-content">' + sConfirmationText.safeValue() +
					(sInputFieldNm == '' ? '' : '<div class="double-check-input">' + sInputField + '</div>') +
					'</div>' +
					'<div class="btn-toolbar doublecheck"><a class="btn btn-sm btn-default js-cancelPopover cancel_btn_sm">No</a>' +
					'<a class="btn btn-sm btn-primary js-confirmPopover">Yes</a>' + ieContent + '</div>';

				var myPopover = popElement.popover({
					title: (sTitleText ? sTitleText.safeValue() : ""),
					placement: popPlacement,
					container: popContainer,
					html: true,
					trigger: 'manual',
					content: popoverContent
				});
				popElement.popover('show');
				var myPop = undefined;
				if (popElement.data('popover')) {
					myPop = popElement.data('popover').$tip;
				} else if (popElement.data('bs.popover')) {
					myPop = popElement.data('bs.popover').$tip;
				}
				popElementParentId = myPop[0] ? '#' + myPop[0].id : undefined;
				//We don't want popover to be cut off
				if (myPop.offset().left < 0) {
					myPop.css('left', '0px');
				} //left-side correction
				if (myPop.parents().hasClass('pull-right') == true) { //right-side correction
					myPop.css({ 'left': 'auto', 'right': '0px' });
					myPop.find('.arrow').css({ 'left': '185px' });
				}
				//event listener for OK/CANCEL (ONLY listening with the popover)	
				myPop.off('click', '.js-cancelPopover').on('click', '.js-cancelPopover', function () {
					popElement.popover('destroy');
					$(document).off('click.doublecheck.off');
				});
				myPop.off('click', '.js-confirmPopover').on('click', '.js-confirmPopover', function () {
					if ($attributes['btProcess']) {
						popElement.popover('destroy');
						$(document).off('click.doublecheck.off');
						$element.trigger('click.processing');
					} else {
						if (sInputFieldNm == '') {
							popElement.popover('destroy');
							$(document).off('click.doublecheck.off');
							$scope.$apply(onClick);
						} else {
							var sEvent = onClick.replace('()', ''),
								myEvent = $scope[sEvent];
							if (myEvent == undefined) {
								popElement.popover('destroy');
								$(document).off('click.doublecheck.off');
								$scope.$apply(onClick);
							} else {
								$scope.$apply(function () {
									var sInput = myPop.find('input.double-check-input,textarea.double-check-input').val();
									if (sInput == '') {
										myPop.find('input.double-check-input,textarea.double-check-input').addClass('input-validation-error');
										return;
									}
									popElement.popover('destroy');
									$(document).off('click.doublecheck.off');
									myEvent(sInput);
								});
							}
						}
					}
				});

				//If the user clicks outside of the popover, then close it...we're done.
				$(document).off('click.doublecheck.off').on('click.doublecheck.off', function (e) {
					if (e.target != popElement[0] && $(e.target).closest('.popover.in').length == 0 && $.contains(popElement[0], e.target) == false) {
						$(document).off('click.doublecheck.off');
						try {
							popElement.popover('destroy');
						} catch (err) {
							//Ignoring this error 
						}
					}
				});
				//If the user clicks another bootstrap dropdown option, destroy the popover.
				$('div.btn-group ul.dropdown-menu li a').click(function (e) {
					if (popElementParentId && e.target != popElement[0] && $(e.target).closest('.popover.in').length == 0 && $.contains(popElement[0], e.target) == false) {
						$(popElementParentId).remove();
					}
				});
				//if jquery/angular kills the element before the user clicks YES/NO, then ditch the auto-dismiss event listenter from document.
				$element.on('$destroy', function () {
					$(document).off('click.doublecheck.off');
				});

			}); //end element.bind
		} //end link
	}; //end return
}; //end doubleCheck


//double-check="FunctionToRun()" data-confirm="Click YES Below to confirm." container="body" (false - default)
BT.Angular.Directives.doubleAction = function () {
	return {
		restrict: 'A',
		priority: 1,
		link: function ($scope, $element, $attributes, $controller) {
			var onClickAction1 = $attributes['action1'],
				onClickAction2 = $attributes['action2'],
				action1Title = $attributes.action1Title,
				action2Title = $attributes.action2Title,
				sConfirmationText = $attributes['confirm'],
				sTitleText = $attributes.confirmTitle ? $attributes.confirmTitle : 'Are you sure?',
				sPlacement = $attributes.confirmPlacement ? $attributes.confirmPlacement : '',
				// Appends the popover to a specific element
				sContainer = $attributes.container ? $attributes.container : false;
			if (sConfirmationText == undefined) {
				sConfirmationText = "Please choose your action.";
			}
			if (onClickAction1 == undefined) {
				onClickAction1 = function () { };
			}
			if (onClickAction2 == undefined) {
				onClickAction2 = function () { };
			}
			$element.off('click.doublecheck').on('click.doublecheck', function (event) {
				event.stopImmediatePropagation();
				var popPlacement = sPlacement == '' ? 'bottom' : sPlacement,
					popContainer = sContainer;
				if ($element.offset().top > $(window).height() / 2 && sPlacement == '') {
					popPlacement = 'top';
				}
				if ($('.popover.in .btn-toolbar.doublecheck').length > 0) { //check if another popover is open
					return false;
				} else {
					var myPopover = $element.popover({
						title: sTitleText.safeValue(),
						placement: popPlacement,
						container: popContainer,
						html: true,
						trigger: 'manual',
						content: '<div class="double-check-content double-action-content">' + sConfirmationText.safeValue() + '</div>' +
							'<div class="btn-toolbar doublecheck doubleaction"><a class="btn btn-sm btn-default active js-action1Popover action1">' + action1Title.safeValue() + '</a>' +
							'<a class="btn btn-sm btn-primary js-action2Popover action2">' + action2Title.safeValue() + '</a><span class="js-cancelPopover icon-close-box closeAction"></span></div>'
					});
					$element.popover('show');
					var myPop = undefined;
					if ($element.data('popover')) {
						myPop = $element.data('popover').$tip;
					} else if ($element.data('bs.popover')) {
						myPop = $element.data('bs.popover').$tip;
					}
					//We don't want popover to be cut off
					if (myPop.offset().left < 0) {
						myPop.css('left', '0px');
					} //left-side correction
					if (myPop.parents().hasClass('pull-right') == true) { //right-side correction
						myPop.css({ 'left': 'auto', 'right': '0px' });
						myPop.find('.arrow').css({ 'left': '185px' });
					}
					//event listener for Close/Action1/Action2 (ONLY listening with the popover)	
					myPop.off('click', '.js-cancelPopover').on('click', '.js-cancelPopover', function () {
						$element.popover('destroy');
						$(document).off('click.doublecheck.off');
					});
					myPop.off('click', '.js-action1Popover').on('click', '.js-action1Popover', function () {
						$element.popover('destroy');
						$(document).off('click.doublecheck.off');
						if ($attributes['btProcess']) {
							$element.trigger('click.processing');
						} else {
							$scope.$apply(onClickAction1);
						}
					});
					myPop.off('click', '.js-action2Popover').on('click', '.js-action2Popover', function () {
						$element.popover('destroy');
						$(document).off('click.doublecheck.off');
						if ($attributes['btProcess']) {
							$element.trigger('click.processing');
						} else {
							$scope.$apply(onClickAction2);
						}
					});
					//If the user clicks outside of the popover, then close it...we're done.
					$(document).off('click.doublecheck.off').on('click.doublecheck.off', function (e) {
						if (e.target != $element[0] && $(e.target).closest('.popover-inner').length == 0 && $.contains($element[0], e.target) == false) {
							$(document).off('click.doublecheck.off');
							try {
								$element.popover('destroy');
							} catch (err) {
								//Ignoring this error 
							}
						}
					});
					//if jquery/angular kills the element before the user clicks Action1/Action2, then ditch the auto-dismiss event listenter from document.
					$element.on('$destroy', function () {
						$(document).off('click.doublecheck.off');
					});
				} //end if/else

			}); //end element.bind
		} //end link
	}; //end return
}; //end doubleAction

BT.Angular.Directives.rangeSlider = function ($timeout) {
	return {
		restrict: 'A',
		replace: true,
		scope: { zoomLevel: "=" },
		template: "<div class='bt-range-selector'>" +
			"<div class='rangeIco plusIco' ng-class='options.orient' ng-click='zoom(1)'></div>" +
			"<input class='zoom-range' ng-class='options.orient' type='range' min='{{options.min}}' max='{{options.max}}' step='{{options.step}}' ng-model='zoomLevel'></input>" +
			"<div class='rangeIco minusIco' ng-class='options.orient' ng-click='zoom(-1)'></div>" +
			"</div>",
		link: function ($scope, elm, attrs) {
			var options = angular.extend($scope.$eval(attrs.btRangeSlider) || {}, {});
			$scope.options = options;

			BT.Message.RememberAsync($scope.options.messageName, null, function (value) {
				var nZoom = BT.Util.parseNumber(value);
				if (!nZoom || nZoom == 0) {
					nZoom = 5;
				}
				$scope.zoomLevel = nZoom;
				$scope.$apply();
			});

			$scope.options.step = $scope.options.step ? $scope.options.step : 1;
			$scope.options.max = $scope.options.max ? $scope.options.max : 6;
			$scope.options.min = $scope.options.min ? $scope.options.min : 1;
			$scope.options.orient = $scope.options.orient ? $scope.options.orient : 'vertical';

			if ($scope.options.orient === 'vertical') {
				// wait until DOM loaded
				$timeout(function () {
					elm.css({
						'-webkit-transform': 'rotate(' + -90 + 'deg)',
						'-moz-transform': 'rotate(' + -90 + 'deg)',
						'-ms-transform': 'rotate(' + -90 + 'deg)',
						'-o-transform': 'rotate(' + -90 + 'deg)',
						'transform': 'rotate(' + -90 + 'deg)',
					});
				}, 50);
			}

			var timeout;

			// in IE angular type='range' doesn't change implicitly
			//if ($.browser.msie) {
			//	var ranger = elm.find("input");
			//	ranger.bind("change", function () {
			//		$scope.$apply(function () {
			//			$scope.zoomLevel = ranger.val();
			//		});
			//	});
			//}

			$scope.$watch('zoomLevel', function (val, oldVal) {
				clearTimeout(timeout);
				timeout = setTimeout(function () { BT.Message.RememberAsync($scope.options.messageName, BT.Util.parseNumber($scope.zoomLevel)); }, 1000);
			});

			$scope.zoom = function (direction) {
				$scope.zoomLevel = BT.Util.parseNumber($scope.zoomLevel);
				if (direction == 1) {
					if ($scope.zoomLevel < $scope.options.max) {
						$scope.zoomLevel += 1;
					}
				} else {
					if ($scope.zoomLevel > $scope.options.min) {
						$scope.zoomLevel -= 1;
					}
				}
			};
		}
	};
};

// <div class="btn-group dropup" bt-button-group options="optionsObject" data-button-class="btn-primary btn-sm" data-button-type="split|single"></div>
// getOptionsFunction returns next options object:
//{
//	btMessageKey: 'BtMessageKey', // Key used to remember default button, used by BT.Message.Remember (optional parameter)
//	items: [{
//			title: 'Save Changes',
//			click: function() {
//				// Button click action goes here
//			}
//		},
//		{
//			title: 'Save + Close',
//			click: function() {
//				// Button click action goes here
//			}
//		}
//	]
//}

BT.Angular.Directives.btButtonGroup = function () {
	var cacheKey = 'btButtonGroupCache';

	return {
		restrict: 'A',
		priority: 10,
		controller: function ($scope, $cacheFactory) {
			$scope.$cache = $cacheFactory.get(cacheKey) || $cacheFactory(cacheKey);
		},
		compile: function compile(tElement, tAttrs, transclude) {
			return {
				pre: function ($scope, $element, $attributes, $controller) {
					var options = { btMessageKey: $attributes.messageKey, mainButtonType: $attributes.buttonType, activateOnLoad: !!$attributes.activateOnLoad, defaultItem: null };
					var mainButton = $element.find('[data-restore-state]');
					var actionElements = [];

					_.each($element.find('.dropdown-menu>li>a'), function (el) { actionElements.push($(el)); });
					_.each(actionElements, function (item) {
						item.off('click.groupAction').on('click.groupAction', function (event) {
							if (options.defaultItem.text() !== item.text()) {
								options.defaultItem = item;
								// remember choise
								if (options.btMessageKey) {
									BT.Message.RememberAsync(options.btMessageKey, (item.attr('bt-long-text') != undefined ? item.attr('bt-long-text') : item.text())); // Remember action on server
									$scope.$cache.put(options.btMessageKey, (item.attr('bt-long-text') != undefined ? item.attr('bt-long-text') : item.text()));
								}
								// change main button
								updateMainButton(item);
							}
						});
					});

					if (options.mainButtonType != 'single') {
						mainButton.off('click.groupAction').on('click.groupAction', function (event) {
							event.stopImmediatePropagation();
							options.defaultItem.trigger('click');
						});
					}

					if (!options.btMessageKey) {
						initDefaultItem();
						return;
					}

					var rememberedItemTitle = $scope.$cache.get(options.btMessageKey);
					if (rememberedItemTitle) {
						initDefaultItem();
						return;
					}

					BT.Message.RememberAsync(options.btMessageKey, null, function (value) {
						rememberedItemTitle = value;
						$scope.$cache.put(options.btMessageKey, rememberedItemTitle);
						initDefaultItem();
						$scope.$apply();
					});


					function updateMainButton(prototype) {
						var children = mainButton.children();
						mainButton.text(prototype.text()).append(children);
					}

					function initDefaultItem() {
						if (rememberedItemTitle) {
							options.defaultItem = _.find(actionElements, function (el) {
								return ((el.text() == rememberedItemTitle) || (el.attr('bt-long-text') != undefined && el.attr('bt-long-text') == rememberedItemTitle));
							});
						}
						if (!options.defaultItem) {
							options.defaultItem = actionElements[0];
						}
						updateMainButton(options.defaultItem);
						if (options.activateOnLoad) {
							setTimeout(function () {
								options.defaultItem.click();
							}, 1);
						}
					}
				}
			};
		},
	};
};

//<div bt-table-search data-table-selector=".report-table" data-highlighted-rows="highlightedRows" data-selected-row-index="rowIndex" data-on-close="someFunc()"></div>
// data-highlighted-rows - object that also passed to the bt-table
// data-selected-row-index - object that also passed to the bt-table

BT.Angular.Directives.btTableSearch = function () {

	var hlgdRowIdx = 0;

	return {
		restrict: 'A',
		scope: { onClose: '&', tableSelector: '@', highlightedRows: '=', selectedRowIndex: '=', searchTerm: '=', searchCount: '=' },
		replace: true,
		template:
			'<div>' +
				'<span class="badge">{{findAmount}}</span>' +
				'<div class="search-box">' +
				'<input type="text" ng-model="findNameText" ng-change="findName()" placeholder="Search" />' +
				'<i class="grid-controls bt-icon-find"></i>' +
				'</div>' +
				'<span class="btn btn-sm btn-icon" ng-click="moveToPrevious()"><i class="icon-box-up"></i></span>' +
				'<span class="btn btn-sm btn-icon" ng-click="moveToNext()"><i class="icon-box-dn"></i></span>' +
				'&nbsp; <span class="btn btn-sm btn-icon" ng-click="resetSearch()"><i class="icon-close-box"></i></span>' +
				'</div>',
		controller: function ($scope, $element) {
			$scope.findNameText = '';
			$scope.findAmount = '';

			$scope.resetSearch = function () {
				$scope.findNameText = '';
				$scope.findName();
				$scope.onClose();
			};

			$scope.$watch('searchCount', function (val) {
				$scope.findAmount = val;
			});

			var searchTimeout;

			$scope.findName = function () {
				clearTimeout(searchTimeout);
				searchTimeout = setTimeout(function () {
					hlgdRowIdx = 0;
					$scope.searchTerm = $scope.findNameText;

					$scope.$apply();
					$("input", $element).focus();
				}, 500);
			};

			$scope.moveToPrevious = function () {
				if (hlgdRowIdx > 0) {
					hlgdRowIdx--;
				}
				selectRow();
			};

			$scope.moveToNext = function () {
				if (hlgdRowIdx < $scope.highlightedRows.length - 1) {
					hlgdRowIdx++;
				}
				selectRow();
			};

			function selectRow() {
				if ($scope.highlightedRows.length > 0) {
					$scope.selectedRowIndex = $scope.highlightedRows[hlgdRowIdx].toString();
				}
			}
		},
		link: function ($scope, $element, $attributes) {
			var _highlightedRows = ($attributes['highlightedRows'] ? $attributes['highlightedRows'] : []);

			if (_highlightedRows) {
				$scope.$watch(_highlightedRows, function (ids) {
					if (ids) {
						$scope.highlightedRows = ids;
						$scope.findAmount = ids.length;
						if (ids.length != 0 && hlgdRowIdx >= 0) {
							$scope.selectedRowIndex = $scope.highlightedRows[hlgdRowIdx].toString();
						} else {
							$scope.selectedRowIndex = undefined;
						}
					}
				});
			}
		}
	};
};

//<div bt-loader="loadingCompleted"></div> 
BT.Angular.Directives.btLoader = function () {
	return {
		restrict: 'A',
		link: function ($scope, $element, $attributes) {
			var loaderId = $attributes['btLoaderId'] || "btLoader";
			var loaderTmpl = '<div class="loader" id="' + loaderId + '" style="display: none;">' +
				'<span class="processing-bar2"></span>' +
				'</div>';
			$element.append(loaderTmpl);

			var loadingCompleted = ($attributes['btLoader'] ? $attributes['btLoader'] : '');
			$scope.$watch(loadingCompleted, function (newVal) {
				if (newVal) {
					$element.children(':not(#' + loaderId + ')').hide();
					$element.find('#' + loaderId + '').show();
				} else {
					$element.find('#' + loaderId + '').hide();
					$element.children(':not(#' + loaderId + ')').show();
				}
			});
		}
	};
};

// <div class="dateTypeToolbar" bt-date-type-toolbar bt-message-key="TimesheetDateRangeSelector" select-action="loadTimesheetTotals"></div>
BT.Angular.Directives.btDateType = function () {
	var cacheKey = 'btDateTypeCache';

	return {
		restrict: 'A',
		scope: { selectCallback: '&' },
		replace: true,
		template:
			'<div> <a ng-repeat="dateRange in dateRanges" class="btn btn-xs btn-info" ng-class="{active:selectedDateRangeType==dateRange.type}"' +
				'ng-click="selectDateRange(dateRange.type)">{{dateRange.title}}</a> </div>',
		controller: function ($scope, $cacheFactory) {
			$scope.$cache = $cacheFactory.get(cacheKey) || $cacheFactory(cacheKey);
		},
		link: function ($scope, $element, $attributes, $controller) {
			var selectCallback = $scope.selectCallback(); // gets function body to call it with parameters
			var btMessageKey = $attributes.btMessageKey;

			$scope.dateRangeType = {
				week: 1,
				month: 2,
				quarter: 3,
				year: 4
			};
			$scope.dateRanges = [
				{ title: "W", type: $scope.dateRangeType.week },
				{ title: "M", type: $scope.dateRangeType.month },
				{ title: "Q", type: $scope.dateRangeType.quarter },
				{ title: "Y", type: $scope.dateRangeType.year }
			];

			var selectDateRange = $scope.$cache.get(btMessageKey);

			if (!selectDateRange) {
				BT.Message.RememberAsync(btMessageKey, null, function (value) {
					selectDateRange = value; // gets users last state
					$scope.$cache.put(btMessageKey, selectDateRange);
					selectDateRangeType();
					$scope.$apply();
				});
			} else {
				selectDateRangeType();
			}

			function selectDateRangeType() {
				$scope.selectedDateRangeType = selectDateRange ? selectDateRange : $scope.dateRangeType.month;

				$scope.selectDateRange = function (dateRangeType) {
					if (dateRangeType !== $scope.selectedDateRangeType) {
						BT.Message.Remember(btMessageKey, dateRangeType); // remembers users last state
						$scope.$cache.put(btMessageKey, dateRangeType);
					}
					$scope.selectedDateRangeType = dateRangeType;
					if (selectCallback && typeof (selectCallback) == 'function') {
						selectCallback(dateRangeType); // calls function body
					}
				};

				selectCallback($scope.selectedDateRangeType); // calls function body
			}
		}
	};
};

// <a bt-settings-href="/Settings/Page/Index?subView=Lookups#/FieldValues/1 (Referense to settings dialog)" callback="FunctionToRunAfterClosing()">
BT.Angular.Directives.btSettingsHref = function () {
	return {
		restrict: 'A',
		link: function ($scope, $element, $attributes, $controller) {
			var url = $attributes.btSettingsHref;
			var callback = $attributes.callback;

			$element.off('click.btSettingsHref').on('click.btSettingsHref', function () {
				BT.AppSettings.loadDialog(url, function () {
					$scope.$apply(callback);
				});
			});
		}
	};
};

// <a bt-href="/Project2">
// bt-href does a full page redirect to the url specified. This directive solves an issue upgrading 
// to angular 1.6. The upgrade was causing all href attributes to be routed with angular, and when the 
// href matched the window.location (regardless of what comes after the #), the page was not being fully 
// redirected. Using this directive forces a full page redirect to the specified url.
BT.Angular.Directives.btHref = function ($window) {
	return {
		restrict: 'A',
		link: function ($scope, $element, $attributes) {
			$element.off('click.btHref').on('click.btHref', function () {
				$window.location = $attributes.btHref;
			});
		}
	};
};

//use like common tooltip + add "bt-tooltip" attribute
//<span bt-tooltip data-container="body" data-trigger="hover" data-title="title"></span>
BT.Angular.Directives.btTooltip = function () {
	return {
		restrict: 'A',
		scope: false,
		link: function ($scope, $element) {
			$($element).popover();
		}
	};
};

//<span bt-tooltip-easy="this is my content"></span>
BT.Angular.Directives.btTooltipEasy = function () {
	return {
		restrict: 'A',
		scope: { content: '@btTooltipEasy' },
		link: function ($scope, $element) {
			$element = $($element);
			if ($scope.content.length) {
				var trigger = $element.attr('data-trigger') || 'hover';
				var container = $element.attr('data-container') || 'body';
				var placement = $element.attr('data-placement') || 'top';

				$element
					.attr('data-content', $scope.content)
					.attr('data-trigger', trigger)
					.attr('data-container', container)
					.attr('data-placement', placement)
					.on('destroyed mousedown', function () {
						$element.popover('hide');
					})
					.popover();
			}
		}
	};
};

// <span bt-tooltip-content-parser='{"ScopeVariableName":"item","ScopeFunctionName":"getItemHtml"}'></span>
// uses a Dirty watch on the scope variable to catch changes, then recalculates the value using a scope level parsing function.
BT.Angular.Directives.btTooltipContentParser = function () {
	return {
		restrict: 'A',
		link: function ($scope, $element, attrs) {

			// vars
			var myScopeVariableName = '',
				myScopeFunctionName = '';

			// parse attrs
			if (attrs && attrs.btTooltipContentParser && attrs.btTooltipContentParser.length) {
				var data = '';
				try {
					data = JSON.parse(attrs.btTooltipContentParser);
				}
				catch (e) { return; }

				if (data && data.ScopeVariableName && data.ScopeFunctionName) {
					myScopeVariableName = data.ScopeVariableName;
					myScopeFunctionName = data.ScopeFunctionName;
				}
			}

			// early exit
			if (!myScopeVariableName || !myScopeFunctionName || !$scope[myScopeVariableName] || typeof $scope[myScopeFunctionName] !== 'function') { return; }

			// setup tooltip.
			$element = $($element);

			// watch the scope variable to parse changes.
			$scope.$watch(myScopeVariableName, function (myScopeVariable) {
				if (!!$scope[myScopeFunctionName] && typeof $scope[myScopeFunctionName] === 'function') {
					// rerender tooltip content
					$element.attr('data-content', $scope[myScopeFunctionName](myScopeVariable));
				}
			}, true);

			var trigger = $element.attr('data-trigger') || 'hover';
			var container = $element.attr('data-container') || 'body';
			var placement = $element.attr('data-placement') || 'top';

			$element
				.attr('data-content', $scope[myScopeFunctionName]($scope[myScopeFunctionName]))
				.attr('data-trigger', trigger)
				.attr('data-container', container)
				.attr('data-placement', placement)
				.on('destroyed mousedown', function () {
					$element.popover('hide');
				})
				.popover();
		}
	};
};

BT.Angular.Directives.multiLine = function () {
	return {
		restrict: 'A',
		scope: { multiLine: '=' },
		link: function ($scope, p_elem, p_attrs, p_ctrl) {
			$scope.$watch('multiLine', function (newVal, oldVal) {
				if (newVal == undefined) {
					return false;
                } else {
                    newVal = BT.Util.cleanHtml(newVal);
					$(p_elem).html(newVal.replace(/\n/g, '<br />'));
				}
			});
		}
	};
};

BT.Angular.Directives.autoGrow = function ($timeout) {

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
			'textIndent',
			'lineHeight'
		],
		oninput = 'oninput',
		onpropertychange = 'onpropertychange',
		test = $(copy)[0];

	// For testing support in old FireFox
	test.setAttribute(oninput, "return");
	// test that line-height can be accurately copied to avoid
	// incorrect value reporting in old IE and old Opera
	$(test).css(lineHeight, '99px');
	if ($(test).css(lineHeight) === '99px') {
		copyStyle.push(lineHeight);
	}

	return function (scope, element, attr) {

		var
			ta = element[0],
			$ta = element,
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
			active = true;
			mirror.value = ta.value;
			mirror.style.overflowY = ta.style.overflowY;

			// Update the width in case the original textarea width has changed
			mirror.style.width = $ta.css('width');
			if (boxOffset == 0) {
				boxOffset = $ta.outerHeight() - $ta.height();
				if (boxOffset == 0 & $ta.height() > 0) {
					boxOffset = 1;
				}
			}

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

			ta.style.height = height + boxOffset + 'px';

		} //end adjust()

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
		if (attr['ngModel']) {
			scope.$watch(attr['ngModel'], function (newVal) {
				adjust();
			});
		}

		// Allow for manual triggering if needed.
		$ta.on('autosize', adjust);

		// The textarea overflow is now hidden.  But Chrome doesn't reflow the text after the scrollbars are removed.
		// This is a hack to get Chrome to reflow it's text.
		ta.value = '';
		ta.value = value;

		scope.$on('$destroy', function () {
			$(mirror).remove();
		});

		// Call adjust in case the textarea already contains text.
		$timeout(function () {
			adjust();
		}, 0);

	}; //end RETURN for link function

};
BT.Angular.Directives.ajaxLoadView = function ($compile) {
	return {
		restrict: 'A',
		link: function (p_scope, p_elem, p_attrs, p_ctrl) {
			var myUrl = p_attrs.ajaxLoad,
				$el = $(p_elem),
				myScope = p_scope;
			if (myUrl == undefined || p_attrs.ngShow == undefined) {
				console.warn('ajax-load attribute cannot existing without an ng-show attribute');
				return;
			}
			$el.attr('data-isEmpty', true);
			p_scope.$watch(p_attrs.ngShow, function (value) {
				if (value && BT.Util.toBoolean($el.attr('data-isEmpty'))) {
					$.ajax({
						url: myUrl,
						type: 'GET',
						success: function (result) {
							if ($el.hasClass('tinyscrollWrapper') && $el.find('.viewport').length > 0) {
								$el.find('.viewport').append($compile(result)(myScope));
							} else {
								$el.append($compile(result)(myScope));
							}
							myScope.$apply();
							$el.attr('data-isEmpty', false);
						}
					});
				}
			});
		}
	};
};
BT.Angular.Directives.datePickerButton = function ($compile, $filter) {
	return {
		restrict: 'A',
		link: function ($scope, $element, p_attrs, p_ctrl) {
			var modelProperty = p_attrs.datePickerButton;

			$element.datepicker();
			$element.off('change.datepicker').on('change.datepicker', function (e) {
				if (_.isFunction($scope[modelProperty])) {
					$scope[modelProperty]($element.data('date'));
				} else if (modelProperty) {
					$scope[modelProperty] = $element.data('date');
				}
				$scope.$apply();
			});
		}
	};
};
BT.Angular.Directives.ClickOut = function () {
	return {
		restrict: 'A',
		link: function ($scope, $element, p_attrs) {
			// using 'mousedown' instead of 'click' because the bootstrap datepicker blocks the 'click' event propgation to this directive
			angular.element(document).off('mousedown').on('mousedown', function (e) {
				var dataElement = $('[data-click-out]');
				if (!dataElement.length || dataElement[0].contains(e.target) || e.target.hasAttribute('click-out')) return;
				dataElement.remove();
				$scope.$apply();
			});
		}
	}
};
BT.Angular.Directives.dualDatePicker = function ($compile, $filter) {
	return {
		restrict: 'A',
		transclude: true,
		template: '<div ng-click="openDualDateDialog()" click-out class="date-select border-box"></div>',
		scope: { title: '@', onUpdate: '&', startDate: '=', endDate: '=', ngHide: '=', viewMode: '@' },
		link: function ($scope, $element, p_attrs, p_ctrl) {

			var myElement = $element.find('.date-select'),
				myPlaceholder = ($element.attr('placeholder') ? $element.attr('placeholder') : 'No Date Range'),
				MyDatePicker = undefined;

			$scope.$watch('startDate', function (newVal, oldVal) {
				myElement.html(getPickerText());
			});
			$scope.$watch('endDate', function (newVal, oldVal) {
				myElement.html(getPickerText());
			});
			$scope.$watch('ngHide', function (newVal, oldVal) {
				if (newVal && MyDatePicker) {
					try {
						MyDatePicker.unload();
						MyDatePicker = undefined;
					} catch (err) { /*ignore;*/
					}
				}
			});

			$scope.openDualDateDialog = function () {
				myScope = this;
				var startTxt = '', endTxt = '', dtSt = undefined, dtEnd = undefined;
				if ($scope.startDate && $scope.startDate.getMonth) {
					dtSt = $scope.startDate;
				} else {
					dtSt = BT.Util.DateFromString($scope.startDate);
				}
				if ($scope.endDate && $scope.endDate.getMonth) {
					dtEnd = $scope.endDate;
				} else {
					dtEnd = BT.Util.DateFromString($scope.endDate);
				}
				startTxt = $filter('date')(dtSt, 'shortDate');
				endTxt = $filter('date')(dtEnd, 'shortDate');

				if (this.title == undefined) {
					this.title = 'Update Date Range';
				}
				MyDatePicker = BT.Dialog.DateRange({
					target: $element,
					actionLabel: myScope.title,
					startDate: startTxt,
					endDate: endTxt,
					viewMode: myScope.viewMode,
					success: function (selectedDates) {
						myScope.startDate = selectedDates.startDate;
						myScope.endDate = selectedDates.endDate;
						myScope.$apply();
						if (myScope.onUpdate) {
							myScope.onUpdate();
						}
					}
				});
			};

			function getPickerText() {
				var startTxt = '', endTxt = '', dtSt = undefined, dtEnd = undefined;
				if ($scope.startDate && $scope.startDate.getMonth) {
					dtSt = $scope.startDate;
				} else {
					dtSt = BT.Util.DateFromString($scope.startDate);
				}
				if ($scope.endDate && $scope.endDate.getMonth) {
					dtEnd = $scope.endDate;
				} else {
					dtEnd = BT.Util.DateFromString($scope.endDate);
				}
				startTxt = $filter('date')(dtSt, 'shortDate');
				endTxt = $filter('date')(dtEnd, 'shortDate');

				myElement.removeClass('empty');
				if (startTxt == null && endTxt == null) {
					myElement.addClass('empty');
					return myPlaceholder;
				}
				if (startTxt != null && endTxt == null) {
					return 'After ' + startTxt;
				}
				if (startTxt == null && endTxt != null) {
					return 'On/Before ' + endTxt;
				}
				return startTxt + ' - ' + endTxt;
			}

			myElement.html(getPickerText());

		} //end of LINK function
	};
};
//Angular DOM SEARCH
BT.Angular.SearchInit = function (elem) {
	//first, we choose which DOM elements to perform the search on 
	//we define them when we make the function call,  e.g. BT.Angular.SearchInit(elem);
	var $_searchItem = elem;
	//second, we define "search" icon behaviour
	$_searchButton = $('.search-box i');
	$('.search-box i').click(function () {
		$('#filter').val('');
		$_searchItem.removeAttr('style');
		$_searchButton.addClass('icon-search').removeClass('icon-remove-sign');
	});
	//finally, we update the search results as the user is typing
	$('#filter').keyup(function () {
		var filter = $(this).val(),
			count = 0;
		$_searchItem.each(function () {
			if ($(this).text().search(new RegExp(filter, "i")) < 0) { // If the list item does not contain the text phrase fade it out
				$(this).css({ opacity: 0, height: 0 });
			} else {
				$(this).css({ opacity: 1, height: 1 }); // Show the list item if the phrase matches and increase the count by 1
				count++;
			}
		});
		//prevent default ENTER key
		$('input').keypress(function (e) {
			var charCode = e.charCode || e.keyCode; //Deterime where our character code is coming from within the event
			if (charCode == 13) { //Enter key's keycode
				return false;
			}
		});
		//"search" icon changes to "remove" icon when typing
		if ($_searchButton.hasClass('icon-search')) {
			$_searchButton.removeClass('icon-search').addClass('icon-remove-sign');
		}
		// Update the count
		var numberItems = count;
		$('#filter-count').text(count + ' items found').show();
		return false;
	});
};
BT.Angular.Directives.onBlur = function () {
	return {
		restrict: 'A',
		link: function ($scope, $element, $attributes) {
			var onClick = $attributes['btBlur'];
			if (onClick == undefined) {
				onClick = function () { };
			}
			$element.off('blur.btOnBlur').on('blur.btOnBlur', function () {
				$scope.$apply(onClick);
			});
		}
	};
};
BT.Angular.Directives.scrollBody = function () {
	return {
		restrict: 'A',
		link: function ($scope, $element, $attributes) {
			var myEl = $($element);
			$(window).off('resize.btScrollTableBody').on('resize.btScrollTableBody', function () {
				if (myEl.closest('body').length == 0) {
					$(document).off('resize.btScrollTableBody');
					return;
				}
				var myBody = myEl.find('tbody'),
					containerHeight = myEl.parent().height(),
					tableTop = myEl.position().top,
					myFoot = myEl.find('tfoot'),
					myFootHeight = (myFoot.length > 0 ? myFoot.height() : 0);

				// Auto size mode that justifies not .flex-column columns width equally
				var justifyColsMode = $attributes.scrollAutoSizeMode && $attributes.scrollAutoSizeMode.indexOf("justifyCols") >= 0;
				// Auto size mode that set height of single row equal to body to make 100% height (not doable by css because of display: block on tbody)
				var singleRowMode = $attributes.scrollAutoSizeMode && $attributes.scrollAutoSizeMode.indexOf("singleRow") >= 0;

				var myHeaderRow = myEl.find('thead tr:last-child');
				var myBodyRow = myEl.find('tbody tr:visible').eq(0);
				var bodyHeight = containerHeight - tableTop - myFootHeight;

				myBody.height(bodyHeight);

				if (singleRowMode) {
					$('td', myBodyRow).css('height', bodyHeight - 1);
				}

				if (myBody.get(0).scrollHeight > myBody.height() && !justifyColsMode) {
					//myBody.css('padding-right', '12px');
				}


				if ($attributes.scrollAutoSize && BT.Util.toBoolean($attributes.scrollAutoSize)) {
					try {
						if (justifyColsMode) {
							var width = myEl.width() - 12;
							var thWidth = $('th.flex-column:first-child', myHeaderRow).outerWidth();
							var colsCount = $('th', myHeaderRow).length;
							var cellWidth = parseInt((width - thWidth) / (colsCount - 1));

							$.each(myBodyRow.children('td').not('.flex-column'), function (idx, el) {
								$(el).css('width', cellWidth + 'px');
							});
							$.each(myHeaderRow.children('th').not('.flex-column'), function (idx, el) {
								$(el).css('width', cellWidth + 'px');
							});
						} else {
							$.each(myBodyRow.children('td'), function (idx, el) {
								$(el).css('width', '');
								var headerTd = $(myHeaderRow.find('th')[idx]),
									elWidth = $(el).outerWidth();
								if (headerTd.outerWidth() > elWidth) {
									$(el).css('min-width', headerTd.outerWidth());
								}
							});
							$.each(myBodyRow.children('td'), function (idx, el) {
								var headerTd = $(myHeaderRow.find('th')[idx]),
									elWidth = $(el).width();
								if (headerTd.width() < elWidth) {
									headerTd.width(elWidth);
								}
							});

							var myFlexEl = myBodyRow.children('td.flex-column');
							if (myFlexEl.length > 0) {
								var nWidth = myEl.width() - myBodyRow.width() + myFlexEl.width();
								myFlexEl.width(nWidth);
								myHeaderRow.find('.flex-column').width(myFlexEl.width());
							}
						}
					} catch (err) {
						console.warn('table column widths could not be manually adjusted');
					}
				}
			});
			window.setTimeout(function () {
				$(window).trigger('resize.btScrollTableBody');
			}, 100);
		}
	};
};
BT.Angular.Directives.ajaxFileUploader = function ($compile, $filter) {
	return {
		restrict: 'A',
		template: '<div class="inputContainer bt-file-upload validated" bt-validate-model="{{scopeProperty}}" ><input type="file" id="{{fileId}}" name="{{fileId}}" accept="image/*, application/pdf"/><span class="upload-button button"></span><span class="button filename">Choose a file to upload...</span></div>',
		replace: true,
		scope: { localModel: '=btFileUploader', scopeProperty: '@btFileUploader', fileId: '@' },
		link: function ($scope, $element, p_attrs, p_ctrl) {

			if ($scope.$parent.fileList == undefined) {
				$scope.$parent.fileList = {};
			}
			// for modals
			if ($scope.$parent.$parent.fileList == undefined) {
				$scope.$parent.$parent.fileList = {};
			}
			if (($scope.fileId == undefined || $scope.fileId == '') && $scope.scopeProperty) {
				$scope.fileId = ($scope.scopeProperty.lastIndexOf('.') > -1 ? $scope.scopeProperty.substr($scope.scopeProperty.lastIndexOf('.') + 1) : $scope.scopeProperty);
			}
			$scope.$parent.fileList[$scope.fileId] = $element.find('input[type=file]');
			// for modals
			$scope.$parent.$parent.fileList[$scope.fileId] = $element.find('input[type=file]');

			$element.off('change.filename focus.filename click.filename', 'input[type=file]').on('change.filename focus.filename click.filename', 'input[type=file]', function () {
				var $this = $(this),
					$val = $this.val(),
					valArray = $val.split('\\'),
					newVal = valArray[valArray.length - 1],
					$button = $this.siblings('.button.filename');
				if ($button.length > 0 && newVal !== '') {
					$button.text(newVal);
					$scope.localModel = newVal;
					$scope.$apply();
				}
			});

			$scope.$watch('localModel', function (newVal, oldVal) {
				if (newVal == undefined || newVal == '') {
					$element.find('.button.filename').text('Select a file to upload...');
					$element.find('input[type=file]').val('');
				}
			});

		}
	};
};
BT.Angular.Directives.btInclude = function ($http, $templateCache, $compile) {
	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			var templateUrl = scope.$eval(attributes.btInclude);
			$.ajax({
				url: templateUrl,
				method: 'GET',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify({ cache: $templateCache })
			}).done(
				function (tplContent) {
					element.replaceWith($compile(tplContent)(scope));
				}
			);
		}
	};
};
BT.Angular.Directives.ngFocus = function ($parse) {
	return function (scope, element, attr) {
		var fn = $parse(attr['ngFocus']);
		element.bind('focus', function (event) {
			scope.$apply(function () {
				fn(scope, { $event: event });
			});
		});
	};
};
BT.Angular.Directives.ngBlur = function ($parse) {
	return function (scope, element, attr) {
		var fn = $parse(attr['ngBlur']);
		element.bind('blur', function (event) {
			scope.$apply(function () {
				fn(scope, { $event: event });
			});
		});
	};
};
BT.Angular.Directives.btSizer = function () {
	return {
		scope: { btSizer: '=', drop: '&' },
		link: function ($scope, $element, p_attrs, p_ctrl) {

			var pageX, minPageX, maxPageX, originalSize;

			$element.bind("dragstart", function (e) {
				originalSize = parseInt($scope.btSizer);
				pageX = e.pageX;
				var shrinkLeewayOnRight = null, stretchLeewayOnRight = null;
				var shrinkLeewayOnLeft = originalSize - 50, stretchLeewayOnLeft = 1000;
				//				if (shrinkLeewayOnRight === null) { shrinkLeewayOnRight = 100000; }
				//				if (shrinkLeewayOnLeft === null) { shrinkLeewayOnLeft = 100000; }
				//				if (stretchLeewayOnRight === null) { stretchLeewayOnRight = 100000; }
				//				if (stretchLeewayOnLeft === null) { stretchLeewayOnLeft = 100000; }
				maxPageX = pageX + stretchLeewayOnLeft;
				minPageX = pageX - shrinkLeewayOnLeft;
				//				originalCanvasWidth = $canvas.width();
			})
				.bind("drag", function (e) {
					var actualMinWidth, d = Math.min(maxPageX, Math.max(minPageX, e.pageX)) - pageX, x, ci;
					$scope.btSizer = originalSize + d;
					$scope.$apply();
				})
				.bind("dragend", function (e) {
					$scope.drop();
					$scope.$apply();
				})
				.bind('mousedown', function (e) {
					try {
						e.originalEvent.preventDefault();
					} catch (err) {
						//ignoring this error
					}
				}); //end of bindings (dragstart/drag/dragend)


		}
	};
};
BT.Angular.Directives.focusSelect = function () {
	return function (scope, element, attr) {
		$(element).off('click.focusSelect').on('click.focusSelect', function (event) {
			$(element).select();
		});
	};
};


BT.Angular.Directives.btEditInPlace = function () {
	return {
		restrict: 'A',
		scope: { value: '=', ngModel: '=', onChange: '&' },
		template: '<span class="text" ng-click="edit()" ng-bind="value" ng-hide="editing"></span><input class="form-control value" ng-model="value" ng-show="editing"></input>',
		link: function ($scope, $element) {
			var $inputElement = $('input', $element);
			var originalValue = angular.copy($scope.value);

			$element.addClass('edit-in-place');
			$scope.editing = false;

			$scope.edit = function () {
				$scope.editing = true;
				$element.addClass('active');
				setTimeout(function () {
					$inputElement.focus();
				}, 100);
			};

			$scope.cancel = function () {
				$scope.editing = false;
				$scope.value = originalValue;
				$scope.$apply();
				$element.removeClass('active');
			};

			$inputElement.off('blur').on('blur', function () {
				$scope.editing = false;
				$scope.$apply();
				if ($scope.onChange && typeof ($scope.onChange) == 'function' && $scope.value !== originalValue) {
					originalValue = angular.copy($scope.value);
					$scope.onChange();
				}
				$element.removeClass('active');
			}).off('keyup').on('keyup', function (e) {
				if (e.which == 13) { // Enter
					$inputElement.trigger('blur');
				} else if (e.keyCode == 27) { // Escape
					$scope.cancel();
				}
			});
		}
	};
};

BT.Angular.Directives.btAutoFocus = function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element) {
			$timeout(function () {
				element[0].focus();
			}, 100);
		}
	};
};

BT.Angular.Directives.btUdf = function ($rootScope) {
	return {
		restrict: 'A',
		templateUrl: BT.Globals.baseUrl + 'UDF',
		scope: {
			UDFSettings: '=btUdf',
			typeValue: '=',
			hasTypeValue: '@typeValue',
			typeUrl: '@'
		},
		replace: true,
		link: function ($scope, $element, $attributes) {
			$scope.UDFValidationErrors = [];
			$scope.deleteUDF = function (UDF) {
				$scope.UDFSettings.btUDFRepo.deleteUDF(UDF);
			};

			$scope.$watch('typeValue', function (newVal, oldVal) {
				if (!$scope.hasTypeValue || newVal == oldVal) {
					return;
				}
				// display only current type fields
				newVal = parseInt(newVal);
				$scope.UDFSettings.UDFGroups = $scope.UDFSettings.btUDFRepo.groupUDF(_.filter($scope.UDFSettings.UDFList, function (UDF) {
					return !UDF.Types.length || UDF.Types.indexOf(newVal) > -1;
				}));
			});

			$scope.belongsToEntity = function (UDF) {
				if ($scope.hasTypeValue) {
					return !UDF.Types.length || UDF.Types.indexOf(parseInt($scope.typeValue)) > -1;
				}
				return true;
			};

			$scope.editUDFSettings = function (event, UDF) {
				event.stopPropagation();
				$scope.editingUDF = UDF;
				var $settingsContainer = $('#editUDFSettings');
				// set new position based on target element
				var pos = $(event.target).parents('.UDFValue').position();
				$settingsContainer.css({ bottom: $('.editUDFList').outerHeight() - pos.top, left: pos.left });
				$settingsContainer.show();

				// set close handlers
				var closeBtn = $settingsContainer.find('.closeBtn');
				closeBtn.on('click.editUDFSettings', function () {
					closeSettings();
				});

				$('html').on('click.editUDFSettings', function (e) {
					if ($(e.target).parents('#editUDFSettings').length == 0) {
						closeSettings();
					}
				});

				function closeSettings() {
					// hide settings popup and unbind events
					$scope.editingUDF = null;
					$settingsContainer.hide();
					$('html').off('click.editUDFSettings');
					closeBtn.off('click.editUDFSettings');
				}
			};

			function showUDF(showUDFList) {
				$scope.UDFSettings.showUDFList = showUDFList;
			}

			$scope.saveUDF = function () {
				if (!validateUDF()) {
					reduceUDFList();
					$scope.UDFSettings.btUDFRepo.saveUDFList($scope.UDFSettings.UDFList, function (UDFList) {
						$scope.$root.endProcessing(true);

						$scope.UDFSettings.UDFList = UDFList;
						$scope.UDFSettings.btUDFRepo.mapValues($scope.UDFSettings.UDFList, $scope.UDFSettings.UDFValues);
						$scope.UDFSettings.originalUDFList = angular.copy($scope.UDFSettings.UDFList);
						if ($scope.hasTypeValue) {
							// display only current type fields
							$scope.UDFSettings.UDFGroups = $scope.UDFSettings.btUDFRepo.groupUDF(_.filter($scope.UDFSettings.UDFList, function (UDF) {
								return !UDF.Types.length || UDF.Types.indexOf($scope.typeValue) > -1;
							}));
						} else {
							$scope.UDFSettings.UDFGroups = $scope.UDFSettings.btUDFRepo.groupUDF($scope.UDFSettings.UDFList);
						}
						showUDF(false);
						$scope.$apply();
					},
						function (result) {
							BT.Angular.getValidationErrors(result, $scope.$parent);
							$rootScope.endProcessing(false);
						});
				} else {
					$rootScope.endProcessing(false);
				}
			};

			$scope.cancelUDF = function () {
				$scope.UDFSettings.UDFList = angular.copy($scope.UDFSettings.originalUDFList);
				$scope.UDFSettings.btUDFRepo.mapValues($scope.UDFSettings.UDFList, $scope.UDFSettings.UDFValues);
				$scope.UDFSettings.UDFGroups = $scope.UDFSettings.btUDFRepo.groupUDF($scope.UDFSettings.UDFList);
				$scope.UDFSettings.btUDFRepo.reloadUDFList = true;
				showUDF(false);
			};

			$scope.editUDF = function () {
				$scope.UDFSettings.originalUDFList = angular.copy($scope.UDFSettings.UDFList);
				showUDF(true);
			};

			$scope.addUDF = function () {
				$scope.UDFSettings.btUDFRepo.addUDF($scope.UDFSettings.UDFList);
			};


			$scope.UDFValueInit = function (UDF) {
				if (UDF.UDFType == $scope.UDFSettings.btUDFRepo.UDFTypes.Lookup && UDF.UDFLookup) {
					UDF.UDFLookupList = UDF.UDFLookup.split(/\s*\n|\|\s*/);
				}

				if ((UDF.value.StrVal == '' || !UDF.value.StrVal) && UDF.UDFDefault && UDF.UDFDefault != 0) {
					if (UDF.UDFType == $scope.UDFSettings.btUDFRepo.UDFTypes.Boolean) {
						UDF.value.StrVal = (UDF.UDFDefault.toLowerCase() == 'yes' || UDF.UDFDefault.toLowerCase() == 'on' || UDF.UDFDefault.toLowerCase() == '1') ? '1' : '0';
					} else {
						UDF.value.StrVal = UDF.UDFDefault;
					}
				}
			};

			$scope.UDFTypeChange = function (UDF) {
				UDF.UDFDefault = '';
				UDF.UDFLen = '';
				if (UDF.value) {
					UDF.value.StrVal = '';
				}
			};

			$scope.lookupChange = function (UDF) {
				if (UDF.UDFLookup) {
					UDF.UDFLookupList = UDF.UDFLookup.split(/\s*\n|\|\s*/);
				}
			};

			function reduceUDFList() {
				var sortOrder = 0;

				_.each($scope.UDFSettings.UDFList, function (udf) {
					udf.SortOrd = sortOrder += 10;
				});
			}

			function validateUDF() {
				$scope.UDFSettings.hasUDFValidationErrors = false;
				$scope.UDFValidationErrors = [];
				_.each($scope.UDFSettings.UDFList, function (item, idx) {
					if (item.IsDeleted) { return; }
					if (item.UDFLabel == '' || item.UDFLabel == undefined) {
						$scope.UDFValidationErrors.push({ Key: 'UDF[' + idx + '].UDFLabel', Value: ['This is a required field. Please fill it before continuing.'] });
						$scope.UDFSettings.hasUDFValidationErrors = true;
					}
					else {
						var labelCount = _.countBy($scope.UDFSettings.UDFList, function (val) { return (val.UDFLabel == item.UDFLabel && !val.IsDeleted) ? 'repeat' : 'unique'; });
						if (labelCount.repeat > 1) {
							$scope.UDFValidationErrors.push({ Key: 'UDF[' + idx + '].UDFLabel', Value: ['This is a unique field. Please change it before continuing.'] });
							$scope.UDFSettings.hasUDFValidationErrors = true;
						}
					}
				});
				return $scope.UDFSettings.hasUDFValidationErrors;
			}
		}
	};
};

/* <div bt-value="activity.ActivityType" data-src="@Url.Action("ActivityType", "picklist", New With {.area = "Rest"})"></div> */
BT.Angular.Directives.btValue = function () {
	return {
		restrict: 'A',
		scope: { src: '@', id: '=btValue' },
		template: '<span>{{displayNm}}<span/>',
		replace: true,
		link: function (scope) {
			var name = BT.Util.GetNameByUrl(scope.src);

			if (!BT.Select.localDataStore[name]) {
				BT.Select.getAjaxData({
					url: scope.src,
					dataType: 'json',
					success: function (ajaxResult) {
						if (ajaxResult) {
							BT.Select.angular.setDataToLocalDataStore(ajaxResult, scope.src);

							findValue();
							scope.$apply();
						}
					}
				});
			} else {
				return findValue();
			}

			function findValue() {
				var value = _.find(BT.Select.localDataStore[name], function (item) { return item.id == scope.id; });
				if (value) {
					scope.displayNm = value.displayNm;
				}
			}
		}
	};
};

BT.Angular.Directives.Popover = function ($compile) {
	return {
		restrict: 'A',
		link: function ($scope, $element, p_attrs, p_ctrl) {
			var sUrl = p_attrs.btPopover,
				myTitle = p_attrs.popoverTitle ? p_attrs.popoverTitle : '',
				sPosition = p_attrs.popoverPlacement ? p_attrs.popoverPlacement : 'bottom',
				sClass = p_attrs.popoverClass ? p_attrs.popoverClass : ''
			isAnimated = p_attrs.popoverAnimation ? true : false,
				delaySeconds = p_attrs.popoverPopupDelay ? parseInt(p_attrs.popoverPopupDelay) : 0,
				myTrigger = p_attrs.popoverTrigger ? p_attrs.popoverTrigger : 'click',
				isAppendToBody = p_attrs.popoverAppendToBody ? true : false,
				$myElement = $element,
				$myParent = isAppendToBody ? $('body') : $element.parent(),
				$myPopover = undefined;

			//We only want to call the server and "get" the popover content if the user clicks on it.
			$myElement.off('click.popover').on('click.popover', function (el) {

				myClickEvent = function () {
					if ($myPopover.hasClass('in')) {
						$myPopover.removeClass('fade in').css({ display: '' });
					} else {
						var myPosition = getPosition();
						$myPopover.addClass('fade in')
							.css({ top: myPosition.top, left: myPosition.left, display: 'block' });
					}
				}

				if ($myPopover == undefined) {
					getPopover(myClickEvent);
				} else {
					myClickEvent();
				}

			});

			function getPopover(p_callback) {
				$.ajax({
					url: sUrl,
					type: 'get',
					success: function (p_result) {
						$myPopover = $('<div class="popover ' + sClass + ' ' + sPosition + '"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>');
						$myPopover.appendTo($myParent);
						$myPopover.find('.popover-content').html($compile(p_result)($scope));
						if (myTitle == '') {
							$myPopover.find('.popover-title').remove();
						} else {
							$myPopover.find('.popover-title').html(myTitle);
						}
						$myPopover.off('click.popover', 'input:radio, input:checkbox').on('click.popover', 'input:radio, input:checkbox', function (el) {
							$myPopover.removeClass('fade in').css({ display: '' });
						});
						p_callback();
					}
				});
			}

			function getPosition() {

				$myPopover.offset({ top: 0, left: 0 });
				var myTop = $myElement.offset().top,
					myLeft = $myElement.offset().left,
					myWidth = $myPopover.width(),
					myHeight = $myPopover.height();
				myPosition = { top: 0, left: 0 };

				switch (sPosition.toLowerCase()) {
					case 'top':
						if (isAppendToBody) {
							myPosition.top = myTop - myHeight - 15;
							myPosition.left = myLeft;
						} else {
							myPosition.top = -1 * (myHeight + 15);
							myPosition.left = 0;
						}
						break;

					case 'bottom':
						if (isAppendToBody) {
							myPosition.top = myTop + $myElement.height() + 15;
							myPosition.left = myLeft;
						} else {
							myPosition.top = $myElement.height() + 15;
							myPosition.left = 0;
						}
						break;

					case 'left':
						if (isAppendToBody) {
							myPosition.top = myTop + ($myElement.height() / 2) - (myHeight / 2);
							myPosition.left = myLeft - myWidth - 15;
						} else {
							myPosition.top = -1 * (myHeight + 15) / 2;
							myPosition.left = -1 * (myWidth + 15);
						}
						break;

					case 'right':
						if (isAppendToBody) {
							myPosition.top = myTop + ($myElement.height() / 2) - (myHeight / 2);
							myPosition.left = myLeft + $myElement.width() + 15;
						} else {
							myPosition.top = -1 * (myHeight + 15) / 2;
							myPosition.left = $myElement.width() + 15;
						}
						break;
				}

				return myPosition;

			} //end of getPosition()

		}
	}
};

BT.Angular.Directives.btWalkthrough = function (communicationService, $window, $rootScope) {
	return {
		restrict: 'EA',
		scope: { callback: '=' },
		link: function ($scope, $element, p_attrs) {
			var walkthroughManager = null;
			var initialUrl = $window.location.href;		
			var getUrl = function (forced) {
				var url = BT.Globals.baseUrl + 'rest/walkthrough/' + p_attrs.id;
				if (p_attrs.subView && p_attrs.subView !== '') { url += '/' + p_attrs.subView; }
				if (forced) {
					url += '?forced=true';
				}
				return url;
			};

			var broadcast = function (status) {
				if (status === BT.Util.Walkthrough.status.disabled) {
					BT.Util.Walkthrough.cacheManager.set('forced', false);
				}
				communicationService.broadcast(communicationService.eventType.walkthroughStatusChanged,
					{
						status: status,
						sender: 'btWalkthrough',
						url: initialUrl
					});
			};

			var initializeWalkthrough = function (walkthrough) {
				if (p_attrs.type === "singlePage" && BT.Util.Walkthrough.inProgress) {
					return;
				}
				walkthroughManager = BT.Util.Walkthrough.initialize(
					{
						id: p_attrs.id,
						subView: p_attrs.subView,
						showOnLoad: true,
						parentScope: $scope,
						options: walkthrough.Settings,
						statusChanged: broadcast
					});
				$rootScope.$on('$routeChangeStart', function () {
					walkthroughManager.hide();
				});
			};

			var load = function (forced) {
				$.ajax({
					url: getUrl(forced),
					type: 'GET',
					success: function (walkthrough) {
						if (!walkthrough.Enable) {
							broadcast(BT.Util.Walkthrough.status.disabled);
						} else {
							broadcast(BT.Util.Walkthrough.status.enabled);
							initializeWalkthrough(walkthrough);
							if ($scope.callback && typeof $scope.callback == "function") {
								$scope.callback();
							}
						}
					}
				});
			};

			var forced = BT.Util.Walkthrough.cacheManager.get('forced');
			load(forced);
			BT.Util.Walkthrough.cacheManager.set('forced', false);

			communicationService.listen(communicationService.eventType.walkthroughStatusChanged, $scope, function (data) {
				if (data.sender !== "btWalkthrough" && data.status === BT.Util.Walkthrough.status.enabled) {
					if (walkthroughManager) {
						walkthroughManager.initialize();
					} else {
						load(true);
						BT.Util.Walkthrough.cacheManager.set('forced', true);
					}
				}
			});
		}
	};
};

BT.Angular.Directives.btSwitchView = function ($window, $location, $timeout) {
	return {
		scope: {
			from: "@",
			to: "@",
			width: "@"
		},
		link: function ($scope, $element, $attr) {
			var redirectFrom = $scope.from;
			var redirectTo = $scope.to;
			var window = angular.element($window);
			window.on('resize', function () {
				var location = $location.path();
				var url = location.replace(redirectFrom, redirectTo);
				$scope.windowWidth = window.width();
				if ($scope.windowWidth <= $scope.width && location != url) {
					$location.path(url);
					$timeout(function () {
						$scope.$apply();
					}, 0);
				}
			});
		}
	};
};

BT.Angular.Directives.createDraggable = function () {
	return {
		restrict: 'A',
		scope: false,
		link: function ($scope, $element, $attr) {
			var mySettings = {
				type: 'scrollTop',
				edgeResistance: 0.5,
				lockAxis: true,
				cursor: 'pointer'
				, throwProps: true
			};
			//throwProps: true (causes the system to break)
			if ($attr.btCreateDraggable && $attr.btCreateDraggable != '') {
				try {
					var myAddedSettings = (new Function('return ' + $attr.btCreateDraggable))();
					angular.extend(mySettings, myAddedSettings);
				} catch (err) {
					//Ignoring this error 
				}
			}
			Draggable.create($element, mySettings);
			TweenMax.set($element, { overflow: 'hidden' })
		}
	};
}

BT.Angular.Directives.AuditUnlockButton = function ($timeout) {
	return {
		restrict: 'A',
		link: function ($scope, $element, $attr) {
			if (BT.Globals.DCAA != true) { return; }
			$timeout(function () {

				//	=".entry-page,.entry-footer" ng-show="IsAuditLocked" ng-cloak="" data-active="IsAuditLocked">Unlock Entry</button>
				var mySelector = $attr.btAuditUnlock,
					myAuditElements = $(mySelector + ' .bt-audit-field'),
					myAuditHiddenElements = $(mySelector + ' .bt-audit-locked');

				myAuditElements.addClass('disabled')
				myAuditElements.attr('disabled', 'disabled');
				myAuditHiddenElements.addClass('ng-hide');

				$element.off('click.AuditLock').on('click.AuditLock', function () {
					myAuditElements.removeClass('disabled')
					myAuditElements.removeAttr('disabled');
					myAuditHiddenElements.removeClass('ng-hide');
					$element.addClass('ng-hide');
				});

			}, 10);
		}
	};
}


BT.Angular.Directives.TrackRowChanges = function ($timeout) {
	return {
		restrict: 'A',
		link: function ($scope, $element, attr) {
			$element.off('keyup.TrackRowChanges').on('keyup.TrackRowChanges', 'input,textarea', function (e) {
				var key = e.which;
				if (key == 32 ||
				(key >= 48 && key <= 57) ||
				(key >= 65 && key <= 90) ||
				(key >= 96 && key <= 111) ||
				(key >= 187 && key <= 192) ||
				(key >= 219 && key <= 222) ||
				key == 8 || key == 46) {
					$scope.$eval(attr.btChangeAll);
					_.defer(function () { $scope.$apply(); });
				}
			});
			$element.off('change.TrackRowChanges').on('change.TrackRowChanges', '.bt_select_box input[type="hidden"]', function (e) {
				$timeout(function () {
					$scope.$eval(attr.btChangeAll);
				}, 1);
			});
		}
	}
}

BT.Angular.Directives.CreateDragdrop = function ($timeout) {
	return {
		scope: {
			dragList: '=btDragdrop',
			sensitivity: '@dragSensitivity',
			animation: '@dragAnimation',
			ghost: '@ghostClass',
			container: '@dragContainer',
			updateMovingItem: '&dragBetweenLists',
			// pagination support
			currentPage: '=', 
			itemsPerPage: '=' 
		},
		restrict: 'A',
		link: function ($scope, $element, $attr) {
			var _originalDragList = undefined;
			var dragX, dragY;
			var dropContainer = $scope.container ? document.getElementsByClassName($scope.container)[0] : void (0);
			if (dropContainer) {
				document.removeEventListener('dragover', getMousePos);
				document.addEventListener('dragover', getMousePos);
				document.removeEventListener('dragleave', getMousePos);
				document.addEventListener('dragleave', getMousePos);
			}

			$timeout(function () { },
				Sortable.create($element[0], {
					group: $attr.btDragdrop,
					filter: '.draggable-pin-bottom',
					handle: '.drag-bar',
					scrollable: true,
					preventOnFilter: false,
					scrollSensitivity: $scope.sensitivity ? $scope.sensitivity : 50,
					animation: $scope.animation ? $scope.animation : 10,
					//onMove fires immediately after a draggable element is moved
					onMove: function (event) {
						return !event.related.classList.contains('draggable-pin-bottom');
					},
					//onUpdate fires when the order of a draggable list changes
					onUpdate: function (event) {
						_originalDragList = JSON.parse(JSON.stringify($scope.dragList));
						$scope.dragList.splice(getNewIndex(event), 0, $scope.dragList.splice(getOldIndex(event), 1)[0]);
						$scope.$apply();
					},
					//onAdd fires when a list with draggable elements has a new element added
					onAdd: function (event) {
						_originalDragList = JSON.parse(JSON.stringify($scope.dragList));
						var toList = $scope.dragList;
						var fromList = Object.propertyByString($(event.from).scope(), $attr.btDragdrop);
						var movingItem = fromList[getOldIndex(event)];
						if (!angular.isUndefined($attr.dragBetweenLists)) { $scope.updateMovingItem()(movingItem, toList); }
						toList.splice(getNewIndex(event), 0, movingItem);
					},
					//onRemove fires when a list with draggable elements has an element removed
					onRemove: function (event) {
						$scope.dragList.splice(getOldIndex(event), 1);
						$scope.$apply();
					},
					//onSort fires when the resort of a draggable list completes
					onSort: function () {
						if (dropContainer) {
							var dims = dropContainer.getBoundingClientRect();
							if (dragY > dims.bottom || dragY < dims.top || dragX < dims.left || dragX > dims.right) {
								$scope.$apply(function () { $scope.dragList = _originalDragList });
							}
						}
						return true;
					}
				})
			);

			function getNewIndex(event) {
				return event.newIndex + getPaginationShift();
			}

			function getOldIndex(event) {
				return event.oldIndex + getPaginationShift();
			}

			function getPaginationShift() {
				return $scope.currentPage ? ($scope.currentPage - 1) * ($scope.itemsPerPage || 0) : 0;
			}

			function getMousePos(e) {
				e = e || window.event;
				dragX = e.pageX;
				dragY = e.pageY;
			}
		}
	};
}

BT.Angular.Directives.UseHotkeyCombos = function () {
	var keyCodes = [
		{ code: 37, name: 'Left', isPressed: false },
		{ code: 39, name: 'Right', isPressed: false },
		{ code: 38, name: 'Up', isPressed: false },
		{ code: 40, name: 'Down', isPressed: false },
		{ code: 13, name: 'Enter', isPressed: false },
		{ code: 45, name: 'Insert', isPressed: false },
		{ code: 17, name: 'Ctrl', isPressed: false },
		{ code: 36, name: 'Home', isPressed: false },
		{ code: 35, name: 'End', isPressed: false },
		{ code: 46, name: 'Delete', isPressed: false },
		{ code: 16, name: 'Shift', isPressed: false },
		{ code: 18, name: 'Alt', isPressed: false }
	];

	return {
		retrict: 'A',
		link: function ($scope, $element, $attr) {
			var options = JSON.parse($attr['btHotkeyCombos']);
			var keyCombinations = _.keys(options);

			$element.off('keyup.UseHotkeyCombos').on('keyup.UseHotkeyCombos', function (e) {
				var keydown = e.which || e.keyCode;
				var thisCode = keyCodes.find(function (x) {
					return x.code === keydown;
				});
				if (thisCode) {
					_.each(keyCombinations, function (keyCombo) {
						if (_.indexOf(keyCombo.split('+'), thisCode.name) >= 0) {
							thisCode.isPressed = false;
						}
					});
				}
			});
			$element.off('keydown.UseHotkeyCombos').on('keydown.UseHotkeyCombos', function (e, c) {
				var keydown = e.which || e.keyCode;
				var thisCode = keyCodes.find(function (x) { return x.code === keydown });
				if (thisCode) {
					_.each(keyCombinations, function (keyCombo) {
						var keyComboMembers = keyCombo.split('+');
						if (_.indexOf(keyComboMembers, thisCode.name) >= 0) {
							thisCode.isPressed = true;
							if (_.every(keyComboMembers, function (keyName) {
									var key = keyCodes.find(function (x) { return x.name === keyName });
									return key.isPressed;
							})) {
								$(e.target.parentElement).scope().$eval(options[keyCombo], { 'event': e });
								e.preventDefault();
								$scope.$apply();
							}
						}
					});
				}
			});
		}
	}
}

BT.Angular.Directives.UseHotkeyNavigation = function ($timeout) {
	var navigate = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, ENTER: 13, ESC: 27 };
	return {
		retrict: 'A',
		link: function ($scope, $element, $attr) {
			$element.off('keydown.UseHotkeyNavigation').on('keydown.UseHotkeyNavigation', 'input,.btn_select,textarea,select', function (e) {
				var target = null;
				var myElement = $(e.currentTarget).parents('.bt-select')[0] ? $(e.currentTarget).parents('.bt-select')[0] : e.currentTarget;
				var btSelectOpen = myElement.classList.contains('open');
				var myLocationStringId = myElement.attributes['id'].value;
				var myLocationIntId = [];
				var inputValue = e.target.setSelectionRange
					? { cursor: e.target.selectionStart, content: e.target.value }
					: { cursor: 0, content: 0 };

				myLocationStringId = myLocationStringId.split('.');
				for (var i = 0; i < myLocationStringId.length; i++) {
					myLocationIntId.push(parseInt(myLocationStringId[i]));
				}
				var groupId = myLocationIntId[0]; var rowId = myLocationIntId[1]; var columnId = myLocationIntId[2];
				var isLeftmostColumn = myLocationIntId[myLocationIntId.length - 1] === 0;

				var keydown = e.which || e.keyCode;
				switch (keydown) {
					case navigate.ESC:
						target = myElement;
						break;
					case navigate.RIGHT:
						if (btSelectOpen || (inputValue.cursor < inputValue.content.length && !myElement.readOnly)) {
							return;
						}
						var moveRight = function () {
							myLocationIntId[myLocationIntId.length - 1]++;
							return document.getElementById(myLocationIntId.toCommaDelimitedString());
						},
					        attempts = 0;
						while (!target && attempts <= 10) {
							target = moveRight();
							attempts++;
						}
						break;
					case navigate.LEFT:
						if (btSelectOpen || isLeftmostColumn || inputValue.cursor > 1) {
							return;
						}
						var moveLeft = function () {
							myLocationIntId[myLocationIntId.length - 1]--;
							return document.getElementById(myLocationIntId.toCommaDelimitedString());
						},
                            attempts = 0;
						while (!target && attempts <= 10) {
							target = moveLeft();
							attempts++;
						}
						break;
					case navigate.UP:
						if (btSelectOpen) {
							return;
						}
						if (rowId === 1) {
							myLocationIntId[1]--;
							target = document.getElementById(myLocationIntId.toCommaDelimitedString());
							if (target) {
								break;
							}
							rowId = myLocationIntId[1];
						}
						if (rowId === 0) {
							if (groupId === 0) {
								return;
							}
							var countRowsInTargetGroup = myElement.attributes['data-hotkey'].value;
							var prevGroupLocationId = [groupId - 1, countRowsInTargetGroup - 1, columnId].toCommaDelimitedString();
							target = document.getElementById(prevGroupLocationId);
						} else {
							myLocationIntId[1]--;
							target = document.getElementById(myLocationIntId.toCommaDelimitedString());
						}
						break;

					case navigate.DOWN:
					case navigate.ENTER:
						if (btSelectOpen) {
							return;
						}
						myLocationIntId[1]++;
						target = document.getElementById(myLocationIntId.toCommaDelimitedString());
						if (!target) {
							var nextGroupLocationId = [groupId + 1, 0, columnId].toCommaDelimitedString();
							target = document.getElementById(nextGroupLocationId);
							if (!target) {
								nextGroupLocationId = [groupId + 1, 1, columnId].toCommaDelimitedString();
								target = document.getElementById(nextGroupLocationId);
							}
						}
						break;
					default:
						target = null;
				}
				if (target) {
					target.focus();
					if (target.classList.contains('bt-select')) {
						target.children[2].focus();
					}
					if (target.value) {
						target.setSelectionRange(0, target.value.length);
					}
					e.preventDefault();
				}
			});
		}
	}
}

BT.Angular.Directives.SynchroniseScroll = function () {
	return {
		restrict: 'A',
		link: function (scope, scroller, attrs) {
			var syncScrollWithElementIdList = attrs.btSyncScroll.split(',');

			_.each(syncScrollWithElementIdList, function (elementIdToSync) {
				var elementToSync = angular.element(document.getElementById(elementIdToSync));
				if (elementToSync) {
					scroller.bind('scroll', function () {
						elementToSync[0].scrollLeft = scroller[0].scrollLeft;
					});
				}
			});
		}
	};
};

// a directive that supports all div.flex-table's. IE. The ability to sync the scrolling of 
// thead and tfoot with a scrolling tbody.
BT.Angular.Directives.flexTable = function () {
	return {
		restrict: 'C',
		link: function (scope, flexTable, attrs) {
			// sync scrolling of elements with div.flex-tbody
			var syncScrollWithElementList = [];
			var tbody = flexTable[0].getElementsByClassName('flex-tbody');
			if (!tbody.length) return;
			tbody = angular.element(tbody);

			// get headers and footers to sync with the div.flex-tbody
			var thead = flexTable[0].getElementsByClassName('flex-thead');
			var tfoot = flexTable[0].getElementsByClassName('flex-tfoot');
			if (thead.length) { syncScrollWithElementList.push(thead); }
			if (tfoot.length) { syncScrollWithElementList.push(tfoot); }

			// bind a scroll command for each element that should scroll with tbody.
			_.each(syncScrollWithElementList, function (elementToSync) {
				var element = angular.element(elementToSync);
				if (element) {
					tbody.bind('scroll', function () {
						element[0].scrollLeft = tbody[0].scrollLeft;
					});
				}
			});
		}
	};
};

// a directive that helps to calculate the number of static and dynamic columns you can fit on a screen before you have to scroll.
BT.Angular.Directives.dynamicColumnCalculator = function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, grid, attrs) {

			// vars
			var appContainerSelector = attrs.appContainerSelector || '.BTAppMainPane',
				appContainerElementsContainingUnusableSpaceSelector = attrs.appContainerElementsContainingUnusableSpaceSelector || '.foo:not(.foo)',
				dynamicColumnsSelector = attrs.dynamicColumnsSelector || '.foo:not(.foo)',
				staticColumnsSelector = attrs.staticColumnsSelector || '.foo:not(.foo)',
				dynamicColumnsMinWidthOverride = parseInt(attrs.dynamicColumnsMinWidthOverride),
				staticColumnsMinWidthOverride = parseInt(attrs.staticColumnsMinWidthOverride),
				minimumAdujustableColumns = 2,
				maximumAdujustableColumns = 36,
				scrollbarWidth = parseInt(attrs.scrollbarWidth) || 12,
				gridContainer = angular.element(grid),
				rowContainerForStaticColumns = undefined,
				rowContainerForDynamicColumns = undefined,
				scope_IsLoadingData_VariableName = attrs.scopeIsLoadingData || 'showLoading',
				scopeItemName = attrs.scopeItemName || 'periodCount';

			// wait for the data. if the data is ready, run the directive code. 
			if (scope[scope_IsLoadingData_VariableName] === undefined || scope[scope_IsLoadingData_VariableName] === false) {
				$timeout(_theDomIsReady); // $timeout to ensure the current scope.$apply finishes (IE: the dom has been rendered).
				return;
			}
			else { // otherwise watch until the data is ready
				scope.$watch(scope_IsLoadingData_VariableName, function (IsLoadingData) {
					if (IsLoadingData === false) {
						$timeout(_theDomIsReady); // $timeout to ensure the current scope.$apply finishes (IE: the dom has been rendered).
					}
				}, true);
			}

			function _theDomIsReady() {
				// early exit incase gridContainer is not an object with at least one element
				if (!gridContainer || !gridContainer.length) { return; }

				// Get ONE row of columns to preform width calculations on.
				rowContainerForStaticColumns = _getElementParent(gridContainer[0], staticColumnsSelector);
				rowContainerForDynamicColumns = _getElementParent(gridContainer[0], dynamicColumnsSelector);

				// early exit if we cant find a parent row container for both static and dynamic columns
				if (!rowContainerForStaticColumns || !rowContainerForDynamicColumns) { return; }

				// On window resize, invoke our resize method.
				window.addEventListener('resize', _calculateColumnCount);
				_calculateColumnCount(); // run it.
			}

			// function to calculate the number of columns that will fill the container
			function _calculateColumnCount() {

				// vars
				var appWidth = _getWidthOfElements(appContainerSelector),
					unusableAppWidth = _getOuterWidthOfElements(appContainerElementsContainingUnusableSpaceSelector), // remove any sidebars the app container may be showing.
					unusableContainerSpace = 0;

				// sometimes the element you've placed the directive on can be larger than the width of the app it's supposed to be 
				// contained within. This calculation ensures we stay well within the width of the div.BTAppMainPane elements.
				// when we go fullscreen, this .BTAppMainPane container grows to the edge of the screen.
				var maxContainerWidth = Math.min((gridContainer.outerWidth()), appWidth - unusableAppWidth)
						- parseInt(gridContainer.css('padding-left')) - parseInt(gridContainer.css('padding-right'))
						- parseInt(gridContainer.css('border-right-width')) - parseInt(gridContainer.css('border-left-width'))
						- scrollbarWidth;

				// get one row of static and dynamic columns
				var listOfStaticColumns = _getElements(rowContainerForStaticColumns[0], staticColumnsSelector),
					listOfDynamicColumns = _getElements(rowContainerForDynamicColumns[0], dynamicColumnsSelector);

				// find the first dynamic column's minimum width;
				var firstDynamicColumnMinWidth = listOfDynamicColumns.length ? parseInt(angular.element(listOfDynamicColumns[0]).css('min-width')) : 0;

				// get the unusable space of the container. Unusable space is characterized by the required space for each static column in the container
				_.each(listOfStaticColumns, function (staticColumn) {
					unusableContainerSpace += staticColumnsMinWidthOverride || parseInt(angular.element(staticColumn).css('min-width'));
				});

				// early exit if we try to divide by zero in the next opperation.
				if (!dynamicColumnsMinWidthOverride && !firstDynamicColumnMinWidth) { return; }

				// divide the remaining space by the dynamic columns minimum width to get the number of columns to fill the available space
				var numberOfDynamicColumns =
					Math.min(Math.max(parseInt(Math.floor(
						((maxContainerWidth - unusableContainerSpace) / (dynamicColumnsMinWidthOverride || firstDynamicColumnMinWidth))
					)), minimumAdujustableColumns), maximumAdujustableColumns);

				// don't scope apply unless we change the number of columns
				if (scope[scopeItemName] === numberOfDynamicColumns) { return; }

				// apply the count change
				$timeout(function () {
					scope[scopeItemName] = numberOfDynamicColumns;
					scope.$apply();
				});
			}

			// gets total outerWidth of all elements returned from selector
			function _getOuterWidthOfElements(selector) {
				var width = 0;
				var elements = _getElements(document, selector);
				if (elements && elements.length) {
					_.each(elements, function (el) {
						if (angular.element(el).css('display') !== 'none') {
							width += angular.element(el).outerWidth();
						}
					});
				}
				return width;
			}

			// gets total width of all elements returned from selector
			function _getWidthOfElements(selector) {
				var width = 0;
				var elements = _getElements(document, selector);
				if (elements && elements.length) {
					_.each(elements, function (el) {
						if (angular.element(el).css('display') !== 'none') {
							width += angular.element(el).width();
						}
					});
				}
				return width;
			}

			// gets total css min-width of all elements returned from selector
			function _getMinWidthOfElements(selector) {
				var width = 0;
				var elements = _getElements(document, selector);
				if (elements && elements.length) {
					_.each(elements, function (el) {
						if (angular.element(el).css('display') !== 'none') {
							width += parseInt(angular.element(el).css('min-width'));
						}
					});
				}
				return width;
			}

			// get elements by css selector
			function _getElements(el, selector) {
				var selected = el.querySelectorAll(selector);
				return selected;
			}

			// get an element's parent by css selector. Will always return the parent of the first found element based on the css selector
			function _getElementParent(el, selector) {
				var selected = _getElements(el, selector);
				if (selected && selected.length) {
					return angular.element(selected[0]).parent();
				}
				return undefined;
			}
		}
	};
};

BT.Angular.Directives.TriggerClick = function () {
	return {
		retrict: 'A',
		link: function ($scope, $element, $attr) {
			$scope.$on('triggerClick', function (event, args) {
				event.preventDefault();
				$element.click();
			});
		}
	}
}
BT.Angular.Directives.GaugeChart = function () {
	return {
		restrict: "E",
		scope: {
			gaugeSize: '@', //size in px
			gaugeOptions: '=',
			gaugeColors: '=',
			gaugeLabels: '=', //labels for hover
			gaugeMax: '@', //value which completes the gauge.
			gaugeValue: '@', //value displayed 0-gaugeMax
			gaugeTitle: '@', //large title under gauge
			valueSuffix: '@', //optional suffix, e.g. '%'
			subTitle: '@'  //smaller text under title
		},
		link: function ($scope, $element, $attrs) {
			$attrs.$observe('gaugeValue', function (value) {
				if (value) {
					if (parseFloat(value) > parseFloat($scope.gaugeMax)) {
						value = $scope.gaugeMax; //override chart data to cap out at max value
					}
					$scope.gaugeData = [parseFloat(value).toFixed(1), parseFloat($scope.gaugeMax - value).toFixed(1)];
				}
			});
		},
		template:
			'<div ng-if="gaugeSize" style="text-align:center;">' +
				'<canvas class="chart chart-doughnut" height="{{gaugeSize}}" width="{{gaugeSize}}" ' +
					'chart-legend="true" chart-options="gaugeOptions" chart-colors="gaugeColors" ' +
					'chart-data="gaugeData" chart-labels="gaugeLabels">' +
				'</canvas> ' +
				'<div class="gauge-pct" style="margin-top:{{(-gaugeSize/2.5)}}px;">{{gaugeValue}}{{valueSuffix}}</div>' +
				'<div class="gauge-label" >{{(gaugeValue)?gaugeTitle:\'No Data\'}}</div>' +
				'<div class="gauge-sublabel">{{subTitle}}</div>' +
			'</div>'
	}
}

BT.Angular.Directives.Print = function () {
	return {
		restrict: "A",
		scope: {
			fullscreen: '@' // true/false
		},
		link: function ($scope, $element, $attrs) {
			var displayFullScreen = $scope.fullscreen && $scope.fullscreen.toLowerCase().trim() == "true" ? true : false;
			$element.off('click').on('click', function () {
				if (displayFullScreen && !$('body').hasClass('fullscreen')) {
					$('body').addClass('fullscreen');
				}
				window.print();

				window.onafterprint = function () {
					if (displayFullScreen) {
						$('body').removeClass('fullscreen');
					}
				}
			});
		}
	}
}

//This directive will not work with flex tables with an ng-repeat for header elements becasue it depends on getting the header elements before ng-repeat is compiled
BT.Angular.Directives.ResizableFlexTable = function ($document) {
	return {
		restrict: 'A',
		scope: {
			resizableBodyRowDetails: '='
		},
		link: function link($scope, $element) {

			var headerRow = $element[0].children[0].children[0],
				prevScreenX,
				activeColumn;

			//Set widths back to original size when switching from fullscreen to regular
			$('.icon-fullscreen-g').off('click').on('click', function (e) {

				if ($('body').hasClass('fullscreen')) {
					adjustColumnWidths("", false, false, false);
				}
			});

			//On new rows set widths of new cells to adjusted widths. On table save, detail rows are reset, so all row widths must be set to header width
			$scope.$watch('resizableBodyRowDetails', function (newVal, oldVal) {

				if (newVal.length < 1 || oldVal.length < 1 || newVal.length < oldVal.length) { return; }
				if (newVal.length > oldVal.length) {
					adjustColumnWidths(0, false, false, true);
					return;
				}
				for (var i = 0; i < $element[0].children[1].children.length; i++) {
					adjustColumnWidths(0, false, i, false);
				}

			}, true); 

			//Foreach resizable header cell, append the resizable handle with mouse events for resizing
			for (var i = 0; i < headerRow.children.length; i++) {

				if (headerRow.children[i].classList.contains('not-resizable')) { return false; }

				var headerColumn = headerRow.children[i];

				var handle = angular.element('<div class="resizable-handle"></div>');

				handle.off('mousedown').on('mousedown', function (event) {

					//Set active column against the parent header cell of the resizable handle
					for (var i = 0; i < headerRow.children.length; i++) {
						if (headerRow.children[i].innerText == event.currentTarget.parentElement.innerText) {
							activeColumn = i;
							break;
						}
					}

					event.stopPropagation();
					event.preventDefault();

					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
				});

				function mousemove(event) {
					event = event.originalEvent || event;

					//Find width of header cell inner col sizer div, and add x-axis movement to width
					var width = headerRow.children[activeColumn].clientWidth,
						movementX = event.movementX || event.mozMovementX || event.screenX - prevScreenX,
						newWidth = width + (movementX || 0);

					prevScreenX = event.screenX;

					adjustColumnWidths(newWidth + 'px', activeColumn, false, false);
				}

				function mouseup() {
					$document.off('mousemove', mousemove);
					$document.off('mouseup', mouseup);
				}

				$(headerColumn).append(handle);
			}

			function adjustColumnWidths(width, column, row, newRow) {
				var detailRows = $element[0].children[1].children;
				for (var i = 0; i < headerRow.children.length; i++) {
					if (!newRow && row === false) {
						i = column || i;
						$(headerRow.children[i]).css({
							'min-width': width
						});

						//Apply new width to min width of column details
						for (var j = 0; j < detailRows.length; j++) {
							$(detailRows[j].children[0].children[i]).css({
								'min-width': width
							});
						}

						if (column !== false) { return; }
					}

					//Set every cell of new detail row to adjusted header row width values
					var headerWidth = headerRow.children[i].style.minWidth;
					var newDetailRow = newRow ? detailRows[detailRows.length - 1] : detailRows[row];
					//If the header row has not been adjusted, return
					if (headerWidth == "" || headerWidth == "auto" || headerWidth == "100%") { continue; }
					$(newDetailRow.children[0].children[i]).css({
						'min-width': headerWidth
					});
				}
			}
		}
	};
}

BT.Angular.Directives.Markdown = function ($compile, $timeout, $rootScope) {
	return {
		retsrict: 'AE',
		transclude: true,
		scope: {
			markdownKey: '@',
			editPlacement: '@',
			maxMarkdownLength: '@',
			isPermitted: '@'
		},
		controller: function ($scope, $element, $compile, $transclude) {
			$scope.validationErrors = [];
			$scope.markdownKey = $scope.markdownKey || "";
			$scope.editPlacement = $scope.editPlacement || "NE";
			$scope.maxMarkdownLength = $scope.maxMarkdownLength || 500;
			$scope.showIcon = false;
			var converter = new showdown.Converter(BT.Showdown.getDefaultOptions());

			$scope.htmlText = BT.Angular.getVocabValue($scope.markdownKey);
			if (!$scope.htmlText || $scope.htmlText.trim().toLowerCase() == $scope.markdownKey.trim().toLowerCase()) {
				getTranscludedHtml();
			}
			var original = $scope.htmlText;
			$scope.markdownText = converter.makeMarkdown($scope.htmlText);

			$scope.edit = function () {
				original = $scope.htmlText;
				$scope.editContainerElement.css('min-width', $element[0].clientWidth);
				$scope.editContainerElement.css('min-height', $element[0].clientHeight);
				$element.addClass('active');
				$scope.editContainerElement[0].children[1].focus();
				$scope.showIcon = false;
			}

			$scope.cancel = function () {
				$scope.markdownText = converter.makeMarkdown(original);
				$element.removeClass('active');
				$scope.showIcon = true;
			}

			$scope.save = function () {
				$scope.hasValidationErrors = false;
				var newHtml = converter.makeHtml($scope.markdownText);
				validateInputLength(newHtml);

				if ($scope.hasValidationErrors) {
					$rootScope.endProcessing(false);
					return;
				}
				$.ajax({
					url: BT.Globals.baseUrl + 'rest/Settings/Markdown/',
					method: 'post',
					data: JSON.stringify({ HTMLTag: $scope.markdownKey, VocabVal: newHtml }),
					contentType: 'application/json',
					success: function (result) {
						$scope.htmlText = result;
						$scope.markdownText = converter.makeMarkdown(result);
						$scope.setAndCompileHtml($scope.displayElement, $scope.htmlText);
						BT.Globals.vocab[$scope.markdownKey] = result; //Need to manually set this here, since BT.Globals.vocab will not reset until hard-refrsh

						$rootScope.endProcessing(true);
						$element.removeClass('active');
						$scope.showIcon = true;
					},
					error: function (result) {
						$rootScope.endProcessing(false);
						BT.Angular.getValidationErrors(result, $scope);
					}
				});
			}

			$scope.setAndCompileHtml = function (el, text) {
				el.html(text);
				$compile(el.contents())($scope);
			}

			$scope.$watch('markdownText', function (newVal, oldVal) {
				if (newVal !== undefined) {
					$scope.setAndCompileHtml($scope.previewElement, converter.makeHtml(newVal));
				}
			});

			function getTranscludedHtml() {
				$transclude($scope, function (clone) {
					var text = "";
					for (var i = 0; i < clone.length; i++) {
						if (clone[i].tagName == 'BT-MARKDOWN') { continue; }
						text += clone[i].outerHTML || '';
					}
					$scope.htmlText = text;
				});
			}

			function validateInputLength(newHtml) {
				if (newHtml.length <= $scope.maxMarkdownLength) { return; }

				$scope.validationErrors.push({ Key: "markdownText", Value: ['The text can not contain more than ' + $scope.maxMarkdownLength.toString() + ' characters.  Please correct it before continuing.'] });
				$scope.hasValidationErrors = true;
			}
		},
		link: function ($scope, $element) {
			$element.addClass('bt-markdown fixed-panel');
			$scope.displayElement = angular.element($element.children()[0]);
			$scope.editContainerElement = angular.element($element.children()[1]);
			$scope.pencilElement = angular.element($element.children()[2]);
			$scope.previewElement = angular.element($scope.editContainerElement.children()[2]);
			$scope.canEditSettings = $scope.isPermitted === "true";

			$scope.setAndCompileHtml($scope.displayElement, $scope.htmlText);
			$timeout(setPencilPlacement);

			//Event listeners
			var hideEditIcon = undefined;
			$element.off('mouseleave').on('mouseleave', function (e) {
				clearTimeout(hideEditIcon);
				if ($element.hasClass('active')) { return; }
				hideEditIcon = setTimeout(function () { $scope.$evalAsync($scope.showIcon = false); }, 3000);
			});
			$element.off('mouseenter').on('mouseenter', function (e) {
				clearTimeout(hideEditIcon);
				if ($element.hasClass('active')) { return; }
				$scope.$evalAsync($scope.showIcon = true);
			});

			function setPencilPlacement() {
				switch ($scope.editPlacement.toUpperCase()) {
					case 'N':
						$scope.pencilElement.css('right', $element[0].clientWidth / 2);
						$scope.pencilElement.css('top', 0);
						break;
					case 'NE':
						$scope.pencilElement.css('right', 0);
						$scope.pencilElement.css('top', 0);
						break;
					case 'E':
						$scope.pencilElement.css('top', $element[0].clientHeight / 2);
						$scope.pencilElement.css('right', 0);
						break;
					case 'SE':
						$scope.pencilElement.css('bottom', 0);
						$scope.pencilElement.css('right', 0);
						break;
					case 'S':
						$scope.pencilElement.css('right', $element[0].clientWidth / 2);
						$scope.pencilElement.css('bottom', 0);
						break;
					case 'SW':
						$scope.pencilElement.css('bottom', 0);
						break;
					case 'W':
						$scope.pencilElement.css('top', $element[0].clientHeight / 2);
						break;
					case 'NW':
						$scope.pencilElement.css('left', 0);
						$scope.pencilElement.css('top', 0);
						break;
					default:
						$scope.pencilElement.css('right', 0);
						$scope.pencilElement.css('top', 0);
						break;
				}
			}
		},
		template:
			'<div class="fixed-panel-flex display-text" ></div>' +
			'<div class="edit-container fixed-top" bt-validate="validationErrors">' +
				'<textarea class="fixed-top-body" ng-model="markdownText"></textarea>' +
				'<label>Preview:</label><div class="preview-box fixed-top-body" disabled></div>' +
				'<div class="flex-toolbar">' +
					'<button type="button" ng-click="cancel()" class="btn btn-sm btn-default">Cancel</button>' +
					'<a bt-process="save()" data-processing="Save..." data-completed="Saved" class="btn btn-sm btn-primary">Save</a>' +
				'</div>' +
			'</div>' +
			'<i class="icon-bt-edit3" ng-show="showIcon && canEditSettings" ng-click="edit()"></i>'
	}
}

BT.Angular.Directives.EditReportColumns = function ($window) {
		return {
			restrict: "A",
			scope: {
				defaultColumnList: '=',
				reportType: '=',
				allReportFields: '=',
				activeColumnList: '=',
				saveColumnSettings: '&',
				selectableColumns: '=',
				requiredColumns: '='
			},
			link: function($scope, $element) {
				
				BT.Report = BT.Report ? BT.Report : {};
				BT.Report.EditReportColumnsContainer = undefined;

				$element.off('click.bttoolbar').on('click.bttoolbar', function (e) {
					if (!$scope.defaultColumnList | !$scope.reportType | !$scope.allReportFields | !$scope.activeColumnList) { return; }
					editGridColumns($element);
				});
				
				function editGridColumns(element) {

					if (BT.Report.EditReportColumnsContainer) {
						BT.Report.EditReportColumnsContainer.remove();
						BT.Report.EditReportColumnsContainer = undefined;
					}

					$('.bt-filter_wrapper').remove();

					//Add an event listener to the DOM to remove the editor if the user clicks off of it.
					$(document).off('mousedown').on('mousedown', function (e) {
						var editor = $('.bt-filter_wrapper');
						if (!editor.length || editor[0].contains(e.target)) { return; }
						editor.remove();
					});

					var sDivTemplate = $('<div class="bt-filter_wrapper edit-columns" data-click-out>' +
						'	<div class="bt-filter_content"><div class="bt-filter_checked_content"></div></div>' +
						'	<div class="button-container"><button class="js-cancel btn btn-xs btn-default">Cancel</button><div class="pull-right"><button id="cmdEditColumns_clear" type="button" class="btn btn-xs btn-default">RESET</button><button type="button" class="btn btn-xs btn-primary" id="cmdEditColumns_apply">APPLY</button></div></div>' +
						'</div>');
					var myEl = $(element);

					BT.Report.EditReportColumnsContainer = $(sDivTemplate).appendTo('body').hide();

					////setup buttons (cancel, apply, reset)
					BT.Report.EditReportColumnsContainer.on('click', '.js-cancel', function () { cancel(); });
					BT.Report.EditReportColumnsContainer.on('click', '#cmdEditColumns_clear', function () { reset(); });
					BT.Report.EditReportColumnsContainer.on('click', '#cmdEditColumns_apply', function () { save(); });
					BT.Report.EditReportColumnsContainer.on('click', 'checkedList, .sortable input', function () { unselectColumn(); });
					BT.Report.EditReportColumnsContainer.on('click', '.uncheckedList input', function (event) { selectColumn(event); });

					function populateColumnList() {
						if (BT.Report.EditReportColumnsContainer == undefined) { return; }

						if ($scope.allReportFields && $scope.allReportFields.length > 0) {
							formatListItems();
						} else {
							getAllFields(function () { formatListItems(); });
						}
					}

					function formatListItems() {
						var sCurrentGroup = '',
						sItemSelectList = $("<ul></ul>").addClass("checkedList overflow sortable unselectable"),
						sItemUnselectList = $("<ul></ul>").addClass("checkedList uncheckedList overflow");

						sItemSelectList.append($("<li></li>").addClass("heading").addClass("unsortable").text("Selected Fields"));

						$.each($scope.activeColumnList, function (idx, itemFldNm) {
							var field = _.find($scope.allReportFields, function (fld) {
								return fld.FldNm.toLowerCase() === itemFldNm.toLowerCase();
							});

							if (field != undefined) {
								sCurrentGroup = addListItem(sItemSelectList, sCurrentGroup, field, true);
							}
						});

						$.each($scope.allReportFields, function (idx, item) {

							if (item.CatNm && sCurrentGroup != item.CatNm && item.CatNm != '') {
								sCurrentGroup = item.CatNm;
								sItemUnselectList.append($("<li></li>").addClass("heading").addClass("unsortable").text(item.CatNm));
							}
							sCurrentGroup = addListItem(sItemUnselectList, sCurrentGroup, item, false);
						});

						var filterContent = $(".bt-filter_content", sDivTemplate);

						$('.bt-filter_checked_content', filterContent).append(sItemSelectList);
						$(filterContent).append(sItemUnselectList);
						$('.bt-tooltip', filterContent).tooltip();

						showContainer();
					}

					function addListItem(sItemList, sCurrentGroup, item, isSelectedFields) {

						var bHasNote = false;
						if (item.Nt && item.Nt != '') { bHasNote = true; }

						var li = $("<li></li>");
						var label = $("<label></label>").addClass("checkbox").text(item.Label);
						var checkBox = $("<input></input>").attr("type", "checkbox").val(item.FldNm);

						if (bHasNote) {
							li.addClass("bt-tooltip").attr('data-container', 'body').attr('data-placement', 'left').attr('data-delay', '{show: 1000, hide: 100}').attr('data-html', 'true').attr('data-title', BT.htmlDecode(item.Nt));
						}

						if (!isSelectedFields && item.selected) {
							li.addClass("invisible");
						} else {
							checkBox.prop("checked", item.selected);
						}

						if (item.required) {
							checkBox.attr("disabled", true);
						}

						if (isSelectedFields) {
							if (item.required) {
								label.addClass("not-allowed");
							}
							li.addClass("underline");
						}

						li.append(checkBox);
						li.append(label);

						sItemList.append(li);

						return sCurrentGroup;
					}

					function showContainer() {
						//Set container width
						var nWorkingWidth = BT.Report.EditReportColumnsContainer.width();
						var nMaxWidth = myEl.offset().left - 5;
						if (nMaxWidth > 300) { nMaxWidth = 300; }
						if (nWorkingWidth > nMaxWidth) { nWorkingWidth = nMaxWidth; }
						if (nWorkingWidth < 225) { nWorkingWidth = 225; }

						BT.Report.EditReportColumnsContainer.width(nWorkingWidth);

						//Set container height
						var nButtonHeight = BT.Report.EditReportColumnsContainer.find(".button-container").outerHeight(true);
						BT.Report.EditReportColumnsContainer.height('auto');
						BT.Report.EditReportColumnsContainer.find(".bt-filter_content").height('auto');

						//Position filterDivContainer below the filter button (right aligned to the column)
						BT.Report.EditReportColumnsContainer.show();
						var buttonOffset = myEl.offset();
						buttonOffset.top += myEl.height() + 5;
						buttonOffset.left -= BT.Report.EditReportColumnsContainer.outerWidth(false) - myEl.outerWidth(true) + 5;
						BT.Report.EditReportColumnsContainer.offset(buttonOffset);
					}

					function cancel() {
						BT.Report.EditReportColumnsContainer.remove();
						BT.Report.EditReportColumnsContainer = undefined;
					} 

					function reset() {
						$.each(BT.Report.EditReportColumnsContainer.find('ul.checkedList input:checked'), function (idx, item) {
							item.checked = false;
						});

						setColumnListToDefault();
									
						$scope.$apply();
					} 

					function setColumnListToDefault() {
						if ($scope.defaultColumnList && $scope.defaultColumnList.length > 0) {
							$scope.activeColumnList = angular.copy($scope.defaultColumnList);
							selectColumns($scope.activeColumnList);
							$scope.$apply();
							save();
						}
					}

					function save() {
						if ($scope.saveColumnSettings && typeof ($scope.saveColumnSettings) == 'function') {
							$scope.saveColumnSettings();
						}
						selectColumns($scope.activeColumnList);
						$scope.$apply();
						BT.Report.EditReportColumnsContainer.remove();
					} 

					function unselectColumn() {
						var unSelectedItem = $(".uncheckedList input[value=" + $(event.target).val() + "]", BT.Report.EditReportColumnsContainer);
						unSelectedItem.parents("li").removeClass("invisible").prop("checked", false);
						$(event.target).parents("li").remove();
						$(".tooltip").remove();

						var index = $scope.activeColumnList.indexOf(unSelectedItem.val());
						$scope.activeColumnList.splice(index, 1);
					}

					function selectColumn(event) {
						var li = $(".uncheckedList input[value=" + $(event.target).val() + "]", BT.Report.EditReportColumnsContainer).parents("li").clone();
						li.addClass("underline");

						var lastUncheckli = $(".sortable li:last:has(input:disabled)", BT.Report.EditReportColumnsContainer);
						if (lastUncheckli.length != 0 && $(".sortable li.underline", BT.Report.EditReportColumnsContainer).length > 1) {
							$(lastUncheckli).before(li);
						} else {
							$(".sortable", BT.Report.EditReportColumnsContainer).append(li);
						}

						$(event.target).prop("checked", false).parents("li").addClass('invisible');
						$(".tooltip").remove();
						$(".bt-tooltip", BT.Report.EditReportColumnsContainer).tooltip();

						if (!_.contains($scope.activeColumnList, $(event.target).val())) {
							$scope.activeColumnList.push($(event.target).val());
						}
					}

					populateColumnList();

					function selectColumns(columnList) {
						$.each($scope.allReportFields, function (idx, item) {
							var selected = $.grep(columnList, function (fldNm, i) {
								return fldNm.toLowerCase() === item.FldNm.toLowerCase();
							});
							item.selected = (selected.length > 0 ? true : false);
							item.required = false;
							if ($scope.requiredColumns && $scope.requiredColumns.length > 0) {
								$.each($scope.requiredColumns, function (requiredIdx, requiredItem) {
									if (item.FldNm.toLowerCase() == requiredItem.toLowerCase()) {
										item.required = true;
										return false;
									}
								});
							}
						});
					}

					function getAllFields(callback) {
						if(!$scope.reportType) { return; }

						$.ajax({
							url: BT.Globals.baseUrl + 'rest/report/ObjectGridFields/' + $scope.reportType,
							type: 'get',
							success: function (columnResult) {
								if ($scope.selectableColumns && $scope.selectableColumns.length > 0) {
									$scope.allReportFields = _.reject(columnResult, function(item) { return !_.contains($scope.selectableColumns, item.FldNm); });
								} else {
									$scope.allReportFields = columnResult;
								}
								
								if (!$scope.activeColumnList || $scope.activeColumnList.length === 0) {
									selectColumns(defaultColumnList);
								} else {
									selectColumns($scope.activeColumnList);
								}

								if (callback) { callback(); }
								$scope.$applyAsync();

							}
						});
					}
				}
			}
		};
}

/* Add the class ie-modal-hack to your uibModal windowClass property to keep it ontop of other iframes and objects */
BT.Angular.Directives.IEModalHack = function () {
	return {
		restrict: 'C',
		link: function (scope, $element, p_attrs) {
			//This script is used to protect modal from being covered by iframe (only a valid problem in IE6-9)
			if (BT.Util.isIEBrowser()) {
				$($element[0].querySelector('.modal-dialog')).append('<iframe class="ie-hack-cover" src="about:blank"></iframe ><object class="ie-hack-cover" data="about:blank"></object>');
			}
		}
	};
};

// Common