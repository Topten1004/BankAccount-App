BT.Angular.parentWindowList = [];
BT.Angular.registerParentWindowService = function ($app) {

	$app.factory('$parentWindow', function () {
		return {
			openWindow: function ($el, sUrl) {
				var sGuid = "childWindow_" + Math.round(1000000 * Math.random()),
					myNewWindow = window.open(sUrl, sGuid);
				myNewWindow.btParent = window;
				BT.Angular.parentWindowList.push({
					guid: sGuid,
					el: $el,
					win: myNewWindow,
					gutCheck: setInterval(function () {
						if (myNewWindow.closed) {
							var myWindowIdx = -1;
							$.each(BT.Angular.parentWindowList, function (seekIdx, seekEl) {
								if (seekEl.guid == sGuid) {
									clearInterval(seekEl.gutCheck);
									myWindowIdx = seekIdx;
									return false;
								}
							});
							if (myWindowIdx > -1) {
								BT.Angular.parentWindowList.splice(myWindowIdx, 1);
							}
						}
					}, 5000)
				});

			},
			closeMe: function (pExecuteCallback) {
				if (!window.btParent) {
					window.close();
					return;
				}
				
				var myParentsChildren = window.btParent.BT.Angular.parentWindowList;
				var sWindowName = window.name,
					myWindowIdx = -1,
					myElement = undefined;
				$.each(myParentsChildren, function (idx, el) {
					if (el.guid == sWindowName) {
						myWindowIdx = idx;
						myElement = el;
						return false;
					}
				});
				if (myElement) {
					clearInterval(myElement.gutCheck);
					myParentsChildren.splice(myWindowIdx, 1);
					if (pExecuteCallback) { myElement.el.trigger('childWindowClosed'); }
					myElement.win.close();
				}
			}
		}
	});


}

BT.Angular.Directives.childHref = function ($parentWindow) {
	return {
		restrict: 'A',
		link: function ($scope, $element, pAttributes) {

			var sUrl = pAttributes.btChildHref,
				callbackFunction = pAttributes.onClose;

			$element.off('click.childHref').on('click.childHref', function () {
				try {
					sUrl = $scope.$eval(sUrl);
				} catch (err) {}
				$parentWindow.openWindow($element, sUrl);
			});

			$element.off('childWindowClosed').on('childWindowClosed', function () {
				$scope.$eval(callbackFunction);
			});

		}
	}
}
