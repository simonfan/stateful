(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'stateful',
		// dependencies for the test
		deps = [mod, 'should', 'q'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(stateful, should, q) {
	'use strict';

	describe('stateful asynch', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function (testdone) {


			function doNothing() { return 'nothing'; }

			// define a view constructor
			var view = stateful.extendActions({
				hide: {
					'show:done': function hideWhenShown() {
						return q.delay('hidden', 400);
					},
					'hide': doNothing
				},

				show: {
					'show': doNothing,
					hide: function showWhenHidden() {
						return q.delay('shown', 300);
					}
				}
			});

			// instantiate
			var instance = view({ state: 'show:done' });


			instance.show().should.eql('nothing');

			instance.hide()
				.then(function (res) {
					res.should.eql('hidden');
					instance.getState().should.eql('hide:done');
				})
				.then(function () {
					instance.hide().should.eql('nothing');

					// call show
					var show = instance.show();

					// check state change
					instance.getState().should.eql('show:doing');

					return show;
				})
				.then(function (res) {
					res.should.eql('shown');
					instance.getState().should.eql('show:done');



					//
					testdone();
				})
				.done();

			instance.getState().should.eql('hide:doing');




		});
	});
});
