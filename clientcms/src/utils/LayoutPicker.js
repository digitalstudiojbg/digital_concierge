import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Query, withApollo } from "react-apollo";
import {
    getLayoutFamilyList,
    getLayoutFamilyDetailFilter
} from "../data/query";
import Loading from "../components/loading/Loading";
import { Dropdown, Radio } from "semantic-ui-react";

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
    height: 100%;
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
    width: 5%;
`;

const LayoutImageDiv = styled.div`
    height: 100%;
    background-image: url(${props => props.imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: white;
`;

const LayoutPicker = ({ whichLayout }) => {
    const [selectedFamily, setSelectedFamily] = useState(null);
    const [selectedLayout, setSelectedLayout] = useState(null);

    const updateDropdown = (_event, data) => {
        setSelectedFamily(data.value);
    };

    const updateLayout = (_event, { value }) => {
        setSelectedLayout(value);
    };

    const renderLayoutOptions = layouts => (
        <LayoutOptionsDiv>
            {layouts.map(({ id, name, media: { path } }, index) => (
                <LayoutEntryDiv key={`LAYOUT-${id}-${index}`}>
                    <LayoutLabelDiv>
                        <Radio
                            value={id}
                            checked={selectedLayout === id}
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
        const LAYOUT_FAMILY_OPTIONS = layoutFamilies.map(item => ({
            text: item.name,
            value: item.id
        }));

        const familyData = Boolean(selectedFamily)
            ? layoutFamilies.find(({ id }) => id === selectedFamily)
            : null;

        const { layouts = [] } = familyData || {};

        return (
            <InnerContainerDiv>
                <div>FAMILY</div>
                <Dropdown
                    id="layoutFamilyDropdown"
                    placeholder="Layout Family"
                    fluid
                    selection
                    options={LAYOUT_FAMILY_OPTIONS}
                    onChange={updateDropdown}
                    value={selectedFamily}
                />

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
    whichLayout: "all"
};

LayoutPicker.propTypes = {
    whichLayout: PropTypes.string
};

export default withApollo(LayoutPicker);
