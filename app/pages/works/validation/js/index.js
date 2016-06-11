(function ($) {
    "use strict";

    const fields = ['name', 'email', 'password'];
    const validators = {
        name: {
            validator: 'isName',
            message: 'Name is required'
        },
        email: {
            validator: 'isEmail',
            message: 'Email is required'
        },
        password: {
            validator: 'isPassword',
            message: 'Password is required'
        }
    };

    const fieldsCache = {};
    const errorCache = {};

    function getValue(el) {
        return el.val();
    };

    function removeError(name) {
        fieldsCache[name].removeClass('has-error');
        errorCache[name].hide().html('');
    };

    function addError(name, msg) {
        fieldsCache[name].addClass('has-error');
        errorCache[name].html(msg).show();
    };

    const validationRules = {
        isEmail: function (val) {
            return val.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/);
        },
        isPassword: function (val) {
            return val.match('[0-9]');
        },
        isName: function (val) {
            return val.length >= 6;
        }
    };

    function validate(event, element) {
        element = element || $(this);
        const name = element.attr('data-name');
        let fieldValidator = validators[name],
            rule = fieldValidator.validator;

        if (rule) {
            const value = getValue(element);
            if (validationRules[rule](value)) {
                removeError(name);
            } else {
                addError(name, fieldValidator.message)
                return false;
            }

        }
        return true;
    }

    function isValid() {
        let flag = true;
        for (let i = 0; i < fields.length; i++) {
            if (!validate(null, fieldsCache[fields[i]])) {
                flag = false;
            }
        }
        return flag;
    }

    function clean() {
        for (var i = 0, l = fields.length; i < l; i++) {
            removeError(fields[i]);
        }
    }

    function initialize() {
        for (let i = 0; i < fields.length; i++) {
            const el = fields[i];
            fieldsCache[el] = $('#myForm').find('[data-name=' + el + ']');
            fieldsCache[el].blur(validate);
            errorCache[el] = $('#myForm').find('[data-error=' + el + ']');
        }

        $('#myForm').submit(function (e) {
            e.preventDefault();
            if (isValid()) {
                clean();
            }
        })
    }

    $(function () {
        initialize();
    });

}(window.jQuery));
