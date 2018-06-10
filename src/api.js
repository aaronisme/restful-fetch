import 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import includes from 'lodash/includes';

const hasNativePromise = typeof Promise !== 'undefined' && includes(Promise.toString(), '[native code]');
if (!hasNativePromise) {
  polyfill();
}

const request = (path, params) => fetch(path, params).then((response) => {
  if (response.status >= 400) {
    return response.text().then((text) => {
      throw {
        statusCode: response.status,
        statusText: response.statusText,
        responseText: text,
        message: `{\n\t statusCode: ${response.status},\n\t statusText: "${response.statusText}",\n\t responseText: "${text}"\n}`,
      };
    });
  }

  return response.json();
});


const post = (path, data, requestHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...requestHeaders,
  };

  const params = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers,
  };

  return request(path, params);
};

const get = (path, requestHearders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...requestHearders,
  };

  const params = {
    method: 'GET',
    headers,
  };

  return request(path, params);
};

const del = (path, requestHearders = {}) => {
  const headers = {
    ...requestHearders,
  };

  const params = {
    method: 'DELETE',
    headers,
  };

  return request(path, params);
};

export default { post, get, del };
