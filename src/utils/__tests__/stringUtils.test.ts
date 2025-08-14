import { stringUtils } from '@utils';

describe('stringUtils', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of each word', () => {
      expect(stringUtils.capitalizeFirstLetter('MaRIa')).toBe('Maria');
      expect(stringUtils.capitalizeFirstLetter('ANA MARIA')).toBe('Ana Maria');
      expect(stringUtils.capitalizeFirstLetter('ana maria')).toBe('Ana Maria');
      expect(stringUtils.capitalizeFirstLetter('ana MaRIa')).toBe('Ana Maria');
    });

    it('should remove leadingtrailing spaces', () => {
      expect(stringUtils.capitalizeFirstLetter('  ANa  MaRIa  ')).toBe(
        'Ana Maria',
      );
    });
  });
});
