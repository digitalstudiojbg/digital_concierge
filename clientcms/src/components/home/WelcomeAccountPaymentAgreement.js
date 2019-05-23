import React from "react";
import { useState, useEffect } from "react";
import { compose, withApollo, graphql } from "react-apollo";
import { getContractByClientId } from "../../data/query";
// import { log } from "util";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputBase from "@material-ui/core/InputBase";

import {
    ContainerDiv,
    SectionDiv,
    TitleDiv,
    FieldLabel,
    SubSectionDiv,
    ContactEntryHeaderTitleDiv
} from "./WelcomeStyleSet";

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
    },
    myInput: {
        padding: "10px",
        backgroundColor: "white"
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
                    variant="outlined"
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
            <SubSectionDiv>
                <FieldLabel>LICENSE NUMBER</FieldLabel>
                <TextField
                    variant="outlined"
                    type="text"
                    id="standard-name"
                    //  label="LICENSE NUMBER"
                    value={license.key}
                    // margin="normal"
                    disabled={true}
                    fullWidth={true}
                />
            </SubSectionDiv>
            <SubSectionDiv>
                <FieldLabel>LICENSE TERM</FieldLabel>
                <TextField
                    style={{ margin: "0" }}
                    variant="outlined"
                    type="text"
                    id="standard-name"
                    //   label="LICENSE TERM"
                    value={license.licenseType.name}
                    margin="normal"
                    disabled={true}
                    fullWidth={true}
                />
            </SubSectionDiv>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%"
                }}
            >
                <SubSectionDiv style={{ width: "45%" }}>
                    <FieldLabel>LICENSE START DATE</FieldLabel>
                    <TextField
                        style={{ margin: "0" }}
                        variant="outlined"
                        type="text"
                        id="standard-name"
                        //  label="LICENSE START DATE"
                        value={dayjs(license.commence_date).format(
                            "YYYY-MM-DD"
                        )}
                        margin="normal"
                        disabled={true}
                        fullWidth={true}
                        input={
                            <InputBase style={{ border: "1px solid black" }} />
                        }
                    />
                </SubSectionDiv>

                <div
                    style={{ width: "10%", textAlign: "center", color: "grey" }}
                >
                    TO
                </div>
                <SubSectionDiv style={{ width: "45%" }}>
                    <FieldLabel>LICENSE END DATE</FieldLabel>
                    <TextField
                        style={{ margin: "0" }}
                        variant="outlined"
                        type="text"
                        id="standard-name"
                        //  label="LICENSE END DATE"
                        value={dayjs(license.expire_date).format("YYYY-MM-DD")}
                        margin="normal"
                        disabled={true}
                        fullWidth={true}
                    />
                </SubSectionDiv>
            </div>

            <FormControlLabel
                control={
                    <Checkbox
                        id="standard-name"
                        label="AUTOMATIC RENEWAL"
                        checked={license.auto_renewal}
                        margin="normal"
                        color="#2699FB"
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
                        //   justifyContent: "space-around",
                        justifyContent: "left"
                    }}
                >
                    <SectionDiv
                        style={{
                            width: "25%",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            backgroundColor: "white",
                            height: "70vh"
                        }}
                    >
                        <TitleDiv>Agreement</TitleDiv>

                        {renderAgreementFiled(contractsFromState)}

                        {renderLicenseField(
                            contractsFromState.client.activeLicense[0]
                        )}
                    </SectionDiv>
                    <SectionDiv
                        style={{
                            width: "25%",
                            backgroundColor: "white",
                            height: "70vh"
                        }}
                    >
                        <TitleDiv>Payment</TitleDiv>
                        <SubSectionDiv>
                            <FieldLabel>NAME</FieldLabel>
                            <TextField
                                style={{ margin: "0" }}
                                variant="outlined"
                                id="standard-name"
                                //  label="Name"
                                value={"123"}
                                margin="normal"
                                disabled={true}
                                fullWidth={true}
                                //  input={<OutlinedInput />}
                            />
                        </SubSectionDiv>
                    </SectionDiv>
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
