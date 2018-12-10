import React, { PureComponent } from "react";
import {
    ContainerDiv,
    modifyCategoryDirectoryData
} from "../../utils/Constants";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import TreeView from "../../utils/TreeView";
import { getTabletCategoryByVenue } from "../../data/query";
import { Query } from "react-apollo";
import Loading from "../loading/Loading";

class TabletContent extends PureComponent {
    async componentDidMount() {
        const { data } = await this.props.client.query({
            query: getTabletCategoryByVenue()
        });
        console.log(data);
    }

    render() {
        const { history } = this.props;
        return (
            <Query query={getTabletCategoryByVenue()} fetchPolicy="no-cache">
                {({ loading, error, data }) => {
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error! ${error.message}`;
                    console.log(data);
                    const modifiedData = modifyCategoryDirectoryData(
                        data.tb_categories_by_venue
                    );
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
