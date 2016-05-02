!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Redux=e():t.Redux=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var o=n(1),u=r(o),i=n(7),a=r(i),f=n(6),c=r(f),d=n(5),s=r(d),l=n(2),p=r(l);e.createStore=u.default,e.combineReducers=a.default,e.bindActionCreators=c.default,e.applyMiddleware=s.default,e.compose=p.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){function n(){return c}function r(t){d.push(t);var e=!0;return function(){if(e){e=!1;var n=d.indexOf(t);d.splice(n,1)}}}function o(t){if(!i.default(t))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if("undefined"==typeof t.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(s)throw new Error("Reducers may not dispatch actions.");try{s=!0,c=f(c,t)}finally{s=!1}return d.slice().forEach(function(t){return t()}),t}function u(t){f=t,o({type:a.INIT})}if("function"!=typeof t)throw new Error("Expected the reducer to be a function.");var f=t,c=e,d=[],s=!1;return o({type:a.INIT}),{dispatch:o,subscribe:r,getState:n,replaceReducer:u}}e.__esModule=!0,e.default=o;var u=n(3),i=r(u),a={INIT:"@@redux/INIT"};e.ActionTypes=a},function(t,e){"use strict";function n(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];return function(t){return e.reduceRight(function(t,e){return e(t)},t)}}e.__esModule=!0,e.default=n,t.exports=e.default},function(t,e){"use strict";function n(t){if(!t||"object"!=typeof t)return!1;var e="function"==typeof t.constructor?Object.getPrototypeOf(t):Object.prototype;if(null===e)return!0;var n=e.constructor;return"function"==typeof n&&n instanceof n&&r(n)===r(Object)}e.__esModule=!0,e.default=n;var r=function(t){return Function.prototype.toString.call(t)};t.exports=e.default},function(t,e){"use strict";function n(t,e){return Object.keys(t).reduce(function(n,r){return n[r]=e(t[r],r),n},{})}e.__esModule=!0,e.default=n,t.exports=e.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];return function(t){return function(n,r){var o=t(n,r),i=o.dispatch,f=[],c={getState:o.getState,dispatch:function(t){return i(t)}};return f=e.map(function(t){return t(c)}),i=a.default.apply(void 0,f)(o.dispatch),u({},o,{dispatch:i})}}}e.__esModule=!0;var u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};e.default=o;var i=n(2),a=r(i);t.exports=e.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){return function(){return e(t.apply(void 0,arguments))}}function u(t,e){if("function"==typeof t)return o(t,e);if("object"!=typeof t||null===t||void 0===t)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===t?"null":typeof t)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');return a.default(t,function(t){return o(t,e)})}e.__esModule=!0,e.default=u;var i=n(4),a=r(i);t.exports=e.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){var n=e&&e.type,r=n&&'"'+n.toString()+'"'||"an action";return'Reducer "'+t+'" returned undefined handling '+r+". To ignore an action, you must explicitly return the previous state."}function u(t){Object.keys(t).forEach(function(e){var n=t[e],r=n(void 0,{type:a.ActionTypes.INIT});if("undefined"==typeof r)throw new Error('Reducer "'+e+'" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');var o="@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".");if("undefined"==typeof n(void 0,{type:o}))throw new Error('Reducer "'+e+'" returned undefined when probed with a random type. '+("Don't try to handle "+a.ActionTypes.INIT+' or other actions in "redux/*" ')+"namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.")})}function i(t){var e,n=l.default(t,function(t){return"function"==typeof t});try{u(n)}catch(r){e=r}var i=d.default(n,function(){return void 0});return function(t,r){if(void 0===t&&(t=i),e)throw e;var u=!1,a=d.default(n,function(e,n){var i=t[n],a=e(i,r);if("undefined"==typeof a){var f=o(n,r);throw new Error(f)}return u=u||a!==i,a});return u?a:t}}e.__esModule=!0,e.default=i;var a=n(1),f=n(3),c=(r(f),n(4)),d=r(c),s=n(8),l=r(s);t.exports=e.default},function(t,e){"use strict";function n(t,e){return Object.keys(t).reduce(function(n,r){return e(t[r])&&(n[r]=t[r]),n},{})}e.__esModule=!0,e.default=n,t.exports=e.default}])});