import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
    componentDidMount() {
        const apiUrl =
            process.env.NODE_ENV === "production"
                ? "http://digitalconcierge-env.uir8vfstfw.ap-southeast-2.elasticbeanstalk.com/api"
                : "http://localhost:3000";

        fetch(`${apiUrl}/test/`)
            .then(response => response.json())
            .then(data => console.log(data));
        fetch(`${apiUrl}/`)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        return (
            <Router
                ref={router => (this.router = router)}
                basename={"touchscreen"}
            >
                <div>
                    123
                    <section>
                        <div>
                            <Route
                                path="/"
                                exact
                                render={() => (
                                    <h1>TOUCHSCREEN HOME PAGE 123</h1>
                                )}
                            />
                            <Route
                                path="/test"
                                render={() => (
                                    <h1>TOUCHSCREEN HOME PAGE TEST</h1>
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
