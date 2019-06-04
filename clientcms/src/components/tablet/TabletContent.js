import React from "react";
import {
    ContainerDiv,
    modifyDirectoryListData,
    SYSTEM_MODIFY_DIRECTORY_LIST_URL
} from "../../utils/Constants";
import { withRouter } from "react-router";
import TreeView from "../../utils/TreeView";
import { getDirectoryListBySystem } from "../../data/query";
import { Query } from "react-apollo";
import Loading from "../loading/Loading";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import {
    PageHeader,
    SubSectionTop,
    SubSectionDiv
} from "../home/WelcomeStyleSet";

const styles = () => ({
    infoIcon: {
        color: "rgb(38, 153, 251)"
    },
    tooltip: {
        fontSize: "1em"
    }
});

const TabletContent = ({ history, match, classes }) => {
    const { params } = match || {};
    const { system_id = "" } = params || {};
    const handleClick = () => {
        history.push(
            SYSTEM_MODIFY_DIRECTORY_LIST_URL.replace(":system_id", system_id)
        );
    };
    return (
        <Query query={getDirectoryListBySystem} variables={{ id: system_id }}>
            {({ loading, error, data }) => {
                if (loading) return <Loading loadingData />;
                if (error) return `Error! ${error.message}`;
                console.log(data);
                const modifiedData = modifyDirectoryListData(
                    data.directoryLists_by_system,
                    true
                );
                console.log(modifiedData);

                return (
                    <ContainerDiv style={{ padding: "3%" }}>
                        <SubSectionTop>
                            <PageHeader>System Content: Directories</PageHeader>
                            <div style={{ paddingLeft: 10 }}>
                                <Tooltip
                                    classes={{ tooltip: classes.tooltip }}
                                    title="Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Donec et nunc
                                    blandit, ultrices enim sed, euismod neque.
                                    Curabitur varius, odio in malesuada
                                    tincidunt, urna odio facilisis sapien, at
                                    aliquam massa turpis in ante. Praesent
                                    cursus venenatis erat, ac blandit velit.
                                    Duis eu ante faucibus, sollicitudin urna
                                    accumsan, porttitor ipsum. Sed venenatis
                                    iaculis arcu non interdum. Proin bibendum
                                    elementum mollis. Curabitur tincidunt eu sem
                                    vel feugiat. Donec velit diam, condimentum
                                    pharetra malesuada in, tempus quis lacus.
                                    Vivamus odio quam, mollis vestibulum cursus
                                    scelerisque, bibendum ut sapien. Proin
                                    dignissim lorem eget quam pulvinar varius.
                                    Etiam convallis pellentesque elit ac
                                    dignissim. Etiam vel cursus massa."
                                    placement="bottom"
                                >
                                    <InfoIcon
                                        className={classes.infoIcon}
                                        fontSize="small"
                                    />
                                </Tooltip>
                            </div>
                        </SubSectionTop>
                        {modifiedData.length > 0 ? (
                            <TreeView data={modifiedData} history={history} />
                        ) : (
                            <SubSectionDiv
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    border: "1px solid #9D9D9D",
                                    borderRadius: "5px",
                                    padding: "200px 0"
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "2em",
                                        paddingBottom: 40,
                                        borderBottom: "2px solid #707070"
                                    }}
                                >
                                    This is where the system content will
                                    display.
                                </div>
                                <div
                                    style={{
                                        fontSize: "1.2em",
                                        paddingTop: 40
                                    }}
                                >
                                    To get started add a directory list followed
                                    by a directory entry
                                </div>
                                <div
                                    style={{
                                        width: "20%",
                                        paddingTop: 80
                                    }}
                                >
                                    <Button
                                        style={{
                                            color: "white",
                                            backgroundColor: "#2699FB",
                                            padding: "10px 0"
                                        }}
                                        variant="contained"
                                        fullWidth={true}
                                        onClick={handleClick}
                                    >
                                        ADD DIRECTORY LIST
                                    </Button>
                                </div>
                            </SubSectionDiv>
                        )}
                    </ContainerDiv>
                );
            }}
        </Query>
    );
};

export default withRouter(withStyles(styles)(TabletContent));
