import React from "react";
import { useState, useEffect } from "react";
import { compose, withApollo, graphql, Query } from "react-apollo";
import { getContractByClientId } from "../../data/query";
import { log } from "util";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";
const useContracts = contract => {
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        (contract => {
            console.log("1");

            setContracts(contract);
        })(contract);
    }, [contract]);

    return contracts;
};

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    dense: {
        marginTop: 19
    },
    menu: {
        width: 200
    }
});

const AGREEMENT_FIELD = [
    {
        name: "number",
        label: "AGREEMENT NUMBER"
    },
    {
        name: "agreement_date",
        label: "AGREEMENT DATE"
    },
    {
        name: "renewal_date",
        label: "AGREEMENT RENEWAL DATE"
    },
    {
        name: "file_key",
        label: "FILE"
    }
];

const renderAgreementFiled = contractsFromState => {
    return AGREEMENT_FIELD.map((each, index) => {
        const key = Object.keys(contractsFromState).find(eachValue => {
            return eachValue === each.name;
        });

        return (
            key && (
                <TextField
                    key={index}
                    id="standard-name"
                    label={each.label}
                    value={contractsFromState[key]}
                    margin="normal"
                    disabled={true}
                    fullWidth={true}
                />
            )
        );
    });
};

const renderLicenseField = license => {
    console.log(license);

    return <h1>TEXT</h1>;
};

const WelcomeAccountPaymentAgreement = props => {
    const { getContractByClientId: { contract = {} } = {} } = props;

    const contractsFromState = useContracts(contract);

    console.log(contractsFromState);

    return (
        Object.keys(contractsFromState).length > 0 && (
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}
                >
                    <div
                        style={{
                            width: "50%",
                            paddingLeft: "20px",
                            paddingRight: "20px"
                        }}
                    >
                        <h1>Agreement</h1>

                        {renderAgreementFiled(contractsFromState)}

                        {renderLicenseField(
                            contractsFromState.client.activeLicense
                        )}
                    </div>
                    <div style={{ width: "50%" }}>
                        <h1>Payment</h1>
                        <TextField
                            id="standard-name"
                            label="Name"
                            value={"123"}
                            margin="normal"
                            disabled={true}
                            fullWidth={true}
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default compose(
    withApollo,
    withStyles(styles),
    graphql(getContractByClientId, {
        options: ownProps => ({
            variables: { id: 1 }
        }),
        name: "getContractByClientId"
    })
)(WelcomeAccountPaymentAgreement);

/*import React, { Component } from "react";
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
)(WelcomeAccountPaymentAgreement);*/
