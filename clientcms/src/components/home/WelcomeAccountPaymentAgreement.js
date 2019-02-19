import React from "react";
import { useState, useEffect } from "react";
import { compose, withApollo, graphql, Query } from "react-apollo";
import { getContractByClientId } from "../../data/query";
import { log } from "util";
import { TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";
import dayjs from "dayjs";

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
        label: "AGREEMENT DATE",
        type: "date"
    },
    {
        name: "renewal_date",
        label: "AGREEMENT RENEWAL DATE",
        type: "date"
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
                    type={each.type === "date" ? "date" : "text"}
                    key={index}
                    id="standard-name"
                    label={each.label}
                    value={
                        each.type === "date"
                            ? dayjs(contractsFromState[key]).format(
                                  "YYYY-MM-DD"
                              )
                            : contractsFromState[key]
                    }
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

    return (
        <React.Fragment>
            <TextField
                type="text"
                id="standard-name"
                label="LICENSE NUMBER"
                value={license.key}
                margin="normal"
                disabled={true}
                fullWidth={true}
            />
            <TextField
                type="text"
                id="standard-name"
                label="LICENSE TERM"
                value={license.licenseType.name}
                margin="normal"
                disabled={true}
                fullWidth={true}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%"
                }}
            >
                <div style={{ width: "45%" }}>
                    <TextField
                        type="text"
                        id="standard-name"
                        label="LICENSE START DATE"
                        value={dayjs(license.commence_date).format(
                            "YYYY-MM-DD"
                        )}
                        margin="normal"
                        disabled={true}
                        fullWidth={true}
                    />
                </div>
                <div
                    style={{ width: "10%", textAlign: "center", color: "grey" }}
                >
                    TO
                </div>
                <div style={{ width: "45%" }}>
                    <TextField
                        type="text"
                        id="standard-name"
                        label="LICENSE END DATE"
                        value={dayjs(license.expire_date).format("YYYY-MM-DD")}
                        margin="normal"
                        disabled={true}
                        fullWidth={true}
                    />
                </div>
            </div>

            <FormControlLabel
                control={
                    <Checkbox
                        id="standard-name"
                        label="AUTOMATIC RENEWAL"
                        checked={license.auto_renewal}
                        margin="normal"
                        color="primary"
                    />
                }
                label="AUTOMATIC RENEWAL"
            />
        </React.Fragment>
    );
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
                            contractsFromState.client.activeLicense[0]
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
