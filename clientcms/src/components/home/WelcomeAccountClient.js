import React, { useState } from "react";
import styled from "styled-components";
import Loading from "../loading/Loading";
import { withApollo, Query, compose, Mutation, graphql } from "react-apollo";
import { Formik, Field, Form, FieldArray } from "formik";
import { TextField, Select } from "formik-material-ui";
import MuiTextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import { getCountryList, getClientDetail } from "../../data/query";
import { DECIMAL_RADIX } from "../../utils/Constants";
import {
    UPDATE_CLIENT,
    CREATE_UPDATE_DELETE_CONTACTS,
    UPDATE_USER
} from "../../data/mutation";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const SectionDiv = styled.div`
    width: ${props => props.width};
    height: 100%;
    padding: 10px;
    border: ${props => (props.noBorder ? "none" : "2px solid black")};
    margin-right: ${props => (Boolean(props.isLastSection) ? "0px" : "10px")};
`;

const TitleDiv = styled.div`
    font-size: 2em;
    font-weight: 700;
    padding-bottom: 20px;
`;

const ClientContainerDiv = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: ${props => (Boolean(props.isLastItem) ? "0px" : "20px")};
`;

const ClientFieldDiv = styled.div`
    flex-basis: ${props => props.flexBasis};
    margin-right: ${props => props.marginRight};
`;

const FieldContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FieldDiv = styled.div`
    width: 100%;
    padding: 0px 10px 10px 10px;
`;

const ContactEntryContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid black;
    margin-bottom: ${props => (Boolean(props.isLastItem) ? "0px" : "20px")};
    padding: 10px;
`;

const ContactEntryHeaderContainerDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

const ContactEntryHeaderTitleDiv = styled.div`
    font-size: 1.5em;
    font-weight: 700;
    padding-right: 5px;
`;

const CLIENT_TEXT_FIELDS = [
    [
        {
            name: "name",
            label: "Client Name",
            required: true,
            flexBasis: "30%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "full_company_name",
            label: "Full Client Name",
            required: false,
            flexBasis: "30%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "nature_of_business",
            label: "Nature of Business",
            required: true,
            flexBasis: "30%",
            marginRight: "0px",
            type: "text"
        }
    ],
    [
        {
            name: "phone",
            label: "Venue Phone Number",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "email",
            label: "Business Email",
            required: true,
            flexBasis: "45%",
            marginRight: "0px",
            type: "text"
        }
    ],
    [
        {
            name: "venue_address",
            label: "Venue Address",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "postal_address",
            label: "Postal Address",
            required: false,
            flexBasis: "45%",
            marginRight: "0px",
            type: "text"
        }
    ],
    [
        {
            name: "venue_city",
            label: "City",
            required: true,
            flexBasis: "20%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "venue_zip_code",
            label: "Zip Code",
            required: true,
            flexBasis: "20%",
            marginRight: "30px",
            type: "text"
        },
        {
            name: "postal_city",
            label: "City",
            required: true,
            flexBasis: "20%",
            marginRight: "10px",
            type: "text"
        },
        {
            name: "postal_zip_code",
            label: "Zip Code",
            required: true,
            flexBasis: "20%",
            marginRight: "0px",
            type: "text"
        }
    ]
];

const USER_TEXT_FIELDS = [
    {
        name: "user_name",
        label: "Key Contact / Administrator Name",
        required: true,
        type: "text"
    },
    {
        name: "position",
        label: "Key Contact / Administrator Position",
        required: true,
        type: "text"
    },
    {
        name: "user_email",
        label: "Contact Email",
        required: true,
        type: "text"
    },
    {
        name: "first_phone_number",
        label: "Contact Phone Number 1",
        required: true,
        type: "text"
    },
    {
        name: "second_phone_number",
        label: "Contact Phone Number 2",
        required: false,
        type: "text"
    },
    {
        name: "password",
        label: "Password",
        required: false,
        type: "password"
    },
    {
        name: "confirm_password",
        label: "Confirm Password",
        required: false,
        type: "password"
    }
];

const CONTACT_TEXT_FIELDS = [
    {
        name: "name",
        label: "Contact Name",
        required: true,
        type: "text"
    },
    {
        name: "title",
        label: "Contact Position",
        required: true,
        type: "text"
    },
    {
        name: "phone",
        label: "Contact Phone Number",
        required: true,
        type: "text"
    },
    {
        name: "mobile",
        label: "Contact Mobile Number",
        required: true,
        type: "text"
    },
    {
        name: "email",
        label: "Contact Email Address",
        required: true,
        type: "text"
    }
];

