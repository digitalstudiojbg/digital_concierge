import React from "react";
import ImageUploaderWithMediaLibrary from "../../../utils/ImageUploaderWithMediaLibrary";
import {
    ContainerDiv,
    SectionDiv,
    FieldDiv,
    SectionHeader,
    FieldContainerDiv
} from "./commonStyle";
import { renderTextField, renderEditorField } from "./fieldRenderer";

class TabContent extends React.Component {
    render() {
        const { formikProps, otherProps } = this.props;
        const { values, setFieldValue, errors } = formikProps || {};
        const { headerImage, featureImage, introductionText, description } =
            values || {};
        const { clientId } = otherProps;
        return (
            <ContainerDiv style={{ height: "auto" }}>
                <SectionDiv
                    flexBasis="50%"
                    flexDirection="column"
                    paddingRight="30px"
                >
                    <FieldContainerDiv style={{ marginBottom: "30px" }}>
                        <SectionHeader>Article Name</SectionHeader>
                        <FieldDiv style={{ width: "55%" }}>
                            {renderTextField("name", "", true)}
                        </FieldDiv>
                    </FieldContainerDiv>
                    <FieldContainerDiv style={{ marginBottom: "30px" }}>
                        <SectionHeader>Title Header</SectionHeader>
                        <ImageUploaderWithMediaLibrary
                            style={{ width: "45%" }}
                            clientId={clientId}
                            usingRef={false}
                            fieldName="headerImage"
                            setFieldValue={setFieldValue}
                            value={headerImage}
                        />
                    </FieldContainerDiv>
                    {/* <br style={{ clear: "both" , }} /> */}
                    <FieldContainerDiv>
                        <SectionHeader>Feature Image</SectionHeader>
                        <ImageUploaderWithMediaLibrary
                            clientId={clientId}
                            usingRef={false}
                            fieldName="featureImage"
                            setFieldValue={setFieldValue}
                            value={featureImage}
                        />
                    </FieldContainerDiv>
                </SectionDiv>
                <SectionDiv
                    flexBasis="50%"
                    flexDirection="column"
                    paddingRight="10px"
                >
                    <div
                        style={{
                            width: "92%",
                            height: "100%",
                            paddingBottom: 30,
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <SectionHeader>Introduction Text</SectionHeader>
                        {renderEditorField(
                            "introductionText",
                            false,
                            introductionText,
                            errors.introductionText,
                            setFieldValue
                        )}
                    </div>
                    <div
                        style={{
                            width: "92%",
                            height: "100%",
                            paddingBottom: 30,
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "20px"
                        }}
                    >
                        <SectionHeader>Article Text</SectionHeader>
                        {renderEditorField(
                            "description",
                            false,
                            description,
                            errors.description,
                            setFieldValue
                        )}
                    </div>
                </SectionDiv>
            </ContainerDiv>
        );
    }
}

export default TabContent;
