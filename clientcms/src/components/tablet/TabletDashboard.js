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
import TreeviewSelector from "../../utils/TreeviewSelector";
// import ColourSchemePicker from "../../utils/ColourSchemePicker";
// import { Formik } from "formik";
// import LayoutPicker from "../../utils/LayoutPicker";

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
                <div style={{ flexBasis: "20%" }}>
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
                <div style={{ flexBasis: "75%" }}>
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
                                directoryLists,
                                true
                            );
                            return (
                                <div
                                    style={{
                                        width: "100%",
                                        paddingTop: 20,
                                        height: 500,
                                        marginBottom: 20
                                    }}
                                >
                                    <TreeviewSelector
                                        data={modifiedData}
                                        selectAmount="multiple"
                                        directoryType="entry"
                                    />
                                    {/* <ColourSchemePicker /> */}
                                    {/* <Formik
                                        initialValues={{
                                            layout_family_id: null,
                                            layout_id: null,
                                            template_id: "1"
                                        }}
                                        render={({ values, setFieldValue }) => (
                                            <LayoutPicker
                                                whichLayoutFamily="all"
                                                setFieldValue={setFieldValue}
                                                layoutType="entry"
                                                withTemplate={true}
                                                values={values}
                                                templateType="entry"
                                            />
                                        )}
                                    /> */}
                                </div>
                            );
                        }}
                    </Query>
                </div>
            </div>
        );
    }
}

export default TabletDashboard;
