import * as yup from 'yup';

let loginValidation = yup.object().shape({
    password: yup.string().required().label("Password"),
    email: yup.string().email().required().label("Email"),
});

export default loginValidation;