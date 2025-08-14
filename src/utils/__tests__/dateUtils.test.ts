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
      const time = formatISO(sub(Date.now(), { seconds: 30 }));

      expect(dateUtils.formatRelative(time)).toBe('30 s');
    });

    it('another test', () => {
      const time = formatISO(sub(Date.now(), { seconds: 30 }));

      expect(dateUtils.formatRelative(time)).toBe('30 s');
    });
  });
});
