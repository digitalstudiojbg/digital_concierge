import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

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
    width: 50%;
`;

const LayoutContainerDiv = styled.div`
    width: 30%;
    height: 100%;
`;

const initialSystemTheme = {
    companyLogo: null,
    headerFont: null,
    subHeaderFont: null,
    bodyFont: null,
    captionFont: null,
    defaultStartLayout: null,
    defaultHomeLayout: null,
    defaultDirListLayout: null,
    defaultDirEntryLayout: null
};

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

    state = {
        systemIndex: 0,
        updatedSystems: [{ ...initialSystemTheme }]
    };

    componentDidMount() {
        const { systems } = this.props;
        this.setState({
            updatedSystems: systems.map(_ => ({ ...initialSystemTheme }))
        });
    }

    handleTabChange = (_event, value) => {
        this.setState({ systemIndex: value });
    };

    updateCompanyLogo = () => {
        const { updatedSystems, systemIndex } = this.state;
        const updatedSystem = updatedSystems[systemIndex];
        this.setState({
            updatedSystems: [
                ...updatedSystems.slice(0, systemIndex),
                {
                    ...updatedSystem,
                    companyLogo: this.fileInput.current.files[0]
                },
                ...updatedSystems.slice(systemIndex + 1)
            ]
        });
    };

    render() {
        const { systemIndex, updatedSystems } = this.state;
        const { systems, classes } = this.props;
        const values = updatedSystems[systemIndex];
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
                                    Boolean(values.companyLogo) &&
                                    Boolean(values.companyLogo.name)
                                        ? values.companyLogo.name
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
                </ThemeContainerDiv>
            </ContainerDiv>
        );
    }
}

export default withStyles(styles)(SetupClientThemeAndLayout);
