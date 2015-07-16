function timeseriesEditor(collectionId, data) {

  var newSections = [], newNotes = [], newDocument = [], newRelated = [], newTimeseries = [], newRelatedMethodology = [];
  var setActiveTab, getActiveTab;

  $(".edit-accordion").on('accordionactivate', function(event, ui) {
    setActiveTab = $(".edit-accordion").accordion("option", "active");
    if(setActiveTab !== false) {
      localStorage.setItem('activeTab', setActiveTab);
    }
  });

  getActiveTab = localStorage.getItem('activeTab');
  accordion(getActiveTab);
  getLastPosition ();

  // Metadata edition and saving
  $("#title").on('input', function () {
    $(this).textareaAutoSize();
    data.description.title = $(this).val();
  });
  $("#nextRelease").on('input', function () {
    $(this).textareaAutoSize();
    data.description.nextRelease = $(this).val();
  });
  if (!data.description.contact) {
    data.description.contact = {};
  }
  $("#contactName").on('input', function () {
    $(this).textareaAutoSize();
    data.description.contact.name = $(this).val();
  });
  $("#contactEmail").on('input', function () {
    $(this).textareaAutoSize();
    data.description.contact.email = $(this).val();
  });
  $("#contactTelephone").on('input', function () {
    $(this).textareaAutoSize();
    data.description.contact.telephone = $(this).val();
  });
  $("#number").on('input', function () {
    $(this).textareaAutoSize();
    data.description.number = $(this).val();
  });
  $("#keyNote").on('input', function () {
    $(this).textareaAutoSize();
    data.description.keyNote = $(this).val();
  });
  $("#unit").on('input', function () {
    $(this).textareaAutoSize();
    data.description.unit = $(this).val();
  });
  $("#preUnit").on('input', function () {
    $(this).textareaAutoSize();
    data.description.preUnit = $(this).val();
  });
  $("#source").on('input', function () {
    $(this).textareaAutoSize();
    data.description.source = $(this).val();
  });
  $("#keywordsTag").tagit({availableTags: data.description.keywords,
                        singleField: true,
                        singleFieldNode: $('#keywords')
  });
  $('#keywords').on('change', function () {
    data.description.keywords = [$('#keywords').val()];
  });
  $("#metaDescription").on('input', function () {
    $(this).textareaAutoSize();
    data.description.metaDescription = $(this).val();
  });

  /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
   is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
  var checkBoxStatus = function () {
    if(data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
      return false;
    } else {
      return true;
    }
  };

  $("#metadata-list input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
    data.description.nationalStatistic = $("#metadata-list input[type='checkbox']").prop('checked') ? true : false;
  });

  // Correction section
  // Load
  $(data.correction).each(function (index, correction) {

    $("#correction_text_" + index).on('input', function () {
      $(this).textareaAutoSize();
      data.correction[index].text = $(this).val();
    });
    $("#correction_date_" + index).val(correction.date).on('input', function () {
      data.correction[index].date = $(this).val();
    });

    // Delete
    $("#correction-delete_" + index).click(function () {
      $("#" + index).remove();
      data.correction.splice(index, 1);
      updateContent(collectionId, data.uri, JSON.stringify(data));
    });
  });

  // New correction
  $("#addCorrection").one('click', function () {
    data.correction.push({text:"", date:""});
    updateContent(collectionId, data.uri, JSON.stringify(data));
  });

  editMarkdownOneObject (collectionId, data, 'section', 'section');

  editMarkdownWithNoTitle (collectionId, data, 'notes', 'note');

  editRelated (collectionId, data, 'relatedDocuments', 'document');

  editRelated (collectionId, data, 'relatedData', 'timeseries');

  editRelated (collectionId, data, 'relatedDatasets', 'data');

  editRelated (collectionId, data, 'relatedMethodology', 'methodology');

  // Save
  var editNav = $('.edit-nav');
  editNav.off(); // remove any existing event handlers.

  editNav.on('click', '.btn-edit-save', function () {
    save();
    updateContent(collectionId, data.uri, JSON.stringify(data));
  });

  // completed to review
  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
    //pageData = $('.fl-editor__headline').val();
    save();
    saveAndCompleteContent(collectionId, data.uri, JSON.stringify(data));
  });

  // reviewed to approve
  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
    save();
    saveAndReviewContent(collectionId, data.uri, JSON.stringify(data));
  });


  function save() {
    // Sections
    data.section = {markdown: $('#section-markdown_0').val()};
    // Notes
    var orderNote = $("#sortable-note").sortable('toArray');
    $(orderNote).each(function (indexN, nameN) {
      var markdown = $('#note-markdown_' + nameN).val();
      newNotes[indexN] = markdown;
    });
    data.notes = newNotes;
    // Related documents
    var orderDocument = $("#sortable-document").sortable('toArray');
    $(orderDocument).each(function (indexD, nameD) {
      var uri = $('#document-uri_' + nameD).val();
      uriChecked = checkPathParsed(uri);
      newDocument[indexD]= {uri: uriChecked};
    });
    data.relatedDocuments = newDocument;
    // Related timeseries
    var orderTimeseries = $("#sortable-timeseries").sortable('toArray');
    $(orderTimeseries).each(function (indexT, nameT) {
      var uri = $('#timeseries-uri_' + nameT).val();
      uriChecked = checkPathParsed(uri);
      newTimeseries[indexT]= {uri: uriChecked};
    });
    data.relatedData = newTimeseries;
    // Related datasets
    var orderDataset = $("#sortable-related").sortable('toArray');
    $(orderDataset).each(function (indexD, nameD) {
      var uri = $('#dataset-uri_' + nameD).val();
      uriChecked = checkPathParsed(uri);
      newRelated[indexD]= {uri: uriChecked};
    });
    data.relatedDatasets = newRelated;
    // Related methodology
    var orderUsedIn = $("#sortable-methodology").sortable('toArray');
    $(orderUsedIn).each(function(indexM, nameM){
      var uri = $('#methodology-uri_'+nameM).val();
      uriChecked = checkPathParsed(uri);
      newRelatedMethodology[parseInt(indexM)] = {uri: uriChecked};
    });
    data.relatedMethodology = newRelatedMethodology;
  }
}

