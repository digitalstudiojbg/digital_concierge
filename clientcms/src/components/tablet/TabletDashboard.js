import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    SYSTEM_CMS_LANDINGPAGE_URL,
    modifyDirectoryListData
} from "../../utils/Constants";
import UploadFile from "./content/UploadFile";
import UploadFiles from "./content/UploadFiles";
import UploadFileDropZone from "./content/UploadFileDropZone";
import BrowserMedia from "../../utils/BrowserMedia";
import { Query } from "react-apollo";
import { getDirectoryListBySystem } from "../../data/query";
import SearchFilter from "../../utils/SearchFilter";
import TreeviewSelector from "../../utils/TreeviewSelector";

class TabletDashboard extends Component {
    render() {
        const { match } = this.props;
        const { params } = match || {};
        const { system_id = "" } = params || {};
        return (
            <div
                style={{
                    width: "100%",
                    backgroundColor: "white",
                    display: "flex"
                }}
            >
                <div style={{ flexBasis: "50%" }}>
                    <h1>Tablet Homepage</h1>
                    <Link to={SYSTEM_CMS_LANDINGPAGE_URL}>List</Link> <br />
                    <h3>Single Image Upload: </h3>
                    <UploadFile /> <br />
                    <h3>Single and Multiple Images Upload with Dropzone: </h3>
                    <UploadFileDropZone /> <br />
                    <h3>Multiple Images Upload</h3>
                    <UploadFiles /> <br />
                    <BrowserMedia
                        multipleSelect={true}
                        updateImageSelection={images =>
                            console.log("Images selected ", images)
                        }
                    />
                    <br />
                    <br />
                </div>
                <div style={{ flexBasis: "40%" }}>
                    <h1>SEARCH FILTER GOES HERE</h1>
                    <Query
                        query={getDirectoryListBySystem}
                        variables={{ id: system_id }}
                    >
                        {({
                            loading,
                            error,
                            data: { directoryLists_by_system: directoryLists }
                        }) => {
                            if (loading) return <React.Fragment />;
                            if (error)
                                return (
                                    <React.Fragment>
                                        {error.message}
                                    </React.Fragment>
                                );
                            const modifiedData = modifyDirectoryListData(
                                directoryLists
                            );
                            return (
                                <React.Fragment>
                                    <SearchFilter data={modifiedData} />
                                    <div
                                        style={{
                                            width: "100%",
                                            paddingTop: 20,
                                            height: 200
                                        }}
                                    >
                                        <TreeviewSelector
                                            data={modifiedData}
                                            selectAmount="single"
                                        />
                                    </div>
                                </React.Fragment>
                            );
                        }}
                    </Query>
                </div>
            </div>
        );
    }
}

export default TabletDashboard;
