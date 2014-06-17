/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */
define(function (require, exports, module) {


	exports.getState = function getState() {
		return this.state;
	};


	exports.setState = function setState(state) {
		this.state = state;
		return this;
	};


});
