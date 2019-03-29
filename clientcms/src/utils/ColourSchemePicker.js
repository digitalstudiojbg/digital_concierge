import React, { useState } from "react";
import PropTypes from "prop-types";
import { Map, Repeat, fromJS, List } from "immutable";
import styled from "styled-components";
import ColorPicker from "rc-color-picker";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Query } from "react-apollo";
import { getSystemTheme } from "../data/query";
import { withRouter } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { chunkArray } from "./Constants";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const NUMBER_OF_COLOURS_PER_SYSTEM = 5;

const INITIAL_VALUE_COLOURS = List(
    Repeat(Map({ hex: "#ffffff", alpha: 100 }), NUMBER_OF_COLOURS_PER_SYSTEM)
);

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const HeaderDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

const HeaderTitleDiv = styled.div`
    font-size: 1.5em;
    padding-right: 10px;
`;

const ColourThemeContainerDiv = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    padding: 10px;
    border: 2px solid black;
`;

const ColourThemeContainerDivWithWrap = styled.div`
    width: 80%;
    padding: 10px;
    border: 2px solid black;
`;

const ColourEntryContainerDiv = styled.div`
    width: 200px;
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

const FinalEntryWithWrapContainerDiv = styled(ColourEntryContainerDiv)`
    border: none;
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

const styles = () => ({
    importColourThemeButton: {
        backgroundColor: "white"
    },
    saveCurrentThemeButton: {
        backgroundColor: "white",
        marginBottom: 10
    }
});

export const ColourSchemePicker = ({
    initialColours: initialColoursProp,
    currentColours: currentColoursProp,
    handleOnChange,
    match,
    withWrap,
    coloursPerRow,
    classes
}) => {
    const initialColours =
        Boolean(initialColoursProp) &&
        (initialColoursProp.length > 0 || initialColoursProp.size > 0)
            ? fromJS(initialColoursProp)
            : INITIAL_VALUE_COLOURS;

    const currentColours =
        Boolean(currentColoursProp) &&
        (currentColoursProp.length > 0 || currentColoursProp.size > 0)
            ? fromJS(currentColoursProp)
            : initialColours;

    const [colours, setColours] = useState(currentColours);

    const handleUpdateColourPicker = (index, colourData) => {
        // console.log("Colours before update: ", colours);
        const { color, alpha } = colourData;

        const colourEntry = colours
            .get(index)
            .merge(Map({ hex: color, alpha }));
        const updatedColours = colours.set(index, colourEntry);
        // console.log(updatedColours);

        setColours(updatedColours);
        handleOnChange && handleOnChange(updatedColours);
    };

    const { params } = match || {};
    const { system_id = "" } = params;

    const ColourContainer = withWrap
        ? ColourThemeContainerDivWithWrap
        : ColourThemeContainerDiv;

    let howToRender = chunkArray(
        [...Array(NUMBER_OF_COLOURS_PER_SYSTEM).keys()],
        coloursPerRow
    );

    howToRender = [
        ...howToRender.slice(0, howToRender.length - 1),
        [...howToRender[howToRender.length - 1], -1]
    ];

    console.log(howToRender);

    const renderColourEntry = (colour, colourIndex) => (
        <ColourEntryContainerDiv key={`COLOUR-${colour.id}-${colourIndex}`}>
            <ColorPicker
                onChange={colour =>
                    handleUpdateColourPicker(colourIndex, colour)
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
                <ColourTitleDiv>COLOUR #{colourIndex + 1}</ColourTitleDiv>
            </div>
            <div
                style={{
                    width: "100%",
                    paddingLeft: 10
                }}
            >
                {colour.get("hex").toUpperCase()} {colour.get("alpha")}%
            </div>
        </ColourEntryContainerDiv>
    );

    return (
        <Query query={getSystemTheme} variables={{ id: system_id }}>
            {({
                error,
                loading,
                data: {
                    system: { theme }
                }
            }) => {
                const { colours: systemColours = [] } = theme || {};
                const immutableSystemTheme =
                    systemColours.length > 0
                        ? fromJS(systemColours)
                        : INITIAL_VALUE_COLOURS;
                // console.log("System Colours: ", immutableSystemTheme);

                const setSameAsSystemTheme = () => {
                    // console.log("Colours before update: ", colours);
                    if (colours.equals(immutableSystemTheme)) {
                        setColours(initialColours);
                        handleOnChange && handleOnChange(initialColours);
                    } else {
                        setColours(immutableSystemTheme);
                        handleOnChange && handleOnChange(immutableSystemTheme);
                    }
                };
                // console.log("Current state colour ", colours);

                const renderFinalItemWithWrap = () => (
                    <FinalEntryWithWrapContainerDiv>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={colours.equals(
                                        immutableSystemTheme
                                    )}
                                    onChange={setSameAsSystemTheme}
                                />
                            }
                            label="SAME AS SYSTEM THEME"
                        />
                        <Button
                            variant="outlined"
                            className={classes.saveCurrentThemeButton}
                            fullWidth={true}
                        >
                            SAVE CURRENT THEME
                        </Button>
                        <Button
                            variant="outlined"
                            className={classes.importColourThemeButton}
                            fullWidth={true}
                        >
                            IMPORT COLOUR THEME
                        </Button>
                    </FinalEntryWithWrapContainerDiv>
                );
                return (
                    <React.Fragment>
                        {loading && <Loading loadingData />}
                        {error && (
                            <React.Fragment>
                                ERROR! {error.message}
                            </React.Fragment>
                        )}
                        {!loading && !error && (
                            <ContainerDiv>
                                <HeaderDiv>
                                    <HeaderTitleDiv>
                                        COLOUR SCHEME
                                    </HeaderTitleDiv>
                                    {!withWrap && (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={colours.equals(
                                                        immutableSystemTheme
                                                    )}
                                                    onChange={
                                                        setSameAsSystemTheme
                                                    }
                                                />
                                            }
                                            label="SAME AS SYSTEM THEME"
                                        />
                                    )}
                                </HeaderDiv>

                                {Boolean(colours) && colours.size > 0 && (
                                    <ColourContainer>
                                        {!withWrap
                                            ? colours.map(
                                                  (colour, colourIndex) =>
                                                      renderColourEntry(
                                                          colour,
                                                          colourIndex
                                                      )
                                              )
                                            : howToRender.map(
                                                  (
                                                      colourIndexesRow,
                                                      firstIndex
                                                  ) => (
                                                      <div
                                                          style={{
                                                              width: "100%",
                                                              display: "flex",
                                                              justifyContent:
                                                                  "center",
                                                              paddingBottom:
                                                                  firstIndex +
                                                                      1 ===
                                                                  howToRender.length
                                                                      ? 0
                                                                      : 10
                                                          }}
                                                          key={`COLOUR-CONTAINER-${firstIndex}`}
                                                      >
                                                          {colourIndexesRow.map(
                                                              (
                                                                  colourIndex,
                                                                  index
                                                              ) => {
                                                                  const colour =
                                                                      colourIndex >=
                                                                      0
                                                                          ? colours.get(
                                                                                colourIndex
                                                                            )
                                                                          : null;
                                                                  return Boolean(
                                                                      colour
                                                                  )
                                                                      ? renderColourEntry(
                                                                            colour,
                                                                            index
                                                                        )
                                                                      : renderFinalItemWithWrap();
                                                              }
                                                          )}
                                                      </div>
                                                  )
                                              )}
                                    </ColourContainer>
                                )}
                            </ContainerDiv>
                        )}
                    </React.Fragment>
                );
            }}
        </Query>
    );
};

ColourSchemePicker.defaultProps = {
    initialColours: [],
    handleOnChange: null,
    withWrap: false,
    coloursPerRow: 2
};

ColourSchemePicker.propTypes = {
    // initialColours: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         hex: PropTypes.string,
    //         alpha: PropTypes.number
    //     })
    // ),
    initialColours: PropTypes.any.isRequired, //Initial value of the colour scheme
    currentColours: PropTypes.any.isRequired, //Current value of the colour scheme
    handleOnChange: PropTypes.func,
    withWrap: PropTypes.func,
    coloursPerRow: PropTypes.number
};

export default withRouter(withStyles(styles)(ColourSchemePicker));
