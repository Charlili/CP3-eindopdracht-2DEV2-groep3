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

		if(getParameterByName('page') == '' || getParameterByName('page') === 'listgroups' ){
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