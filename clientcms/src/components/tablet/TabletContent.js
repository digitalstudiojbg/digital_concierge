import React, { PureComponent } from "react";
import {
    ContainerDiv,
    modifyDirectoryListData,
    SYSTEM_MODIFY_DIRECTORY_LIST_URL
} from "../../utils/Constants";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import TreeView from "../../utils/TreeView";
import { getDirectoryListBySystem } from "../../data/query";
import { Query } from "react-apollo";
import Loading from "../loading/Loading";
import Button from "@material-ui/core/Button";

class TabletContent extends PureComponent {
    handleClick = () => {
        const { history, match } = this.props;
        const { params } = match || {};
        const { system_id = "" } = params || {};
        history.push(
            SYSTEM_MODIFY_DIRECTORY_LIST_URL.replace(":system_id", system_id)
        );
    };

    render() {
        const { history, match } = this.props;
        const { params } = match || {};
        const { system_id = "" } = params || {};
        return (
            <Query
                query={getDirectoryListBySystem}
                variables={{ id: system_id }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error! ${error.message}`;
                    console.log(data);
                    const modifiedData = modifyDirectoryListData(
                        data.directoryLists_by_system
                    );
                    console.log(modifiedData);

                    return (
                        <ContainerDiv>
                            <div
                                style={{
                                    fontSize: "2.7em"
                                }}
                            >
                                CONTENT
                            </div>
                            <div
                                style={{
                                    paddingTop: 20,
                                    fontSize: "1.2em"
                                }}
                            >
                                MANAGE YOUR CONTENT ALL IN ONE PLACE. USE THE
                                '+' AND '-' BUTTONS TO EXPAND AND COLLAPSE YOUR
                                CATEGORIES AND SUB-CATEGORIES. CLICK ON THE
                                TITLE TO EDIT.
                            </div>
                            {modifiedData.length > 0 ? (
                                <TreeView
                                    data={modifiedData}
                                    history={history}
                                />
                            ) : (
                                <div
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column"
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "2em",
                                            paddingBottom: 20,
                                            borderBottom: "2px solid black"
                                        }}
                                    >
                                        This is where the system content will
                                        display.
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "1.2em",
                                            paddingTop: 20
                                        }}
                                    >
                                        To get started add a directory list
                                        followed by a directory entry
                                    </div>
                                    <div
                                        style={{
                                            width: "30%",
                                            paddingTop: 50
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth={true}
                                            onClick={this.handleClick}
                                        >
                                            ADD DIRECTORY LIST
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </ContainerDiv>
                    );
                }}
            </Query>
        );
    }
}

export default withApollo(withRouter(TabletContent));
