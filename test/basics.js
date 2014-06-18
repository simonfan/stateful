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

		it('using only state names', function () {


			function doNothing() {
				return 'nothing';
			}


			// define a builder
			var view = stateful.extendActions({
				show: {
					'hide': function showWhenHidden() {
						return 'start show';
					},
					'show': doNothing
				},

				hide: {
					'hide': doNothing,
					'show': function hideWhenShown() {
						return 'start hide';
					}
				}
			});


			var multistate = view({
				state  : 'show',
			});


			multistate.hide().should.eql('start hide');
		});





		it('synchronous', function () {


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



			view.hide().should.eql('start hiding');

		});
	});
});
