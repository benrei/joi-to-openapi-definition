# joi-to-openapi-definition
[![NPM version](https://img.shields.io/npm/v/joi-to-openapi-definition.svg)](https://www.npmjs.com/package/joi-to-openapi-definition)

Add Joi models to openAPI definition, using openapi-definition

## Installation

```sh
$ npm install joi-to-openapi-definition
```

## Usage

###  Example

```js
const Joi = require('@hapi/joi');
const j2od = require('joi-to-openapi-definition');

let openApiDef = {    //  Your OpenApi definition
  "openapi": "3.0.0",
  "info": {
    "title": "Sample API",
    "description": "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
    "version": "0.1.9"
  },
  "servers": [
    {
      "url": "http://api.example.com/v1",
      "description": "Optional server description, e.g. Main (production) server"
    },
    {
      "url": "http://staging-api.example.com",
      "description": "Optional server description, e.g. Internal staging server for testing"
    }
  ],
  "paths": {}
};

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainSegments: 2 })
}).with('username', 'birthyear').without('password', 'access_token');

//  Add schema to OpenApi definition
j2od.add_joi_model(schema, 'schema', openApiDef)

console.log(openApiDef);
```

#### Output

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Sample API",
    "description": "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
    "version": "0.1.9"
  },
  "servers": [
    {
      "url": "http://api.example.com/v1",
      "description": "Optional server description, e.g. Main (production) server"
    },
    {
      "url": "http://staging-api.example.com",
      "description": "Optional server description, e.g. Internal staging server for testing"
    }
  ],
  "paths": {},
  "components": {
    "schemas": {
      "schema": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "minLength": 3,
            "maxLength": 30
          },
          "password": {
            "type": "string",
            "pattern": "^[a-zA-Z0-9]{3,30}$"
          },
          "access_token": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "type": "number"
              }
            ]
          },
          "birthyear": {
            "type": "integer",
            "minimum": 1900,
            "maximum": 2013
          },
          "email": {
            "type": "string",
            "format": "email"
          }
        },
        "additionalProperties": false,
        "patterns": [],
        "required": [
          "username"
        ]
      }
    }
  }
}
```

##  Docs
```js
const j2od = require('joi-to-openapi-definition');

//  Returns converted Joi model as json schema
j2od.convert(joiModel)

//  Add Joi model to OpenAPI Definition
j2od.add_joi_model(joiModel, 'someKey', yourOpenApiDefinition)

//  Add Joi models to OpenAPI Definition, using object keys as property names
j2od.add_joi_models(objectOfJoiModels, yourOpenApiDefinition)

//  Copy of openapi-definition package
//  See https://www.npmjs.com/package/openapi-definition for docs
j2od.openapi_definition

```

## License

  [MIT](LICENSE)
