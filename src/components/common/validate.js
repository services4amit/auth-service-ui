import Validator from "validator"
import valid from './valid'

function validate (state, validations,validation_field) {
    // const validation = valid(validations);
    const validation = validation_field
    
    validations.forEach((rule) => {
      if (!validation[rule.field].isInvalid) {
        const field_value = state[rule.field].toString();
        const args = rule.args || [];

        const validation_method =
          typeof rule.method === "string"
            ? Validator[rule.method]
            : rule.method;
        
        if (validation_method(field_value, ...args, state) !== rule.validWhen) {
          validation[rule.field] = { isInvalid: true, message: rule.message };
          validation.isValid = false;
        }
      }
    });

    return validation;
}

export default validate;