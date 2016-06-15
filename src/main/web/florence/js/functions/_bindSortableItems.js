/**
 * Bind data and DOM updating to sortable items in the editor
 * @param data - Data for page
 * @param field - Field in the data being updated on sort
 * @param idField - ID of container element for the items being sorted (eg sortable-sections)
 */

function bindSortableItems(data, field, idField) {
    var $container = $("#sortable-" + idField);
    var sortableStartPosition;

    // Use for debugging - for each entry in the list
    function debugLogAccordionSection() {
        for (var i = 0; i < data[field].length; i++) {
            console.log(data[field][i].title)
        }
    }

    $container.sortable({
        start: function(event, ui) {

            // remember the index of the item at the start of drag + drop
            sortableStartPosition = ui.item.index();
            // console.log("sortable start: " + sortableStartPosition);
        },
        stop: function(event, ui){

            // determine the new index of the item after being dropped.
            var sortableEndPosition =  ui.item.index();
            // console.log("sortable update: Start: " + sortableStartPosition + " now: " + sortableEndPosition);

            var updatedArray = data[field];
            var item = data[field][sortableStartPosition];

            // Move the item from the start drag position to the end drop position in the data model.
            updatedArray.splice(sortableStartPosition, 1);
            updatedArray.splice(sortableEndPosition, 0, item);

            // Update numbering when done
            var sortableLinks = $container.find('.edit-section__sortable-item--counter');
            for (var i = 0; i < sortableLinks.length; i++) {
                sortableLinks[i].innerHTML = (i+1).toString() + ".";
            }
        }
    });
}
