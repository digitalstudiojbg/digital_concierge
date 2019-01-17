import React, { PureComponent } from "react";
import { ContainerDiv, modifyDirectoryListData } from "../../utils/Constants";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import TreeView from "../../utils/TreeView";
import { getDirectoryListBySystem } from "../../data/query";
import { Query } from "react-apollo";
import Loading from "../loading/Loading";

class TabletContent extends PureComponent {
    render() {
        const { history } = this.props;
        return (
            <Query query={getDirectoryListBySystem()}>
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
                                    fontSize: "1.2em"
                                }}
                            >
                                MANAGE YOUR CONTENT ALL IN ONE PLACE. USE THE
                                '+' AND '-' BUTTONS TO EXPAND AND COLLAPSE YOUR
                                CATEGORIES AND SUB-CATEGORIES. CLICK ON THE
                                TITLE TO EDIT.
                            </div>
                            <TreeView data={modifiedData} history={history} />
                        </ContainerDiv>
                    );
                }}
            </Query>
        );
    }
}

export default withApollo(withRouter(TabletContent));
