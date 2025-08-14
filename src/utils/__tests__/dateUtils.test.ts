import { dateUtils } from '@utils';
import { formatISO, sub } from 'date-fns';

const MOCKED_NOW = 1755211014174;

describe('dateUtils', () => {
  describe('formatRelative', () => {
    beforeAll(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => MOCKED_NOW);
    });
    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be displayed in sconds if less than 1 minute agos', () => {
      const time = sub(Date.now(), { seconds: 30 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toBe('30 s');
    });

    it('should be displayed in minutes if less than 1 hour ago', () => {
      const time = sub(Date.now(), { minutes: 20 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toBe('20 m');
    });
    it('should be displayed in hours if less than 1 day ago', () => {
      const time = sub(Date.now(), { hours: 15 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toBe('15 h');
    });

    it('should be displayed in days if less than 7 day ago', () => {
      const time = sub(Date.now(), { days: 5 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toBe('5 d');
    });
    it('should be displayed in weeks if less than 4 weeks ago', () => {
      const time = sub(Date.now(), { weeks: 3, hours: 2 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toBe('3 sem');
    });

    it('should be displayed in months if less than 12 months ago', () => {
      const time = sub(Date.now(), { months: 10 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toBe('10 mes');
    });
    it('should be displayed in dd/MM/yyyy if more than 12 months ago', () => {
      const time = sub(Date.now(), { months: 13 });
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toBe('14/07/2024');
    });
  });
});
