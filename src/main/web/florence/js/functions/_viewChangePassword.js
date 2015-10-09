/**
 * Show the change password screen to change the password for the given email.
 * @param email - The email address of the user to change the password for.
 * @param authenticate - true if the existing password for the user needs to be entered.
 */
function viewChangePassword(email, authenticate) {

  var viewModel = {
    authenticate: authenticate
  };
  
  $('body').append(templates.changePassword(viewModel));

  $('#update-password').on('click', function () {
    var oldPassword = $('#password-old').val();
    var newPassword = $('#password-new').val();
    var confirmPassword = $('#password-confirm').val();

    if(newPassword !== confirmPassword) {
      alert('The passwords provided do not match. Please enter the new password again and confirm it.')
      return;
    }

    submitNewPassword(newPassword, oldPassword);
  });

  $('#update-password-cancel').on('click', function () {
    $('.change-password-overlay').stop().fadeOut(200).remove();
  });

  function submitNewPassword(newPassword, oldPassword) {
    postPassword(
      success = function () {
        console.log('Password updated');
        alert("Password updated");
        $('.change-password-overlay').stop().fadeOut(200).remove();
        viewController();
      },
      error = function (response) {
        if (response.status === 403 || response.status === 401) {
          if (authenticate) {
            alert('The current password you entered is incorrect. Please try again');
          } else {
            alert('You are not authorised to change the password for this user');
          }
        }
      },
      email,
      newPassword,
      oldPassword);
  }
}
