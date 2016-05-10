/*
*   Additional JS needed to add focus styling
 */

var $delegatedSelector = $('#main'); // This should be the highest point event handlers are delegated up to

// Add focus styling to selects
var $closestWrap;
$delegatedSelector.on('focus', '.select-wrap select', function(e) {
    $closestWrap = $(e.target).closest('.select-wrap');
    $closestWrap.toggleClass('select-wrap--focus');
});

$delegatedSelector.on('focusout', '.select-wrap select', function(e) {
    $closestWrap.toggleClass('select-wrap--focus');
});