import React, { useState, useRef, useEffect } from "react";
import { Query, Mutation } from "react-apollo";
import {
    getLayoutListFromType,
    getSystemThemesFromClient
} from "../../data/query";
import Loading from "../loading/Loading";
import { UPDATE_THEMES } from "../../data/mutation/theme";
import Immutable, { Map, List } from "immutable";
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
    FONT_OPTIONS,
    FieldLabel
} from "./themeStyles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";
import TextField from "@material-ui/core/TextField";
import StepIcon from "@material-ui/core/StepIcon";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Dropdown } from "semantic-ui-react";
import ColorPicker from "rc-color-picker";
import { DECIMAL_RADIX, WELCOME_URL } from "../../utils/Constants";
import { withRouter } from "react-router-dom";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit
    },
    hideFileInput: {
        display: "none"
    },
    uploadButton: {
        margin: theme.spacing.unit,
        color: "#2699FB",
        border: "1px solid #2699FB",
        backgroundColor: "white",
        marginTop: "20px",
        width: "100%",
        padding: "4% 0"
    },
    confirmButton: {
        margin: theme.spacing.unit,
        color: "#2699FB",
        border: "1px solid #2699FB",
        width: "50%"
    },
    myInput: {
        padding: "10px 0",
        backgroundColor: "white",
        border: "1px solid #9D9D9D",
        borderRadius: "5px"
    },
    stepperClass: {
        activeStep: { borderBottom: "1px solid #9D9D9D" }
    }
});

export const WelcomeTheme = ({ data: { id }, classes, history }) => {
    return (
        <Query query={getSystemThemesFromClient} variables={{ id }}>
            {({
                loading: loadingSystems,
                error: errorSystems,
                data: { systemsByClient: systemsOriginal }
            }) => {
                if (loadingSystems) return <Loading loadingData />;
                if (errorSystems) return `Error! ${errorSystems.message}`;

                //Modify system data
                const systems = systemsOriginal.map(({ id, name, theme }) => ({
                    id,
                    name,
                    ...theme
                }));
                return (
                    <Mutation
                        mutation={UPDATE_THEMES}
                        refetchQueries={[
                            {
                                query: getSystemThemesFromClient,
                                variables: { id }
                            }
                        ]}
                    >
                        {(
                            updateThemes,
                            { loading: mutationLoading, error: mutationError }
                        ) => {
                            if (mutationLoading) return <React.Fragment />;
                            if (mutationError)
                                return `Error! ${mutationError.message}`;
                            return (
                                <Query
                                    query={getLayoutListFromType}
                                    variables={{ typeName: "start" }}
                                >
                                    {({
                                        loading: loadingStart,
                                        error: errorStart,
                                        data: { layoutsFromType: layoutsStart }
                                    }) => {
                                        if (loadingStart)
                                            return <Loading loadingData />;
                                        if (errorStart)
                                            return `Error! ${
                                                errorStart.message
                                            }`;
                                        console.log(layoutsStart);
                                        return (
                                            <Query
                                                query={getLayoutListFromType}
                                                variables={{ typeName: "home" }}
                                            >
                                                {({
                                                    loading: loadingHome,
                                                    error: errorHome,
                                                    data: {
                                                        layoutsFromType: layoutsHome
                                                    }
                                                }) => {
                                                    if (loadingHome)
                                                        return (
                                                            <Loading
                                                                loadingData
                                                            />
                                                        );
                                                    if (errorHome)
                                                        return `Error! ${
                                                            errorHome.message
                                                        }`;
                                                    console.log(layoutsHome);
                                                    return (
                                                        <Query
                                                            query={
                                                                getLayoutListFromType
                                                            }
                                                            variables={{
                                                                typeName: "list"
                                                            }}
                                                        >
                                                            {({
                                                                loading: loadingList,
                                                                error: errorList,
                                                                data: {
                                                                    layoutsFromType: layoutsList
                                                                }
                                                            }) => {
                                                                if (loadingList)
                                                                    return (
                                                                        <Loading
                                                                            loadingData
                                                                        />
                                                                    );
                                                                if (errorList)
                                                                    return `Error! ${
                                                                        errorList.message
                                                                    }`;
                                                                console.log(
                                                                    layoutsList
                                                                );
                                                                return (
                                                                    <Query
                                                                        query={
                                                                            getLayoutListFromType
                                                                        }
                                                                        variables={{
                                                                            typeName:
                                                                                "entry"
                                                                        }}
                                                                    >
                                                                        {({
                                                                            loading: loadingEntry,
                                                                            error: errorEntry,
                                                                            data: {
                                                                                layoutsFromType: layoutsEntry
                                                                            }
                                                                        }) => {
                                                                            if (
                                                                                loadingEntry
                                                                            )
                                                                                return (
                                                                                    <Loading
                                                                                        loadingData
                                                                                    />
                                                                                );
                                                                            if (
                                                                                errorEntry
                                                                            )
                                                                                return `Error! ${
                                                                                    errorEntry.message
                                                                                }`;
                                                                            console.log(
                                                                                layoutsEntry
                                                                            );
                                                                            return (
                                                                                <WelcomeThemeSettings
                                                                                    systems={Immutable.fromJS(
                                                                                        systems
                                                                                    )}
                                                                                    layoutsStart={
                                                                                        layoutsStart
                                                                                    }
                                                                                    layoutsHome={
                                                                                        layoutsHome
                                                                                    }
                                                                                    layoutsList={
                                                                                        layoutsList
                                                                                    }
                                                                                    layoutsEntry={
                                                                                        layoutsEntry
                                                                                    }
                                                                                    updateThemes={
                                                                                        updateThemes
                                                                                    }
                                                                                    classes={
                                                                                        classes
                                                                                    }
                                                                                    clientId={
                                                                                        id
                                                                                    }
                                                                                    history={
                                                                                        history
                                                                                    }
                                                                                />
                                                                            );
                                                                        }}
                                                                    </Query>
                                                                );
                                                            }}
                                                        </Query>
                                                    );
                                                }}
                                            </Query>
                                        );
                                    }}
                                </Query>
                            );
                        }}
                    </Mutation>
                );
            }}
        </Query>
    );
};

