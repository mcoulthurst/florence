function viewTeams() {

  getTeams(
    success = function (data) {
      //console.log(data);
      populateTeamsTable(data.teams);
    },
    error = function (jqxhr) {
      handleApiError(jqxhr);
    }
  );

  function populateTeamsTable(data) {
    var teams = _.sortBy(data, function (d) {return d.name.toLowerCase()});
    var teamsHtml = templates.teamList(teams);
    $('.section').html(teamsHtml);

    $('.collections-select-table tbody tr').click(function () {
      $('.collections-select-table tbody tr').removeClass('selected');
      $(this).addClass('selected');
      var teamId = $(this).attr('data-id');
      viewTeamDetails(teamId);
    });

    $('.form-create-team').submit(function (e) {
      e.preventDefault();

      var teamName = $('#create-team-name').val();

      if (teamName.length < 1) {
        sweetAlert("Please enter the users name.");
        return;
      }

      postTeam(teamName);
    });
  }
}


