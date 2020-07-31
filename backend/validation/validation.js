const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateInput(data) {
    
    let errors = {
        type: [],
        value: []
    };

    data.type = !isEmpty(data.type) ? data.type : "";
    data.value = !isEmpty(data.value) ? data.value : "";

    // Check for empty type object
    if (Validator.isEmpty(data.type)) {
        errors.type.push("Type field is required.");
    }

    // Check for empty value object
    if (Validator.isEmpty(data.value)) {
        errors.value += "Value field is required. ";
    }

    let dataArray = data.value.split(',').map(i => i.trim()); // convert string to array

    // Check for max value count
    if (dataArray.length > 100) {
        errors.value.push("Please Enter between 1 to 100 values.");
    }

    // Check for empty values
    if (dataArray.some(i => i === '')) {
        errors.value.push("Please remove the empty values.");
    }

    // String Checks
    if (data.type === 'STR') {
        if (dataArray.some(i => i.length > 10)) {
            errors.value.push("Values must be 10 characters or less.")
        }
    }

    // Integer checks
    if (data.type === 'INT') {
        dataArray = dataArray.map(i => +i); // Convert to number

        if (dataArray.some(i => i > Number.MAX_SAFE_INTEGER)) {
            errors.value.push("Integer is too large.");
        }

        // Check for non numeric values
        if (dataArray.some(isNaN)) {
            errors.value.push("Please remove the non-numeric values.");
        }
        // Check for decimals
        else if(dataArray.some(i => !isInteger(i))) {
            errors.value.push("Please remove the decimals.");
        }
    }

    // return object
    return {
        errors,
        isValid: (errors.value.length === 0 && errors.type.length === 0)
    };
}

// Checks if value is an integer
function isInteger(value) {
    return value === parseInt(value);
}
