(function($) {
	$.fn.ajaxBootstrapTabs = function(options) {

		// Default settings
		var settings = $.extend({
			default_tab: null, // The default tab id. Normally retrieved by getting the first tab.
			tab_wrapper: '', // Class of the element containing the tabs
			tab: '', // Class of the tabs
			tab_active: '', // Class applied to active tabs
			tab_inactive: null, // Class applied to inactive tabs - by default, this is null
			pane_wrapper: '', // Class of the element containing the tab panes
			pane: '', // Class of the tab panes
			pane_active: '', // Class applied to active tab panes
			pane_inactive: null, // Class applied to inactive tab panes - by default, this is null
			link: '', // Class for page tab links
		}, options);

		// Sending element
		var element = this;

		// Previous history record
		var previous_id = null;

		// Default tab
		if(!Boolean(settings.default_tab)) {
			var default_tab = $(settings.pane_wrapper).find(settings.pane + ':first-child').attr('id');
		} else {
			var default_tab = settings.default_tab.replace(/^\#/, '');
		}

		// Core method
		var change = function(id, history) {

			// If history is not set, by default it should be allowed
			history = history || true;

			// Remove hash from before id
			id = id.replace(/^\#/, '');

			// Initialise the tab wrapper
			tab_wrapper = $(settings.tab_wrapper);

			if(!tab_wrapper.find(settings.tab + "[href$='#" + id + "']").length || !$(settings.pane_wrapper + ' ' + settings.pane + '#' + id).length) {
				id = default_tab;
			}

			// If tab_inactive is not set to a class name
			if(!Boolean(settings.tab_inactive)) {

				// Remove the active class from all tabs
				tab_wrapper.find(settings.tab)
					.removeClass(settings.tab_active.replace(/^\./, ''));

				// Add the active class to the target tab
				tab_wrapper.find(settings.tab + "[href$='#" + id + "']")
					.addClass(settings.tab_active.replace(/^\./, ''));

			} else {

				// Remove the active class from all tabs and add the inactive class
				tab_wrapper.find(settings.tab)
					.removeClass(settings.tab_active.replace(/^\./, ''))
					.addClass(settings.tab_inactive.replace(/^\./, ''));

				// Add the active class to the target tab and remove the inactive class
				tab_wrapper.find(settings.tab + "[href$='#" + id + "']")
					.addClass(settings.tab_active.replace(/^\./, ''))
					.removeClass(settings.tab_inactive.replace(/^\./, ''));

			}

			// If pane_inactive is not set to a class name
			if(!Boolean(settings.pane_inactive)) {

				// Add the active class to the target pane and remove the active class from all others
				$(settings.pane_wrapper + ' ' + settings.pane + '#' + id).addClass(settings.pane_active.replace(/^\./, ''))
					.siblings(settings.pane)
					.removeClass(settings.pane_active.replace(/^\./, ''));

			} else {

				// Remove the inactive class from the target pane and add the active class. Inverse this for all others.
				$(settings.pane_wrapper + ' ' + settings.pane + '#' + id).removeClass(settings.pane_inactive.replace(/^\./, ''))
					.addClass(settings.pane_active.replace(/^\./, ''))
					.siblings(settings.pane)
					.removeClass(settings.pane_active.replace(/^\./, ''))
					.addClass(settings.pane_inactive.replace(/^\./, ''));

			}

			// If url data attribute is set on target pane
			if($(settings.pane_wrapper + ' ' + settings.pane + '#' + id).data('url') !== undefined) {

				if(!$(settings.pane_wrapper + ' ' + settings.pane + '#' + id).html().length) {

					// Add the loading div to the pane
					$(settings.pane_wrapper + ' ' + settings.pane + '#' + id).append($('<div></div>').addClass('loading'));

					// Make an AJAX asynchronous request to the target URL
					$.ajax({
						url: $(settings.pane_wrapper + ' ' + settings.pane + '#' + id).data('url'),
						async: true
					}).done(function(data) {
						// Change the contents of the pane to the returned HTML
						$(settings.pane_wrapper + ' ' + settings.pane + '#' + id).html(data);
					});

				}

			}

			// If history is set to true
			if(Boolean(history)) {
				// Set the previous id to avoid duplicate event triggers
				previous_id = id;
				// If history pushState is enabled
				if(history.pushState) {
					// Push the current id to the history to enable navigation
					history.pushState('#' + id, null, '#' + id);
				} else {
					// Boring, old fashioned version that doesn't work well
					location.hash = '#' + id;
				}
			}

			// Trigger change event, providing current id as a variable
			$(element).trigger('ajaxbootstraptabs.change', [id]);

		};

		// If an id is set when the page loads
		if(window.location.hash) {
			// Set the current tab to that id
			change(window.location.hash);
		} else {
			// Otherwise, use the default tab specified.
			change(default_tab);
		}

		// If history and pushState is enabled and available
		if(window.history && window.history.pushState) {
			// On history state changed
			$(window).on('popstate', function() {
				// If location id is not identical to the previous
				if(location.hash.replace(/^\#/, '') !== previous_id) {
					// Set the current tab to the specified id, not propagating across history
					change(location.hash, false);
				}
			});
		}

		// On click of tab
		$(element).on('click', settings.tab_wrapper + ' ' + settings.tab, function(event) {
			// Prevent event propagation
			event.preventDefault();
			// Switch to the targeted tab
			change($(this).attr('href'));
		});

		// On click of link
		$(element).on('click', settings.link, function(event) {
			// Prevent event propagation
			event.preventDefault();
			// Switch to the targeted tab
			change($(this).attr('href'));
		});

		// Return the element to allow event binding
		return element;

	};
}(jQuery));
