import React, { useState } from "react";
import { login } from "../../auth/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { isEmpty } from "lodash";
import styled from "styled-components";

const WelcomeMessage = styled.p`
    color: rgb(166, 167, 173);
    font-size: 1.2em;
`;

const ErrorWarningMessage = styled.p`
    color: rgb(166, 167, 173);
    font-size: 1.2em;
    color: red;
`;

const LoginBodyContainer = styled.div`
    background-image: url("https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_assets/Smoke_Abstract_Creative_Design_HD_Photo.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    position: relative;
`;

const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
`;

const CenterDivContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: white;
    width: 400px;
`;

const TitleDivContainer = styled.div`
    width: 100%;
    background-color: lightgrey;
    font-size: 4.5em;
    text-align: center;
    font-weight: bold;
    padding: 10px 0px 10px 0px;
`;

const LoginFormSection = styled.div`
    width: 100%;
    padding: 30px;
    text-align: center;
`;

const LoginButton = styled.div`
    padding-top: 1vh;
`;

const Login = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = event => {
        const { name, value } = event.target;
        name === "email" ? setEmail(value) : setPassword(value);
    };

    const handleClick = event => {
        event.preventDefault();
        if (!isEmpty(email) && !isEmpty(password)) {
            login(email, password).then(ok => {
                if (ok) {
                    props.onLogin();
                } else {
                    setError(true);
                    setErrorMessage("Login Failed! Please try again!");
                }
            });
        } else {
            setError(true);
            setErrorMessage("Please enter email & password!");
        }
    };

    return (
        <LoginBodyContainer>
            <CenterDivContainer>
                <form>
                    <LoginFormContainer>
                        <TitleDivContainer>
                            <p>PORTAL</p>
                        </TitleDivContainer>
                        <LoginFormSection>
                            <div>
                                {error ? (
                                    <ErrorWarningMessage>
                                        {errorMessage}
                                    </ErrorWarningMessage>
                                ) : (
                                    <React.Fragment>
                                        <WelcomeMessage>
                                            Please login to your account
                                        </WelcomeMessage>
                                    </React.Fragment>
                                )}
                            </div>
                            <div>
                                <TextField
                                    id="standard-name"
                                    label="Email"
                                    margin="normal"
                                    fullWidth={true}
                                    value={email}
                                    name="email"
                                    onChange={handleChange.bind(this)}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="standard-password-input"
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    value={password}
                                    name="password"
                                    fullWidth={true}
                                    onChange={handleChange.bind(this)}
                                />
                            </div>
                            <LoginButton>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    style={{
                                        width: "100%",
                                        color: "white",
                                        fontSize: "1.3em",
                                        backgroundColor: "rgb(0,203,109"
                                    }}
                                    onClick={handleClick.bind(this)}
                                >
                                    Log in
                                </Button>
                            </LoginButton>
                        </LoginFormSection>
                    </LoginFormContainer>
                </form>
            </CenterDivContainer>
        </LoginBodyContainer>
    );
};

export default Login;
