import { stringUtils } from '@utils';

test('capitalizeFirstLetter', () => {
  stringUtils.capitalizeFirstLetter('Ana maria'); // Ana Maria
  stringUtils.capitalizeFirstLetter('ANA MARIA'); // Ana Maria
  stringUtils.capitalizeFirstLetter('MaRIa'); // Maria

  const nome = stringUtils.capitalizeFirstLetter('Ana eduarda');

  expect(nome).toBe('Ana Eduarda');
});
