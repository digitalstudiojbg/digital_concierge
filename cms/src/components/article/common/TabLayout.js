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
import { FormLabelDiv } from "../../advertiser/common/commonStyle";
import styled from "styled-components";

const LayoutPreviewDiv = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    background-image: url(${props => props.imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: white;
    flex-basis: 100%;
    height: 600px;
`;

class TabLayout extends React.Component {
    handleChangeTemplate = event => {
        const {
            formikProps: { setFieldValue } = {
                formikProps: { setFieldValue: null }
            },
            otherProps = {}
        } = this.props;
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

    render() {
        console.log("Tab layout props ", this.props);
        const { otherProps, formikProps } = this.props;
        const { templates = [], layoutFamilies = [] } = otherProps || {};
        const { errors = {}, values = {} } = formikProps || {};

        const layoutFamily =
            !isEmpty(values) && Boolean(values.jbgFamilyLayoutId)
                ? layoutFamilies.find(
                      ({ id }) => id === values.jbgFamilyLayoutId
                  )
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
                <SectionDiv
                    flexBasis="65%"
                    flexDirection="row"
                    paddingRight="30px"
                >
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
                                this.handleChangeTemplate
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
                            <FormLabelDiv>Layout Option</FormLabelDiv>
                            {Boolean(imageUrl) && (
                                <LayoutPreviewDiv imageUrl={imageUrl} />
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
    }
}

export default TabLayout;
