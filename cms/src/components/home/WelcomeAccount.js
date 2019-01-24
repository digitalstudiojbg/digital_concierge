import React from "react";
import styled from "styled-components";
import { Query, withApollo } from "react-apollo";
import Loading from "../loading/Loading";
import { getClientFromUser } from "../../data/query";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(244, 244, 244);
    padding-left: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const AccountEntryContainerDiv = styled.div`
    flex-basis: 30%;
    margin-right: 20px;
`;

const AccountEntryContactsContainerDiv = styled.div`
    flex-basis: 30%;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
`;

const AccountEntryContactContainerDiv = styled.div`
    margin-bottom: 10px;
`;

const AccountEntryTitleDiv = styled.div`
    display: flex;
    align-items: center;
`;

const AccountEntryTitleTextDiv = styled.div`
    width: 80%;
    font-weight: 700;
    color: black;
    font-size: 1.5em;
`;

const AccountEntryTitleButtonDiv = styled.div`
    width: 20%;
`;

const AccountEntryEntryDiv = styled.div`
    background-color: white;
    border: 2px solid black;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 10px;
`;

const EntryTitleDiv = styled.div`
    color: rgb(149, 149, 149);
    padding-bottom: 5px;
    font-size: 1.1em;
`;

const EntryValueDiv = styled.div`
    color: rgb(54, 54, 54);
    font-size: 1.1em;
    padding-bottom: 10px;
`;

const styles = () => ({
    updateButton: {
        background: "rgb(82, 82, 82)",
        color: "white",
        fontWeight: 700,
        borderRadius: 5
    }
});

class WelcomeAccount extends React.Component {
    state = {
        showModal: false,
        selected: ""
    };

    renderDetailInfo(key, title, value) {
        if (value.length === 0) {
            return <React.Fragment />;
        } else {
            return (
                <React.Fragment key={key}>
                    <EntryTitleDiv>{title}</EntryTitleDiv>
                    <EntryValueDiv>{value}</EntryValueDiv>
                </React.Fragment>
            );
        }
    }

    renderInfoSection(client) {
        const { classes } = this.props;
        const {
            name = "",
            full_company_name = "",
            nature_of_business = "",
            address = "",
            postal_address = "",
            phone = "",
            email = ""
        } = client;
        const toRender = [
            { title: "Business Trading Name", value: name },
            { title: "Full Company Name", value: full_company_name },
            { title: "Nature Of Business", value: nature_of_business },
            { title: "Business Location Address", value: address },
            { title: "Postal Address", value: postal_address },
            { title: "Phone Number", value: phone },
            { title: "Email Address", value: email }
        ];
        return (
            <AccountEntryContainerDiv>
                <AccountEntryTitleDiv>
                    <AccountEntryTitleTextDiv>
                        COMPANY INFORMATION
                    </AccountEntryTitleTextDiv>
                    <AccountEntryTitleButtonDiv>
                        <Button size="medium" className={classes.updateButton}>
                            UPDATE
                        </Button>
                    </AccountEntryTitleButtonDiv>
                </AccountEntryTitleDiv>
                <AccountEntryEntryDiv>
                    {toRender.map((item, index) => {
                        const { title, value } = item;
                        const key = `INFO-${index}`;
                        return this.renderDetailInfo(key, title, value);
                    })}
                </AccountEntryEntryDiv>
            </AccountEntryContainerDiv>
        );
    }

    renderContactSection(client) {
        const { classes } = this.props;
        const { contacts } = client;
        if (contacts.length === 0) {
            return <React.Fragment />;
        } else {
            return (
                <AccountEntryContactsContainerDiv>
                    {contacts.map((contact, index) => {
                        const {
                            id,
                            name = "",
                            title = "",
                            phone = "",
                            mobile = "",
                            email = ""
                        } = contact;
                        const toRender = [
                            { title: "Contact Name", value: name },
                            { title: "Title", value: title },
                            { title: "Phone Number", value: phone },
                            { title: "Mobile Number", value: mobile },
                            { title: "Email Address", value: email }
                        ];
                        return (
                            <AccountEntryContactContainerDiv>
                                <AccountEntryTitleDiv>
                                    <AccountEntryTitleTextDiv>
                                        CONTACT PERSON #{index + 1}
                                    </AccountEntryTitleTextDiv>
                                    <AccountEntryTitleButtonDiv>
                                        <Button
                                            size="medium"
                                            className={classes.updateButton}
                                        >
                                            UPDATE
                                        </Button>
                                    </AccountEntryTitleButtonDiv>
                                </AccountEntryTitleDiv>
                                <AccountEntryEntryDiv>
                                    {toRender.map((item, toRenderIndex) => {
                                        const { title, value } = item;
                                        const key = `CONTACT-${id}-${toRenderIndex}`;
                                        return this.renderDetailInfo(
                                            key,
                                            title,
                                            value
                                        );
                                    })}
                                </AccountEntryEntryDiv>
                            </AccountEntryContactContainerDiv>
                        );
                    })}
                </AccountEntryContactsContainerDiv>
            );
        }
    }

    renderContractSection(client) {
        const { classes } = this.props;
        const { active_contract } = client;
        if (!Boolean(active_contract)) {
            return <React.Fragment />;
        } else {
            const {
                number = "",
                file = "",
                package: packageName = ""
            } = active_contract;
            const toRender = [
                { title: "Contract Number", value: number },
                { title: "Package", value: packageName }
            ];
            return (
                <AccountEntryContainerDiv>
                    <AccountEntryTitleDiv>
                        <AccountEntryTitleTextDiv>
                            CONTRACT TERMS
                        </AccountEntryTitleTextDiv>
                        <AccountEntryTitleButtonDiv>
                            <Button
                                size="medium"
                                className={classes.updateButton}
                            >
                                UPDATE
                            </Button>
                        </AccountEntryTitleButtonDiv>
                    </AccountEntryTitleDiv>
                    <AccountEntryEntryDiv>
                        {toRender.map((item, index) => {
                            const { title, value } = item;
                            const key = `CONTRACT-${index}`;
                            return this.renderDetailInfo(key, title, value);
                        })}
                        {file.length > 0 && (
                            <Link to={file} style={{ fontSize: "1.1em" }}>
                                Download Contract File
                            </Link>
                        )}
                    </AccountEntryEntryDiv>
                </AccountEntryContainerDiv>
            );
        }
    }

    render() {
        return (
            <ContainerDiv>
                <Query query={getClientFromUser}>
                    {({ loading, error, data: { clientByUser: client } }) => {
                        console.log(client);
                        if (loading) return <Loading loadingData />;
                        if (error) return `Error! ${error.message}`;
                        return (
                            <React.Fragment>
                                {this.renderInfoSection(client)}
                                {this.renderContactSection(client)}
                                {this.renderContractSection(client)}
                            </React.Fragment>
                        );
                    }}
                </Query>
            </ContainerDiv>
        );
    }
}

export default withApollo(withStyles(styles)(WelcomeAccount));
