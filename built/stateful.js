/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

//     stateful
//     (c) simonfan
//     stateful is licensed under the MIT terms.

!function(t){if("function"==typeof bootstrap)bootstrap("promise",t);else if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define("q",t);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeQ=t}else Q=t()}(function(){function t(t){return function(){return J.apply(t,arguments)}}function n(t){return t===Object(t)}function e(t){return"[object StopIteration]"===nn(t)||t instanceof V}function r(t,n){if($&&n.stack&&"object"==typeof t&&null!==t&&t.stack&&-1===t.stack.indexOf(en)){for(var e=[],r=n;r;r=r.source)r.stack&&e.unshift(r.stack);e.unshift(t.stack);var i=e.join("\n"+en+"\n");t.stack=o(i)}}function o(t){for(var n=t.split("\n"),e=[],r=0;r<n.length;++r){var o=n[r];c(o)||i(o)||!o||e.push(o)}return e.join("\n")}function i(t){return-1!==t.indexOf("(module.js:")||-1!==t.indexOf("(node.js:")}function u(t){var n=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(t);if(n)return[n[1],Number(n[2])];var e=/at ([^ ]+):(\d+):(?:\d+)$/.exec(t);if(e)return[e[1],Number(e[2])];var r=/.*@(.+):(\d+)$/.exec(t);return r?[r[1],Number(r[2])]:void 0}function c(t){var n=u(t);if(!n)return!1;var e=n[0],r=n[1];return e===Q&&r>=z&&cn>=r}function s(){if($)try{throw new Error}catch(t){var n=t.stack.split("\n"),e=n[0].indexOf("@")>0?n[1]:n[2],r=u(e);if(!r)return;return Q=r[0],r[1]}}function f(t,n,e){return function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn(n+" is deprecated, use "+e+" instead.",new Error("").stack),t.apply(t,arguments)}}function a(t){return m(t)?t:g(t)?O(t):T(t)}function p(){function t(t){n=t,i.source=t,L(e,function(n,e){H(function(){t.promiseDispatch.apply(t,e)})},void 0),e=void 0,r=void 0}var n,e=[],r=[],o=Y(p.prototype),i=Y(h.prototype);if(i.promiseDispatch=function(t,o,i){var u=K(arguments);e?(e.push(u),"when"===o&&i[1]&&r.push(i[1])):H(function(){n.promiseDispatch.apply(n,u)})},i.valueOf=function(){if(e)return i;var t=v(n);return m(t)&&(n=t),t},i.inspect=function(){return n?n.inspect():{state:"pending"}},a.longStackSupport&&$)try{throw new Error}catch(u){i.stack=u.stack.substring(u.stack.indexOf("\n")+1)}return o.promise=i,o.resolve=function(e){n||t(a(e))},o.fulfill=function(e){n||t(T(e))},o.reject=function(e){n||t(S(e))},o.notify=function(t){n||L(r,function(n,e){H(function(){e(t)})},void 0)},o}function l(t){if("function"!=typeof t)throw new TypeError("resolver must be a function.");var n=p();try{t(n.resolve,n.reject,n.notify)}catch(e){n.reject(e)}return n.promise}function d(t){return l(function(n,e){for(var r=0,o=t.length;o>r;r++)a(t[r]).then(n,e)})}function h(t,n,e){void 0===n&&(n=function(t){return S(new Error("Promise does not support operation: "+t))}),void 0===e&&(e=function(){return{state:"unknown"}});var r=Y(h.prototype);if(r.promiseDispatch=function(e,o,i){var u;try{u=t[o]?t[o].apply(r,i):n.call(r,o,i)}catch(c){u=S(c)}e&&e(u)},r.inspect=e,e){var o=e();"rejected"===o.state&&(r.exception=o.reason),r.valueOf=function(){var t=e();return"pending"===t.state||"rejected"===t.state?r:t.value}}return r}function y(t,n,e,r){return a(t).then(n,e,r)}function v(t){if(m(t)){var n=t.inspect();if("fulfilled"===n.state)return n.value}return t}function m(t){return n(t)&&"function"==typeof t.promiseDispatch&&"function"==typeof t.inspect}function g(t){return n(t)&&"function"==typeof t.then}function j(t){return m(t)&&"pending"===t.inspect().state}function k(t){return!m(t)||"fulfilled"===t.inspect().state}function w(t){return m(t)&&"rejected"===t.inspect().state}function b(){rn.length=0,on.length=0,un||(un=!0)}function x(t,n){un&&(on.push(t),rn.push(n&&"undefined"!=typeof n.stack?n.stack:"(no stack) "+n))}function R(t){if(un){var n=W(on,t);-1!==n&&(on.splice(n,1),rn.splice(n,1))}}function S(t){var n=h({when:function(n){return n&&R(this),n?n(t):this}},function(){return this},function(){return{state:"rejected",reason:t}});return x(n,t),n}function T(t){return h({when:function(){return t},get:function(n){return t[n]},set:function(n,e){t[n]=e},"delete":function(n){delete t[n]},post:function(n,e){return null===n||void 0===n?t.apply(void 0,e):t[n].apply(t,e)},apply:function(n,e){return t.apply(n,e)},keys:function(){return tn(t)}},void 0,function(){return{state:"fulfilled",value:t}})}function O(t){var n=p();return H(function(){try{t.then(n.resolve,n.reject,n.notify)}catch(e){n.reject(e)}}),n.promise}function _(t){return h({isDef:function(){}},function(n,e){return A(t,n,e)},function(){return a(t).inspect()})}function N(t,n,e){return a(t).spread(n,e)}function P(t){return function(){function n(t,n){var u;if("undefined"==typeof StopIteration){try{u=r[t](n)}catch(c){return S(c)}return u.done?u.value:y(u.value,o,i)}try{u=r[t](n)}catch(c){return e(c)?c.value:S(c)}return y(u,o,i)}var r=t.apply(this,arguments),o=n.bind(n,"next"),i=n.bind(n,"throw");return o()}}function D(t){a.done(a.async(t)())}function E(t){throw new V(t)}function q(t){return function(){return N([this,C(arguments)],function(n,e){return t.apply(n,e)})}}function A(t,n,e){return a(t).dispatch(n,e)}function C(t){return y(t,function(t){var n=0,e=p();return L(t,function(r,o,i){var u;m(o)&&"fulfilled"===(u=o.inspect()).state?t[i]=u.value:(++n,y(o,function(r){t[i]=r,0===--n&&e.resolve(t)},e.reject,function(t){e.notify({index:i,value:t})}))},void 0),0===n&&e.resolve(t),e.promise})}function I(t){return y(t,function(t){return t=X(t,a),y(C(X(t,function(t){return y(t,G,G)})),function(){return t})})}function F(t){return a(t).allSettled()}function M(t,n){return a(t).then(void 0,void 0,n)}function U(t,n){return a(t).nodeify(n)}var $=!1;try{throw new Error}catch(B){$=!!B.stack}var Q,V,z=s(),G=function(){},H=function(){function t(){for(;n.next;){n=n.next;var e=n.task;n.task=void 0;var o=n.domain;o&&(n.domain=void 0,o.enter());try{e()}catch(u){if(i)throw o&&o.exit(),setTimeout(t,0),o&&o.enter(),u;setTimeout(function(){throw u},0)}o&&o.exit()}r=!1}var n={task:void 0,next:null},e=n,r=!1,o=void 0,i=!1;if(H=function(t){e=e.next={task:t,domain:i&&process.domain,next:null},r||(r=!0,o())},"undefined"!=typeof process&&process.nextTick)i=!0,o=function(){process.nextTick(t)};else if("function"==typeof setImmediate)o="undefined"!=typeof window?setImmediate.bind(window,t):function(){setImmediate(t)};else if("undefined"!=typeof MessageChannel){var u=new MessageChannel;u.port1.onmessage=function(){o=c,u.port1.onmessage=t,t()};var c=function(){u.port2.postMessage(0)};o=function(){setTimeout(t,0),c()}}else o=function(){setTimeout(t,0)};return H}(),J=Function.call,K=t(Array.prototype.slice),L=t(Array.prototype.reduce||function(t,n){var e=0,r=this.length;if(1===arguments.length)for(;;){if(e in this){n=this[e++];break}if(++e>=r)throw new TypeError}for(;r>e;e++)e in this&&(n=t(n,this[e],e));return n}),W=t(Array.prototype.indexOf||function(t){for(var n=0;n<this.length;n++)if(this[n]===t)return n;return-1}),X=t(Array.prototype.map||function(t,n){var e=this,r=[];return L(e,function(o,i,u){r.push(t.call(n,i,u,e))},void 0),r}),Y=Object.create||function(t){function n(){}return n.prototype=t,new n},Z=t(Object.prototype.hasOwnProperty),tn=Object.keys||function(t){var n=[];for(var e in t)Z(t,e)&&n.push(e);return n},nn=t(Object.prototype.toString);V="undefined"!=typeof ReturnValue?ReturnValue:function(t){this.value=t};var en="From previous event:";a.resolve=a,a.nextTick=H,a.longStackSupport=!1,a.defer=p,p.prototype.makeNodeResolver=function(){var t=this;return function(n,e){n?t.reject(n):t.resolve(arguments.length>2?K(arguments,1):e)}},a.Promise=l,a.promise=l,l.race=d,l.all=C,l.reject=S,l.resolve=a,a.passByCopy=function(t){return t},h.prototype.passByCopy=function(){return this},a.join=function(t,n){return a(t).join(n)},h.prototype.join=function(t){return a([this,t]).spread(function(t,n){if(t===n)return t;throw new Error("Can't join: not the same: "+t+" "+n)})},a.race=d,h.prototype.race=function(){return this.then(a.race)},a.makePromise=h,h.prototype.toString=function(){return"[object Promise]"},h.prototype.then=function(t,n,e){function o(n){try{return"function"==typeof t?t(n):n}catch(e){return S(e)}}function i(t){if("function"==typeof n){r(t,c);try{return n(t)}catch(e){return S(e)}}return S(t)}function u(t){return"function"==typeof e?e(t):t}var c=this,s=p(),f=!1;return H(function(){c.promiseDispatch(function(t){f||(f=!0,s.resolve(o(t)))},"when",[function(t){f||(f=!0,s.resolve(i(t)))}])}),c.promiseDispatch(void 0,"when",[void 0,function(t){var n,e=!1;try{n=u(t)}catch(r){if(e=!0,!a.onerror)throw r;a.onerror(r)}e||s.notify(n)}]),s.promise},a.when=y,h.prototype.thenResolve=function(t){return this.then(function(){return t})},a.thenResolve=function(t,n){return a(t).thenResolve(n)},h.prototype.thenReject=function(t){return this.then(function(){throw t})},a.thenReject=function(t,n){return a(t).thenReject(n)},a.nearer=v,a.isPromise=m,a.isPromiseAlike=g,a.isPending=j,h.prototype.isPending=function(){return"pending"===this.inspect().state},a.isFulfilled=k,h.prototype.isFulfilled=function(){return"fulfilled"===this.inspect().state},a.isRejected=w,h.prototype.isRejected=function(){return"rejected"===this.inspect().state};var rn=[],on=[],un=!0;a.resetUnhandledRejections=b,a.getUnhandledReasons=function(){return rn.slice()},a.stopUnhandledRejectionTracking=function(){b(),un=!1},b(),a.reject=S,a.fulfill=T,a.master=_,a.spread=N,h.prototype.spread=function(t,n){return this.all().then(function(n){return t.apply(void 0,n)},n)},a.async=P,a.spawn=D,a["return"]=E,a.promised=q,a.dispatch=A,h.prototype.dispatch=function(t,n){var e=this,r=p();return H(function(){e.promiseDispatch(r.resolve,t,n)}),r.promise},a.get=function(t,n){return a(t).dispatch("get",[n])},h.prototype.get=function(t){return this.dispatch("get",[t])},a.set=function(t,n,e){return a(t).dispatch("set",[n,e])},h.prototype.set=function(t,n){return this.dispatch("set",[t,n])},a.del=a["delete"]=function(t,n){return a(t).dispatch("delete",[n])},h.prototype.del=h.prototype["delete"]=function(t){return this.dispatch("delete",[t])},a.mapply=a.post=function(t,n,e){return a(t).dispatch("post",[n,e])},h.prototype.mapply=h.prototype.post=function(t,n){return this.dispatch("post",[t,n])},a.send=a.mcall=a.invoke=function(t,n){return a(t).dispatch("post",[n,K(arguments,2)])},h.prototype.send=h.prototype.mcall=h.prototype.invoke=function(t){return this.dispatch("post",[t,K(arguments,1)])},a.fapply=function(t,n){return a(t).dispatch("apply",[void 0,n])},h.prototype.fapply=function(t){return this.dispatch("apply",[void 0,t])},a["try"]=a.fcall=function(t){return a(t).dispatch("apply",[void 0,K(arguments,1)])},h.prototype.fcall=function(){return this.dispatch("apply",[void 0,K(arguments)])},a.fbind=function(t){var n=a(t),e=K(arguments,1);return function(){return n.dispatch("apply",[this,e.concat(K(arguments))])}},h.prototype.fbind=function(){var t=this,n=K(arguments);return function(){return t.dispatch("apply",[this,n.concat(K(arguments))])}},a.keys=function(t){return a(t).dispatch("keys",[])},h.prototype.keys=function(){return this.dispatch("keys",[])},a.all=C,h.prototype.all=function(){return C(this)},a.allResolved=f(I,"allResolved","allSettled"),h.prototype.allResolved=function(){return I(this)},a.allSettled=F,h.prototype.allSettled=function(){return this.then(function(t){return C(X(t,function(t){function n(){return t.inspect()}return t=a(t),t.then(n,n)}))})},a.fail=a["catch"]=function(t,n){return a(t).then(void 0,n)},h.prototype.fail=h.prototype["catch"]=function(t){return this.then(void 0,t)},a.progress=M,h.prototype.progress=function(t){return this.then(void 0,void 0,t)},a.fin=a["finally"]=function(t,n){return a(t)["finally"](n)},h.prototype.fin=h.prototype["finally"]=function(t){return t=a(t),this.then(function(n){return t.fcall().then(function(){return n})},function(n){return t.fcall().then(function(){throw n})})},a.done=function(t,n,e,r){return a(t).done(n,e,r)},h.prototype.done=function(t,n,e){var o=function(t){H(function(){if(r(t,i),!a.onerror)throw t;a.onerror(t)})},i=t||n||e?this.then(t,n,e):this;"object"==typeof process&&process&&process.domain&&(o=process.domain.bind(o)),i.then(void 0,o)},a.timeout=function(t,n,e){return a(t).timeout(n,e)},h.prototype.timeout=function(t,n){var e=p(),r=setTimeout(function(){e.reject(new Error(n||"Timed out after "+t+" ms"))},t);return this.then(function(t){clearTimeout(r),e.resolve(t)},function(t){clearTimeout(r),e.reject(t)},e.notify),e.promise},a.delay=function(t,n){return void 0===n&&(n=t,t=void 0),a(t).delay(n)},h.prototype.delay=function(t){return this.then(function(n){var e=p();return setTimeout(function(){e.resolve(n)},t),e.promise})},a.nfapply=function(t,n){return a(t).nfapply(n)},h.prototype.nfapply=function(t){var n=p(),e=K(t);return e.push(n.makeNodeResolver()),this.fapply(e).fail(n.reject),n.promise},a.nfcall=function(t){var n=K(arguments,1);return a(t).nfapply(n)},h.prototype.nfcall=function(){var t=K(arguments),n=p();return t.push(n.makeNodeResolver()),this.fapply(t).fail(n.reject),n.promise},a.nfbind=a.denodeify=function(t){var n=K(arguments,1);return function(){var e=n.concat(K(arguments)),r=p();return e.push(r.makeNodeResolver()),a(t).fapply(e).fail(r.reject),r.promise}},h.prototype.nfbind=h.prototype.denodeify=function(){var t=K(arguments);return t.unshift(this),a.denodeify.apply(void 0,t)},a.nbind=function(t,n){var e=K(arguments,2);return function(){function r(){return t.apply(n,arguments)}var o=e.concat(K(arguments)),i=p();return o.push(i.makeNodeResolver()),a(r).fapply(o).fail(i.reject),i.promise}},h.prototype.nbind=function(){var t=K(arguments,0);return t.unshift(this),a.nbind.apply(void 0,t)},a.nmapply=a.npost=function(t,n,e){return a(t).npost(n,e)},h.prototype.nmapply=h.prototype.npost=function(t,n){var e=K(n||[]),r=p();return e.push(r.makeNodeResolver()),this.dispatch("post",[t,e]).fail(r.reject),r.promise},a.nsend=a.nmcall=a.ninvoke=function(t,n){var e=K(arguments,2),r=p();return e.push(r.makeNodeResolver()),a(t).dispatch("post",[n,e]).fail(r.reject),r.promise},h.prototype.nsend=h.prototype.nmcall=h.prototype.ninvoke=function(t){var n=K(arguments,1),e=p();return n.push(e.makeNodeResolver()),this.dispatch("post",[t,n]).fail(e.reject),e.promise},a.nodeify=U,h.prototype.nodeify=function(t){return t?void this.then(function(n){H(function(){t(null,n)})},function(n){H(function(){t(n)})}):this};var cn=s();return a}),define("__stateful/action",["require","exports","module","lodash","q"],function(t,n){function e(t,n,e){var i={};return r.each(e,function(t,n){var e=n.split(/\s*\|\s*/g);r.each(e,function(n){i[n]=t})}),function(){var e=t.getState(),u=i[e]||i["default"]||r.noop;t.setState(n+":doing");var c=o(u.apply(t,arguments));return c.then(function(){t.setState(n+":done")}),c}}var r=t("lodash"),o=t("q");n.action=function(t,n){return this[t]=e(this,t,n),this}}),define("__stateful/state",["require","exports","module"],function(t,n){n.getState=function(){return this.state},n.setState=function(t){return this.state=t,this}}),define("stateful",["require","exports","module","subject","lodash","./__stateful/action","./__stateful/state"],function(t,n,e){var r=t("subject"),o=(t("lodash"),{enumerable:!1}),i=e.exports=r({initialize:function(t){this.state=t.state||this.state}});i.assignProto(t("./__stateful/action"),o).assignProto(t("./__stateful/state"),o)});