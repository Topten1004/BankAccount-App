/** jquery.event.destroy.js ~ v1.0 */

;(function($) {
	$.event.special.destroyed = {
		remove: function(o) {
			if (o.handler) {
				o.handler();
			}
		}
	};
})(jQuery);