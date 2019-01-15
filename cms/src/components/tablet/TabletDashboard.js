import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TABLET_CMS_LANDINGPAGE_URL } from "../../utils/Constants";
import UploadFile from "./content/UploadFile";
import UploadFiles from "./content/UploadFiles";

class TabletDashboard extends Component {
    render() {
        return (
            <div
                style={{
                    width: "100%",
                    backgroundColor: "green"
                }}
            >
                <h1>Tablet Homepage</h1>
                <Link to={TABLET_CMS_LANDINGPAGE_URL}>List</Link>
                <h3>Single File Upload: </h3>
                <UploadFile />
                <h3>Multiple Files Upload</h3> <UploadFiles />
            </div>
        );
    }
}

export default TabletDashboard;
