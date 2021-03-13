$('.ui.sidebar')
	.sidebar({
		context: $('.pushMe'),
		transition: 'overlay',
	})
	.sidebar('attach events', '#mobile_item')