(function(){
	console.log('Goed bezig Charlotte.');

	//
	function init() {
		console.log('test');
		if(getParameterByName('page') != null && (getParameterByName('page') === 'overview' || getParameterByName('page') === 'group' || getParameterByName('page') === 'add')){
			console.log('Time to make apps');
			var FlowchartApplication = require('./classes/FlowchartApplication.js');
			var flowchartApplication = new FlowchartApplication($('.app'));
		}

		//login klik
		var login = document.querySelector('.login');
		login.addEventListener('click',clickHandlerLogin);
	}

	function clickHandlerLogin(){
		event.preventDefault();
		var loginform = document.querySelector('.loginform');
		var register = document.querySelector('.yellow');
		loginform.style.display = "block";
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