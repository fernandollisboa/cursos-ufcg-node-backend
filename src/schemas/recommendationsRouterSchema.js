import Joi from 'joi';

export default Joi.object({
  escolhas: Joi.string()
    .regex(/\[(\d{7}(,\d{7})*)?]$/)
    .required(),
  historico: Joi.string()
    .regex(/\[(\d{7}(,\d{7})*)?]$/)
    .required(),
  nao_cursei: Joi.string(),
});
