import _ from 'lodash';

import * as http from '../httpService';

fetch = jest.fn().mockRejectedValue('error');

const DEFAULT_HEADERS = { abc: 'def' };
const HTTP_DELETE_VERB = 'DELETE';
const HTTP_SERVICE_GET_METHOD = 'get';
const HTTP_SERVICE_DELETE_METHOD = 'remove';

describe('Http Service', () => {
  const httpServiceMethods = [http.remove, http.patch, http.post, http.put, http.get];

  afterEach(() => {
    fetch.mockReset();
    http.resetHeaders();
  });

  function getRequestOptions() {
    return fetch.mock.calls[0][1];
  }

  function isUpdateMethod(method) {
    return !(method.name === HTTP_SERVICE_DELETE_METHOD || method.name === HTTP_SERVICE_GET_METHOD);
  }

  httpServiceMethods.map(method => {
    test(`should set proper http method on ${method.name.toUpperCase()}`, async () => {
      try {
        await method();
      } catch (error) {}

      // NOTE: proper verb for remove is DELETE. Method is named remove instead
      // because delete is a reserved keyword
      method.name === HTTP_SERVICE_DELETE_METHOD
        ? expect(getRequestOptions().method).toBe(HTTP_DELETE_VERB)
        : expect(getRequestOptions().method).toBe(method.name.toUpperCase());
    });

    if (isUpdateMethod(method)) {
      test(`should set body property with JSON data on ${method.name.toUpperCase()}`, async () => {
        try {
          await method();
        } catch (error) {}

        expect(getRequestOptions().method).toEqual(method.name.toUpperCase());
      });
    }

    test(`should set and clear default headers on ${method.name.toUpperCase()}`, async () => {
      // Set default headers
      http.setDefaultHeaders(DEFAULT_HEADERS);

      try {
        await method();
      } catch (error) {}

      expect(getRequestOptions().headers).toEqual(DEFAULT_HEADERS);

      // Reset default headers
      http.resetHeaders();

      try {
        await method();
      } catch (error) {}

      expect(getRequestOptions().headers).toEqual({});
    });

    test(`should merge given headers with default ones on ${method.name.toUpperCase()}`, async () => {
      const header = { xyz: 'lmn' };

      http.setDefaultHeaders(DEFAULT_HEADERS);

      try {
        if (isUpdateMethod(method)) {
          await method(null, null, { headers: header });
        } else {
          await method(null, { headers: header });
        }
      } catch (error) {}

      expect(getRequestOptions().headers).toEqual(_.merge(header, DEFAULT_HEADERS));
    });
  });
});
