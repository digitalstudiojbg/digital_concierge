import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TABLET_CMS_LANDINGPAGE_URL } from "../../utils/Constants";
import UploadFile from "./content/UploadFile";
import UploadFiles from "./content/UploadFiles";
import UploadFileDropZone from "./content/UploadFileDropZone";

class TabletDashboard extends Component {
    render() {
        return (
            <div
                style={{
                    width: "100%",
                    backgroundColor: "white"
                }}
            >
                <br />
                <h1>Tablet Homepage</h1>
                <Link to={TABLET_CMS_LANDINGPAGE_URL}>List</Link> <br />
                <h3>Single Image Upload: </h3>
                <UploadFile /> <br />
                <h3>Single and Multiple Images Upload with Dropzone: </h3>
                <UploadFileDropZone /> <br />
                <h3>Multiple Images Upload</h3>
                <UploadFiles /> <br />
            </div>
        );
    }
}

export default TabletDashboard;
