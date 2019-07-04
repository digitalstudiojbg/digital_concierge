import React from "react";
import {
    ContainerDiv,
    SectionDiv,
    FieldContainerDiv,
    FieldDiv
} from "./commonStyle";
import { renderSelectField, renderSelectFieldCustom } from "./fieldRenderer";
import {
    renderTabletMockUp,
    defaultFamilyKeyNameFromTemplateName
} from "../../../utils/Constants";
import { isEmpty } from "lodash";
import { FieldLabel } from "../../advertiser/common/commonStyle";
import styled from "styled-components";

const LayoutPreviewDiv = styled.div`
    background-image: url(${props => props.imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
`;

const TabLayout = props => {
    const handleChangeTemplate = event => {
        const {
            formikProps: { setFieldValue } = {
                formikProps: { setFieldValue: null }
            },
            otherProps = {}
        } = props;
        const { defaultFamilyLayouts, templates } = otherProps;
        Boolean(setFieldValue) &&
            setFieldValue("jbgTemplateId", event.target.value);

        if (!isEmpty(defaultFamilyLayouts) && !isEmpty(templates)) {
            const template = templates.find(
                ({ id }) => id === event.target.value
            );
            if (!isEmpty(template)) {
                Boolean(setFieldValue) &&
                    setFieldValue(
                        "jbgFamilyLayoutId",
                        defaultFamilyLayouts[
                            defaultFamilyKeyNameFromTemplateName(template.name)
                        ]
                    );
            }
        }
    };

    // console.log("Tab layout props ", props);
    const { otherProps, formikProps } = props;
    const { templates = [], layoutFamilies = [] } = otherProps || {};
    const { errors = {}, values = {} } = formikProps || {};

    const layoutFamily =
        !isEmpty(values) && Boolean(values.jbgFamilyLayoutId)
            ? layoutFamilies.find(({ id }) => id === values.jbgFamilyLayoutId)
            : {};
    const { jbg_layouts = [] } = layoutFamily;

    const layouts = !isEmpty(jbg_layouts)
        ? jbg_layouts.filter(
              ({ jbg_templates }) =>
                  !isEmpty(jbg_templates) &&
                  Boolean(jbg_templates[0].id) &&
                  jbg_templates[0].id === values.jbgTemplateId
          )
        : [];

    const layout = !isEmpty(layouts)
        ? layouts.find(({ id }) => id === values.jbgLayoutId)
        : {};
    const imageUrl =
        Boolean(layout) &&
        !isEmpty(layout) &&
        Boolean(layout.media) &&
        Boolean(layout.media.path)
            ? layout.media.path
            : null;

    return (
        <ContainerDiv>
            <SectionDiv flexBasis="65%" flexDirection="row" paddingRight="30px">
                {renderTabletMockUp()}
            </SectionDiv>
            <SectionDiv
                flexBasis="35%"
                flexDirection="column"
                paddingRight="0px"
            >
                <FieldContainerDiv>
                    <FieldDiv flexBasis="70%" marginRight="0px">
                        {renderSelectFieldCustom(
                            "jbgTemplateId",
                            "Template",
                            templates,
                            errors,
                            values,
                            handleChangeTemplate
                        )}
                    </FieldDiv>
                </FieldContainerDiv>
                <FieldContainerDiv>
                    <FieldDiv flexBasis="70%" marginRight="0px">
                        {renderSelectField(
                            "jbgFamilyLayoutId",
                            "Family Layout",
                            layoutFamilies,
                            errors
                        )}
                    </FieldDiv>
                </FieldContainerDiv>
                <FieldContainerDiv>
                    <FieldDiv flexBasis="70%" marginRight="0px">
                        <FieldLabel>Layout Option</FieldLabel>

                        {Boolean(imageUrl) && (
                            <div
                                style={{
                                    height: "250px",
                                    width: "100%",
                                    backgroundColor: "white",
                                    border: "1px solid grey",
                                    borderRadius: "5px",
                                    marginBottom: "10px",
                                    padding: "5%"
                                }}
                            >
                                <LayoutPreviewDiv imageUrl={imageUrl} />
                            </div>
                        )}

                        <FieldDiv flexBasis="100%" marginRight="0px">
                            {renderSelectField(
                                "jbgLayoutId",
                                "",
                                layouts,
                                errors
                            )}
                        </FieldDiv>
                    </FieldDiv>
                </FieldContainerDiv>
            </SectionDiv>
        </ContainerDiv>
    );
};

export default TabLayout;
