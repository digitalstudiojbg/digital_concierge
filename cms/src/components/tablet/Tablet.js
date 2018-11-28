import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TABLET_CMS_LIST_URL } from "../../utils/Constants";

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
                <Link to={TABLET_CMS_LIST_URL}>List</Link>
            </div>
        );
    }
}

export default Tablet;
