import React, { Component } from "react";
import { compose, withApollo, graphql, Query } from "react-apollo";
import { getContractByClientId } from "../../data/query";
import { log } from "util";
import Loading from "../loading/Loading";

class WelcomeAccountPaymentAgreement extends Component {
    state = {};

    render() {
        const {
            getContractByClientId: { contract = {} } = {},

            client
        } = this.props;
        console.log(this.props);

        console.log(contract);

        return <div>Agreement Payment</div>;
    }
}

export default compose(
    withApollo,
    graphql(getContractByClientId, {
        options: ownProps => ({
            variables: { id: 1 }
        }),
        name: "getContractByClientId"
    })
)(WelcomeAccountPaymentAgreement);
