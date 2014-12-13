(function(){
	console.log('Goed bezig Charlotte.');

	//
	function init() {
		console.log('test');
		if(getParameterByName('page') != null && (getParameterByName('page') === 'overview' || getParameterByName('page') === 'group')){
			console.log('Time to make apps');
			var FlowchartApplication = require('./classes/FlowchartApplication.js');
			var flowchartApplication = new FlowchartApplication($('.app'));
		}
		//console.log(getParameterByName('page'));
		//login klik
		if(getParameterByName('page') == '' || getParameterByName('page') === 'home' ){
			var login = document.querySelector('.login');
			login.addEventListener('click',clickHandlerLogin);
		}

		if(getParameterByName('page') === 'listgroups' ){
			var addgroup = document.querySelector('.addgroup');
			addgroup.addEventListener('click',clickHandlerAddgroup);
			var myform = document.getElementById('myform');
		}

		if(getParameterByName('page') == '' || getParameterByName('page') === 'add' || getParameterByName('page') === 'overview'  ){
			//title live change
			$('#viewerchanger').keyup(function(){
				var str = $(this).val();
				$("#viewer").text(str);
			});

		}

		/*if(getParameterByName('page') == 'saveImage'){
			require('../vendor/phantomjs/bin/phantomjs');
			var system = require('system');
 
			// Web Address (URL) of the page to capture
			//var url  = system.args[1];
			 var url = "http://localhost/CPIII/CPIII_whiteboard/index.php?page=overview&id=35";
			 var page = 'testingThis' + '.png';
			// File name of the captured image
			//var file = system.args[2]  + ".png";
			 
			var page = require('webpage').create();
			 
			// Browser size - height and width in pixels
			// Change the viewport to 480x320 to emulate the iPhone
			page.viewportSize = { width: 1200, height : 800 };
			 
			// Set the User Agent String 
			// You can change it to iPad or Android for mobile screenshots
			page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5";
			 
			// Render the screenshot image
			page.open ( url, function ( status ) {
			  if ( status !== "success") {
			       console.log("Could not open web page : " + url);
			       phantom.exit();
			   } else {
			       window.setTimeout ( function() {
			          page.render(file);
			          console.log("Download the screenshot : " + file);
			          phantom.exit();
			       }, 1000);
			   }
			});
		}*/

	}

	function clickHandlerLogin(){
		event.preventDefault();
		console.log(this);
		var loginform = document.querySelector('.hidden');
		loginform.classList.toggle('open');
	}

	function clickHandlerAddgroup(){
		event.preventDefault();
		var searchgroup = document.querySelector('.searchgroup');
		searchgroup.classList.toggle('test');
	}

	init();

	//function to get $_GET values
	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
})();