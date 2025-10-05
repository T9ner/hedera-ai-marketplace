const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const schema = require('./openconvai-schema.json');

const ajv = new Ajv();
addFormats(ajv); // Add format validators (uri, email, etc.)
const validate = ajv.compile(schema);

function validateAgentMetadata(data) {
    const valid = validate(data);
    return {
        valid,
        errors: valid ? [] : validate.errors.map(e => `${e.instancePath} ${e.message}`)
    };
}

module.exports = { validateAgentMetadata };
