import { Container, Button, Form } from "react-bootstrap";
import {Formik} from 'formik';
import validations from '../../validations';
import authApi from "@/api/authClient";

function Login(){
    const login = async (values) =>{
        try{
            await authApi.login(values)
            .then((response)=>console.log(response))
            .catch((error)=>console.log(error))
        }
        catch(e){
            console.log(e)
        }
    }
    return(
        <Container className={"md-container"}>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validations.loginValidations}
                onSubmit={(values, { setSubmitting }) => {
                    login(values);
                }}
            >
                {(formikProps) => (
                    <Form>
                        <Form.Group  controlId="formGroupEmail">
                            <h3>Login</h3>
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            {/* <Form.Label>Email</Form.Label> */}
                            <Form.Control value={formikProps.values.email} name="email" type="email" placeholder="Email Id" onChange={formikProps.handleChange} onBlur={formikProps.handleBlur} />
                            <Form.Text style={{color:"#ff0000"}}>{formikProps.touched.email && formikProps.errors.email}</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control value={formikProps.password} name="password" type="password" placeholder="Password" onChange={formikProps.handleChange} onBlur={formikProps.handleBlur} />
                            <Form.Text style={{color:"#ff0000"}}>{formikProps.touched.password && formikProps.errors.password}</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mb-3" onClick={formikProps.handleSubmit}>
                            Login
                        </Button>
                        <hr/>
                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Login with Google
                        </Button>
                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Login with Facebook
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default Login;