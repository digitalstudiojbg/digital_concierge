import React, { useState } from "react";
import PropTypes from "prop-types";
import { Map, Repeat, fromJS } from "immutable";
import styled from "styled-components";
import ColorPicker from "rc-color-picker";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const NUMBER_OF_COLOURS_PER_SYSTEM = 5;

const INITIAL_VALUE_COLOURS = Repeat(
    Map({ hex: "#ffffff", alpha: 100 }),
    NUMBER_OF_COLOURS_PER_SYSTEM
);

const ContainerDiv = styled.div`
    width: 100%;
`;

const HeaderDiv = styled.div`
    width: 100%;
    display: flex;
`;

const HeaderTitleDiv = styled.div`
    font-size: 1.5em;
`;

const ColourThemeContainerDiv = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    padding: 10px;
    border: 2px solid black;
`;

const ColourEntryContainerDiv = styled.div`
    width: 150px;
    height: 150px;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid black;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ColourEntryDiv = styled.div`
    width: 80px;
    height: 80px;
    border: 2px solid black;
    margin-bottom: 10px;
`;

const ColourTitleDiv = styled.div`
    width: 90%;
    border-bottom: 2px solid black;
    font-weight: 700;
`;

export const ColourSchemePicker = ({
    initialColours,
    systemThemeColours,
    handleOnChange
}) => {
    const immutableSystemTheme = fromJS(systemThemeColours);

    const [colours, setColours] = useState(
        Boolean(initialColours) && initialColours.length > 0
            ? fromJS(initialColours)
            : INITIAL_VALUE_COLOURS
    );

    const setSameAsSystemTheme = () => {
        if (colours.equals(immutableSystemTheme)) {
            setColours(initialColours);
            handleOnChange && handleOnChange(initialColours);
        } else {
            setColours(immutableSystemTheme);
            handleOnChange && handleOnChange(immutableSystemTheme);
        }
    };

    const handleUpdateColourPicker = (index, colourData) => {
        const { color, alpha } = colourData;

        const colourEntry = colours
            .get(index)
            .get(index)
            .merge(Map({ hex: color, alpha }));
        const updatedColours = colours.set(index, colourEntry);
        console.log(updatedColours);

        setColours(updatedColours);
        handleOnChange && handleOnChange(updatedColours);
    };

    return (
        <ContainerDiv>
            <HeaderDiv>
                <HeaderTitleDiv>COLOUR SCHEME</HeaderTitleDiv>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={colours.equals(immutableSystemTheme)}
                            onChange={setSameAsSystemTheme}
                        />
                    }
                    label="SAME AS SYSTEM THEME"
                />
            </HeaderDiv>

            {Boolean(colours) && colours.size > 0 && (
                <ColourThemeContainerDiv>
                    {colours.map((colour, colourIndex) => (
                        <ColourEntryContainerDiv
                            key={`COLOUR-${colour.id}-${colourIndex}`}
                        >
                            <ColorPicker
                                onChange={colour =>
                                    handleUpdateColourPicker(
                                        colourIndex,
                                        colour
                                    )
                                }
                                color={colour.get("hex")}
                                alpha={colour.get("alpha")}
                                placement="topLeft"
                            >
                                <ColourEntryDiv />
                            </ColorPicker>
                            <div
                                style={{
                                    width: "100%",
                                    paddingLeft: 10
                                }}
                            >
                                <ColourTitleDiv>
                                    COLOUR #{colourIndex + 1}
                                </ColourTitleDiv>
                            </div>
                            <div
                                style={{
                                    width: "100%",
                                    paddingLeft: 10
                                }}
                            >
                                {colour.get("hex").toUpperCase()}{" "}
                                {colour.get("alpha")}%
                            </div>
                        </ColourEntryContainerDiv>
                    ))}
                </ColourThemeContainerDiv>
            )}
        </ContainerDiv>
    );
};

ColourSchemePicker.defaultProps = {
    initialColour: [],
    handleOnChange: null
};

ColourSchemePicker.propTypes = {
    initialColours: PropTypes.arrayOf(
        PropTypes.shape({
            hex: PropTypes.string,
            alpha: PropTypes.number
        })
    ),
    systemThemeColours: PropTypes.arrayOf(
        PropTypes.shape({
            hex: PropTypes.string,
            alpha: PropTypes.number
        })
    ).isRequired,
    handleOnChange: PropTypes.func
};

export default ColourSchemePicker;
