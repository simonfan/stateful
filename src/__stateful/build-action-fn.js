/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */
define(function (require, exports, module) {

	var _ = require('lodash'),
		q = require('q');

	/**
	 * Retrieves the actionFn according to the state.
	 *
	 * @param  {[type]} stateFns [description]
	 * @param  {[type]} state    [description]
	 * @return {[type]}          [description]
	 */
	function retrieveStateActionFn(stateFns, state) {

		var fn =
			// [1] try to get the exact state
			stateFns[state] ||
			// [2] get the 'state name'  (statename:statestatus) (somestate:doing)
			stateFns[state.split(':')[0]] ||
			// [3] get the default fn
			stateFns['default'] ||
			// [4] noop.
			_.noop;

		return fn;
	}

	/**
	 * Builds the method
	 *
	 * @param  {[type]} name     [description]
	 * @param  {[type]} stateFns [description]
	 * @return {[type]}          [description]
	 */
	module.exports = function buildActionFn(name, stateFns) {

		// parse out the stateFns
		// They come in the format: {
		//     'state:doing|state:done': fn,
		//     'state'                 : fn,
		//
		// }
		var _stateFns = {};

		// state fns.
		_.each(stateFns, function (fn, stateNames) {

			var split = stateNames.split(/\s*\|\s*/g);

			_.each(split, function (stateName) {
				_stateFns[stateName] = fn;
			});

		});


		// variables to hold state names in cache
		var doing = name + ':doing',
			done  = name + ':done';

		// return a function that wraps the execution
		// with a state setting logic.
		return function action() {
			// get the state of the object
			var state = this.getState();

			// get the function
			var fn = retrieveStateActionFn(_stateFns, state);

			// set the state to doing
			this.setState(doing);

			// execute
			var execution = fn.apply(this, arguments);

			if (q.isPromise(execution)) {

				execution.done(_.partial(this.setState, done));

			} else {
				// synchronous if not promise
				// state done
				this.setState(done);
			}

			return execution;
		};
	};

});
