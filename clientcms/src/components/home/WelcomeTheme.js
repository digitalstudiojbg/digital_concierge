import React, { useState, useRef } from "react";
import { Query, withApollo, Mutation } from "react-apollo";
import { getLayoutList, getSystemThemesFromClient } from "../../data/query";
import Loading from "../loading/Loading";
import { UPDATE_THEMES } from "../../data/mutation/theme";
import Immutable from "immutable";
import {
    ContainerDiv,
    ThemeContainerDiv,
    EntryThemeContainerDiv,
    ColourThemeContainerDiv,
    EntryThemeDiv,
    LayoutContainerDiv,
    LayoutEntryContainerDiv,
    LayoutEntryDropdownDiv,
    LayoutEntryPreviewDiv,
    LayoutEntryPreviewImage,
    ColourEntryContainerDiv,
    ColourEntryDiv,
    ColourTitleDiv,
    ButtonContainerDiv,
    NUMBER_OF_COLOURS_PER_SYSTEM,
    FONT_OPTIONS
} from "./themeStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Dropdown } from "semantic-ui-react";
import { Map, List, Repeat } from "immutable";
import ColorPicker from "rc-color-picker";
import { DECIMAL_RADIX } from "../../utils/Constants";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit
    },
    hideFileInput: {
        display: "none"
    },
    uploadButton: {
        margin: theme.spacing.unit,
        color: "blue",
        border: "1px solid blue",
        width: "100%"
    },
    confirmButton: {
        margin: theme.spacing.unit,
        color: "blue",
        border: "1px solid blue",
        width: "50%"
    }
});

export const WelcomeTheme = ({ data: { id }, classes }) => {
    return (
        <Query query={getLayoutList}>
            {({
                loading: loadingLayout,
                error: errorLayout,
                data: { layouts }
            }) => {
                if (loadingLayout) return <Loading loadingData />;
                if (errorLayout) return `Error! ${errorLayout.message}`;
                return (
                    <Query query={getSystemThemesFromClient} variables={{ id }}>
                        {({
                            loading: loadingSystems,
                            error: errorSystems,
                            data: { systemsByClient: systemsOriginal }
                        }) => {
                            if (loadingSystems) return <Loading loadingData />;
                            if (errorSystems)
                                return `Error! ${errorSystems.message}`;

                            //Modify system data
                            const systems = systemsOriginal.map(
                                ({ id, name, theme }) => ({
                                    id,
                                    name,
                                    ...theme
                                })
                            );
                            return (
                                <Mutation mutation={UPDATE_THEMES()}>
                                    {(
                                        updateThemes,
                                        {
                                            loading: mutationLoading,
                                            error: mutationError
                                        }
                                    ) => {
                                        if (mutationLoading)
                                            return <Loading loadingData />;
                                        if (mutationError)
                                            return `Error! ${
                                                mutationError.message
                                            }`;
                                        return (
                                            <WelcomeThemeSettings
                                                systems={Immutable.fromJS(
                                                    systems
                                                )}
                                                layouts={layouts}
                                                updateThemes={updateThemes}
                                                classes={classes}
                                            />
                                        );
                                    }}
                                </Mutation>
                            );
                        }}
                    </Query>
                );
            }}
        </Query>
    );
};

