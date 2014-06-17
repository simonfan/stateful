(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'stateful',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(stateful, should) {
	'use strict';

	describe('stateful basics', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function (done) {


			var view = stateful({
				state: 'show:done'
			});

			view.action('show', {
				'hide:done|hide:doing': function showWhenHidden() {
					return 'start show';
				},
			});

			view.action('hide', {
				'show:done|show:doing': function hideWhenShown() {
					return 'start hiding';
				}
			});



			view.hide().then(function (res) {
				res.should.eql('start hiding');

				done();
			})
			.done();

		});
	});
});
