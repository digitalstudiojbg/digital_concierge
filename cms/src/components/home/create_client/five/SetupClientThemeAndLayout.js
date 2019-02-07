import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Dropdown } from "semantic-ui-react";
import { Map, List, Repeat } from "immutable";
import ColorPicker from "rc-color-picker";
import FONT_OPTIONS from "./FontOptions";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const ThemeContainerDiv = styled.div`
    width: 70%;
    height: 100%;
    padding-bottom: 20px;
`;

const EntryThemeContainerDiv = styled.div`
    width: 50%;
    display: flex;
    padding-bottom: 10px;
`;

const EntryThemeDiv = styled.div`
    width: 45%;
    padding-right: 10px;
`;

const LayoutContainerDiv = styled.div`
    width: 30%;
    height: 100%;
`;

const LayoutEntryContainerDiv = styled.div`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
`;

const LayoutEntryDropdownDiv = styled.div`
    width: 70%;
    margin-right: 10px;
`;

const LayoutEntryPreviewDiv = styled.div`
    flex: 1;
    border: 1px solid black;
    margin: 5;
`;

const LayoutEntryPreviewImage = styled.img`
    width: 100%;
`;

const ColourEntryContainerDiv = styled.div`
    flex: 1;
    height: 100px;
    border: 1px solid black;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ColourEntryDiv = styled.div`
    width: 40px;
    height: 40px;
    border: 2px solid black;
    /* background-color: ${props =>
        Boolean(props.color) ? props.colour : "white"}; */
