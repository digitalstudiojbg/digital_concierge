import React from "react";
import styled from "styled-components";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Dropdown } from "semantic-ui-react";
import { Map, List, Repeat } from "immutable";
import ColorPicker from "rc-color-picker";
import FONT_OPTIONS from "./FontOptions";
import systemThemeSchemaCreator from "./SystemThemeSchema";
import { DECIMAL_RADIX } from "../../../../utils/Constants";
import { Mutation } from "react-apollo";
import { CREATE_THEMES } from "../../../../data/mutation";
import Loading from "../../../loading/Loading";

import {
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
    NormalButton,
    ContainerDiv,
    SectionHeader,
    FieldLabel,
    ContinueButton,
    SubSection,
    SectionDiv,
    ContinueButtonContainer
} from "../CreateClientStyleSet";

const NUMBER_OF_COLOURS_PER_SYSTEM = 5;

const initialSystemTheme = Map({
    companyLogo: null,
    headerFont: null,
    subHeaderFont: null,
    bodyFont: null,
    captionFont: null,
    defaultStartLayout: null,
    defaultHomeLayout: null,
    defaultDirListLayout: null,
    defaultDirEntryLayout: null,
    colours: Repeat(
        Map({ hex: "#ffffff", alpha: 100 }),
        NUMBER_OF_COLOURS_PER_SYSTEM
    ).toList()
});

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit
    },
    hideFileInput: {
        display: "none"
    },
    uploadButton: {
        // margin: theme.spacing.unit,
        width: "55%",
        border: "3px solid #2699FB",
        backgroundColor: "white",
        padding: "5px 5px",
        fontSize: "14px",
        color: "#2699FB",
        bottom: "0",
        marginTop: "6%"
    },

    icon: {
        color: "#2699FB !important"
    },
    myInput: {
        padding: "10px",
        backgroundColor: "white"
    }
});

