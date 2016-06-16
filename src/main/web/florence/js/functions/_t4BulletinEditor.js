function bulletinEditor(collectionId, data) {
    var setActiveTab, getActiveTab;
    var renameUri = false;

    $(".edit-accordion").on('accordionactivate', function (event, ui) {
        setActiveTab = $(".edit-accordion").accordion("option", "active");
        if (setActiveTab !== false) {
            Florence.globalVars.activeTab = setActiveTab;
        }
    });

    getActiveTab = Florence.globalVars.activeTab;
    accordion(getActiveTab);
    getLastPosition();

    // Metadata load, edition and saving
    $("#title").on('input', function () {
        renameUri = true;
        $(this).textareaAutoSize();
        data.description.title = $(this).val();
    });
    $("#edition").on('input', function () {
        renameUri = true;
        $(this).textareaAutoSize();
        data.description.edition = $(this).val();
    });

    if (!data.description.releaseDate) {
        $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
            data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
        });
    } else {
        dateTmp = data.description.releaseDate;
        var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
        $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
            data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
        });
    }

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
    $("#summary").on('input', function () {
        $(this).textareaAutoSize();
        data.description.summary = $(this).val();
    });
    $("#headline1").on('input', function () {
        $(this).textareaAutoSize();
        data.description.headline1 = $(this).val();
    });
    $("#headline2").on('input', function () {
        $(this).textareaAutoSize();
        data.description.headline2 = $(this).val();
    });
    $("#headline3").on('input', function () {
        $(this).textareaAutoSize();
        data.description.headline3 = $(this).val();
    });
    $("#keywordsTag").tagit({
        availableTags: data.description.keywords,
        singleField: true,
        allowSpaces: true,
        singleFieldNode: $('#keywords')
    });
    $('#keywords').on('change', function () {
        data.description.keywords = $('#keywords').val().split(',');
    });
    $("#metaDescription").on('input', function () {
        $(this).textareaAutoSize();
        data.description.metaDescription = $(this).val();
    });

    /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
     is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
    var checkBoxStatus = function () {
        if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
            return false;
        }
        return true;
    };

    $("#metadata-list input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
        data.description.nationalStatistic = $("#metadata-list input[type='checkbox']").prop('checked') ? true : false;
    });

    // Update data when PDF title is updated
    $('#pdf').on('input', '#pdf-title_0', function(e) {
        data.pdfTable[0].title = $(e.target).val();
    });

    // Save
    var editNav = $('.edit-nav');
    editNav.off(); // remove any existing event handlers.

    editNav.on('click', '.btn-edit-save', function () {
        save(updateContent);
    });

    // completed to review
    editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
        save(saveAndCompleteContent);
    });

    // reviewed to approve
    editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
        save(saveAndReviewContent);
    });


    function save(onSave) {
        Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();
        checkRenameUri(collectionId, data, renameUri, onSave);
    }
}

