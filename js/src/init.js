fallback.load({
	jQuery: [
		'//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js',
		'js/vendor/jQuery/dist/jquery.min.js'],
	'script.js': 'js/script.dist.js'
	//verder ook nog paper.js inladen en andere .js dat we nodig gaan hebben
	},{
	shim: {
		'script.js': ['jQuery']
	}
});