import Joi from 'joi';

const analysisRouteSchema = Joi.object({
  escolhas: Joi.string()
    .regex(/\[(\d{7}(,\d{7})*)?]$/)
    .required(),
  historico: Joi.string()
    .regex(/\[(\d{7}(,\d{7})*)?]$/)
    .required(),
});

export default analysisRouteSchema;