const WelcomeThemeSettings = ({ systems, layouts, updateThemes, classes }) => {
    const [systemThemes, setSystemTheme] = useState(systems);
    const [systemIndex, setSystemIndex] = useState(0);
    const [error, setError] = useState(Immutable.Map());
    const fileInput = useRef(null);

    const handleStep = step => {
        setSystemIndex(step);
    };

    const updateSystemTheme = (key, value) => {
        const updatedSystemTheme = systemThemes
            .get(systemIndex)
            .set(key, value);
        console.log(updatedSystemTheme);
        setSystemTheme(systemThemes.set(systemIndex, updatedSystemTheme));
    };

    const updateCompanyLogo = () => {
        console.log(fileInput.current.files[0]);
        updateSystemTheme("companyLogo", fileInput.current.files[0]);
    };

    const updateHeaderFont = (_event, data) => {
        updateSystemTheme("headerFont", data.value);
    };

    const updateSubHeaderFont = (_event, data) => {
        updateSystemTheme("subHeaderFont", data.value);
    };

    const updateBodyCopyFont = (_event, data) => {
        updateSystemTheme("bodyFont", data.value);
    };

    const updateCaptionCopyFont = (_event, data) => {
        updateSystemTheme("captionFont", data.value);
    };

    const handleUpdateColourPicker = (index, colourData) => {
        const { color, alpha } = colourData;
        const colourEntry = systemThemes
            .get(systemIndex)
            .get("colours")
            .get(index)
            .merge(Map({ hex: color, alpha }));
        const updatedColours = systemThemes
            .get(systemIndex)
            .get("colours")
            .set(index, colourEntry);
        const updatedSystemTheme = systemThemes
            .get(systemIndex)
            .set("colours", updatedColours);

        console.log(updatedSystemTheme);
        setSystemTheme(systemThemes.set(systemIndex, updatedSystemTheme));
    };

    const getLayoutMedia = layoutId => {
        const { media } =
            layouts.find(
                ({ id }) => parseInt(id, DECIMAL_RADIX) === layoutId
            ) || {};
        const { path = "" } = media || {};
        return path;
    };

    const updateDefaultStartLayout = (_event, data) => {
        updateSystemTheme("defaultStartLayoutId", data.value);
    };

    const updateDefaultHomeLayout = (_event, data) => {
        updateSystemTheme("defaultHomeLayoutId", data.value);
    };

    const updateDefaultDirListLayout = (_event, data) => {
        updateSystemTheme("defaultDirListLayoutId", data.value);
    };

    const updateDefaultDirEntryLayout = (_event, data) => {
        updateSystemTheme("defaultDirEntryLayoutId", data.value);
    };

    //Constants
    const values = systemThemes.get(systemIndex);
    const colours = values.get("colours");
    const LAYOUT_OPTIONS = layouts.map(item => ({
        text: item.name,
        value: parseInt(item.id, DECIMAL_RADIX)
    }));
    return (
        <ContainerDiv>
            <ThemeContainerDiv>
                <div style={{ width: "100%" }}>
                    <Stepper
                        nonLinear
                        activeStep={systemIndex}
                        alternativeLabel
                    >
                        {systems.map((system, index) => (
                            <Step key={`STEP-${system.get("id")}-${index}`}>
                                <StepButton onClick={() => handleStep(index)}>
                                    <StepLabel
                                        error={
                                            Number.isInteger(
                                                error.get("index")
                                            ) && error.get("index") === index
                                        }
                                    >
                                        {system.get("name")}
                                    </StepLabel>
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                <EntryThemeContainerDiv>
                    <EntryThemeDiv>
                        <TextField
                            value={
                                Boolean(values.get("companyLogo")) &&
                                Boolean(values.get("companyLogo").name)
                                    ? values.get("companyLogo").name
                                    : ""
                            }
                            disabled={true}
                            fullWidth={true}
                            label="Update Company Logo"
                            variant="outlined"
                            // error={currentAttributeError === "companyLogo"}
                            // helperText={
                            //     currentAttributeError === "companyLogo"
                            //         ? currentErrorMessage
                            //         : ""
                            // }
                        />
                    </EntryThemeDiv>
                    <EntryThemeDiv>
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={fileInput}
                            onChange={updateCompanyLogo}
                            id="upload-company-logo"
                            type="file"
                        />
                        <label htmlFor="upload-company-logo">
                            <Button
                                variant="outlined"
                                component="span"
                                className={classes.uploadButton}
                            >
                                Browse
                            </Button>
                        </label>
                    </EntryThemeDiv>
                </EntryThemeContainerDiv>
                {Boolean(values.get("companyLogoURL")) && (
                    <EntryThemeContainerDiv>
                        CURRENT COMPANY LOGO
                        <img
                            src={values.get("companyLogoURL")}
                            alt="current client logo"
                            style={{ width: "50%", height: "50%" }}
                        />
                    </EntryThemeContainerDiv>
                )}
                <EntryThemeContainerDiv>
                    <EntryThemeDiv>
                        HEADER FONT
                        <Dropdown
                            id="headerDropdown"
                            placeholder="Header Font"
                            fluid
                            selection
                            options={FONT_OPTIONS}
                            onChange={updateHeaderFont}
                            value={values.get("headerFont")}
                            // error={currentAttributeError === "headerFont"}
                        />
                    </EntryThemeDiv>
                    <EntryThemeDiv>
                        SUBHEADER FONT
                        <Dropdown
                            placeholder="Subheader Font"
                            fluid
                            selection
                            options={FONT_OPTIONS}
                            onChange={updateSubHeaderFont}
                            value={values.get("subHeaderFont")}
                            // error={currentAttributeError === "subHeaderFont"}
                        />
                    </EntryThemeDiv>
                </EntryThemeContainerDiv>
                <EntryThemeContainerDiv>
                    <EntryThemeDiv>
                        BODY COPY FONT
                        <Dropdown
                            placeholder="Body Copy Font"
                            fluid
                            selection
                            options={FONT_OPTIONS}
                            onChange={updateBodyCopyFont}
                            value={values.get("bodyFont")}
                            // error={currentAttributeError === "bodyFont"}
                        />
                    </EntryThemeDiv>
                    <EntryThemeDiv>
                        CAPTION COPY FONT
                        <Dropdown
                            placeholder="Caption Copy Font"
                            fluid
                            selection
                            options={FONT_OPTIONS}
                            onChange={updateCaptionCopyFont}
                            value={values.get("captionFont")}
                            // error={currentAttributeError === "captionFont"}
                        />
                    </EntryThemeDiv>
                </EntryThemeContainerDiv>
                COLOUR THEME
                <ColourThemeContainerDiv>
                    {Boolean(colours) &&
                        colours.map((colour, colourIndex) => (
                            <ColourEntryContainerDiv
                                key={`COLOUR-${values.get(
                                    "id"
                                )}-${colourIndex}`}
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
            </ThemeContainerDiv>
            <LayoutContainerDiv>
                DEFAULT LAYOUT
                <LayoutEntryContainerDiv>
                    <LayoutEntryDropdownDiv>
                        DEFAULT START LAYOUT
                        <Dropdown
                            placeholder="Default Start Layout"
                            fluid
                            selection
                            options={LAYOUT_OPTIONS}
                            onChange={updateDefaultStartLayout}
                            value={values.get("defaultStartLayoutId")}
                            // error={
                            //     currentAttributeError ===
                            //     "defaultStartLayout"
                            // }
                        />
                    </LayoutEntryDropdownDiv>
                    {Boolean(Boolean(values.get("defaultStartLayoutId"))) && (
                        <LayoutEntryPreviewDiv>
                            <LayoutEntryPreviewImage
                                src={getLayoutMedia(
                                    values.get("defaultStartLayoutId")
                                )}
                                alt="layout preview"
                            />
                        </LayoutEntryPreviewDiv>
                    )}
                </LayoutEntryContainerDiv>
                <LayoutEntryContainerDiv>
                    <LayoutEntryDropdownDiv>
                        DEFAULT HOME LAYOUT
                        <Dropdown
                            placeholder="Default Home Layout"
                            fluid
                            selection
                            options={LAYOUT_OPTIONS}
                            onChange={updateDefaultHomeLayout}
                            value={values.get("defaultHomeLayoutId")}
                            // error={
                            //     currentAttributeError ===
                            //     "defaultHomeLayout"
                            // }
                        />
                    </LayoutEntryDropdownDiv>
                    {Boolean(values.get("defaultHomeLayoutId")) && (
                        <LayoutEntryPreviewDiv>
                            <LayoutEntryPreviewImage
                                src={getLayoutMedia(
                                    values.get("defaultHomeLayoutId")
                                )}
                                alt="layout preview"
                            />
                        </LayoutEntryPreviewDiv>
                    )}
                </LayoutEntryContainerDiv>
                <LayoutEntryContainerDiv>
                    <LayoutEntryDropdownDiv>
                        DEFAULT DIRECTORY LIST LAYOUT
                        <Dropdown
                            placeholder="Default Directory List Layout"
                            fluid
                            selection
                            options={LAYOUT_OPTIONS}
                            onChange={updateDefaultDirListLayout}
                            value={values.get("defaultDirListLayoutId")}
                            // error={
                            //     currentAttributeError ===
                            //     "defaultDirListLayout"
                            // }
                        />
                    </LayoutEntryDropdownDiv>
                    {Boolean(values.get("defaultDirListLayoutId")) && (
                        <LayoutEntryPreviewDiv>
                            <LayoutEntryPreviewImage
                                src={getLayoutMedia(
                                    values.get("defaultDirListLayoutId")
                                )}
                                alt="layout preview"
                            />
                        </LayoutEntryPreviewDiv>
                    )}
                </LayoutEntryContainerDiv>
                <LayoutEntryContainerDiv>
                    <LayoutEntryDropdownDiv>
                        DEFAULT DIRECTORY ENTRY LAYOUT
                        <Dropdown
                            placeholder="Default Directory Entry Layout"
                            fluid
                            selection
                            options={LAYOUT_OPTIONS}
                            onChange={updateDefaultDirEntryLayout}
                            value={values.get("defaultDirEntryLayoutId")}
                            // error={
                            //     currentAttributeError ===
                            //     "defaultDirEntryLayout"
                            // }
                        />
                    </LayoutEntryDropdownDiv>
                    {Boolean(values.get("defaultDirEntryLayoutId")) && (
                        <LayoutEntryPreviewDiv>
                            <LayoutEntryPreviewImage
                                src={getLayoutMedia(
                                    values.get("defaultDirEntryLayoutId")
                                )}
                                alt="layout preview"
                            />
                        </LayoutEntryPreviewDiv>
                    )}
                </LayoutEntryContainerDiv>
            </LayoutContainerDiv>
        </ContainerDiv>
    );
};

export default withApollo(withStyles(styles)(WelcomeTheme));
