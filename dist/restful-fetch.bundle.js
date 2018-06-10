(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('isomorphic-fetch'), require('es6-promise'), require('lodash/includes')) :
  typeof define === 'function' && define.amd ? define(['isomorphic-fetch', 'es6-promise', 'lodash/includes'], factory) :
  (global['restful-fetch'] = factory(null,global.es6Promise,global.includes));
}(this, (function (isomorphicFetch,es6Promise,includes) { 'use strict';

  includes = includes && includes.hasOwnProperty('default') ? includes['default'] : includes;

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var hasNativePromise = typeof Promise !== 'undefined' && includes(Promise.toString(), '[native code]');
  if (!hasNativePromise) {
    es6Promise.polyfill();
  }

  var request = function request(path, params) {
    return fetch(path, params).then(function (response) {
      if (response.status >= 400) {
        return response.text().then(function (text) {
          throw {
            statusCode: response.status,
            statusText: response.statusText,
            responseText: text,
            message: '{\n\t statusCode: ' + response.status + ',\n\t statusText: "' + response.statusText + '",\n\t responseText: "' + text + '"\n}'
          };
        });
      }

      return response.json();
    });
  };

  var post = function post(path, data) {
    var requestHeaders = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var headers = _extends({
      'Content-Type': 'application/json'
    }, requestHeaders);

    var params = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: headers
    };

    return request(path, params);
  };

  var get = function get(path) {
    var requestHearders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var headers = _extends({
      'Content-Type': 'application/json'
    }, requestHearders);

    var params = {
      method: 'GET',
      headers: headers
    };

    return request(path, params);
  };

  var del = function del(path) {
    var requestHearders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var headers = _extends({}, requestHearders);

    var params = {
      method: 'DELETE',
      headers: headers
    };

    return request(path, params);
  };

  var api = { post: post, get: get, del: del };

  return api;

})));
