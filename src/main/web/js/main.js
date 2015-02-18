(
function($) {

	var intIntervalTime = 100;
	var newpage;
	var pageurl = window.location.href;

	setupFlorence();
	renderPage();

	var checkLocation = function() {
		if (pageurl != window.location.href) {
			pageurl = window.location.href;
			$(window.location).trigger("change", {
				newpage: getPageData()
			});
			console.log("got here");
		}
	}

	function getPageData(){
		// var pageurl = window.location.href;
		pageurldata = pageurl.replace("#!", "data");

		$.ajax({
			url:pageurldata,
			// url:"http://localhost:7000/json/home.json",
			dataType: 'json', // Notice! JSONP <-- P (lowercase)
			crossDomain: true,
			// jsonpCallback: 'callback',
			// type: 'GET',
			success:function(data){
				// do stuff with json (in this case an array)
				// console.log("Success");
				console.log(data);
				if(data.level === 't1'){
					console.log('t1 page');
					t1(data);
				}
				if(data.level === 't2'){
					console.log('t2 page');
					t2(data);
				}

			},
			error:function(){
				console.log('Error');
			}
		});
	}

	function t1(data){
		// var content;
		// $.each(data.sections, function() {
		// 	content += "<section><h1>" + this.name + "</h1><h2>" + this.items[0].name + "</h2>" + this.items[0].uri + "</section>";
		// });

		var editabledata;
		$('.slate--home--hero-banner .grid-wrap').prepend('<div class="florence-editarea-home"><a href="#" class="florence-editbtn">Edit</a><div class="florence-editform"><a href="#" class="florence-cancelbtn">Cancel</a><form onsubmit="return false;"><textarea id="json"></textarea><button class="florence-update" >Update</button></form></div></div>');

		$('.florence-editbtn').click(function(){
			$('.florence-editform').show();
		});

		$('.florence-cancelbtn').click(function(){
			$('.florence-editform').hide();
		});

		$('.florence-update').click(function(){
			updatePage();
		});

		$("#json").val(JSON.stringify(data));


	}

	function t2(data){
		// var content;
		// $.each(data.sections, function() {
		// 	content += "<section><h1>" + this.name + "</h1><h2>" + this.items[0].name + "</h2>" + this.items[0].uri + "</section>";
		// });

		var editabledata;
		$('.panel--pad-small').prepend('<div class="florence-editarea-home"><a href="#" class="florence-editbtn">Edit</a><div class="florence-editform"><a href="#" class="florence-cancelbtn">Cancel</a><form onsubmit="return false;"><textarea id="json"></textarea><button class="florence-update" >Update</button></form></div></div>');

		$('.florence-editbtn').click(function(){
			$('.florence-editform').show();
		});

		$('.florence-cancelbtn').click(function(){
			$('.florence-editform').hide();
		});

		$('.florence-update').click(function(){
			updatePage();
		});

		$("#json").val(JSON.stringify(data));

	}


	function renderPage(){
		getPageData();
	}

	function setupFlorence(){
		$('head').prepend('<link href="http://localhost:8081/css/main.css" rel="stylesheet" type="text/css">');
		$('body').prepend('<div class="florence-head">Florence enabled</div>');



	}

	function updatePage(url){
		$.ajax({
	           url:"http://localhost:8081/cats",
	           type:"POST",
	           data: JSON.stringify({
	               json:$('#json').val()
	           }),
	           contentType:"application/json; charset=utf-8",
	           dataType:"text"
	       }).done(function(){
	           console.log("Done!")
	       }).fail(function(jqXHR, textStatus){
	           alert(textStatus);
	       })
	}

	setInterval(checkLocation, intIntervalTime);

})(jQuery);




