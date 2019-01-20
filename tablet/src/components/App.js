import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { API_URL } from "../utils/Constants";
import { Query } from "react-apollo";
import { getVenueDetailById } from "../data/query";
import { Link } from "react-router-dom";

class App extends Component {
    componentDidMount() {
        fetch(`${API_URL}/test/`)
            .then(response => response.json())
            .then(data => console.log(data));
        fetch(`${API_URL}/`)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        /*return (
            <Query query={getVenueDetailById}  fetchPolicy="no-cache" >
                {({ loading, error, data }) => {
                    if (loading) return <p>loading</p>;
                    if (error) return `Error! ${error.message}`;
                    console.log(data);

                    return (
                        <Router
                            ref={router => (this.router = router)}
                            basename={"tablet"}
                        >
                            <div>
                                123
                                <section>
                                    <div>
                                        <Route
                                            path="/"
                                            exact
                                            render={() => (
                                                <h1>TABLET HOME PAGE 123</h1>
                                            )}
                                        />
                                        <Route
                                            path="/test"
                                            render={() => (
                                                <h1>TABLET HOME PAGE TEST</h1>
                                            )}
                                        />
                                    </div>
                                </section>
                            </div>
                        </Router>
                    );
                }}
            </Query>
        );*/

        return (
            <Router ref={router => (this.router = router)} basename={"tablet"}>
                <div>
                    123
                    <section>
                        <div>
                            <Route
                                path="/"
                                exact
                                render={() => (
                                    <div>
                                        <h1>TABLET HOME PAGE 123</h1>
                                        <Link to="/test">TEST</Link>
                                        <br />
                                        <Link to="/test/sub">
                                            TEST with Sub Link
                                        </Link>
                                    </div>
                                )}
                            />
                            <Route
                                path="/test/sub"
                                exact
                                render={() => (
                                    <div>
                                        <h1>TABLET TEST SUB</h1>
                                        <Link to="/test">TEST</Link>{" "}
                                        <Link to="/">HOME</Link>
                                    </div>
                                )}
                            />
                            <Route
                                path="/test"
                                exact
                                render={() => (
                                    <div>
                                        <h1>TABLET HOME PAGE TEST</h1>
                                        <Link to="/">HOME</Link>
                                    </div>
                                )}
                            />
                        </div>
                    </section>
                </div>
            </Router>
        );
    }
}

export default App;
