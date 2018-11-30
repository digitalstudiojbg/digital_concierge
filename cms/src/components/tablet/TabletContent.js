import React, { Component } from "react";
import { ContainerDiv } from "../../utils/Constants";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import TreeView from "../../utils/TreeView";

class TabletContent extends Component {
    render() {
        return (
            <ContainerDiv>
                <div style={{color: "rgb(113,116,152)", fontSize: "2.5vw"}}>
                    CONTENT
                </div>
                <div style={{color: "rgb(113,116,152)", fontSize: "1vw"}}>
                    MANAGE YOUR CONTENT ALL IN ONE PLACE. USE THE '+' AND '-' BUTTONS TO EXPAND AND COLLAPSE YOUR CATEGORIES AND SUB-CATEGORIES. CLICK ON THE TITLE TO EDIT.
                </div>
                <TreeView />
            </ContainerDiv>
        );
    }
}

export default withApollo(withRouter(TabletContent));