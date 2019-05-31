import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../auth/auth";
import { LOGIN_URL } from "../../utils/Constants";

export default function PrivateRoute({
    component: Component,
    withProps = {},
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={props => {
                const combinedProps = { ...props, ...withProps };
                return (
                    <React.Fragment>
                        {isLoggedIn() ? (
                            <Component {...combinedProps} />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: LOGIN_URL,
                                    state: { from: props.location }
                                }}
                            />
                        )}
                    </React.Fragment>
                );
            }}
        />
    );
}
