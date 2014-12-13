fallback.load({
	jQuery: [
		'//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js',
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
		'js/vendor/jQuery/dist/jquery.min.js'],
	paper: [
	'//cdnjs.cloudflare.com/ajax/libs/paper.js/0.9.18/paper-full.min.js',
	'js/vendor/paper/dist/paper-full.min.js'],
	'script.dist.js': 'js/script.dist.js'
	},{
	shim: {
		'paper': ['jQuery'],
		'script.dist.js': ['jQuery'],
		'script.dist.js': ['paper'],
	}
});