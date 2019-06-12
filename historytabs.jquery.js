(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        factory(require("jquery"));
    } else {
        factory(jQuery);
    }
}(function($) {
    $.fn.historytabs = function(options) {
        options = $.extend({
            tab_wrapper: '.nav-tabs', // Class of the element containing the tabs - default from Bootstrap4
            tab: '[data-toggle=tab]', // Class of the tabs - default from Bootstrap4
        }, options);

        var wrapper = this,
            canUseHistory = (history && history.pushState);

        var change = function() {
            $(wrapper).trigger('historytabs.change');
        };

        if (canUseHistory) {
            window.onpopstate = function() {
                // don't use click otherwise it ruins the history
                var tabtouse = (location.hash.length == 0) ? $(options.tab_wrapper, wrapper).find(options.tab).first() : $('[href="' + location.hash + '"]', wrapper);

                tabtouse.tab('show');
                change();
            };

            if (location.hash.length) {
                window.onpopstate();
            }
        }

        $(options.tab_wrapper, wrapper).on('click', options.tab, function() {
            if (canUseHistory) {
                history.pushState($(this).attr('href'), null, $(this).attr('href'));
            } else {
                location.hash = $(this).attr('href');
                change();
            }
        });

        // Return the element to allow chaining
        return wrapper;
    };
}));
