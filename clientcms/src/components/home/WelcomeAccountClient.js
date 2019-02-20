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
import * as Yup from "yup";

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
    id: null,
    email: "",
    mobile: "",
    name: "",
    phone: "",
    title: ""
};

//Yup confirm password === password
//https://github.com/jaredpalmer/formik/issues/90#issuecomment-317804880
function equalTo(ref, msg) {
    return Yup.mixed().test({
        name: "equalTo",
        exclusive: false,
        message: msg || `${ref.path} must be the same as ${ref.reference}`,
        params: {
            reference: ref.path
        },
        test: function(value) {
            return value === this.resolve(ref);
        }
    });
}
Yup.addMethod(Yup.string, "equalTo", equalTo);

const requiredErrorMessage = "Required.";

const validationSchema = Yup.object().shape({
    name: Yup.string().required(requiredErrorMessage),
    full_company_name: Yup.string().required(requiredErrorMessage),
    nature_of_business: Yup.string().required(requiredErrorMessage),
    phone: Yup.string().required(requiredErrorMessage),
    email: Yup.string()
        .email("Wrong email format")
        .required(requiredErrorMessage),
    venue_address: Yup.string().required(requiredErrorMessage),
    postal_address: Yup.string().required(requiredErrorMessage),
    venue_city: Yup.string().required(requiredErrorMessage),
    venue_zip_code: Yup.string().required(requiredErrorMessage),
    postal_city: Yup.string().required(requiredErrorMessage),
    postal_zip_code: Yup.string().required(requiredErrorMessage),

    //Key user validation
    user_name: Yup.string().required(requiredErrorMessage),
    position: Yup.string().required(requiredErrorMessage),
    user_email: Yup.string()
        .email("Wrong email format")
        .required(requiredErrorMessage),
    first_phone_number: Yup.string().required(requiredErrorMessage),
    second_phone_number: Yup.string(),
    password: Yup.string(),
    confirm_password: Yup.string().equalTo(
        Yup.ref("password"),
        "Passwords must match"
    ),
    contacts: Yup.array().of(
        Yup.object().shape({
            email: Yup.string()
                .email("Wrong email format")
                .required(requiredErrorMessage),
            phone: Yup.string().required(requiredErrorMessage),
            name: Yup.string().required(requiredErrorMessage),
            title: Yup.string().required(requiredErrorMessage)
        })
    )
});

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
                        console.log("CONTACTS IS: ", contacts);
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
                                        return <React.Fragment />;
                                    if (errorMutation)
                                        return `Error ${errorMutation.message}`;
                                    return (
                                        <Formik
                                            validationSchema={validationSchema}
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
                                                password: null,
                                                contacts,
                                                deleteContacts: []
                                            }}
                                            onSubmit={(
                                                {
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
                                                    postal_state_id,
                                                    user_id,
                                                    user_name,
                                                    position,
                                                    user_email,
                                                    first_phone_number,
                                                    second_phone_number,
                                                    password,
                                                    contacts,
                                                    deleteContacts
                                                },
                                                { setSubmitting }
                                            ) => {
                                                setSubmitting(true);
                                                setLoading(true);

                                                const clientId = parseInt(
                                                    id,
                                                    DECIMAL_RADIX
                                                );

                                                const submitClient = {
                                                    id: clientId,
                                                    name,
                                                    full_company_name,
                                                    nature_of_business,
                                                    venue_address,
                                                    venue_city,
                                                    venue_zip_code,
                                                    venue_state_id: parseInt(
                                                        venue_state_id,
                                                        DECIMAL_RADIX
                                                    ),
                                                    postal_address,
                                                    postal_city,
                                                    postal_zip_code,
                                                    postal_state_id: parseInt(
                                                        postal_state_id,
                                                        DECIMAL_RADIX
                                                    ),
                                                    phone,
                                                    email
                                                };

                                                //https://stackoverflow.com/questions/47892127/succinct-concise-syntax-for-optional-object-keys-in-es6-es7
                                                const submitUser = {
                                                    id: parseInt(
                                                        user_id,
                                                        DECIMAL_RADIX
                                                    ),
                                                    name: user_name,
                                                    position,
                                                    email: user_email,
                                                    first_phone_number,
                                                    second_phone_number,
                                                    ...(Boolean(password) &&
                                                        password.length > 0 && {
                                                            password
                                                        })
                                                };

                                                const submitContacts = {
                                                    createContacts: contacts
                                                        .filter(
                                                            ({ id }) =>
                                                                !Boolean(id)
                                                        )
                                                        .map(
                                                            ({
                                                                id,
                                                                ...others
                                                            }) => ({
                                                                ...others,
                                                                clientId
                                                            })
                                                        ),
                                                    updateContacts: contacts
                                                        .filter(({ id }) =>
                                                            Boolean(id)
                                                        )
                                                        .map(
                                                            ({
                                                                id,
                                                                ...others
                                                            }) => ({
                                                                id: parseInt(
                                                                    id,
                                                                    DECIMAL_RADIX
                                                                ),
                                                                ...others
                                                            })
                                                        ),
                                                    deleteContacts: deleteContacts.slice(),
                                                    clientId
                                                };

                                                console.log(
                                                    "Submit Client: ",
                                                    submitClient
                                                );
                                                console.log(
                                                    "Submit User: ",
                                                    submitUser
                                                );
                                                console.log(
                                                    "Submit Contacts: ",
                                                    submitContacts
                                                );

                                                updateClient({
                                                    variables: {
                                                        input: submitClient
                                                    }
                                                }).then(() => {
                                                    console.log(
                                                        "CLIENT UPDATED "
                                                    );
                                                    updateUser({
                                                        variables: {
                                                            input: submitUser
                                                        }
                                                    }).then(() => {
                                                        console.log(
                                                            "USER UPDATED "
                                                        );
                                                        createUpdateDeleteContacts(
                                                            {
                                                                variables: {
                                                                    input: submitContacts
                                                                }
                                                            }
                                                        ).then(() => {
                                                            console.log(
                                                                "CONTACTS UPDATED "
                                                            );
                                                            window.location.reload();
                                                        });
                                                    });
                                                });
                                            }}
                                        >
                                            {({
                                                values: {
                                                    venue_country_id,
                                                    postal_country_id,
                                                    contacts,
                                                    deleteContacts
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
                                                                                                            "deleteContacts",
                                                                                                            [
                                                                                                                ...deleteContacts,
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
