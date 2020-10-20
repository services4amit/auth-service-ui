function valid(validations) {
    const validation = {};

    validations.map(
      (rule) => (validation[rule.field] = { isInvalid: false, message: "" })
    );
      // console.log('line 7  - ', validation)
    return { isValid: true, ...validation };
  }

  export default valid;