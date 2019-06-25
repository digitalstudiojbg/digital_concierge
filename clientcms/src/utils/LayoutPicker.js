import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Query } from "react-apollo";
import {
    getLayoutFamilyList,
    getLayoutFamilyDetailFilter,
    getTemplateListFromType
} from "../data/query";
import Loading from "../components/loading/Loading";
import Radio from "@material-ui/core/Radio";
import { Select } from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { Field } from "formik";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const InnerContainerDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const LayoutOptionsDivHorizontal = styled.div`
    width: 100%;
    height: 70%;

    border: 2px solid rgb(196, 196, 196);
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
`;

const LayoutOptionsDivVertical = styled.div`
    width: 100%;
    height: 70%;
    padding: 5%;
    border: 2px solid rgb(196, 196, 196);
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;

const LayoutEntryDivHorizontal = styled.div`
    flex-basis: 20%;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const LayoutEntryDivVertical = styled.div`
    width: 100%;
    flex-grow: 1;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const LayoutLabelDivHorizontal = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LayoutLabelDivVertical = styled.div`
    width: 30%;
    display: flex;
    font-size: 12px;
    font-weight: bold;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LayoutImageDiv = styled.div`
    width: 100%;
    height: 80%;
    background-image: url(${props => props.imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    //  background-color: white;
`;

const LayoutImageDivVertical = styled(LayoutImageDiv)`
    height: 90%;
`;

const styles = () => ({
    radio: {
        "&$checked": {
            color: "rgb(43,43,43)"
        }
    },
    checked: {},

    myInput: {
        padding: "10px"
    }
});

