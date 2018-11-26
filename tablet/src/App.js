import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
    componentDidMount() {
        fetch("/api/")
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        return (
            <Router ref={router => (this.router = router)} basename={"tablet"}>
                <div>
                    123
                    <section>
                        <div>
                            <Route
                                path="/"
                                exact
                                render={() => <h1>TABLET HOME PAGE 123</h1>}
                            />
                            <Route
                                path="/test"
                                render={() => <h1>TABLET HOME PAGE TEST</h1>}
                            />
                        </div>
                    </section>
                </div>
            </Router>
        );
    }
}

export default App;
