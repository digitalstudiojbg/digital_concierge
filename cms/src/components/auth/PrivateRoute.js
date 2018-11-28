import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../auth/auth";
import { LOGIN_URL } from "../../utils/Constants";

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: LOGIN_URL,
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}
