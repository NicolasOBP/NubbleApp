import { stringUtils } from '@utils';
import { z } from 'zod';

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

export const signUpSchema = z.object({
  username: z.string().regex(userNameRegex, 'username inválido').toLowerCase(),
  firstName: z
    .string()
    .min(5, 'Nome muito curto')
    .max(50, 'Nome muito longo')
    .transform(stringUtils.capitalizeFirstLetter),
  lastName: z
    .string()
    .min(5, 'Nome muito curto')
    .max(50, 'Nome muito longo')
    .transform(stringUtils.capitalizeFirstLetter),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
