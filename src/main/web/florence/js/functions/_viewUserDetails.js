function viewUserDetails(userId) {

  //console.log('view user details: ' + userId);

  getUsers(
    success = function (user) {
      populateUserDetails(user, userId);
    },
    error = function (response) {
      handleApiError(response);
    },
    userId
  );

  function populateUserDetails(user, userId) {

    var html = window.templates.userDetails(user);
    //console.log(html);
    $('.collection-selected').html(html).animate({right: "0%"}, 500);

    var deleteButton = $('#collection-delete');
    if (true) {
      deleteButton.show().click(function () {
        var result = confirm("Are you sure you want to delete this user?");
        if (result === true) {
          deleteUser(userId);
        }
      });
    } else {
      deleteButton.hide();
    }

    $('.collection-selected .btn-collection-cancel').click(function () {
      $('.collection-selected').stop().animate({right: "-50%"}, 500);
      $('.collections-select-table tbody tr').removeClass('selected');
      // Wait until the animation ends
      setTimeout(function () {
        //viewController('users');
      }, 500);
    });

    ////page-list
    //$('.page-item').click(function () {
    //  $('.page-list li').removeClass('selected');
    //  $('.page-options').hide();
    //
    //  $(this).parent('li').addClass('selected');
    //  $(this).next('.page-options').show();
    //});
    //
    //$('.btn-page-edit').click(function () {
    //  var path = $(this).attr('data-path');
    //  var language = $(this).attr('data-language');
    //  if (language === 'cy') {
    //    var safePath = checkPathSlashes(path);
    //    Florence.globalVars.welsh = true;
    //  } else {
    //    var safePath = checkPathSlashes(path);
    //    Florence.globalVars.welsh = false;
    //  }
    //  getPageDataDescription(collectionId, safePath,
    //    success = function () {
    //      createWorkspace(safePath, collectionId, 'edit');
    //    },
    //    error = function (response) {
    //      handleApiError(response);
    //    }
    //  );
    //});
    //
    //$('.page-delete').click(function () {
    //  var path = $(this).attr('data-path');
    //  var language = $(this).attr('data-language');
    //  if (path.match(/\/bulletins\//) || path.match(/\/articles\//)) {
    //    var result = confirm("This will delete the English and Welsh content of this page, if any. Are you sure you" +
    //    " want to delete this page from the collection?");
    //  } else if (language === 'cy') {
    //    var result = confirm("Are you sure you want to delete this page from the collection?");
    //  } else {
    //    var result = confirm("This will delete the English and Welsh content of this page, if any. Are you sure you" +
    //    " want to delete this page from the collection?");
    //  }
    //  if (result === true) {
    //    if (language === 'cy' && !(path.match(/\/bulletins\//) || path.match(/\/articles\//))) {
    //      path = path + '/data_cy.json';
    //    }
    //    deleteContent(collectionId, path, function() {
    //        viewCollectionDetails(collectionId);
    //        alert('File deleted');
    //      }, function(error) {
    //        handleApiError(error);
    //      }
    //    );
    //  }
    //});
    //
    //$('.collection-selected .btn-collection-cancel').click(function () {
    //  $('.collection-selected').stop().animate({right: "-50%"}, 500);
    //  $('.collections-select-table tbody tr').removeClass('selected');
    //  // Wait until the animation ends
    //  setTimeout(function () {
    //    viewController('collections');
    //  }, 500);
    //});
    //
    //$('.btn-collection-work-on').click(function () {
    //  Florence.globalVars.welsh = false;
    //  createWorkspace('', collectionId, 'browse');
    //});

  }
}