function viewTeams() {

    getTeams(
        success = function (data) {
            populateTeamsTable(data.teams);
        },
        error = function (jqxhr) {
            handleApiError(jqxhr);
        }
    );

    function populateTeamsTable(data) {
        var teamsHtml = templates.teamList(data);
        $('.section').html(teamsHtml);

        $('.js-selectable-table tbody tr').click(function () {
            var teamId = $(this).attr('data-id');
            viewTeamDetails(teamId, $(this));
        });

        $('.form-create-team').submit(function (e) {
            e.preventDefault();

            var teamName = $('#create-team-name').val();

            if (teamName.length < 1) {
                sweetAlert("Please enter a user name.");
                return;
            }

            teamName = teamName.trim();
            postTeam(teamName);
        });
    }
}


