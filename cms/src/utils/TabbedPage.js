import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { ContainerDiv } from "./Constants";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const ContainerDivTab = styled.div`
    width: 100%;
    overflow-y: auto;
    height: 77vh;
`;
const TabContainer = props => {
    return <ContainerDiv>{props.children}</ContainerDiv>;
};

const styles = () => ({
    buttonSaveExit: {
        width: 150,
        position: "absolute",
        top: 100,
        right: 20,
        backgroundColor: "rgb(33,143,250)",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif"
    },
    buttonSaveKeep: {
        width: 150,
        position: "absolute",
        top: 140,
        right: 20,
        backgroundColor: "rgb(33,143,250)",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif"
    }
});

const lightGreyHeader = "rgb(247,247,247)";

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const TabbedPage = ({
    classes,
    title,
    data,
    onClickExit,
    onClickStay,
    tabs
}) => {
    const [tab, setTab] = useState(0);

    const handleChange = (_event, value) => {
        setTab(value);
    };

    const CurrentComponent = tabs[tab].component;
    const shouldRenderButtons = tabs[tab].withButtons;

    return (
        <div
            style={{
                width: "100%",
                backgroundColor: lightGreyHeader
            }}
        >
            <div
                style={{
                    height: 60,
                    fontSize: "2em",
                    fontWeight: 700,
                    paddingTop: 20,
                    paddingBottom: 20
                }}
            >
                {title}
            </div>
            <Paper
                square
                style={{
                    backgroundColor: lightGreyHeader,
                    boxShadow: "none",
                    borderBottom: "2px solid rgb(217,217,217)"
                }}
            >
                <Tabs
                    value={tab}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "rgb(57,154,249)"
                        }
                    }}
                    onChange={handleChange}
                >
                    {tabs.map(({ name }, index) => (
                        <Tab label={name} key={`TAB-${title}-${index}`} />
                    ))}
                </Tabs>
            </Paper>
            {onClickExit && onClickStay && shouldRenderButtons && (
                <React.Fragment>
                    <Button
                        variant="outlined"
                        className={classes.buttonSaveExit}
                        onClick={onClickExit}
                    >
                        SAVE & EXIT
                    </Button>
                    <Button
                        variant="outlined"
                        className={classes.buttonSaveKeep}
                        onClick={onClickStay}
                    >
                        SAVE & KEEP EDITING
                    </Button>
                </React.Fragment>
            )}
            <ContainerDivTab>
                <TabContainer>
                    <CurrentComponent data={data} />
                </TabContainer>
            </ContainerDivTab>
        </div>
    );
};

TabbedPage.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.any,
    onClickExit: PropTypes.func,
    onClickStay: PropTypes.func,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            component: PropTypes.any.isRequired,
            withButtons: PropTypes.bool.isRequired
        })
    )
};

export default withStyles(styles)(TabbedPage);
