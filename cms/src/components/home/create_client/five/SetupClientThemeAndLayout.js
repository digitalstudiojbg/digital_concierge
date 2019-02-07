import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Dropdown } from "semantic-ui-react";
import { Map, List } from "immutable";
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
`;

const EntryThemeDiv = styled.div`
    width: 45%;
    padding-right: 10px;
`;

const LayoutContainerDiv = styled.div`
    width: 30%;
    height: 100%;
`;

const initialSystemTheme = new Map({
    companyLogo: null,
    headerFont: null,
    subHeaderFont: null,
    bodyFont: null,
    captionFont: null,
    defaultStartLayout: null,
    defaultHomeLayout: null,
    defaultDirListLayout: null,
    defaultDirEntryLayout: null
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
        this.setState({ systemIndex: value });
    };

    updateCompanyLogo = () => {
        this.updateSystemTheme("companyLogo", this.fileInput.current.files[0]);
        // const { systemThemes, systemIndex } = this.state;
        // const toUpdate = systemThemes.get(systemIndex);
        // this.setState({
        //     systemThemes: systemThemes.set(
        //         systemIndex,
        //         toUpdate.set("companyLogo", this.fileInput.current.files[0])
        //     )
        // });
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

    render() {
        const { systemIndex, systemThemes } = this.state;
        const { systems, classes } = this.props;
        const values = Boolean(systemThemes)
            ? systemThemes.get(systemIndex)
            : Map();
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
                            Header Font
                            <Dropdown
                                id="headerDropdown"
                                placeholder="Header Font"
                                fluid
                                selection
                                options={FONT_OPTIONS}
                                onChange={this.updateHeaderFont}
                                value={values.get("headerFont")}
                            />
                        </EntryThemeDiv>
                        <EntryThemeDiv>
                            Subheader Font
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
                            Body Copy Font
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
                            Caption Copy Font
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
                </ThemeContainerDiv>
            </ContainerDiv>
        );
    }
}

export default withStyles(styles)(SetupClientThemeAndLayout);
