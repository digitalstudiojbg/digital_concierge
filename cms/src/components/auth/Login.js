import React, { Component } from "react";
import { login } from "../../auth/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { isEmpty } from "lodash";
import { COLOR_JBG_PURPLE } from "../../utils/Constants";
import styled from "styled-components";

const CMSTitle = styled.p`
    margin-left: 0.5vw;
    color: rgb(124, 126, 162);
    font-size: 1.2em;
    text-transform: uppercase;
`;

const WelcomeMessage = styled.p`
    color: rgb(166, 167, 173);
    font-size: 1.2em;
`;

const ErrorWarningMessage = styled.p`
    color: rgb(166, 167, 173);
    font-size: 1.2em;
    color: red;
`;

const LoginBodyLayout = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;
    width: 100vw;
    height: 100vh;
`;

const LoginLeftContainer = styled.div`
    background-image: url(https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_assets/wallpaper_login_small.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 60vw;
`;

const LoginRightContainer = styled.div`
    width: 40vw;
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
            <LoginBodyLayout>
                <LoginLeftContainer />
                <LoginRightContainer>
                    <form>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                flexWrap: "nowrap",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                width: "100%",
                                height: "100vh"
                            }}
                        >
                            <div
                                style={{
                                    width: "50%"
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        flexWrap: "nowrap",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        alignContent: "center"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "50%"
                                        }}
                                    >
                                        <img
                                            alt="logo"
                                            style={{ height: "3vw" }}
                                            src="https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_assets/logo_login.png"
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: "50%",
                                            height: "100%",
                                            textAlign: "left",
                                            borderLeft:
                                                "2px solid rgb(124,126,162)"
                                        }}
                                    >
                                        <CMSTitle>
                                            CONTENT MANAGEMENT SYSTEM (JBG)
                                        </CMSTitle>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: "2vh"
                                    }}
                                >
                                    {error ? (
                                        <ErrorWarningMessage>
                                            {errorMessage}
                                        </ErrorWarningMessage>
                                    ) : (
                                        <React.Fragment>
                                            <WelcomeMessage>
                                                Welcome back!
                                            </WelcomeMessage>
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
                                        onChange={this.handleChange.bind(this)}
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
                                        onChange={this.handleChange.bind(this)}
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
                                            backgroundColor: COLOR_JBG_PURPLE
                                        }}
                                        onClick={this.handleClick.bind(this)}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </LoginRightContainer>
            </LoginBodyLayout>
        );
    }
}

export default Login;
