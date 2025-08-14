import { dateUtils } from '@utils';
import { add, Duration, formatISO, sub } from 'date-fns';

const MOCKED_NOW = 1755211014174;

function getDateISO(duration: Duration, isFuture = false) {
  const time = isFuture ? add(Date.now(), duration) : sub(Date.now(), duration);
  const timeISO = formatISO(time);
  return dateUtils.formatRelative(timeISO);
}

describe('dateUtils', () => {
  describe('formatRelative', () => {
    beforeAll(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => MOCKED_NOW);
    });
    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be displayed in sconds if less than 1 minute agos', () => {
      expect(getDateISO({ seconds: 30 })).toBe('30 s');
    });

    it('should be displayed in minutes if less than 1 hour ago', () => {
      expect(getDateISO({ minutes: 20 })).toBe('20 m');
    });

    it('should be displayed in hours if less than 1 day ago', () => {
      expect(getDateISO({ hours: 15 })).toBe('15 h');
    });

    it('should be displayed in days if less than 7 day ago', () => {
      expect(getDateISO({ days: 5 })).toBe('5 d');
    });

    it('should be displayed in weeks if less than 4 weeks ago', () => {
      expect(getDateISO({ weeks: 3, hours: 2 })).toBe('3 sem');
    });

    it('should be displayed in months if less than 12 months ago', () => {
      expect(getDateISO({ months: 10 })).toBe('10 mes');
    });

    it('should be displayed in dd/MM/yyyy if more than 12 months ago', () => {
      expect(getDateISO({ months: 13 })).toBe('14/07/2024');
    });

    it('should be displayed in dd/MM/yyyy if future date', () => {
      expect(getDateISO({ days: 2 }, true)).toBe('16/08/2025');
    });
  });
});
