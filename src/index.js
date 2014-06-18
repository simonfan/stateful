//     stateful
//     (c) simonfan
//     stateful is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module stateful
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';


	var subject = require('subject'),
		_       = require('lodash');

	// Builds a function that will check for the state and
	// run the correct method
	var buildActionFn = require('./__stateful/build-action-fn');

	// object for defining non enumerable properties using
	// Object.defineProperty.
	var nonEnum = { enumerable: false };


	/**
	 * THE stateful object constructor.
	 *
	 * @param  {[type]}
	 * @param  {[type]}
	 * @return {[type]}           [description]
	 */
	var stateful = module.exports = subject({
		initialize: function initialize(options) {
			this.initializeStateful(options);
		},

		/**
		 * Whatever is needed for stateful object to start working.
		 *
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		initializeStateful: function initializeStateful(options) {

			/**
			 * Property that holds the state of the object.
			 * @type {[type]}
			 */
			this.state = options.state || this.state;

			_.bindAll(this, ['setState', 'getState']);
		},

		/**
		 * Returns the object's current state.
		 * May be overridden for custom behaviour.
		 *
		 * @return {[type]} [description]
		 */
		getState: function getState() {
			return this.state;
		},

		/**
		 * Sets the object's state property to whatever is passed
		 * as first argument.
		 *
		 * @param {[type]} state [description]
		 */
		setState: function setState(state) {
			this.state = state;
			return this;
		},

	});


	/**
	 * Proto method that defines an action.
	 *
	 * @param  {[type]} name     [description]
	 * @param  {[type]} stateFns [description]
	 * @return {[type]}          [description]
	 */
	stateful.assignProto('action', function defineAction(name, stateFns) {

		if (_.isString(name)) {
			// is a string, define a single action
			this[name] = buildActionFn(name, stateFns);

		} else {
			// multiple actions
			_.each(name, function (stateFns, name) {
				this.action(name, stateFns);
			}, this);
		}

		// always return 'this'
		return this;
	});








	/**
	 * Define actions onto the prototype.
	 *
	 * @param  {[type]} name     [description]
	 * @param  {[type]} stateFns [description]
	 * @return {[type]}          [description]
	 */
	stateful.assignStatic({
		action: function definePrototypeAction(name, stateFns) {

			if (_.isString(name)) {
				// is a string, define a single action

				// build the function
				var fn = buildActionFn(name, stateFns);

				// assign the fn to the prototype.
				this.assignProto(name, fn);

			} else {
				// multiple actions
				_.each(name, function (fns, name) {
					this.action(name, fns);
				}, this);
			}

			// always return 'this'
			return this;
		},

		/**
		 * Extend the constructor by defining actions instead of properties.
		 *
		 * @param  {[type]} actions [description]
		 * @return {[type]}         [description]
		 */
		extendActions: function extendActions(actions) {

			// create an extended constructor
			var extended = this.extend();

			// define actions onto the object
			extended.action(actions);

			// return the extended constructor
			return extended;

		}
	});
});
