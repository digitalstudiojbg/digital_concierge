import styled from "styled-components";
import React from "react";
import { withRouter } from "react-router-dom";
import {
    ContainerDiv,
    SYSTEM_MODIFY_START_URL,
    SYSTEM_MODIFY_HOME_URL,
    SYSTEM_CMS_CONTENT_URL,
    SYSTEM_CMS_PROMOTION,
    SYSTEM_CMS_LIBRARY
} from "../../../utils/Constants";
import { Tooltip, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";

const ContainerDivModified = styled(ContainerDiv)`
    padding-left: 50px;
    padding-right: 50px;
    background-color: #f7f7f7;
    height: 100vh;
`;

const SubContainerDiv = styled.div`
    padding-top: 20px;
    width: 80%;
    height: 80%;
    display: flex;
    flex-wrap: wrap;
`;

const EntryContainerDiv = styled.div`
    width: 30%;
    height: 40%;
    margin-right: 10px;
`;

const styles = () => ({
    infoIcon: {
        color: "rgb(38, 153, 251)"
    }
});

const entryStyles = () => ({
    buttonNavigate: {
        backgroundColor: "#2699FB",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif"
    }
});

const ContentEntryAfter = ({ classes, description, name, url, history }) => (
    <EntryContainerDiv>
        <div
            style={{
                width: "100%",
                height: "55%",
                backgroundColor: "#DDDDDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#A4AFB7"
            }}
        >
            Animated GIF
        </div>
        <div
            style={{
                width: "100%",
                height: "45%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                padding: 10
            }}
        >
            <span style={{ flexBasis: "75%", color: "#A4AFB7" }}>
                {description}
            </span>
            <div style={{ flexBasis: "20%" }}>
                <Button
                    variant="outlined"
                    className={classes.buttonNavigate}
                    onClick={() => history.push(url)}
                >
                    {name}
                </Button>
            </div>
        </div>
    </EntryContainerDiv>
);

const ContentEntry = withRouter(withStyles(entryStyles)(ContentEntryAfter));

const ENTRY_ITEMS = system_id => [
    {
        name: "WELCOME",
        description: "This is the first page on the system",
        url: SYSTEM_MODIFY_START_URL.replace(":system_id", system_id)
    },
    {
        name: "HOME",
        description:
            "This is the main page of the system. It allows users to navigate throughout the system.",
        url: SYSTEM_MODIFY_HOME_URL.replace(":system_id", system_id)
    },
    {
        name: "COMPENDIUM",
        description: "This is the core of the service directory.",
        url: SYSTEM_CMS_CONTENT_URL.replace(":system_id", system_id)
    },
    {
        name: "PROMOS",
        description:
            "Create welcome letters, promote events and schedule reminders to engage users.",
        url: SYSTEM_CMS_PROMOTION.replace(":system_id", system_id)
    },
    {
        name: "LIBRARY",
        description: "Upload images and videos to use when creating content.",
        url: SYSTEM_CMS_LIBRARY.replace(":system_id", system_id)
    }
];

export const CreateContent = ({
    classes,
    match: {
        params: { system_id }
    }
}) => (
    <ContainerDivModified>
        <div
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                paddingBottom: "2%",
                height: "10%",
                borderBottom: "1px solid #707070"
            }}
        >
            <div style={{ fontSize: "2em", marginRight: 10 }}>CONTENT</div>
            <Tooltip
                classes={{
                    tooltip: classes.tooltip
                }}
                title=" tincidunt, urna odio facilisis sapien, at aliquam massa turpis in ante. Praesent cursus venenatis erat, ac blandit velit. Duis eu ante faucibus, sollicitudin urna"
                placement="bottom"
            >
                <InfoIcon className={classes.infoIcon} fontSize="small" />
            </Tooltip>
        </div>
        <SubContainerDiv>
            {ENTRY_ITEMS(system_id).map(({ name, description, url }, index) => (
                <ContentEntry
                    key={`${name}-${index}`}
                    name={name}
                    description={description}
                    url={url}
                />
            ))}
        </SubContainerDiv>
    </ContainerDivModified>
);

export default withStyles(styles)(CreateContent);
