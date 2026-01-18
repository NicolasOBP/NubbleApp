import {
  tryGetAxiosErrorMessage,
  isErrorWithMessage,
  toErrorWithMessage,
  getErrorMessage,
} from '../errorUtils';

import { axiosErrors } from './mockedData/mocks';

describe('errorUtils', () => {
  describe('tryGetAxiosErrorMessage', () => {
    it('should return the axios error message in simple form (without array)', () => {
      const errorMessage = tryGetAxiosErrorMessage(axiosErrors.simpleError);

      expect(errorMessage).toBe('error message');
    });
    it("should return a list of axios error joined by ','", () => {
      const errorMessage = tryGetAxiosErrorMessage(axiosErrors.arrayError);

      expect(errorMessage).toBe('error 1, error 2');
    });
    it("should return a list of 2 unknown axios error joined by ','", () => {
      const errorMessage = tryGetAxiosErrorMessage(
        axiosErrors.arrayUnkownError,
      );

      expect(errorMessage).toBe('unknown error, unknown error');
    });
    it('should return null', () => {
      const errorMessage = tryGetAxiosErrorMessage(axiosErrors.notAxiosError);
      const errorMessage2 = tryGetAxiosErrorMessage(
        axiosErrors.errorWithoutResponse,
      );

      expect(errorMessage).toBe(null);
      expect(errorMessage2).toBe(null);
    });
  });

  describe('isErrorWithMessage', () => {
    it('should return true when error has message as string', () => {
      const error = { message: 'test error' };

      expect(isErrorWithMessage(error)).toBe(true);
    });

    it('should return false when error does not have message property', () => {
      const error = { code: 'ERR_CODE' };

      expect(isErrorWithMessage(error)).toBe(false);
    });

    it('should return false when message is not a string', () => {
      const error = { message: 123 };

      expect(isErrorWithMessage(error)).toBe(false);
    });

    it('should return false when error is null', () => {
      expect(isErrorWithMessage(null)).toBe(false);
    });

    it('should return false when error is undefined', () => {
      expect(isErrorWithMessage(undefined)).toBe(false);
    });

    it('should return false when error is a string', () => {
      expect(isErrorWithMessage('error string')).toBe(false);
    });

    it('should return false when error is a number', () => {
      expect(isErrorWithMessage(123)).toBe(false);
    });
  });

  describe('toErrorWithMessage', () => {
    it('should return the same error if it already has a message property', () => {
      const error = { message: 'existing error' };

      const result = toErrorWithMessage(error);

      expect(result).toBe(error);
      expect(result.message).toBe('existing error');
    });
    it('should convert object to string and create Error', () => {
      const error = { code: 'ERR_CODE', status: 400 };

      const result = toErrorWithMessage(error);

      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe('{"code":"ERR_CODE","status":400}');
    });
    it('should handle null by creating Error with "null" string', () => {
      const result = toErrorWithMessage(null);

      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe('null');
    });
    it('should handle string by creating Error', () => {
      const result = toErrorWithMessage('error string');

      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe('"error string"');
    });
    it('should handle number by creating Error', () => {
      const result = toErrorWithMessage(123);

      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe('123');
    });
    it('should handle circular reference by falling back to String()', () => {
      const circularObj: any = { name: 'test' };
      circularObj.self = circularObj;

      const result = toErrorWithMessage(circularObj);

      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain('[object Object]');
    });
  });

  describe('getErrorMessage', () => {
    it('should return axios error message when available', () => {
      const message = getErrorMessage(axiosErrors.simpleError);

      expect(message).toBe('error message');
    });
    it('should return joined axios errors when response has error array', () => {
      const message = getErrorMessage(axiosErrors.arrayError);

      expect(message).toBe('error 1, error 2');
    });
    it('should return unknown error for array without message property', () => {
      const message = getErrorMessage(axiosErrors.arrayUnkownError);

      expect(message).toBe('unknown error, unknown error');
    });
    it('should return error message from object with message property', () => {
      const error = { message: 'custom error message' };

      const message = getErrorMessage(error);

      expect(message).toBe('custom error message');
    });
    it('should convert object without message to string', () => {
      const error = { code: 'ERR_CODE', status: 400 };

      const message = getErrorMessage(error);

      expect(message).toBe('{"code":"ERR_CODE","status":400}');
    });
    it('should handle null error', () => {
      const message = getErrorMessage(null);

      expect(message).toBe('null');
    });
    it('should handle string error', () => {
      const message = getErrorMessage('error string');

      expect(message).toBe('"error string"');
    });
    it('should handle Error instance', () => {
      const error = new Error('native error');

      const message = getErrorMessage(error);

      expect(message).toBe('native error');
    });
  });
});
