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
import { getSystemStart } from "../../data/query/system";
import ReactJson from "react-json-view";
import {
    MainSectionContainer,
    PageHeader,
    ContainerDiv,
    MainSubSections,
    SubSectionDiv,
    SubSectionTop,
    SubSectionTitle,
    SubSectionBottom
} from "../home/WelcomeStyleSet";

// import ColourSchemePicker from "../../utils/ColourSchemePicker";
// import { Formik } from "formik";
// import LayoutPicker from "../../utils/LayoutPicker";

class TabletDashboard extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    <MainSectionContainer>
                        <PageHeader>Dashboard</PageHeader>
                        <ContainerDiv>
                            <MainSubSections style={{ width: "55%" }}>
                                <SubSectionDiv>
                                    <SubSectionTop>
                                        <SubSectionTitle
                                            style={{
                                                width: "85%"
                                            }}
                                        >
                                            Quick Reports
                                        </SubSectionTitle>
                                        <a> View reports > </a>
                                    </SubSectionTop>
                                    <SubSectionBottom />
                                </SubSectionDiv>
                                <SubSectionDiv>
                                    <SubSectionTop>
                                        <SubSectionTitle
                                            style={{
                                                width: "85%"
                                            }}
                                        >
                                            Device List
                                        </SubSectionTitle>
                                        <a> View reports > </a>
                                    </SubSectionTop>
                                    <SubSectionBottom />
                                </SubSectionDiv>
                                <SubSectionDiv>
                                    <SubSectionTitle>
                                        System Statistics
                                    </SubSectionTitle>
                                    <SubSectionBottom
                                        style={{ height: "150px" }}
                                    />
                                </SubSectionDiv>
                            </MainSubSections>
                            <MainSubSections style={{ width: "45%" }}>
                                <SubSectionDiv>
                                    <SubSectionTitle>
                                        Top Priority
                                    </SubSectionTitle>
                                    <SubSectionBottom
                                        style={{ width: "25%" }}
                                    />
                                    <div />
                                    <div />
                                    <div />
                                </SubSectionDiv>
                                <SubSectionDiv>
                                    <SubSectionTitle>
                                        Guest Activity Log
                                    </SubSectionTitle>
                                    <SubSectionBottom
                                        style={{ width: "50%" }}
                                    />
                                </SubSectionDiv>
                            </MainSubSections>
                        </ContainerDiv>
                    </MainSectionContainer>
                }
            </React.Fragment>
        );
    }
}

// class TabletDashboard extends Component {
//     render() {
//         const { match } = this.props;
//         const { params } = match || {};
//         const { system_id = "" } = params || {};
//         return (
//             <div
//                 style={{
//                     width: "100%",
//                     backgroundColor: "white",
//                     display: "flex"
//                 }}
//             >
//                 <div style={{ flexBasis: "20%" }}>
//                     <h1>Tablet Homepage</h1>
//                     <Link to={SYSTEM_CMS_LANDINGPAGE_URL}>List</Link> <br />
//                     <h3>Single Image Upload: </h3>
//                     <UploadFile /> <br />
//                     <h3>Single and Multiple Images Upload with Dropzone: </h3>
//                     <UploadFileDropZone /> <br />
//                     <h3>Multiple Images Upload</h3>
//                     <UploadFiles /> <br />
//                     <BrowserMedia
//                         multipleSelect={true}
//                         updateImageSelection={images =>
//                             console.log("Images selected ", images)
//                         }
//                     />
//                     <br />
//                     <br />
//                     <Query query={getSystemStart} variables={{ id: system_id }}>
//                         {({ loading, error, data: { system } }) => {
//                             if (loading) return <React.Fragment />;
//                             if (error)
//                                 return (
//                                     <React.Fragment>
//                                         {error.message}
//                                     </React.Fragment>
//                                 );
//                             return (
//                                 <ReactJson
//                                     src={system}
//                                     theme="monokai"
//                                     collapsed={true}
//                                 />
//                             );
//                         }}
//                     </Query>
//                 </div>
//                 <div style={{ flexBasis: "75%" }}>
//                     <Query
//                         query={getDirectoryListBySystem}
//                         variables={{ id: system_id }}
//                     >
//                         {({
//                             loading,
//                             error,
//                             data: { directoryLists_by_system: directoryLists }
//                         }) => {
//                             if (loading) return <React.Fragment />;
//                             if (error)
//                                 return (
//                                     <React.Fragment>
//                                         {error.message}
//                                     </React.Fragment>
//                                 );
//                             const modifiedData = modifyDirectoryListData(
//                                 directoryLists,
//                                 true
//                             );
//                             return (
//                                 <div
//                                     style={{
//                                         width: "100%",
//                                         paddingTop: 20,
//                                         height: 500,
//                                         marginBottom: 20
//                                     }}
//                                 >
//                                     <TreeviewSelector
//                                         data={modifiedData}
//                                         selectAmount="multiple"
//                                         directoryType="entry"
//                                     />
//                                     {/* <ColourSchemePicker /> */}
//                                     {/* <Formik
//                                         initialValues={{
//                                             layout_family_id: null,
//                                             layout_id: null,
//                                             template_id: "1"
//                                         }}
//                                         render={({ values, setFieldValue }) => (
//                                             <LayoutPicker
//                                                 whichLayoutFamily="all"
//                                                 setFieldValue={setFieldValue}
//                                                 layoutType="entry"
//                                                 withTemplate={true}
//                                                 values={values}
//                                                 templateType="entry"
//                                             />
//                                         )}
//                                     /> */}
//                                 </div>
//                             );
//                         }}
//                     </Query>
//                 </div>
//             </div>
//         );
//     }
// }

export default TabletDashboard;
