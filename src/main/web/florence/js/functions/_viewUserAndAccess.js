function viewUserAndAccess(view) {

  if (view == 'create') {
    var create_user =
    '<section class="fl-panel fl-panel--user-and-access">' +
      '<section class="fl-creator">' +
        '<section class="fl-user-and-access__create">' +
          '<span class="fl-user-and-access__title"> Enter the name of the new user</span>' +
          '<input class="fl-user-and-access__name" name="fl-editor__headline" cols="40" rows="1"></input>' +
          '<br>' +
          '<span class="fl-user-and-access__title"> enter the email of the new user </span>' +
          '<input class="fl-user-and-access__email" name="fl-editor__headline" cols="40" rows="1"></input>' +
          '<br>' +
          'password:<input class="fl-user-and-access__password" name="fl-editor__headline" cols="40" rows="1"></input>'+
        '</section>' +
      '</section>' +
      '<nav class="fl-panel--user-and-access__nav">' +
        '<button class="fl-panel--user-and-access__create">Create User</button>' +
      '</nav>' +
    '</section>';

    $('.fl-view').prepend(create_user);

    $('.fl-panel--user-and-access__create').click(function () {
      var name  = $('.fl-user-and-access__name').val();
      var email = $('.fl-user-and-access__email').val();
      var password = $('.fl-user-and-access__password').val();
      createUser(name, email, password);
    });

    function createUser(name, email, password) {
      $.ajax({
        url: "/zebedee/users",
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify({
          name: name,
          email: email,
        }),
        success: function (response) {
          console.log('User created');
          setPassword(email, password);
        },
        error: function (response) {
          handleApiError(response);
        }
      });
    }

    function setPassword(email, password) {
      $.ajax({
        url: "/zebedee/password",
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify({
          password: password,
          email: email
        }),
        success: function (response) {
          console.log('Password set');
          alert("User created");
        },
        error: function (response) {
          handleApiError(response);
        }
      });
    }
  }
}

