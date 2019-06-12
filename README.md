# AJAX Bootstrap Tabs
AJAX Bootstrap Tabs is a Bootstrap compatible tabs implementation with support for AJAX loading and history integration.

It is an alternative to Bootstrap tabs with extra functionality and the ability to apply custom classes to each tab for your own custom design.

## Features

* Clean, lean and simple tabs that are easily made compatible with most CSS frameworks
* AJAX same-origin loading with support for embedded JavaScript
* Links to different tabs can be embedded throughout the page
* History integration allows the use of back and forward buttons as well as the URL hash to change tabs on the current page
* URL hash integration allows the tab to be set before opening the page
* Tab change event allowing execution of functions when a tab is selected
* Maintains position on page to avoid the 'jump' that the URL hash can cause

## Usage

```html
<div id="tabs">
    <div class="tab-nav btn-group btn-group-stretch">
        <a href="#tab-one" class="btn btn-default">Tab One</a>
        <a href="#tab-two" class="btn btn-default">Tab Two</a>
        <a href="#tab-three" class="btn btn-default">Tab Three</a>
    </div>
    <div class="panel" style="margin-top:20px">
        <div class="panel-body">
            <div class="tab-content">
                <div class="tab-pane" id="tab-one">
                    <p>Tab One</p>
                </div>
                <div class="tab-pane" id="tab-two">
                    <p>Tab Two</p>
                    <!-- if your browser supports history, this will open the third tab using this plugin -->
                    <p><a href="#tab-three" class="link">Tab Three</a></p>
                </div>
                <div class="tab-pane" id="tab-three" data-url="/ajax/url"></div>
            </div>
        </div>
    </div>
</div>
```

```js
$('#tabs').ajaxBootstrapTabs({
    tab_wrapper: '.tab-nav',
    tab: '.btn',
    tab_active: '.btn-primary',
    tab_inactive: '.btn-default',
    pane_wrapper: '.tab-content',
    pane: '.tab-pane',
    pane_active: 'active',
    link: '.link',
    tab_prefix: 'tab-'
}).bind('ajaxbootstraptabs.change', function(event, tabid) {
    console.log(tabid);
});
```
