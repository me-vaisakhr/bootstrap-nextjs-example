import { Container, Row, Col, InputGroup, FormControl, Button, Divider, Form } from "react-bootstrap";


function Login(){
    return(
        <Container className={"md-container"}>
            <Form>
                <Form.Group  controlId="formGroupEmail">
                    <h3>Login</h3>
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    {/* <Form.Label>Email</Form.Label> */}
                    <Form.Control type="email" placeholder="Email Id" />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3">
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
        </Container>
    )
}

export default Login;