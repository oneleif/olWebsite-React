import _ from 'lodash';

import * as http from '../httpService';

const defaultHeaders = { abc: 'def' };
fetch = jest.fn().mockRejectedValue('error');
const httpMethods = [http.remove, http.patch, http.post, http.put, http.get];

describe('Http Service', () => {
  afterEach(() => {
    fetch.mockReset();
    http.resetHeaders();
  });

  function getRequestOptions() {
    return fetch.mock.calls[0][1];
  }

  function isUpdateMethod(method) {
    return !(method.name === 'remove' || method.name === 'get');
  }

  httpMethods.map(method => {
    test(`should set proper http method on ${method.name.toUpperCase()}`, async () => {
      try {
        await method();
      } catch (error) {}

      // NOTE: proper verb for remove is DELETE. Method is named remove instead
      // because delete is a reserved keyword
      method.name === 'remove'
        ? expect(getRequestOptions().method).toBe('DELETE')
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
      http.setDefaultHeaders(defaultHeaders);

      try {
        await method();
      } catch (error) {}

      expect(getRequestOptions().headers).toEqual(defaultHeaders);

      // Reset default headers
      http.resetHeaders();

      try {
        await method();
      } catch (error) {}

      expect(getRequestOptions().headers).toEqual({});
    });

    test(`should merge given headers with default ones on ${method.name.toUpperCase()}`, async () => {
      const header = { xyz: 'lmn' };

      http.setDefaultHeaders(defaultHeaders);

      try {
        if (isUpdateMethod(method)) {
          await method(null, null, { headers: header });
        } else {
          await method(null, { headers: header });
        }
      } catch (error) {}

      expect(getRequestOptions().headers).toEqual(_.merge(header, defaultHeaders));
    });
  });
});
