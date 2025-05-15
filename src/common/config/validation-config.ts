import * as Joi from 'joi';
import { DBType } from '../typeorm/enum/db-type.enum';

export const envValidationSchema = Joi.object({
  DB_TYPE: Joi.string()
    .valid(...Object.values(DBType))
    .required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  PORT: Joi.number().required(),

  // URL_MINIO: Joi.string().required(),
  // ACCESS_KEY_ID_MINIO: Joi.string().required(),
  // SECRET_ACCESS_KEY_MINIO: Joi.string().required(),
});
