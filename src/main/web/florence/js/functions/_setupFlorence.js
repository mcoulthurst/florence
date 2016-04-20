function setupFlorence() {
    window.templates = Handlebars.templates;
    Handlebars.registerPartial("browseNode", templates.browseNode);
    Handlebars.registerPartial("editNav", templates.editNav);
    Handlebars.registerPartial("editNavChild", templates.editNavChild);
    Handlebars.registerPartial("selectorHour", templates.selectorHour);
    Handlebars.registerPartial("selectorMinute", templates.selectorMinute);
    Handlebars.registerPartial("tickAnimation", templates.selectorMinute);
    Handlebars.registerHelper('select', function (value, options) {
        var $el = $('<select />').html(options.fn(this));
        $el.find('[value="' + value + '"]').attr({'selected': 'selected'});
        return $el.html();
    });
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });
  //Check if array contains element
  Handlebars.registerHelper('ifContains', function(elem, list, options) {
    if(list.indexOf(elem) > -1) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  // Add two values together. Primary usage was '@index + 1' to create numbered lists
  Handlebars.registerHelper('plus', function(value1, value2) {
    return value1 + value2;
  });
  // Add two values together. Primary usage was '@index + 1' to create numbered lists
  Handlebars.registerHelper('lastEditedBy', function(array) {
    if(array) {
      var event = array[array.length - 1];
      return 'Last edited ' + StringUtils.formatIsoDateString(new Date(event.date)) + " by " + event.email;
    }
    return '';
  });
  Handlebars.registerHelper('createdBy', function(array) {
    if(array) {
      var event = getCollectionCreatedEvent(array);
      if (event) {
        return 'Created ' + StringUtils.formatIsoDateString(new Date(event.date)) + " by " + event.email + '';
      } else {
        return "";
      }
    }
    return "";
  });
  Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
      return opts.fn(this);
    else
      return opts.inverse(this);
  });


    Florence.globalVars.activeTab = false;

    // load main florence template
    var florence = templates.florence;

    $('body').append(florence);
    Florence.refreshAdminMenu();

    var adminMenu = $('.admin-nav');
    // dirty checks on admin menu
    adminMenu.on('click', '.nav--admin__item', function () {
        if (Florence.Editor.isDirty) {
            swal({
                title: "Warning",
                text: "If you do not come back to this page, you will lose any unsaved changes",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Continue",
                cancelButtonText: "Cancel"
            }, function (result) {
                if (result === true) {
                    Florence.Editor.isDirty = false;
                    processMenuClick(this);
                    return true;
                } else {
                    return false;
                }
            });
        } else {
            processMenuClick(this);
        }
    });


    window.onbeforeunload = function () {
        if (Florence.Editor.isDirty) {
            return 'You have unsaved changes.';
        }
    };
    viewController();


    function processMenuClick(clicked) {
        Florence.collection = {};

        $('.nav--admin__item--collection').hide();
        $('.nav--admin__item').removeClass('selected');
        var menuItem = $(clicked);

        menuItem.addClass('selected');


        if (menuItem.hasClass("nav--admin__item--collections")) {
            viewController('collections');
        } else if (menuItem.hasClass("nav--admin__item--collection")) {
            var thisCollection = CookieUtils.getCookieValue("collection");
            viewCollections(thisCollection);
            $(".nav--admin__item--collections").addClass('selected');
        } else if (menuItem.hasClass("nav--admin__item--users")) {
            viewController('users');
        } else if (menuItem.hasClass("nav--admin__item--teams")) {
            viewController('teams');
        } else if (menuItem.hasClass("nav--admin__item--publish")) {
            viewController('publish');
        } else if (menuItem.hasClass("nav--admin__item--reports")) {
            viewController('reports');
        } else if (menuItem.hasClass("nav--admin__item--login")) {
            viewController('login');
        } else if (menuItem.hasClass("nav--admin__item--logout")) {
            logout();
            viewController();
        }
    }

    var lastPingTime;
    var pingTimes = [];

    function doPing() {
        var start = new Date().getTime();
        $.ajax({
            url: "/zebedee/ping",
            dataType: 'json',
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify({
                lastPingTime: lastPingTime
            }),
            success: function (response) {

                var end = new Date().getTime();
                var time = end - start;

                lastPingTime = time;
                pingTimes.push(time);
                if (pingTimes.length > 5)
                    pingTimes.shift();

                var sum = 0;
                for (var i = 0; i < pingTimes.length; ++i) {
                    sum += pingTimes[i];
                }

                var averagePingTime = sum / pingTimes.length;

                networkStatus(lastPingTime);

                if (averagePingTime < 100) {
                    console.log("ping time: pretty good! " + time + " average: " + averagePingTime + " " + pingTimes);
                } else if (averagePingTime < 300) {
                    console.log("ping time: not so good! " + time + " average: " + averagePingTime + " " + pingTimes);
                } else {
                    console.log("ping time: really bad! " + time);
                }

                pingTimer = setTimeout(function () {
                    doPing();
                }, 10000);
            }
        });
    }

    var pingTimer = setTimeout(function () {
        doPing();
    }, 10000);

    // Reset default functions from certain elements - eg form submits
    resetPage();

}

