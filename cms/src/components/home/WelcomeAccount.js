import React from "react";
import styled from "styled-components";
import { Query, withApollo } from "react-apollo";
import Loading from "../loading/Loading";
import { getClientFromUser } from "../../data/query";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "../../utils/DialogTitleHelper";
import Slide from "@material-ui/core/Slide";
import UpdateInfo from "./account_modals/UpdateInfo";
import UpdateContact from "./account_modals/UpdateContact";
import UpdateContract from "./account_modals/UpdateContract";
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";

const extended_day_js = dayjs.extend(AdvancedFormat);

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
    margin-bottom: 10px;
`;

const AccountEntryTitleTextDiv = styled.div`
    width: 80%;
    font-weight: 700;
    color: black;
    font-size: 1.5em;
`;

const AccountEntryTitleButtonDiv = styled.div`
    width: 20%;
    display: flex;
    flex-direction: row-reverse;
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

const styles = theme => ({
    updateButton: {
        background: "rgb(82, 82, 82)",
        color: "white",
        fontWeight: 700,
        borderRadius: 5
    },
    addButton: {
        color: "white",
        background: "rgb(82, 82, 82)",
        borderRadius: 5,
        padding: theme.spacing.unit * 0.2
    },
    icon: {
        fontSize: "large",
        width: 30,
        height: 30
    },
    dialogTitle: {
        width: "100%",
        display: "flex",
        alignItems: "center"
    }
});

const SlideUpTransition = props => <Slide direction="up" {...props} />;

class WelcomeAccount extends React.Component {
    state = {
        showModal: false,
        selected: "",
        selectedContact: null
    };

    modal_settings = {
        info: { title: "Update Company Information", component: UpdateInfo },
        contact: { title: "Update Contact", component: UpdateContact },
        addContact: { title: "Add New Contact", component: UpdateContact },
        contract: { title: "Update Contract", component: UpdateContract }
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

    openModal(selected) {
        this.setState({ showModal: true, selected });
    }

    openModalUpdateContact(selected, selectedContact) {
        this.setState({ showModal: true, selected, selectedContact });
    }

    closeModal() {
        this.setState({
            showModal: false,
            selected: "",
            selectedContact: null
        });
    }

    renderInfoSection(client) {
        const { classes } = this.props;
        const {
            name = "",
            full_company_name = "",
            nature_of_business = "",
            venue_address = "",
            postal_address = "",
            phone = "",
            email = ""
        } = client;
        const toRender = [
            { title: "Business Trading Name", value: name },
            { title: "Full Company Name", value: full_company_name },
            { title: "Nature Of Business", value: nature_of_business },
            { title: "Business Location Address", value: venue_address },
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
                        <Button
                            size="medium"
                            className={classes.updateButton}
                            onClick={this.openModal.bind(this, "info")}
                        >
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
                            <AccountEntryContactContainerDiv
                                key={`CONTACT-${id}`}
                            >
                                <AccountEntryTitleDiv>
                                    <AccountEntryTitleTextDiv>
                                        CONTACT PERSON #{index + 1}
                                    </AccountEntryTitleTextDiv>
                                    <AccountEntryTitleButtonDiv>
                                        <Button
                                            size="medium"
                                            className={classes.updateButton}
                                            onClick={this.openModalUpdateContact.bind(
                                                this,
                                                "contact",
                                                contact
                                            )}
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
                    <AccountEntryTitleDiv>
                        <AccountEntryTitleTextDiv>
                            CONTACT PERSON #{contacts.length + 1}
                        </AccountEntryTitleTextDiv>
                        <AccountEntryTitleButtonDiv>
                            <IconButton
                                className={classes.addButton}
                                onClick={this.openModal.bind(
                                    this,
                                    "addContact"
                                )}
                            >
                                <AddIcon className={classes.icon} />
                            </IconButton>
                        </AccountEntryTitleButtonDiv>
                    </AccountEntryTitleDiv>
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
                package: packageName = "",
                term_month = "",
                renewal_date = "",
                annual_fee = ""
            } = active_contract;
            const toRender = [
                { title: "Contract Number", value: number },
                { title: "Package", value: packageName },
                { title: "Contract Term", value: term_month },
                {
                    title: "Renewal Date",
                    value: extended_day_js(renewal_date).format("Do MMMM YYYY")
                },
                { title: " Annual Fee", value: annual_fee }
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
                                onClick={this.openModal.bind(this, "contract")}
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
                            <a
                                href={file}
                                style={{ fontSize: "1.1em" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download Contract File
                            </a>
                        )}
                    </AccountEntryEntryDiv>
                </AccountEntryContainerDiv>
            );
        }
    }

    getClientDataFromKey(key, client) {
        const {
            name = "",
            full_company_name = "",
            nature_of_business = "",
            venue_address: address = "",
            postal_address = "",
            phone = "",
            email = "",
            active_contract = {},
            contracts = []
        } = client;
        switch (key) {
            case "info":
                return {
                    name,
                    full_company_name,
                    nature_of_business,
                    address,
                    postal_address,
                    phone,
                    email
                };
            case "contact":
                const { selectedContact } = this.state;
                return { ...selectedContact, is_edit: true };
            case "addContact":
                return { is_edit: false };
            case "contract":
                const {
                    id = "",
                    package: packageName,
                    ...others
                } = active_contract;
                const past_contracts = contracts.filter(
                    contract => contract.id !== id && !contract.active
                );
                return {
                    active_contract: { ...others, id, packageName },
                    past_contracts: past_contracts.map(
                        ({ package: packageName, ...others }) => ({
                            ...others,
                            packageName
                        })
                    )
                };
            default:
                return client;
        }
    }

    renderDialog(client) {
        const { showModal, selected: key } = this.state;
        const { title = "", component: ModalContentComponent = null } =
            this.modal_settings[key] || {};
        const data = this.getClientDataFromKey(key, client);
        return (
            <Dialog
                open={showModal}
                TransitionComponent={SlideUpTransition}
                keepMounted
                onClose={this.closeModal.bind(this)}
                fullWidth={true}
            >
                <DialogTitle onClose={this.closeModal.bind(this)}>
                    <div style={{ fontSize: "1.5em", marginBottom: 30 }}>
                        {title}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-slide-description"
                        component="div"
                    >
                        {ModalContentComponent && (
                            <ModalContentComponent data={data} />
                        )}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }

    render() {
        return (
            <Query query={getClientFromUser}>
                {({ loading, error, data: { clientByUser: client } }) => {
                    console.log(client);
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error! ${error.message}`;
                    return (
                        <React.Fragment>
                            <ContainerDiv>
                                {this.renderInfoSection(client)}
                                {this.renderContactSection(client)}
                                {this.renderContractSection(client)}
                            </ContainerDiv>
                            {this.renderDialog(client)}
                        </React.Fragment>
                    );
                }}
            </Query>
        );
    }
}

export default withApollo(withStyles(styles)(WelcomeAccount));
