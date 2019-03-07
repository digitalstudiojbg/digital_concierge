import React, { Component, useState } from "react";
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
`;

const TitleDivContainer = styled.div`
    padding: 25px 60px 25px 60px;
    background-color: lightgrey;
    font-size: 4.5em;
    text-align: center;
    font-weight: bold;
`;

const LoginFormSection = styled.div`
    padding: 30px;
    text-align: center;
`;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
            errorMessage: ""
        };
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleClick(event) {
        event.preventDefault();
        const { email, password } = this.state;

        if (!isEmpty(email) && !isEmpty(password)) {
            login(email, password).then(ok => {
                if (ok) {
                    this.props.onLogin();
                } else {
                    this.setState({
                        error: true,
                        errorMessage: "Login Failed! Please try again!"
                    });
                }
            });
        } else {
            this.setState({
                error: true,
                errorMessage: "Please enter email & password!"
            });
        }
    }

    render() {
        const { email, password, error, errorMessage } = this.state;
        return (
            <LoginBodyContainer>
                <CenterDivContainer>
                    <form>
                        <LoginFormContainer>
                            <div>
                                <TitleDivContainer>
                                    <p>PLATYPUS</p>
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
                                            onChange={this.handleChange.bind(
                                                this
                                            )}
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
                                            onChange={this.handleChange.bind(
                                                this
                                            )}
                                        />
                                    </div>
                                    <div style={{ paddingTop: "1vh" }}>
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
                                            onClick={this.handleClick.bind(
                                                this
                                            )}
                                        >
                                            Log in
                                        </Button>
                                    </div>
                                </LoginFormSection>
                            </div>
                        </LoginFormContainer>
                    </form>
                </CenterDivContainer>
            </LoginBodyContainer>
        );
    }
}

export default Login;
