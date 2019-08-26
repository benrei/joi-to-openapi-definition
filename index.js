const convert = require('joi-to-json-schema');
const openApi = require('openapi-definition');

/**
 * Adds a Joi model into OpenAPI definition components.schemas
 * @param joiModel {object}. A valid Joi object
 * @param key {string}, openApiDefinition.components.schemas[key] => openApiDefinition.components.schemas.User
 * @param openApiDef {object}, openApiDefinition object
 */
const add_joi_model = (joiModel, key, openApiDef) =>{
  let converted = convert(joiModel);
  openApi.add.components_schema(converted, key, openApiDef);
};

/**
 * Adds Joi models to OpenAPI definition components.schemas, using object keys as property names
 * @param joiModelsObject {object}. Object of valid Joi objects
 * @param openApiDef {object}, openApiDefinition object
 */
const add_joi_models = (joiModelsObject, openApiDef) =>{
  for (const propName in joiModelsObject){
    const joiSchema = convert(joiModelsObject[propName]);
    openApi.add.components_schema(joiSchema, propName, openApiDef);
  }
};

module.exports = {
  convert,
  add_joi_model,
  add_joi_models,
  openapi_definition: openApi
};