const WelcomeThemeSettings = ({
    systems,
    layoutsStart,
    layoutsHome,
    layoutsList,
    layoutsEntry,
    updateThemes,
    history,
    classes,
    clientId
}) => {
    //Hooks API
    const [systemThemes, setSystemTheme] = useState(List([Map()]));
    const [systemIndex, setSystemIndex] = useState(0);
    // const [error, setError] = useState(Map());
    const fileInput = useRef(null);

    //Component did update via hooks
    useEffect(() => {
        console.info("Systems changed ", systems);
        setSystemTheme(systems);
    }, [systems]);

    //Functional methods
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
        setSystemTheme(systemThemes.set(systemIndex, updatedSystemTheme));
    };

    const getLayoutMediaStart = layoutId => {
        const { media } =
            layoutsStart.find(
                ({ id }) => parseInt(id, DECIMAL_RADIX) === layoutId
            ) || {};
        const { path = "" } = media || {};
        return path;
    };

    const getLayoutMediaHome = layoutId => {
        const { media } =
            layoutsHome.find(
                ({ id }) => parseInt(id, DECIMAL_RADIX) === layoutId
            ) || {};
        const { path = "" } = media || {};
        return path;
    };

    const getLayoutMediaList = layoutId => {
        const { media } =
            layoutsList.find(
                ({ id }) => parseInt(id, DECIMAL_RADIX) === layoutId
            ) || {};
        const { path = "" } = media || {};
        return path;
    };

    const getLayoutMediaEntry = layoutId => {
        const { media } =
            layoutsEntry.find(
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

    const submitData = () => {
        const systemThemesJS = systemThemes.toJS();
        const input = systemThemesJS.map(
            ({
                id,
                __typename,
                companyLogoURL,
                name,
                defaultDirEntryLayout,
                defaultDirListLayout,
                defaultHomeLayout,
                defaultStartLayout,
                ...others
            }) => ({
                ...others,
                id: parseInt(id, DECIMAL_RADIX)
            })
        );

        return new Promise((resolve, reject) => {
            updateThemes({ variables: { input } })
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    };

    const handleSubmit = () => {
        if (!systemThemes.equals(systems)) {
            //Do update here
            submitData().then(data => {
                console.log("THEME UPDATED: ", data);
            });
        }
    };

    const handleSubmitAndExit = () => {
        if (!systemThemes.equals(systems)) {
            //Do update here
            submitData().then(data => {
                console.log("THEME UPDATED: ", data);
                //Navigate away
                history.push(`${WELCOME_URL}/${clientId}/systems`);
            });
        }
    };

    //Constants
    const values = systemThemes.get(systemIndex);
    const colours = values.get("colours");
    const LAYOUT_OPTIONS_START = layoutsStart.map(item => ({
        text: item.name,
        value: parseInt(item.id, DECIMAL_RADIX)
    }));
    const LAYOUT_OPTIONS_HOME = layoutsHome.map(item => ({
        text: item.name,
        value: parseInt(item.id, DECIMAL_RADIX)
    }));
    const LAYOUT_OPTIONS_LIST = layoutsList.map(item => ({
        text: item.name,
        value: parseInt(item.id, DECIMAL_RADIX)
    }));
    const LAYOUT_OPTIONS_ENTRY = layoutsEntry.map(item => ({
        text: item.name,
        value: parseInt(item.id, DECIMAL_RADIX)
    }));

    //Render method
    return (
        <ContainerDiv>
            <ThemeContainerDiv>
                <div style={{ width: "100%", display: "flex" }}>
                    <Stepper
                        nonLinear
                        activeStep={systemIndex}
                        //  alternativeLabel

                        style={{ backgroundColor: "#F4F4F4", flex: "left" }}
                    >
                        {systems.map((system, index) => (
                            <Step key={`STEP-${system.get("id")}-${index}`}>
                                <StepButton onClick={() => handleStep(index)}>
                                    <StepLabel

                                    // error={
                                    //     Number.isInteger(
                                    //         error.get("index")
                                    //     ) && error.get("index") === index
                                    // }
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
                        <FieldLabel>Update Company Logo</FieldLabel>
                        <TextField
                            value={
                                Boolean(values.get("companyLogo")) &&
                                Boolean(values.get("companyLogo").name)
                                    ? values.get("companyLogo").name
                                    : ""
                            }
                            disabled={true}
                            fullWidth={true}
                            //    label="Update Company Logo"
                            inputProps={{
                                className: classes.myInput
                            }}
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
                            style={{
                                display: "none"
                            }}
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
                            options={LAYOUT_OPTIONS_START}
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
                                src={getLayoutMediaStart(
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
                            options={LAYOUT_OPTIONS_HOME}
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
                                src={getLayoutMediaHome(
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
                            options={LAYOUT_OPTIONS_LIST}
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
                                src={getLayoutMediaList(
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
                            options={LAYOUT_OPTIONS_ENTRY}
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
                                src={getLayoutMediaEntry(
                                    values.get("defaultDirEntryLayoutId")
                                )}
                                alt="layout preview"
                            />
                        </LayoutEntryPreviewDiv>
                    )}
                </LayoutEntryContainerDiv>
                <ButtonContainerDiv>
                    <Button
                        variant="outlined"
                        component="span"
                        className={classes.confirmButton}
                        onClick={handleSubmitAndExit}
                    >
                        SAVE & EXIT
                    </Button>
                    <Button
                        variant="outlined"
                        component="span"
                        className={classes.confirmButton}
                        onClick={handleSubmit}
                    >
                        SAVE & KEEP EDITING
                    </Button>
                </ButtonContainerDiv>
            </LayoutContainerDiv>
        </ContainerDiv>
    );
};

export default withRouter(withStyles(styles)(WelcomeTheme));