const styles = () => ({
    addContactButton: {
        color: "blue",
        border: "1px solid blue",
        width: "100%",
        marginBottom: 20
    }
});

const renderTextField = (name, label, required, type) => (
    <Field
        name={name}
        label={label}
        required={required}
        type={type}
        component={TextField}
        variant="outlined"
        fullWidth={true}
    />
);

const renderSelectField = (nameValue, label, optionList) => {
    // console.log(optionList);

    return (
        <React.Fragment>
            <InputLabel>{label}</InputLabel>
            <Field
                name={nameValue}
                component={Select}
                disabled={optionList.length < 1}
                fullWidth={true}
            >
                <MenuItem value="null" disabled>
                    {label}
                </MenuItem>
                {optionList.map(({ id, name }, index) => (
                    <MenuItem key={`ITEM-${name}-${id}-${index}`} value={id}>
                        {name}
                    </MenuItem>
                ))}
            </Field>
        </React.Fragment>
    );
};

const EMPTY_CONTACT = {
    email: "",
    mobile: "",
    name: "",
    phone: "",
    title: ""
};

export const WelcomeAccountClient = ({
    data: {
        id,
        name,
        full_company_name,
        nature_of_business,
        phone,
        email,
        venue_address,
        postal_address,
        venue_city,
        venue_zip_code,
        postal_city,
        postal_zip_code,
        venue_state: {
            id: venue_state_id,
            country: { id: venue_country_id }
        },
        postal_state: {
            id: postal_state_id,
            country: { id: postal_country_id }
        },
        key_user: {
            id: user_id,
            name: user_name,
            position,
            email: user_email,
            first_phone_number,
            second_phone_number
        },
        contacts: contactsOriginal
    },
    createUpdateDeleteContacts,
    updateUser,
    classes
}) => {
    const [loading, setLoading] = useState(false);

    return (
        <React.Fragment>
            {loading ? (
                <Loading loadingData />
            ) : (
                <Query query={getCountryList}>
                    {({ loading, error, data: { countries } }) => {
                        if (loading) return <Loading loadingData />;
                        if (error) return `Error! ${error.message}`;

                        const contacts = contactsOriginal.map(
                            ({ __typename, ...others }) => ({
                                ...others
                            })
                        );
                        // console.log("CONTACTS IS: ", contacts);
                        return (
                            <Mutation
                                mutation={UPDATE_CLIENT}
                                refetchQueries={[
                                    {
                                        query: getClientDetail,
                                        variables: { id }
                                    }
                                ]}
                            >
                                {(
                                    updateClient,
                                    {
                                        loading: loadingMutation,
                                        error: errorMutation
                                    }
                                ) => {
                                    if (loadingMutation)
                                        return <Loading loadingData />;
                                    if (errorMutation)
                                        return `Error ${errorMutation.message}`;
                                    return (
                                        <Formik
                                            initialValues={{
                                                name,
                                                full_company_name,
                                                nature_of_business,
                                                phone,
                                                email,
                                                venue_address,
                                                postal_address,
                                                venue_city,
                                                venue_zip_code,
                                                postal_city,
                                                postal_zip_code,
                                                venue_state_id,
                                                venue_country_id,
                                                postal_state_id,
                                                postal_country_id,
                                                user_id,
                                                user_name,
                                                position,
                                                user_email,
                                                first_phone_number,
                                                second_phone_number,
                                                contacts,
                                                deletedContacts: []
                                            }}
                                            onSubmit={(
                                                values,
                                                { setSubmitting }
                                            ) => {
                                                setSubmitting(true);
                                                // setLoading(true);
                                            }}
                                        >
                                            {({
                                                values: {
                                                    venue_country_id,
                                                    postal_country_id,
                                                    contacts,
                                                    deletedContacts
                                                },
                                                errors,
                                                isSubmitting,
                                                setFieldValue
                                            }) => {
                                                //Preparing the list of venue states
                                                const venue_country =
                                                    countries.find(
                                                        ({ id }) =>
                                                            id ===
                                                            venue_country_id
                                                    ) || {};
                                                const {
                                                    states: venue_states = []
                                                } = venue_country;

                                                //Preparing the list of postal states
                                                const postal_country =
                                                    countries.find(
                                                        ({ id }) =>
                                                            id ===
                                                            postal_country_id
                                                    ) || {};
                                                const {
                                                    states: postal_states = []
                                                } = postal_country;

                                                return (
                                                    <Form>
                                                        <ContainerDiv>
                                                            <SectionDiv width="50%">
                                                                <TitleDiv>
                                                                    CLIENT INFO
                                                                </TitleDiv>
                                                                <div
                                                                    style={{
                                                                        marginBottom: 20
                                                                    }}
                                                                >
                                                                    <MuiTextField
                                                                        label="CLIENT ID NUMBER"
                                                                        type="text"
                                                                        variant="outlined"
                                                                        value={
                                                                            id
                                                                        }
                                                                        disabled={
                                                                            true
                                                                        }
                                                                    />
                                                                </div>
                                                                {CLIENT_TEXT_FIELDS.map(
                                                                    (
                                                                        arrayFields,
                                                                        index
                                                                    ) => (
                                                                        <ClientContainerDiv
                                                                            key={`FIELD-CONTAINER-${index}`}
                                                                        >
                                                                            {arrayFields.map(
                                                                                (
                                                                                    {
                                                                                        name,
                                                                                        label,
                                                                                        required,
                                                                                        flexBasis,
                                                                                        marginRight,
                                                                                        type
                                                                                    },
                                                                                    fieldIndex
                                                                                ) => (
                                                                                    <ClientFieldDiv
                                                                                        key={`CLIENT-FIELD=${index}-${fieldIndex}`}
                                                                                        flexBasis={
                                                                                            flexBasis
                                                                                        }
                                                                                        marginRight={
                                                                                            marginRight
                                                                                        }
                                                                                    >
                                                                                        {renderTextField(
                                                                                            name,
                                                                                            label,
                                                                                            required,
                                                                                            type
                                                                                        )}
                                                                                    </ClientFieldDiv>
                                                                                )
                                                                            )}
                                                                        </ClientContainerDiv>
                                                                    )
                                                                )}
                                                                <ClientContainerDiv>
                                                                    <ClientFieldDiv
                                                                        flexBasis="45%"
                                                                        marginRight="10px"
                                                                    >
                                                                        {renderSelectField(
                                                                            "venue_state_id",
                                                                            "STATE / PROVINCE (IF APPLICABLE)",
                                                                            venue_states
                                                                        )}
                                                                    </ClientFieldDiv>
                                                                    <ClientFieldDiv
                                                                        flexBasis="45%"
                                                                        marginRight="0px"
                                                                    >
                                                                        {renderSelectField(
                                                                            "postal_state_id",
                                                                            "STATE / PROVINCE (IF APPLICABLE)",
                                                                            postal_states
                                                                        )}
                                                                    </ClientFieldDiv>
                                                                </ClientContainerDiv>
                                                                <ClientContainerDiv>
                                                                    <ClientFieldDiv
                                                                        flexBasis="45%"
                                                                        marginRight="10px"
                                                                    >
                                                                        {renderSelectField(
                                                                            "venue_country_id",
                                                                            "COUNTRIES",
                                                                            countries
                                                                        )}
                                                                    </ClientFieldDiv>
                                                                    <ClientFieldDiv
                                                                        flexBasis="45%"
                                                                        marginRight="0px"
                                                                    >
                                                                        {renderSelectField(
                                                                            "postal_country_id",
                                                                            "COUNTRIES",
                                                                            countries
                                                                        )}
                                                                    </ClientFieldDiv>
                                                                </ClientContainerDiv>
                                                            </SectionDiv>
                                                            <SectionDiv width="25%">
                                                                <TitleDiv>
                                                                    KEY USER
                                                                </TitleDiv>
                                                                <FieldContainerDiv>
                                                                    {USER_TEXT_FIELDS.map(
                                                                        (
                                                                            {
                                                                                name,
                                                                                label,
                                                                                required,
                                                                                type
                                                                            },
                                                                            index
                                                                        ) => (
                                                                            <FieldDiv
                                                                                key={`USER-FIELD-${index}`}
                                                                            >
                                                                                {renderTextField(
                                                                                    name,
                                                                                    label,
                                                                                    required,
                                                                                    type
                                                                                )}
                                                                            </FieldDiv>
                                                                        )
                                                                    )}
                                                                </FieldContainerDiv>
                                                            </SectionDiv>
                                                            <SectionDiv
                                                                width="25%"
                                                                isLastSection
                                                                noBorder
                                                            >
                                                                <FieldArray
                                                                    name="contacts"
                                                                    render={({
                                                                        push,
                                                                        remove
                                                                    }) => (
                                                                        <div
                                                                            style={{
                                                                                width:
                                                                                    "100%"
                                                                            }}
                                                                        >
                                                                            <Button
                                                                                variant="outlined"
                                                                                className={
                                                                                    classes.addContactButton
                                                                                }
                                                                                onClick={() => {
                                                                                    push(
                                                                                        {
                                                                                            ...EMPTY_CONTACT
                                                                                        }
                                                                                    );
                                                                                }}
                                                                                disabled={
                                                                                    isSubmitting
                                                                                }
                                                                            >
                                                                                ADD
                                                                                ADDITIONAL
                                                                                CONTACT
                                                                            </Button>
                                                                            {contacts.map(
                                                                                (
                                                                                    contact,
                                                                                    contactIndex
                                                                                ) => (
                                                                                    <ContactEntryContainerDiv
                                                                                        key={`CONTACT-FIELD-${contactIndex}`}
                                                                                    >
                                                                                        <ContactEntryHeaderContainerDiv>
                                                                                            <ContactEntryHeaderTitleDiv>
                                                                                                CONTACT
                                                                                                #
                                                                                                {contactIndex +
                                                                                                    1}
                                                                                            </ContactEntryHeaderTitleDiv>
                                                                                            <IconButton
                                                                                                aria-label="Delete"
                                                                                                disabled={
                                                                                                    isSubmitting
                                                                                                }
                                                                                                onClick={() => {
                                                                                                    if (
                                                                                                        Boolean(
                                                                                                            contact.id
                                                                                                        )
                                                                                                    ) {
                                                                                                        setFieldValue(
                                                                                                            "deletedContacts",
                                                                                                            [
                                                                                                                ...deletedContacts,
                                                                                                                parseInt(
                                                                                                                    contact.id,
                                                                                                                    DECIMAL_RADIX
                                                                                                                )
                                                                                                            ],
                                                                                                            false
                                                                                                        );
                                                                                                    }
                                                                                                    remove(
                                                                                                        contactIndex
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <DeleteIcon fontSize="large" />
                                                                                            </IconButton>
                                                                                        </ContactEntryHeaderContainerDiv>
                                                                                        {CONTACT_TEXT_FIELDS.map(
                                                                                            (
                                                                                                {
                                                                                                    name,
                                                                                                    label,
                                                                                                    required,
                                                                                                    type
                                                                                                },
                                                                                                contactFieldIndex
                                                                                            ) => (
                                                                                                <FieldDiv
                                                                                                    key={`CONTACT-FIELD-${contactIndex}-${name}-${contactFieldIndex}`}
                                                                                                >
                                                                                                    {renderTextField(
                                                                                                        `contacts[${contactIndex}].${name}`,
                                                                                                        label,
                                                                                                        required,
                                                                                                        type
                                                                                                    )}
                                                                                                </FieldDiv>
                                                                                            )
                                                                                        )}
                                                                                    </ContactEntryContainerDiv>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                />
                                                                <Button
                                                                    type="submit"
                                                                    variant="outlined"
                                                                    className={
                                                                        classes.addContactButton
                                                                    }
                                                                    disabled={
                                                                        isSubmitting
                                                                    }
                                                                >
                                                                    UPDATE &
                                                                    SAVE
                                                                </Button>
                                                            </SectionDiv>
                                                        </ContainerDiv>
                                                    </Form>
                                                );
                                            }}
                                        </Formik>
                                    );
                                }}
                            </Mutation>
                        );
                    }}
                </Query>
            )}
        </React.Fragment>
    );
};

export default compose(
    withApollo,
    withStyles(styles),
    graphql(CREATE_UPDATE_DELETE_CONTACTS, {
        name: "createUpdateDeleteContacts"
    }),
    graphql(UPDATE_USER, { name: "updateUser" })
)(WelcomeAccountClient);
