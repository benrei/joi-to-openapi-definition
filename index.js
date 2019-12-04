const convert = require('joi-to-json-schema');
const openApi = require('openapi-definition');

/**
 * Adds a Joi model into OpenAPI definition components.schemas
 * @param definition {object}, openApiDefinition object
 * @param key {string}, openApiDefinition.components.schemas[key] => openApiDefinition.components.schemas.User
 * @param joiModel {object}. A valid Joi object
 */
const add_joi_model = (definition, key, joiModel) =>{
  let converted = convert(joiModel);
  openApi.add.components_schema(definition, key, converted);
};

/**
 * Adds Joi models to OpenAPI definition components.schemas, using object keys as property names
 * @param definition {object}, openApiDefinition object
 * @param joiModels {object}. Object of valid Joi objects
 */
const add_joi_models = (definition, joiModels) =>{
  for (const propName in joiModels){
    const joiModel = convert(joiModels[propName]);
    openApi.add.components_schema(definition, propName, joiModel);
  }
};

module.exports = {
  convert,   //  Coverts Joi model to JSON schema
  add_joi_model,
  add_joi_models,
};