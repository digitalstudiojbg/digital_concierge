import React, { Component } from "react";
import { login } from "../../auth/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { isEmpty } from "lodash";
import { COLOR_JBG_PURPLE } from "../../utils/Constants";

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
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                    alignItems: "stretch",
                    alignContent: "stretch",
                    width: "100vw",
                    height: "100vh"
                }}
            >
                <div
                    style={{
                        backgroundImage:
                            "url(https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_assets/wallpaper_login_small.jpg )",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        width: "60vw"
                    }}
                />

                <div
                    style={{
                        width: "40vw"
                    }}
                >
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
                                        <p
                                            style={{
                                                marginLeft: "0.5vw",
                                                color: "rgb(124,126,162)",
                                                fontSize: "1vw",
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            CONTENT MANAGEMENT SYSTEM
                                        </p>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: "2vh"
                                    }}
                                >
                                    {error ? (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "1.1vw",
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            {errorMessage}
                                        </p>
                                    ) : (
                                        <React.Fragment>
                                            <p
                                                style={{
                                                    color: "rgb(166,167,173)",
                                                    fontSize: "1.2vw"
                                                }}
                                            >
                                                Welcome back!
                                            </p>
                                            <p
                                                style={{
                                                    color: "rgb(166,167,173)",
                                                    fontSize: "1.2vw"
                                                }}
                                            >
                                                Please login to your account
                                            </p>
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
                                            fontSize: "1.1vw",
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
                </div>
            </div>
        );
    }
}

export default Login;
