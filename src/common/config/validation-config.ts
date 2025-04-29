import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  URL_MINIO: Joi.string().required(),
  ACCESS_KEY_ID_MINIO: Joi.string().required(),
  SECRET_ACCESS_KEY_MINIO: Joi.string().required(),
});
