fallback.load({
	jQuery: [
		'//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js',
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
		'js/vendor/jQuery/dist/jquery.min.js'],
	paper: [
	'//cdnjs.cloudflare.com/ajax/libs/paper.js/0.9.18/paper-full.min.js',
	'js/vendor/paper/dist/paper-full.min.js'],
	bean: [
	'//cdnjs.cloudflare.com/ajax/libs/bean/1.0.14/bean.min.js',
	'js/vendor/bean/bean.min.js'],
	'script.dist.js': 'js/script.dist.js'
	},{
	shim: {
		'paper': ['jQuery'],
		'bean' : ['jQuery'],
		'script.dist.js': ['jQuery','paper','bean']
		//'script.dist.js': ['paper'],
	}
});