class SetupClientThemeAndLayout extends React.Component {
    fileInput = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            systemIndex: 0,
            systemThemes: null,
            error: Map()
        };
        // this.handleTabChange = this.handleTabChange.bind(this);
        this.updateCompanyLogo = this.updateCompanyLogo.bind(this);
        this.updateSystemTheme = this.updateSystemTheme.bind(this);
        this.updateHeaderFont = this.updateHeaderFont.bind(this);
        this.updateSubHeaderFont = this.updateSubHeaderFont.bind(this);
        this.updateBodyCopyFont = this.updateBodyCopyFont.bind(this);
        this.updateCaptionCopyFont = this.updateCaptionCopyFont.bind(this);
        this.handleUpdateColourPicker = this.handleUpdateColourPicker.bind(
            this
        );
        this.updateDefaultStartLayout = this.updateDefaultStartLayout.bind(
            this
        );
        this.updateDefaultHomeLayout = this.updateDefaultHomeLayout.bind(this);
        this.updateDefaultDirListLayout = this.updateDefaultDirListLayout.bind(
            this
        );
        this.updateDefaultDirEntryLayout = this.updateDefaultDirEntryLayout.bind(
            this
        );
        this.validateAndSubmitData = this.validateAndSubmitData.bind(this);

        this.layouts = [
            ...props.layoutsStart,
            ...props.layoutsHome,
            ...props.layoutsList,
            ...props.layoutsEntry
        ];
    }

    componentDidMount() {
        const { systems } = this.props;

        let systemThemes = List();
        systems.forEach(_ => {
            systemThemes = systemThemes.push(initialSystemTheme);
        });

        this.setState({
            systemThemes
        });
    }

    // handleTabChange = (_event, value) => {
    //     this.setState({
    //         systemIndex: value
    //     });
    // };

    handleStep = step => () => {
        this.setState({
            systemIndex: step
        });
    };

    updateSystemTheme = (key, value) => {
        const { systemIndex, systemThemes } = this.state;
        const updatedSystemTheme = systemThemes
            .get(systemIndex)
            .set(key, value);
        console.log(updatedSystemTheme);
        this.setState({
            systemThemes: systemThemes.set(systemIndex, updatedSystemTheme)
        });
    };

    updateCompanyLogo = () => {
        console.log(this.fileInput.current.files[0]);
        this.updateSystemTheme("companyLogo", this.fileInput.current.files[0]);
    };

    updateHeaderFont(_event, data) {
        this.updateSystemTheme("headerFont", data.value);
    }

    updateSubHeaderFont(_event, data) {
        this.updateSystemTheme("subHeaderFont", data.value);
    }

    updateBodyCopyFont(_event, data) {
        this.updateSystemTheme("bodyFont", data.value);
    }

    updateCaptionCopyFont(_event, data) {
        this.updateSystemTheme("captionFont", data.value);
    }

    updateDefaultStartLayout(_event, data) {
        // const layout = this.getLayoutItem(data.value);
        // this.updateSystemTheme(
        //     "defaultStartLayout",
        //     Map({ ...layout, media: Map(layout.media) })
        // );
        this.updateSystemTheme("defaultStartLayout", data.value);
    }

    updateDefaultHomeLayout(_event, data) {
        // const layout = this.getLayoutItem(data.value);
        // this.updateSystemTheme(
        //     "defaultHomeLayout",
        //     Map({ ...layout, media: Map(layout.media) })
        // );
        this.updateSystemTheme("defaultHomeLayout", data.value);
    }

    updateDefaultDirListLayout(_event, data) {
        // const layout = this.getLayoutItem(data.value);
        // this.updateSystemTheme(
        //     "defaultDirListLayout",
        //     Map({ ...layout, media: Map(layout.media) })
        // );
        this.updateSystemTheme("defaultDirListLayout", data.value);
    }

    updateDefaultDirEntryLayout(_event, data) {
        // const layout = this.getLayoutItem(data.value);
        // this.updateSystemTheme(
        //     "defaultDirEntryLayout",
        //     Map({ ...layout, media: Map(layout.media) })
        // );
        this.updateSystemTheme("defaultDirEntryLayout", data.value);
    }

    handleUpdateColourPicker(index, colourData) {
        const { color, alpha } = colourData;
        const { systemIndex, systemThemes } = this.state;
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
        this.setState({
            systemThemes: systemThemes.set(systemIndex, updatedSystemTheme)
        });
    }

    getLayoutMedia = layoutId => {
        // const { layouts = [] } = this.props;
        const { media } = this.layouts.find(({ id }) => id === layoutId) || {};
        const { path = "" } = media || {};
        return path;
    };

    validateAndSubmitData = createThemes => {
        const { systemThemes: immutableSystemThemes, error } = this.state;
        const {
            layoutsStart = [],
            layoutsHome = [],
            layoutsList = [],
            layoutsEntry = [],
            systems = []
        } = this.props || {};
        if (
            Boolean(immutableSystemThemes) &&
            immutableSystemThemes.size === systems.length
        ) {
            const systemThemes = immutableSystemThemes.toJS();
            const SYSTEM_THEMES_SCHEMA = systemThemeSchemaCreator(
                layoutsStart.map(({ id }) => id),
                layoutsHome.map(({ id }) => id),
                layoutsList.map(({ id }) => id),
                layoutsEntry.map(({ id }) => id)
            );
            // SYSTEM_THEMES_SCHEMA.validate(systemThemes, { abortEarly: false })
            SYSTEM_THEMES_SCHEMA.validate(systemThemes)
                .catch(err => {
                    console.log("Err ", err);
                    const { params = {}, message = "" } = err;
                    const { path = "" } = params;
                    if (path.length > 0) {
                        //There is error, need to update error state attribute
                        const errorArray = path.split(".");
                        const errorIndex =
                            errorArray.length > 1
                                ? parseInt(
                                      errorArray[0].substring(1, 2),
                                      DECIMAL_RADIX
                                  )
                                : -1;
                        const errorAttribute =
                            errorArray.length > 1 ? errorArray[1] : "";
                        this.setState({
                            error: error.merge({
                                index: errorIndex,
                                which: errorAttribute,
                                message
                            })
                        });
                    }
                })
                .then(value => {
                    if (Boolean(value)) {
                        const { systems, next } = this.props;
                        this.setState({ error: Map() });
                        console.log("Original Value: ", value);
                        const input = value.map(
                            (
                                {
                                    defaultDirEntryLayout,
                                    defaultDirListLayout,
                                    defaultHomeLayout,
                                    defaultStartLayout,
                                    ...others
                                },
                                index
                            ) => ({
                                ...others,
                                defaultStartLayoutId: parseInt(
                                    defaultStartLayout,
                                    DECIMAL_RADIX
                                ),
                                defaultHomeLayoutId: parseInt(
                                    defaultHomeLayout,
                                    DECIMAL_RADIX
                                ),
                                defaultDirListLayoutId: parseInt(
                                    defaultDirListLayout,
                                    DECIMAL_RADIX
                                ),
                                defaultDirEntryLayoutId: parseInt(
                                    defaultDirEntryLayout,
                                    DECIMAL_RADIX
                                ),
                                systemId: parseInt(
                                    systems[index].id,
                                    DECIMAL_RADIX
                                )
                            })
                        );
                        console.log("Before Send Value: ", input);
                        createThemes({
                            variables: {
                                input
                            }
                        }).then(data => {
                            console.log("Received data back: ", data);
                            next && next();
                        });
                    }
                });
        }
    };

    render() {
        return (
            <Mutation mutation={CREATE_THEMES}>
                {(createThemes, { loading, error: mutationError }) => {
                    if (loading) return <Loading loadingData />;
                    if (mutationError) return `Error! ${mutationError.message}`;

                    const { systemIndex, systemThemes, error } = this.state;
                    const {
                        systems,
                        classes,
                        layoutsStart = [],
                        layoutsHome = [],
                        layoutsList = [],
                        layoutsEntry = []
                    } = this.props;
                    const values = Boolean(systemThemes)
                        ? systemThemes.get(systemIndex)
                        : Map();
                    const colours = Boolean(values)
                        ? values.get("colours")
                        : List();

                    const { id: systemId } = systems[systemIndex] || {};
                    const START_LAYOUT_OPTIONS = layoutsStart.map(item => ({
                        text: item.name,
                        value: item.id
                    }));
                    const HOME_LAYOUT_OPTIONS = layoutsHome.map(item => ({
                        text: item.name,
                        value: item.id
                    }));
                    const LIST_LAYOUT_OPTIONS = layoutsList.map(item => ({
                        text: item.name,
                        value: item.id
                    }));
                    const ENTRY_LAYOUT_OPTIONS = layoutsEntry.map(item => ({
                        text: item.name,
                        value: item.id
                    }));
                    // const currentDefaultStartLayout =
                    //     values.get("defaultStartLayout") || Map();
                    // const currentDefaultHomeLayout =
                    //     values.get("defaultHomeLayout") || Map();
                    // const currentDefaultDirListLayout =
                    //     values.get("defaultDirListLayout") || Map();
                    // const currentDefaultDirEntryLayout =
                    //     values.get("defaultDirEntryLayout") || Map();
                    const currentStepError =
                        Number.isInteger(error.get("index")) &&
                        error.get("index") === systemIndex;
                    const currentAttributeError =
                        currentStepError && Boolean(error) && error.size > 0
                            ? error.get("which")
                            : "";
                    const currentErrorMessage =
                        currentStepError && Boolean(error) && error.size > 0
                            ? error.get("message")
                            : "";
                    // console.log("Current error object: ", error);
                    // console.log("Current Step Error: ", currentStepError);
                    // console.log("Current Attribute Error: ", currentAttributeError);
                    return (
                        <ContainerDiv>
                            {Boolean(systems) &&
                            Array.isArray(systems) &&
                            systems.length > 0 ? (
                                <React.Fragment>
                                    <ThemeContainerDiv>
                                        <SectionHeader>System</SectionHeader>
                                        <div
                                            style={{
                                                width: "90%",
                                                display: "flex"
                                            }}
                                        >
                                            <Stepper
                                                style={{
                                                    backgroundColor: "#F4F4F4"
                                                }}
                                                nonLinear
                                                activeStep={systemIndex}
                                                alternativeLabel
                                            >
                                                {systems.map(
                                                    ({ id, name }, index) => (
                                                        <Step
                                                            key={`STEP-${id}-${index}`}
                                                        >
                                                            <StepButton
                                                                onClick={this.handleStep(
                                                                    index
                                                                )}
                                                            >
                                                                <StepLabel
                                                                    style={{
                                                                        fontSize:
                                                                            "15px",
                                                                        padding:
                                                                            "0px 20px"
                                                                    }}
                                                                    StepIconProps={{
                                                                        classes: {
                                                                            active:
                                                                                classes.icon
                                                                        }
                                                                    }}
                                                                    error={
                                                                        Number.isInteger(
                                                                            error.get(
                                                                                "index"
                                                                            )
                                                                        ) &&
                                                                        error.get(
                                                                            "index"
                                                                        ) ===
                                                                            index
                                                                    }
                                                                >
                                                                    {name}
                                                                </StepLabel>
                                                            </StepButton>
                                                        </Step>
                                                    )
                                                )}
                                            </Stepper>
                                        </div>
                                        <SectionHeader>
                                            Brand Assets
                                        </SectionHeader>
                                        <EntryThemeContainerDiv>
                                            <EntryThemeDiv>
                                                <FieldLabel>
                                                    Company Logo
                                                </FieldLabel>
                                                <TextField
                                                    inputProps={{
                                                        className: this.props
                                                            .classes.myInput
                                                    }}
                                                    value={
                                                        Boolean(
                                                            values.get(
                                                                "companyLogo"
                                                            )
                                                        ) &&
                                                        Boolean(
                                                            values.get(
                                                                "companyLogo"
                                                            ).name
                                                        )
                                                            ? values.get(
                                                                  "companyLogo"
                                                              ).name
                                                            : ""
                                                    }
                                                    disabled={true}
                                                    fullWidth={true}
                                                    //   label="Company Logo"
                                                    variant="outlined"
                                                    error={
                                                        currentAttributeError ===
                                                        "companyLogo"
                                                    }
                                                    helperText={
                                                        currentAttributeError ===
                                                        "companyLogo"
                                                            ? currentErrorMessage
                                                            : ""
                                                    }
                                                />
                                            </EntryThemeDiv>
                                            <EntryThemeDiv>
                                                <input
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    ref={this.fileInput}
                                                    onChange={
                                                        this.updateCompanyLogo
                                                    }
                                                    id="upload-company-logo"
                                                    type="file"
                                                />
                                                <label htmlFor="upload-company-logo">
                                                    <Button
                                                        variant="outlined"
                                                        component="span"
                                                        className={
                                                            classes.uploadButton
                                                        }
                                                    >
                                                        Browse
                                                    </Button>
                                                </label>
                                            </EntryThemeDiv>
                                        </EntryThemeContainerDiv>
                                        <EntryThemeContainerDiv>
                                            <EntryThemeDiv>
                                                <FieldLabel>
                                                    HEADER FONT
                                                </FieldLabel>
                                                <Dropdown
                                                    id="headerDropdown"
                                                    //  placeholder="Header Font"
                                                    fluid
                                                    selection
                                                    options={FONT_OPTIONS}
                                                    onChange={
                                                        this.updateHeaderFont
                                                    }
                                                    value={values.get(
                                                        "headerFont"
                                                    )}
                                                    error={
                                                        currentAttributeError ===
                                                        "headerFont"
                                                    }
                                                />
                                            </EntryThemeDiv>
                                            <EntryThemeDiv>
                                                <FieldLabel>
                                                    SUBHEADER FONT{" "}
                                                </FieldLabel>
                                                <Dropdown
                                                    //  placeholder="Subheader Font"
                                                    fluid
                                                    selection
                                                    options={FONT_OPTIONS}
                                                    onChange={
                                                        this.updateSubHeaderFont
                                                    }
                                                    value={values.get(
                                                        "subHeaderFont"
                                                    )}
                                                    error={
                                                        currentAttributeError ===
                                                        "subHeaderFont"
                                                    }
                                                />
                                            </EntryThemeDiv>
                                        </EntryThemeContainerDiv>
                                        <EntryThemeContainerDiv>
                                            <EntryThemeDiv>
                                                <FieldLabel>
                                                    {" "}
                                                    BODY COPY FONT{" "}
                                                </FieldLabel>
                                                <Dropdown
                                                    // placeholder="Body Copy Font"
                                                    fluid
                                                    selection
                                                    options={FONT_OPTIONS}
                                                    onChange={
                                                        this.updateBodyCopyFont
                                                    }
                                                    value={values.get(
                                                        "bodyFont"
                                                    )}
                                                    error={
                                                        currentAttributeError ===
                                                        "bodyFont"
                                                    }
                                                />
                                            </EntryThemeDiv>
                                            <EntryThemeDiv>
                                                <FieldLabel>
                                                    CAPTION COPY FONT{" "}
                                                </FieldLabel>
                                                <Dropdown
                                                    // placeholder="Caption Copy Font"
                                                    fluid
                                                    selection
                                                    options={FONT_OPTIONS}
                                                    onChange={
                                                        this
                                                            .updateCaptionCopyFont
                                                    }
                                                    value={values.get(
                                                        "captionFont"
                                                    )}
                                                    error={
                                                        currentAttributeError ===
                                                        "captionFont"
                                                    }
                                                />
                                            </EntryThemeDiv>
                                        </EntryThemeContainerDiv>
                                        <FieldLabel>COLOUR THEME</FieldLabel>
                                        <ColourThemeContainerDiv>
                                            {Boolean(colours) &&
                                                colours.size > 0 &&
                                                colours.map(
                                                    (colour, colourIndex) => (
                                                        <ColourEntryContainerDiv
                                                            key={`COLOUR-${systemId}-${colourIndex}`}
                                                        >
                                                            <ColorPicker
                                                                onChange={colour =>
                                                                    this.handleUpdateColourPicker(
                                                                        colourIndex,
                                                                        colour
                                                                    )
                                                                }
                                                                color={colour.get(
                                                                    "hex"
                                                                )}
                                                                alpha={colour.get(
                                                                    "alpha"
                                                                )}
                                                                placement="topLeft"
                                                            >
                                                                <ColourEntryDiv />
                                                            </ColorPicker>
                                                            <div
                                                                style={{
                                                                    width:
                                                                        "100%",
                                                                    paddingLeft: 10
                                                                }}
                                                            >
                                                                <ColourTitleDiv>
                                                                    COLOUR #
                                                                    {colourIndex +
                                                                        1}
                                                                </ColourTitleDiv>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    width:
                                                                        "100%",
                                                                    paddingLeft: 10
                                                                }}
                                                            >
                                                                {colour
                                                                    .get("hex")
                                                                    .toUpperCase()}{" "}
                                                                {colour.get(
                                                                    "alpha"
                                                                )}
                                                                %
                                                            </div>
                                                        </ColourEntryContainerDiv>
                                                    )
                                                )}
                                        </ColourThemeContainerDiv>
                                    </ThemeContainerDiv>
                                    <LayoutContainerDiv>
                                        <SubSection>
                                            <SectionHeader>
                                                Default Layout
                                            </SectionHeader>
                                            <LayoutEntryContainerDiv>
                                                <LayoutEntryDropdownDiv>
                                                    <FieldLabel>
                                                        DEFAULT START LAYOUT
                                                    </FieldLabel>
                                                    <Dropdown
                                                        // placeholder="Default Start Layout"
                                                        fluid
                                                        selection
                                                        options={
                                                            START_LAYOUT_OPTIONS
                                                        }
                                                        onChange={
                                                            this
                                                                .updateDefaultStartLayout
                                                        }
                                                        // value={
                                                        //     currentDefaultStartLayout.size > 0
                                                        //         ? currentDefaultStartLayout.get("id")
                                                        //         : null
                                                        // }
                                                        value={values.get(
                                                            "defaultStartLayout"
                                                        )}
                                                        error={
                                                            currentAttributeError ===
                                                            "defaultStartLayout"
                                                        }
                                                    />
                                                </LayoutEntryDropdownDiv>
                                                {Boolean(
                                                    // currentDefaultStartLayout
                                                    //     .get("media")
                                                    //     .get("path")
                                                    Boolean(
                                                        values.get(
                                                            "defaultStartLayout"
                                                        )
                                                    )
                                                ) && (
                                                    <LayoutEntryPreviewDiv>
                                                        <LayoutEntryPreviewImage
                                                            // src={currentDefaultStartLayout
                                                            //     .get("media")
                                                            //     .get("path")}
                                                            src={this.getLayoutMedia(
                                                                values.get(
                                                                    "defaultStartLayout"
                                                                )
                                                            )}
                                                            alt="layout preview"
                                                        />
                                                    </LayoutEntryPreviewDiv>
                                                )}
                                            </LayoutEntryContainerDiv>
                                            <LayoutEntryContainerDiv>
                                                <LayoutEntryDropdownDiv>
                                                    <FieldLabel>
                                                        DEFAULT HOME LAYOUT
                                                    </FieldLabel>
                                                    <Dropdown
                                                        //  placeholder="Default Home Layout"
                                                        fluid
                                                        selection
                                                        options={
                                                            HOME_LAYOUT_OPTIONS
                                                        }
                                                        onChange={
                                                            this
                                                                .updateDefaultHomeLayout
                                                        }
                                                        // value={
                                                        //     currentDefaultHomeLayout.size > 0
                                                        //         ? currentDefaultHomeLayout.get("id")
                                                        //         : null
                                                        // }
                                                        value={values.get(
                                                            "defaultHomeLayout"
                                                        )}
                                                        error={
                                                            currentAttributeError ===
                                                            "defaultHomeLayout"
                                                        }
                                                    />
                                                </LayoutEntryDropdownDiv>
                                                {Boolean(
                                                    // currentDefaultHomeLayout
                                                    //     .get("media")
                                                    //     .get("path")
                                                    values.get(
                                                        "defaultHomeLayout"
                                                    )
                                                ) && (
                                                    <LayoutEntryPreviewDiv>
                                                        <LayoutEntryPreviewImage
                                                            // src={currentDefaultHomeLayout
                                                            //     .get("media")
                                                            //     .get("path")}
                                                            src={this.getLayoutMedia(
                                                                values.get(
                                                                    "defaultHomeLayout"
                                                                )
                                                            )}
                                                            alt="layout preview"
                                                        />
                                                    </LayoutEntryPreviewDiv>
                                                )}
                                            </LayoutEntryContainerDiv>
                                            <LayoutEntryContainerDiv>
                                                <LayoutEntryDropdownDiv>
                                                    <FieldLabel>
                                                        DEFAULT DIRECTORY LIST
                                                        LAYOUT
                                                    </FieldLabel>
                                                    <Dropdown
                                                        //  placeholder="Default Directory List Layout"
                                                        fluid
                                                        selection
                                                        options={
                                                            LIST_LAYOUT_OPTIONS
                                                        }
                                                        onChange={
                                                            this
                                                                .updateDefaultDirListLayout
                                                        }
                                                        // value={
                                                        //     currentDefaultDirListLayout.size > 0
                                                        //         ? currentDefaultDirListLayout.get("id")
                                                        //         : null
                                                        // }
                                                        value={values.get(
                                                            "defaultDirListLayout"
                                                        )}
                                                        error={
                                                            currentAttributeError ===
                                                            "defaultDirListLayout"
                                                        }
                                                    />
                                                </LayoutEntryDropdownDiv>
                                                {Boolean(
                                                    // currentDefaultDirListLayout
                                                    //     .get("media")
                                                    //     .get("path")
                                                    values.get(
                                                        "defaultDirListLayout"
                                                    )
                                                ) && (
                                                    <LayoutEntryPreviewDiv>
                                                        <LayoutEntryPreviewImage
                                                            // src={currentDefaultDirListLayout
                                                            //     .get("media")
                                                            //     .get("path")}
                                                            src={this.getLayoutMedia(
                                                                values.get(
                                                                    "defaultDirListLayout"
                                                                )
                                                            )}
                                                            alt="layout preview"
                                                        />
                                                    </LayoutEntryPreviewDiv>
                                                )}
                                            </LayoutEntryContainerDiv>
                                            <LayoutEntryContainerDiv>
                                                <LayoutEntryDropdownDiv>
                                                    <FieldLabel>
                                                        DEFAULT DIRECTORY ENTRY
                                                        LAYOUT
                                                    </FieldLabel>
                                                    <Dropdown
                                                        //  placeholder="Default Directory Entry Layout"
                                                        fluid
                                                        selection
                                                        options={
                                                            ENTRY_LAYOUT_OPTIONS
                                                        }
                                                        onChange={
                                                            this
                                                                .updateDefaultDirEntryLayout
                                                        }
                                                        // value={
                                                        //     currentDefaultDirEntryLayout.size > 0
                                                        //         ? currentDefaultDirEntryLayout.get("id")
                                                        //         : null
                                                        // }
                                                        value={values.get(
                                                            "defaultDirEntryLayout"
                                                        )}
                                                        error={
                                                            currentAttributeError ===
                                                            "defaultDirEntryLayout"
                                                        }
                                                    />
                                                </LayoutEntryDropdownDiv>
                                                {Boolean(
                                                    // currentDefaultDirEntryLayout
                                                    //     .get("media")
                                                    //     .get("path")
                                                    values.get(
                                                        "defaultDirEntryLayout"
                                                    )
                                                ) && (
                                                    <LayoutEntryPreviewDiv>
                                                        <LayoutEntryPreviewImage
                                                            // src={currentDefaultDirEntryLayout
                                                            //     .get("media")
                                                            //     .get("path")}
                                                            src={this.getLayoutMedia(
                                                                values.get(
                                                                    "defaultDirEntryLayout"
                                                                )
                                                            )}
                                                            alt="layout preview"
                                                        />
                                                    </LayoutEntryPreviewDiv>
                                                )}
                                            </LayoutEntryContainerDiv>
                                        </SubSection>
                                        <div style={{ clear: "both" }} />

                                        <SectionDiv
                                            style={{
                                                width: "100%",
                                                height: "100px",
                                                border: "0px",
                                                padding: "0px",
                                                marginLeft: "4%"
                                            }}
                                        >
                                            <ContinueButtonContainer>
                                                <ContinueButton
                                                    variant="outlined"
                                                    component="span"
                                                    onClick={() =>
                                                        this.validateAndSubmitData(
                                                            createThemes
                                                        )
                                                    }
                                                >
                                                    CONFIRM & CONTINUE
                                                </ContinueButton>
                                            </ContinueButtonContainer>
                                        </SectionDiv>
                                    </LayoutContainerDiv>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <h1>
                                        No Systems Detected. Please create a
                                        system before you can set themes
                                    </h1>
                                    <Loading />
                                </React.Fragment>
                            )}
                        </ContainerDiv>
                    );
                }}
            </Mutation>
        );
    }
}

export default withStyles(styles)(SetupClientThemeAndLayout);
