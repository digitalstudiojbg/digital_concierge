import React, { useState } from "react";
import PropTypes from "prop-types";
import { Map, Repeat, fromJS, List } from "immutable";
import styled from "styled-components";
import ColorPicker from "rc-color-picker";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Query, Mutation } from "react-apollo";
import { getSystemThemeAndPalettes } from "../data/query";
import { withRouter } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { chunkArray, hexToRgb, DECIMAL_RADIX } from "./Constants";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitleHelper from "./DialogTitleHelper";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { CREATE_PALETTE } from "../data/mutation";

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

const PaletteTitleDiv = styled.div`
    font-size: 1.2em;
    color: black;
    font-weight: 600;
`;

const ColourEntryDivModal = styled(ColourEntryDiv)`
    background-color: ${props =>
        Boolean(props.colour) ? props.colour : "white"};
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
    const [openDialog, setOpenDialog] = useState({
        open: false,
        which: ""
    });

    const closeDialog = () => {
        setOpenDialog({ open: false, which: "" });
    };

    const openImportDialog = () => {
        setOpenDialog({ open: true, which: "import" });
    };

    const openCreateDialog = () => {
        setOpenDialog({ open: true, which: "create" });
    };

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

    //console.log(howToRender);

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
        <Query
            query={getSystemThemeAndPalettes}
            variables={{ id: system_id }}
            fetchPolicy="network-only"
        >
            {({ error, loading, data }) => {
                const { system = {} } = data;
                const { theme, client } = system;
                const { colours: systemColours = [] } = theme || {};
                const { id: clientId = "", palettes = [] } = client || {};
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

                const renderFinalItemWithWrap = colourIndex => (
                    <FinalEntryWithWrapContainerDiv
                        key={`COLOUR-NULL-${colourIndex}`}
                    >
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
                            onClick={openCreateDialog}
                            disabled={colours.equals(immutableSystemTheme)}
                        >
                            SAVE CURRENT PALETTE
                        </Button>
                        <Button
                            variant="outlined"
                            className={classes.importColourThemeButton}
                            fullWidth={true}
                            onClick={openImportDialog}
                        >
                            IMPORT COLOUR PALETTE
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
                            <React.Fragment>
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
                                                                  display:
                                                                      "flex",
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
                                                                                colourIndex
                                                                            )
                                                                          : renderFinalItemWithWrap(
                                                                                index
                                                                            );
                                                                  }
                                                              )}
                                                          </div>
                                                      )
                                                  )}
                                        </ColourContainer>
                                    )}
                                </ContainerDiv>
                                <Dialog
                                    open={openDialog.open}
                                    keepMounted
                                    onClose={closeDialog}
                                    fullWidth
                                    maxWidth="lg"
                                >
                                    <DialogTitleHelper onClose={closeDialog}>
                                        {openDialog.which === "import"
                                            ? "SELECT COLOUR PALETTE"
                                            : openDialog.which === "create"
                                            ? "CREATE NEW PALETTE"
                                            : "NULL"}
                                    </DialogTitleHelper>
                                    <DialogContent>
                                        {openDialog.which === "import" ? (
                                            <ModalImportPalette
                                                setColours={setColours}
                                                palettes={palettes}
                                                closeDialog={closeDialog}
                                            />
                                        ) : openDialog.which === "create" ? (
                                            <ModalCreatePalette
                                                currentColours={colours}
                                                closeDialog={closeDialog}
                                                clientId={clientId}
                                                systemId={system_id}
                                            />
                                        ) : (
                                            <React.Fragment />
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                );
            }}
        </Query>
    );
};

const ModalImportPalette = ({ setColours, palettes, closeDialog }) => {
    const handleUpdateColourScheme = index => _event => {
        setColours(fromJS(palettes[index].colours));
        closeDialog();
    };

    return (
        <div style={{ width: "100%" }}>
            {palettes.map(({ id, name, colours }, index) => (
                <div
                    key={`MODAL-COLOUR-INDEX${id}-${index}`}
                    onClick={handleUpdateColourScheme(index)}
                    style={{
                        marginTop: index === 0 ? 10 : 0,
                        marginBottom: index + 1 === palettes.length ? 0 : 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <PaletteTitleDiv>{name}</PaletteTitleDiv>
                    <ColourThemeContainerDiv>
                        {colours.map(({ hex, alpha }, colourIndex) => {
                            const rgb = hexToRgb(hex);
                            const { r = 255, g = 255, b = 255 } = rgb || {};
                            return (
                                <ColourEntryContainerDiv
                                    key={`COLOUR-${index}-${colourIndex}`}
                                >
                                    <ColourEntryDivModal
                                        key={colourIndex}
                                        colour={`rgba(${r},${g},${b},${alpha})`}
                                    />
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
                                        {hex.toUpperCase()} {alpha}%
                                    </div>
                                </ColourEntryContainerDiv>
                            );
                        })}
                    </ColourThemeContainerDiv>
                </div>
            ))}
        </div>
    );
};

const ModalCreatePalette = ({
    currentColours,
    closeDialog,
    clientId: clientIdProp,
    systemId
}) => {
    const [name, setName] = useState("");
    const handleChange = event => {
        setName(event.target.value);
        if (Boolean(errorName) && event.target.value.length > 0) {
            setErrorName(null);
        }
    };
    const [errorName, setErrorName] = useState(null);

    return (
        <Mutation
            mutation={CREATE_PALETTE}
            refetchQueries={[
                {
                    query: getSystemThemeAndPalettes,
                    variables: { id: systemId }
                }
            ]}
        >
            {(createPalette, { loading, error }) => {
                if (loading) return <Loading loadingData />;
                if (error)
                    return <React.Fragment>{error.message}</React.Fragment>;

                const handleSubmit = () => {
                    //Check palette name
                    if (name.length === 0) {
                        return setErrorName("Required");
                    }

                    const colours = List.isList(currentColours)
                        ? currentColours.toJS()
                        : [...currentColours];

                    const clientId = parseInt(clientIdProp, DECIMAL_RADIX);
                    const toSubmit = {
                        name,
                        colours,
                        clientId
                    };
                    createPalette({
                        variables: { input: { ...toSubmit } }
                    }).then(() => {
                        closeDialog();
                    });
                };

                return (
                    <div style={{ width: "100%", marginTop: 10 }}>
                        SAVE THIS COLOUR PALETTE AS
                        <div
                            style={{
                                width: "40%",
                                paddingTop: 10,
                                paddingBottom: 15
                            }}
                        >
                            <TextField
                                label="Name of Palette"
                                variant="outlined"
                                onChange={handleChange}
                                value={name}
                                fullWidth
                                error={Boolean(errorName)}
                                helperText={Boolean(errorName) && errorName}
                            />
                        </div>
                        <ColourThemeContainerDiv>
                            {currentColours.map((colour, colourIndex) => {
                                const hex = colour.get("hex");
                                const alpha = colour.get("alpha");
                                const rgb = hexToRgb(hex);
                                const { r = 255, g = 255, b = 255 } = rgb || {};
                                return (
                                    <ColourEntryContainerDiv
                                        key={`COLOUR-CREATE-${colourIndex}`}
                                    >
                                        <ColourEntryDivModal
                                            key={colourIndex}
                                            colour={`rgba(${r},${g},${b},${alpha})`}
                                        />
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
                                            {hex.toUpperCase()} {alpha}%
                                        </div>
                                    </ColourEntryContainerDiv>
                                );
                            })}
                        </ColourThemeContainerDiv>
                        <div
                            style={{
                                width: "100%",
                                paddingTop: 10,
                                display: "flex",
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                CREATE
                            </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={closeDialog}
                                style={{ marginLeft: 10 }}
                            >
                                CANCEL
                            </Button>
                        </div>
                    </div>
                );
            }}
        </Mutation>
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
    withWrap: PropTypes.bool,
    coloursPerRow: PropTypes.number
};

ModalImportPalette.propTypes = {
    setColours: PropTypes.func.isRequired,
    palettes: PropTypes.arrayOf(
        PropTypes.shape({
            hex: PropTypes.string,
            alpha: PropTypes.number
        })
    ).isRequired,
    closeDialog: PropTypes.func.isRequired
};

ModalCreatePalette.propTypes = {
    currentColours: PropTypes.object.isRequired,
    closeDialog: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    systemId: PropTypes.string.isRequired
};

export default withRouter(withStyles(styles)(ColourSchemePicker));
