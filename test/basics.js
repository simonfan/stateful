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

		it(':)', function () {


			function doNothing() {
				return 'nothing';
			}


			// define a builder
			var view = stateful({
				show: function showWhenHidden() {
					return 'start show';
				},

				hide: function hideWhenShown() {
					return 'start hide';
				}
			});


			var multistate = view({
				state  : 'show',
			});


			multistate.hide().should.eql('start hide');
		});
	});
});
