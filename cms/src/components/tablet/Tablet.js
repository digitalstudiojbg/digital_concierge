import React, { Component } from "react";
import { Link } from "react-router-dom";

class Tablet extends Component {
    render() {
        return (
            <div
                style={{
                    width: "100%",
                    backgroundColor: "green"
                }}
            >
                <h1>Tablet Homepage</h1>
                <Link to="/tablet_cms/list">List</Link>
            </div>
        );
    }
}

export default Tablet;
