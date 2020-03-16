type ValidateFn = (rule: any, value: string | number, callback: (err?: Error) => void) => void;

export const isValidUsername = (str: string) => str.trim().length >= 11;

export const validateMobile: ValidateFn = (rule, value, callback) => {
    if (typeof value !== 'number') {
        callback(new Error('Mobile must be a number'));
    }  else if (!isValidUsername(value.toString())) {
        callback(new Error('Please enter the correct mobile'));
    } else {
        callback();
    }
};

export const validatePassword = (rule: any, value: string, callback: (err?: Error) => void) => {
    if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
    } else {
        callback();
    }
};

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);

export const isNotEmpty = (str: string) => str.trim().length > 0;
