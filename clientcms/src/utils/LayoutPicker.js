import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Query } from "react-apollo";
import {
    getLayoutFamilyList,
    getLayoutFamilyDetailFilter
} from "../data/query";
import Loading from "../components/loading/Loading";
import {
    Radio
    // Dropdown
} from "semantic-ui-react";
import { Select } from "formik-material-ui";
import { MenuItem, InputLabel } from "@material-ui/core";
import { Field } from "formik";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const InnerContainerDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const LayoutOptionsDiv = styled.div`
    width: 100%;
    height: 70%;
    border: 2px solid rgb(196, 196, 196);
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

const LayoutEntryDiv = styled.div`
    flex-basis: 33%;
    padding: 20px;
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const LayoutLabelDiv = styled.div`
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LayoutImageDiv = styled.div`
    width: 85%;
    height: 100%;
    background-image: url(${props => props.imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: white;
`;

const LayoutPicker = ({
    whichLayout,
    values,
    setFieldValue,
    layoutFamilyFieldName,
    layoutFieldName
}) => {
    // const [selectedFamily, setSelectedFamily] = useState(null);
    // const [selectedLayout, setSelectedLayout] = useState(null);

    // const updateDropdown = (_event, data) => {
    //     setSelectedFamily(data.value);
    // };

    const updateLayout = (_event, { value }) => {
        // setSelectedLayout(value);
        setFieldValue(layoutFieldName, value, false);
    };

    const renderLayoutOptions = layouts => (
        <LayoutOptionsDiv>
            {layouts.map(({ id, name, media: { path } }, index) => (
                <LayoutEntryDiv key={`LAYOUT-${id}-${index}`}>
                    <LayoutLabelDiv>
                        <Radio
                            value={id}
                            checked={values[layoutFieldName] === id}
                            onChange={updateLayout}
                        />
                        <div>{name}</div>
                    </LayoutLabelDiv>
                    <LayoutImageDiv imageUrl={path} />
                </LayoutEntryDiv>
            ))}
        </LayoutOptionsDiv>
    );

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

        const { layouts = [] } = familyData || {};

        return (
            <InnerContainerDiv>
                <InputLabel>Layout Family</InputLabel>
                {/* <Dropdown
                    id="layoutFamilyDropdown"
                    placeholder="Layout Family"
                    fluid
                    selection
                    options={LAYOUT_FAMILY_OPTIONS}
                    onChange={updateDropdown}
                    value={selectedFamily}
                /> */}
                <Field
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

                {layouts.length > 0 && renderLayoutOptions(layouts)}
            </InnerContainerDiv>
        );
    };

    const renderLayoutFamily = layoutFamily => {
        const layouts =
            Boolean(layoutFamily.layouts) &&
            Array.isArray(Boolean.layoutFamilies.layouts)
                ? layoutFamily.layouts
                : [];
        return (
            <InnerContainerDiv>
                {layouts.length > 0 && renderLayoutOptions(layouts)}
            </InnerContainerDiv>
        );
    };

    return (
        <ContainerDiv>
            {whichLayout === "all" ? (
                <Query query={getLayoutFamilyList}>
                    {({ loading, error, data: { layoutFamilies } }) => {
                        if (loading) return <Loading loadingData />;
                        if (error) return `Error: ${error.message}`;
                        return renderAllLayoutFamilies(layoutFamilies);
                    }}
                </Query>
            ) : (
                <Query
                    query={getLayoutFamilyDetailFilter}
                    variables={{ name: whichLayout }}
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
    whichLayout: "all",
    layoutFamilyFieldName: "layout_family_id",
    layoutFieldName: "layout_id"
};

LayoutPicker.propTypes = {
    whichLayout: PropTypes.string,
    layoutFamilyFieldName: PropTypes.string,
    layoutFieldName: PropTypes.string,
    setFieldValue: PropTypes.func.isRequired
};

export default LayoutPicker;
