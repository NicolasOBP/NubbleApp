import { stringUtils } from '@utils';
import { z } from 'zod';

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

const username = z
  .string()
  .min(5, 'Username muito curto')
  .regex(userNameRegex, 'username inválido')
  .toLowerCase();

const name = z
  .string()
  .min(5, 'Nome muito curto')
  .max(50, 'Nome muito longo')
  .transform(stringUtils.capitalizeFirstLetter);

const email = z.string().email('E-mail inválido');

const password = z.string().min(8, 'Senha deve ter pelo menos 8 caracteres');

export const schemaTypes = { username, name, email, password };
