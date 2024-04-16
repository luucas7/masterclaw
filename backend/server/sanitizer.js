const validator = require('validator');

const sanitize = (input) => {
    return validator.escape(input);
    };
