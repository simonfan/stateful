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

	var nonEnum = { enumerable: false };

	var stateful = module.exports = subject({
		initialize: function initializeStateful(options) {

			/**
			 * Property that holds the state of the object.
			 * @type {[type]}
			 */
			this.state = options.state || this.state;
		},
	});

	stateful
		.assignProto(require('./__stateful/action'), nonEnum)
		.assignProto(require('./__stateful/state'), nonEnum);
});
