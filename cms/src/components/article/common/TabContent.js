import React from "react";
import ImageUploaderWithMediaLibrary from "../../../utils/ImageUploaderWithMediaLibrary";
import {
    ContainerDiv,
    SectionDiv,
    SectionTitleDiv,
    FieldDiv
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
            <ContainerDiv>
                <SectionDiv
                    flexBasis="50%"
                    flexDirection="column"
                    paddingRight="30px"
                >
                    <div style={{ width: "70%", marginBottom: 20 }}>
                        <SectionTitleDiv>Article Name</SectionTitleDiv>
                        <FieldDiv flexBasis="70%" marginRight="0px">
                            {renderTextField("name", "", true)}
                        </FieldDiv>
                    </div>
                    <div
                        style={{
                            flexBasis: "45%",
                            width: "70%",
                            height: "100%",
                            marginBottom: 30
                        }}
                    >
                        <SectionTitleDiv>Title Header</SectionTitleDiv>
                        <ImageUploaderWithMediaLibrary
                            clientId={clientId}
                            usingRef={false}
                            fieldName="headerImage"
                            setFieldValue={setFieldValue}
                            value={headerImage}
                        />
                    </div>
                    <div
                        style={{
                            flexBasis: "45%",
                            width: "70%",
                            height: "100%"
                        }}
                    >
                        <SectionTitleDiv>Feature Image</SectionTitleDiv>
                        <ImageUploaderWithMediaLibrary
                            clientId={clientId}
                            usingRef={false}
                            fieldName="featureImage"
                            setFieldValue={setFieldValue}
                            value={featureImage}
                        />
                    </div>
                </SectionDiv>
                <SectionDiv
                    flexBasis="50%"
                    flexDirection="column"
                    paddingRight="10px"
                >
                    <div
                        style={{
                            flexBasis: "45%",
                            width: "70%",
                            height: "100%",
                            marginBottom: 30
                        }}
                    >
                        <SectionTitleDiv>Introduction Text</SectionTitleDiv>
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
                            flexBasis: "45%",
                            width: "70%",
                            height: "100%",
                            marginBottom: 30
                        }}
                    >
                        <SectionTitleDiv>Article Text</SectionTitleDiv>
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
