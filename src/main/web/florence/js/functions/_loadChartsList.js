// fully load the charts list from scratch
function loadChartsList(data, collectionId) {
  var html = templates.workEditCharts(data);
  $('#charts').replaceWith(html);
  initialiseChartList(data, collectionId);
}

// refresh only the list of charts - leaving the container div that accordion works from.
function refreshChartList(data, collectionId) {
  var html = templates.workEditCharts(data);
  $('#chart-list').replaceWith($(html).find('#chart-list'));
  initialiseChartList(data, collectionId);
}

// do all the wiring up of buttons etc once the template has been rendered.
function initialiseChartList(data, collectionId) {

  $(data.charts).each(function (index, chart) {

    var basePath = data.uri;
    var chartPath = basePath + '/' + chart.filename;
    var chartJson = chartPath;

    $("#chart-edit_" + chart.filename).click(function () {
      getPageData(collectionId, chartJson,
        onSuccess = function (chartData) {

          loadChartBuilder(data, function () {
            refreshPreview();

            postContent(collectionId, basePath, JSON.stringify(data),
              success = function () {
                Florence.Editor.isDirty = false;
                refreshPreview();
                refreshChartList(data, collectionId);
              },
              error = function (response) {
                handleApiError(response);
              }
            );
          }, chartData);
        })
    });

    $("#chart-delete_" + chart.filename).click(function () {
      swal ({
        title: "Warning",
        text: "Are you sure you want to delete this chart?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        closeOnConfirm: false
      }, function(result) {
        if (result === true) {
          swal({
            title: "Deleted",
            text: "This chart has been deleted",
            type: "success",
            timer: 2000
          });
          $("#chart_" + index).remove();
          deleteContent(collectionId, chartJson + '.json',
            onSuccess = function () {
              data.charts = _(data.charts).filter(function (item) {
                return item.filename !== chart.filename
              });
              postContent(collectionId, basePath, JSON.stringify(data),
                success = function () {
                  Florence.Editor.isDirty = false;
                  refreshChartList(data, collectionId);
                },
                error = function (response) {
                  handleApiError(response);
                }
              );
            }
          );
        }
      });
    });
  });
}
