fallback.load({
	jQuery: [
		'//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js',
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
		'js/vendor/jQuery/dist/jquery.min.js'],
	jQueryUI: [
	'//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js',
	'//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js',
	'js/vendor/jquery-ui/jquery-ui.min.js'],
	paper: [
	'//cdnjs.cloudflare.com/ajax/libs/paper.js/0.9.18/paper-full.min.js',
	'js/vendor/paper/dist/paper-full.min.js'],
	'script.dist.js': 'js/script.dist.js'
	},{
	shim: {
		'paper': ['jQuery'],
		'jQueryUI': ['jQuery'],
		'script.dist.js': ['jQuery'],
		'script.dist.js': ['paper']
	}
});