const LayoutPicker = ({
    whichLayoutFamily,
    values,
    setFieldValue,
    layoutFamilyFieldName,
    layoutFieldName,
    classes,
    layoutType,
    withTemplate,
    templateType,
    templateFieldName,
    layoutListDirection,
    dropDownWidth
}) => {
    // const [selectedFamily, setSelectedFamily] = useState(null);
    // const [selectedLayout, setSelectedLayout] = useState(null);

    // const updateDropdown = (_event, data) => {
    //     setSelectedFamily(data.value);
    // };

    const updateLayout = event => {
        // setSelectedLayout(value);
        setFieldValue(layoutFieldName, event.target.value, false);
    };

    const renderLayoutOptions = layouts => {
        if (layoutListDirection === "horizontal") {
            return (
                <LayoutOptionsDivHorizontal>
                    {layouts.map(({ id, name, media: { path } }, index) => (
                        <LayoutEntryDivHorizontal key={`LAYOUT-${id}-${index}`}>
                            <LayoutImageDiv imageUrl={path} />
                            <LayoutLabelDivHorizontal>
                                <Radio
                                    value={id}
                                    checked={values[layoutFieldName] === id}
                                    onChange={updateLayout}
                                    classes={{
                                        root: classes.radio,
                                        checked: classes.checked
                                    }}
                                />
                                <div>{name}</div>
                            </LayoutLabelDivHorizontal>
                        </LayoutEntryDivHorizontal>
                    ))}
                </LayoutOptionsDivHorizontal>
            );
        } else if (layoutListDirection === "vertical") {
            return (
                <LayoutOptionsDivVertical>
                    {layouts.map(({ id, name, media: { path } }, index) => (
                        <LayoutEntryDivVertical key={`LAYOUT-${id}-${index}`}>
                            <LayoutLabelDivVertical>
                                <Radio
                                    value={id}
                                    checked={values[layoutFieldName] === id}
                                    onChange={updateLayout}
                                    classes={{
                                        root: classes.radio,
                                        checked: classes.checked
                                    }}
                                />
                                <div>{name}</div>
                            </LayoutLabelDivVertical>
                            <LayoutImageDivVertical imageUrl={path} />
                        </LayoutEntryDivVertical>
                    ))}
                </LayoutOptionsDivVertical>
            );
        } else {
            return <React.Fragment />;
        }
    };

    const renderAllLayoutFamilies = layoutFamilies => {
        // const LAYOUT_FAMILY_OPTIONS = layoutFamilies.map(item => ({
        //     text: item.name,
        //     value: item.id
        // }));

        const layoutFamilyId = values[layoutFamilyFieldName];
        // const familyData = Boolean(selectedFamily)
        //     ? layoutFamilies.find(({ id }) => id === selectedFamily)
        //     : null;
        const familyData = Boolean(layoutFamilyId)
            ? layoutFamilies.find(({ id }) => id === layoutFamilyId)
            : null;

        const { layoutsByType: layouts = [] } = familyData || {};

        return (
            <InnerContainerDiv>
                <div style={{ width: `${dropDownWidth}%` }}>
                    <InputLabel>FAMILY</InputLabel>
                    <Field
                        input={
                            <OutlinedInput
                                style={{ backgroundColor: "white" }}
                            />
                        }
                        name={layoutFamilyFieldName}
                        component={Select}
                        disabled={layoutFamilies.length < 1}
                        fullWidth={true}
                    >
                        {layoutFamilies.map(({ id, name }, index) => (
                            <MenuItem
                                key={`ITEM-${name}-${id}-${index}`}
                                value={id}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Field>
                </div>
                {layouts.length > 0 && renderLayoutOptions(layouts)}
            </InnerContainerDiv>
        );
    };

    const renderLayoutFamily = layoutFamily => {
        const layouts =
            Boolean(layoutFamily.layoutsByType) &&
            Array.isArray(layoutFamily.layoutsByType)
                ? layoutFamily.layoutsByType
                : [];
        return (
            <InnerContainerDiv>
                {layouts.length > 0 && renderLayoutOptions(layouts)}
            </InnerContainerDiv>
        );
    };

    const renderAllLayoutFamiliesWithTemplates = (
        layoutFamilies,
        templates
    ) => {
        const layoutFamilyId = values[layoutFamilyFieldName];

        const familyData = Boolean(layoutFamilyId)
            ? layoutFamilies.find(({ id }) => id === layoutFamilyId)
            : null;

        const { layoutsByType = [] } = familyData || {};

        const templateId = values[templateFieldName];

        const templateData = Boolean(templateId)
            ? templates.find(({ id }) => id === templateId)
            : null;

        const { layouts: layoutsInTemplate = [] } = templateData || {};

        const layoutIdsInTemplate = layoutsInTemplate.map(({ id }) => id);

        const layouts =
            layoutIdsInTemplate.length > 0
                ? layoutsByType.filter(({ id }) =>
                      layoutIdsInTemplate.includes(id)
                  )
                : [];
        const { classes } = this.props;
        return (
            <InnerContainerDiv>
                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ flexBasis: `${dropDownWidth}%` }}>
                        <InputLabel>FAMILY</InputLabel>
                        <Field
                            name={layoutFamilyFieldName}
                            component={Select}
                            disabled={layoutFamilies.length < 1}
                            fullWidth={true}
                            // inputProps={{
                            //     className: this.props.classes.myInput
                            // }}
                            input={<OutlinedInput />}
                        >
                            {layoutFamilies.map(({ id, name }, index) => (
                                <MenuItem
                                    key={`ITEM-${name}-${id}-${index}`}
                                    value={id}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Field>
                    </div>
                    <div style={{ flexBasis: "30%", paddingLeft: 10 }}>
                        <InputLabel>ENTRY TEMPLATE TYPE</InputLabel>
                        <Field
                            name={templateFieldName}
                            component={Select}
                            disabled={templates.length < 1}
                            fullWidth={true}
                        >
                            {templates.map(({ id, name }, index) => (
                                <MenuItem
                                    key={`TEMPLATE-${name}-${id}-${index}`}
                                    value={id}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Field>
                    </div>
                </div>
                {layouts.length > 0 && renderLayoutOptions(layouts)}
            </InnerContainerDiv>
        );
    };

    return (
        <ContainerDiv>
            {whichLayoutFamily === "all" ? (
                <Query
                    query={getLayoutFamilyList}
                    variables={{ typeName: layoutType }}
                >
                    {({ loading, error, data: { layoutFamilies } }) => {
                        if (loading) return <Loading loadingData />;
                        if (error) return `Error: ${error.message}`;
                        if (!withTemplate) {
                            return renderAllLayoutFamilies(layoutFamilies);
                        } else {
                            return (
                                <Query
                                    query={getTemplateListFromType}
                                    variables={{ typeName: templateType }}
                                >
                                    {({
                                        loading: loadingTemplate,
                                        error: errorTemplate,
                                        data: { templatesByType: templates }
                                    }) => {
                                        if (loadingTemplate)
                                            return <Loading loadingData />;
                                        if (errorTemplate)
                                            return `Error ${
                                                errorTemplate.message
                                            }`;
                                        return renderAllLayoutFamiliesWithTemplates(
                                            layoutFamilies,
                                            templates
                                        );
                                    }}
                                </Query>
                            );
                        }
                    }}
                </Query>
            ) : (
                <Query
                    query={getLayoutFamilyDetailFilter}
                    variables={{
                        name: whichLayoutFamily,
                        typeName: layoutType
                    }}
                >
                    {({
                        loading,
                        error,
                        data: { layoutFamilyFilter: layoutFamily }
                    }) => {
                        if (loading) return <Loading loadingData />;
                        if (error) return `Error: ${error.message}`;
                        return renderLayoutFamily(layoutFamily);
                    }}
                </Query>
            )}
        </ContainerDiv>
    );
};

LayoutPicker.defaultProps = {
    whichLayoutFamily: "all",
    layoutFamilyFieldName: "layout_family_id",
    layoutFieldName: "layout_id",
    templateFieldName: "template_id",
    dropDownWidth: 30
};

LayoutPicker.propTypes = {
    values: PropTypes.object.isRequired,
    whichLayoutFamily: PropTypes.string,
    layoutFamilyFieldName: PropTypes.string,
    layoutFieldName: PropTypes.string,
    setFieldValue: PropTypes.func.isRequired,
    layoutType: PropTypes.string.isRequired,
    withTemplate: PropTypes.bool.isRequired,
    templateType: PropTypes.string,
    templateFieldName: PropTypes.string,
    layoutListDirection: PropTypes.oneOf(["horizontal", "vertical"]).isRequired,
    dropDownWidth: PropTypes.number
};

export default withStyles(styles)(LayoutPicker);
