/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */
define(function (require, exports, module) {

	var _ = require('lodash'),
		q = require('q');

	/**
	 * Builds the method
	 *
	 * @param  {[type]} name     [description]
	 * @param  {[type]} object   [description]
	 * @param  {[type]} stateFns [description]
	 * @return {[type]}          [description]
	 */
	function buildActionFn(object, name, stateFns) {

		// parse out the stateFns
		var _stateFns = {};

		// state fns.
		_.each(stateFns, function (fn, stateNames) {

			var split = stateNames.split(/\s*\|\s*/g);

			_.each(split, function (stateName) {
				_stateFns[stateName] = fn;
			});

		});

		//
		return function action() {
			// get the state of the object
			var state = object.getState();

			// get the function
			var fn = _stateFns[state] || _stateFns['default'] || _.noop;

			// set the state to doing
			object.setState(name + ':doing');

			// execute
			var execution = q(fn.apply(object, arguments));

			execution.then(function () {
				// set state to 'done'
				object.setState(name + ':done');
			});

			return execution;
		};
	}

	/**
	 * Defines an action for multiple states.
	 * @param  {[type]} name
	 *     The name of the action
	 *     Will be used to generate the method.
	 * @param  {[type]} stateFns
	 *     The functions for each state.
	 */
	exports.action = function defineAction(name, stateFns) {

		// build the method.
		this[name] = buildActionFn(this, name, stateFns);

		// always return 'this'
		return this;
	};


});