`;

const NUMBER_OF_COLOURS_PER_SYSTEM = 5;

const initialSystemTheme = Map({
    companyLogo: null,
    headerFont: null,
    subHeaderFont: null,
    bodyFont: null,
    captionFont: null,
    defaultStartLayout: Map(),
    defaultHomeLayout: Map(),
    defaultDirListLayout: Map(),
    defaultDirEntryLayout: Map(),
    coloursLength: NUMBER_OF_COLOURS_PER_SYSTEM,
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
        margin: theme.spacing.unit,
        color: "blue",
        border: "1px solid blue",
        width: "100%"
    }
});

class SetupClientThemeAndLayout extends React.Component {
    fileInput = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            systemIndex: 0,
            systemThemes: null
        };
        this.handleTabChange = this.handleTabChange.bind(this);
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

    handleTabChange = (_event, value) => {
        this.setState({
            systemIndex: value
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
        const layout = this.getLayoutItem(data.value);
        this.updateSystemTheme(
            "defaultStartLayout",
            Map({ ...layout, media: Map(layout.media) })
        );
    }

    updateDefaultHomeLayout(_event, data) {
        const layout = this.getLayoutItem(data.value);
        this.updateSystemTheme(
            "defaultHomeLayout",
            Map({ ...layout, media: Map(layout.media) })
        );
    }

    updateDefaultDirListLayout(_event, data) {
        const layout = this.getLayoutItem(data.value);
        this.updateSystemTheme(
            "defaultDirListLayout",
            Map({ ...layout, media: Map(layout.media) })
        );
    }

    updateDefaultDirEntryLayout(_event, data) {
        const layout = this.getLayoutItem(data.value);
        this.updateSystemTheme(
            "defaultDirEntryLayout",
            Map({ ...layout, media: Map(layout.media) })
        );
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

    getLayoutOptions = () => {
        const { layouts = [] } = this.props;
        return layouts.map(item => ({ text: item.name, value: item.id }));
    };

    getLayoutItem = layoutId => {
        const { layouts = [] } = this.props;
        return layouts.find(({ id }) => id === layoutId) || {};
    };

    render() {
        const { systemIndex, systemThemes } = this.state;
        const { systems, classes } = this.props;
        const values = Boolean(systemThemes)
            ? systemThemes.get(systemIndex)
            : Map();
        const colours = values.get("colours");
        const { id: systemId } = systems[systemIndex] || {};
        const LAYOUT_OPTIONS = this.getLayoutOptions();
        const currentDefaultStartLayout =
            values.get("defaultStartLayout") || Map();
        const currentDefaultHomeLayout =
            values.get("defaultHomeLayout") || Map();
        const currentDefaultDirListLayout =
            values.get("defaultDirListLayout") || Map();
        const currentDefaultDirEntryLayout =
            values.get("defaultDirEntryLayout") || Map();
        return (
            <ContainerDiv>
                <ThemeContainerDiv>
                    SYSTEMS
                    <div style={{ width: "75%", padding: 10 }}>
                        <AppBar position="static">
                            <Tabs
                                value={systemIndex}
                                onChange={this.handleTabChange}
                            >
                                {systems.map(({ id, name }, index) => (
                                    <Tab
                                        label={name}
                                        key={`TAB-${id}-${index}`}
                                    />
                                ))}
                            </Tabs>
                        </AppBar>
                    </div>
                    BRAND ASSETS
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
                                label="Company Logo"
                                variant="outlined"
                            />
                        </EntryThemeDiv>
                        <EntryThemeDiv>
                            <input
                                accept="image/*"
                                style={{ display: "none" }}
                                ref={this.fileInput}
                                onChange={this.updateCompanyLogo}
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
                    <EntryThemeContainerDiv>
                        <EntryThemeDiv>
                            HEADER FONT
                            <Dropdown
                                id="headerDropdown"
                                placeholder="Header Font"
                                fluid
                                selection
                                options={LAYOUT_OPTIONS}
                                onChange={this.updateHeaderFont}
                                value={values.get("headerFont")}
                            />
                        </EntryThemeDiv>
                        <EntryThemeDiv>
                            SUBHEADER FONT
                            <Dropdown
                                placeholder="Subheader Font"
                                fluid
                                selection
                                options={FONT_OPTIONS}
                                onChange={this.updateSubHeaderFont}
                                value={values.get("subHeaderFont")}
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
                                onChange={this.updateBodyCopyFont}
                                value={values.get("bodyFont")}
                            />
                        </EntryThemeDiv>
                        <EntryThemeDiv>
                            CAPTION COPY FONT
                            <Dropdown
                                placeholder="Caption Copy Font"
                                fluid
                                selection
                                options={FONT_OPTIONS}
                                onChange={this.updateCaptionCopyFont}
                                value={values.get("captionFont")}
                            />
                        </EntryThemeDiv>
                    </EntryThemeContainerDiv>
                    COLOUR THEME
                    <EntryThemeContainerDiv>
                        {Boolean(colours) &&
                            colours.map((colour, colourIndex) => (
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
                                        color={colour.get("hex")}
                                        alpha={colour.get("alpha")}
                                        placement="topLeft"
                                    >
                                        <ColourEntryDiv />
                                    </ColorPicker>
                                    <div>COLOUR #{colourIndex + 1}</div>
                                    <div>
                                        {colour.get("hex")}{" "}
                                        {colour.get("alpha")}%
                                    </div>
                                </ColourEntryContainerDiv>
                            ))}
                    </EntryThemeContainerDiv>
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
                                onChange={this.updateDefaultStartLayout}
                                value={currentDefaultStartLayout.get("id")}
                            />
                        </LayoutEntryDropdownDiv>
                        {Boolean(currentDefaultStartLayout.get("media")) &&
                            Boolean(
                                currentDefaultStartLayout
                                    .get("media")
                                    .get("path")
                            ) && (
                                <LayoutEntryPreviewDiv>
                                    <LayoutEntryPreviewImage
                                        src={currentDefaultStartLayout
                                            .get("media")
                                            .get("path")}
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
                                onChange={this.updateDefaultHomeLayout}
                                value={currentDefaultHomeLayout.get("id")}
                            />
                        </LayoutEntryDropdownDiv>
                        {Boolean(currentDefaultHomeLayout.get("media")) &&
                            Boolean(
                                currentDefaultHomeLayout
                                    .get("media")
                                    .get("path")
                            ) && (
                                <LayoutEntryPreviewDiv>
                                    <LayoutEntryPreviewImage
                                        src={currentDefaultHomeLayout
                                            .get("media")
                                            .get("path")}
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
                                onChange={this.updateDefaultDirListLayout}
                                value={currentDefaultDirListLayout.get("id")}
                            />
                        </LayoutEntryDropdownDiv>
                        {Boolean(currentDefaultDirListLayout.get("media")) &&
                            Boolean(
                                currentDefaultDirListLayout
                                    .get("media")
                                    .get("path")
                            ) && (
                                <LayoutEntryPreviewDiv>
                                    <LayoutEntryPreviewImage
                                        src={currentDefaultDirListLayout
                                            .get("media")
                                            .get("path")}
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
                                onChange={this.updateDefaultDirEntryLayout}
                                value={currentDefaultDirEntryLayout.get("id")}
                            />
                        </LayoutEntryDropdownDiv>
                        {Boolean(currentDefaultDirEntryLayout.get("media")) &&
                            Boolean(
                                currentDefaultDirEntryLayout
                                    .get("media")
                                    .get("path")
                            ) && (
                                <LayoutEntryPreviewDiv>
                                    <LayoutEntryPreviewImage
                                        src={currentDefaultDirEntryLayout
                                            .get("media")
                                            .get("path")}
                                        alt="layout preview"
                                    />
                                </LayoutEntryPreviewDiv>
                            )}
                    </LayoutEntryContainerDiv>
                </LayoutContainerDiv>
            </ContainerDiv>
        );
    }
}

export default withStyles(styles)(SetupClientThemeAndLayout);
