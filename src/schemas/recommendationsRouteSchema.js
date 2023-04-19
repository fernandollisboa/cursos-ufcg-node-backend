import Joi from 'joi';

const reccomendationsRouteSchema = Joi.object({
  escolhas: Joi.string()
    .regex(/\[(\d{7}(,\d{7})*)?]$/)
    .required(),
  historico: Joi.string()
    .regex(/\[(\d{7}(,\d{7})*)?]$/)
    .required(),
  nao_cursei: Joi.string(),
});

export default reccomendationsRouteSchema;
