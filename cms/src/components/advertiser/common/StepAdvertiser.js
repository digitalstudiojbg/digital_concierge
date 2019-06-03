import React from "react";
import { Query, Mutation } from "react-apollo";
import { getCountryList } from "../../../data/query";
import Loading from "../../loading/Loading";
import {
    getAdvertiserDetail,
    getAdvertiserFromPublication
} from "../../../data/query/advertiser";
import { CREATE_ADVERTISER, EDIT_ADVERTISER } from "../../../data/mutation";
import styled from "styled-components";
import { Formik, Form, Field, FieldArray } from "formik";
import { TextField, Select } from "formik-material-ui";
import { OutlinedInput, MenuItem, Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";
import { ADVERTISER_MAIN_URL } from "../../../utils/Constants";
import StepContractValidationSchema from "./StepContractValidationSchema";
import {
    ContainerDiv,
    SectionDiv,
    SectionTitleDiv,
    FormLabelDiv,
    ContinueButton
} from "./commonStyle";

const StepAdvertiserHOC = ({
    has_data,
    advertiserId,
    next,
    onRef,
    push,
    pubId
}) => (
    <Query query={getCountryList}>
        {({
            loading: loadingCountry,
            error: errorCountry,
            data: { countries }
        }) => {
            if (loadingCountry) return <Loading loadingData />;
            if (errorCountry)
                return (
                    <React.Fragment>
                        Error retrieving country list: {errorCountry.message}
                    </React.Fragment>
                );
            if (has_data) {
                //EDIT Advertiser
                return (
                    <Query
                        query={getAdvertiserDetail}
                        variables={{ id: advertiserId }}
                    >
                        {({
                            loading: loadingAdvertiser,
                            error: errorAdvertiser,
                            data: { advertiser }
                        }) => {
                            if (loadingAdvertiser)
                                return <Loading loadingData />;
                            if (errorAdvertiser)
                                return (
                                    <React.Fragment>
                                        Error retrieving Advertiser Detail for
                                        ID: {advertiserId}:{" "}
                                        {errorAdvertiser.message}
                                    </React.Fragment>
                                );
                            return (
                                <Mutation
                                    mutation={EDIT_ADVERTISER}
                                    refetchQueries={[
                                        {
                                            query: getAdvertiserFromPublication,
                                            variables: { id: pubId }
                                        }
                                    ]}
                                >
                                    {(
                                        action,
                                        {
                                            loading: loadingEdit,
                                            error: errorEdit
                                        }
                                    ) => {
                                        if (loadingEdit)
                                            return <Loading loadingData />;
                                        if (errorEdit)
                                            return (
                                                <React.Fragment>
                                                    Error in edit!{" "}
                                                    {errorEdit.message}
                                                </React.Fragment>
                                            );
                                        return (
                                            <StepAdvertiserWithStyles
                                                data={advertiser}
                                                has_data={true}
                                                next={next}
                                                action={action}
                                                countries={countries}
                                                onRef={onRef}
                                                push={push}
                                            />
                                        );
                                    }}
                                </Mutation>
                            );
                        }}
                    </Query>
                );
            } else {
                //CREATE Advertiser
                return (
                    <Mutation mutation={CREATE_ADVERTISER}>
                        {(
                            action,
                            { loading: loadingCreate, error: errorCreate }
                        ) => {
                            if (loadingCreate) return <Loading loadingData />;
                            if (errorCreate)
                                return (
                                    <React.Fragment>
                                        Error in edit! {errorCreate.message}
                                    </React.Fragment>
                                );
                            return (
                                <StepAdvertiserWithStyles
                                    has_data={false}
                                    next={next}
                                    action={action}
                                    countries={countries}
                                    onRef={onRef}
                                    push={push}
                                    pubId={pubId}
                                />
                            );
                        }}
                    </Mutation>
                );
            }
        }}
    </Query>
);

const renderTextField = (name, label, required) => (
    <div style={{ width: "100%" }}>
        <FormLabelDiv>{label}</FormLabelDiv>
        <Field
            name={name}
            required={required}
            type="text"
            component={TextField}
            variant="outlined"
            fullWidth={true}
        />
    </div>
);

const renderSelectField = (name, label, optionValues, errors) => (
    <div style={{ width: "100%" }}>
        <FormLabelDiv>{label}</FormLabelDiv>
        <Field
            name={name}
            component={Select}
            disabled={optionValues.length < 1}
            fullWidth={true}
            input={
                <OutlinedInput
                    labelWidth={0}
                    name={name}
                    error={!isEmpty(errors) && errors[name]}
                />
            }
        >
            {optionValues.map(({ id, name }, index) => (
                <MenuItem key={`ITEM-${name}-${id}-${index}`} value={id}>
                    {name}
                </MenuItem>
            ))}
        </Field>
    </div>
);

const CLIENT_FIELDS = [
    [
        {
            name: "name",
            label: "Advertiser Name",
            required: true,
            paddingRight: "10px"
        },
        {
            name: "nature_of_business",
            label: "Nature of Business",
            required: true,
            paddingRight: "0px"
        }
    ],
    [
        {
            name: "phone",
            label: "Venue Phone Number",
            required: true,
            paddingRight: "10px"
        },
        {
            name: "email",
            label: "Business Email",
            required: true,
            paddingRight: "0px"
        }
    ]
];

const CLIENT_ADDRESS_FIELDS = [
    [
        {
            name: "address",
            label: "Address",
            required: true,
            paddingRight: "0px"
        }
    ],
    [
        {
            name: "city",
            label: "City",
            required: true,
            paddingRight: "10px"
        },
        {
            name: "zip_code",
            label: "Zip Code",
            required: true,
            paddingRight: "0px"
        }
    ]
];

const CLIENT_POSTAL_FIELDS = [
    [
        {
            name: "postal_address",
            label: "Postal Address",
            required: false,
            paddingRight: "0px"
        }
    ],
    [
        {
            name: "postal_city",
            label: "City",
            required: true,
            paddingRight: "10px"
        },
        {
            name: "postal_zip_code",
            label: "Zip Code",
            required: true,
            paddingRight: "0px"
        }
    ]
];

const CONTACT_FIELDS = [
    {
        name: "name",
        label: "Contact Name",
        required: true
    },
    {
        name: "email",
        label: "Contact Email",
        required: true
    },
    {
        name: "title",
        label: "Position",
        required: true
    }
];

const CONTACT_PHONE_FIELDS = [
    {
        name: "phone",
        label: "Contact Phone Number 1",
        required: true
    },
    {
        name: "mobile",
        label: "Contact Phone Number 2",
        required: false
    }
];

const SectionContactTitleDiv = styled(SectionTitleDiv)`
    width: 100%;
    display: flex;
    align-items: center;
`;

const FieldContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
`;

const FieldDivEqual = styled.div`
    flex: 1;
    padding-right: ${props => props.paddingRight};
`;

const FieldDiv = styled.div`
    flex-basis: ${props => props.flexBasis};
    margin-right: ${props => props.marginRight};
`;

const ContactEntryContainerDiv = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
    padding-right: 10px;
    padding-left: 10px;
`;

const AddressContainerDiv = styled.div`
    flex-basis: 48%;
    margin-right: ${props => props.marginRight};
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid #707070;
`;

const AddressSectionTitleDiv = styled.div`
    color: #2699fb;
    font-size: 1.4em;
    font-weight: 600;
    padding-bottom: 10px;
`;

const EMPTY_CONTACT = {
    id: null,
    email: "",
    mobile: "",
    name: "",
    phone: "",
    title: ""
};

const styles = () => ({
    addContactButton: {
        color: "#2699FB",
        border: "1px solid #2699FB",
        width: "40%",
        marginBottom: 20
    },
    deleteIconButton: {
        fontSize: "1.7em",
        backgroundColor: "white",
        border: "1px solid rgba(112, 112, 112, 1)",
        borderRadius: 5,
        padding: 2
    }
});

const StepAdvertiser = ({
    data,
    has_data,
    next,
    action,
    countries,
    classes,
    onRef,
    push,
    pubId
}) => {
    const contacts = has_data
        ? data.contacts.map(({ __typename, ...others }) => ({ ...others }))
        : [EMPTY_CONTACT];

    const initialValues = has_data
        ? {
              id: data.id,
              name: data.name,
              nature_of_business: data.nature_of_business,
              address: data.address,
              city: data.city,
              zip_code: data.zip_code,
              postal_address: data.postal_address,
              postal_city: data.postal_city,
              postal_zip_code: data.postal_zip_code,
              phone: data.phone,
              email: data.email,
              stateId: data.state.id,
              postalStateId: data.postal_state.id,
              countryId: data.state.country.id,
              postalCountryId: data.postal_state.country.id,
              contacts,
              deleteContacts: []
          }
        : {
              name: "",
              nature_of_business: "",
              address: "",
              city: "",
              zip_code: "",
              postal_address: "",
              postal_city: "",
              postal_zip_code: "",
              phone: "",
              email: "",
              stateId: null,
              postalStateId: null,
              countryId: null,
              postalCountryId: null,
              contacts,
              deleteContacts: []
          };

    return (
        <Formik
            initialValues={initialValues}
            ref={onRef}
            validationSchema={StepContractValidationSchema(countries)}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                const {
                    id,
                    name,
                    nature_of_business,
                    address,
                    city,
                    zip_code,
                    postal_address,
                    postal_city,
                    postal_zip_code,
                    phone,
                    email,
                    stateId,
                    postalStateId,
                    contacts,
                    deleteContacts: delete_contacts
                } = values;

                const toSubmit = {
                    ...(has_data && { id }),
                    name,
                    nature_of_business,
                    address,
                    city,
                    zip_code,
                    postal_address,
                    postal_city,
                    postal_zip_code,
                    phone,
                    email,
                    stateId,
                    postalStateId,
                    contacts: contacts.map(({ id, ...others }) => ({
                        ...(Boolean(id) && { id }), //Only put ID attribute if ID is not null
                        ...others
                    })),
                    ...(has_data &&
                        delete_contacts.length > 0 && { delete_contacts }), //Only send deleteContact in EDIT mode
                    ...(!has_data && { justBrilliantGuideId: pubId }) //Only send justBrilliantGuideId in CREATE mode
                };

                console.log("To submit: ", toSubmit);
                action({ variables: { input: toSubmit } }).then(({ data }) => {
                    if (!has_data) {
                        const {
                            createAdvertiser: { id: advertiser_id }
                        } = data;
                        push({
                            pathname: ADVERTISER_MAIN_URL.replace(
                                ":advertiser_id",
                                advertiser_id
                            ),
                            state: { goToNext: true }
                        });
                    } else {
                        next();
                    }
                });
            }}
        >
            {({ values, errors, isSubmitting, setFieldValue }) => {
                const selectedCountry = Boolean(values.countryId)
                    ? countries.find(({ id }) => id === values.countryId)
                    : null;
                const selectedPostalCountry = Boolean(values.postalCountryId)
                    ? countries.find(({ id }) => id === values.postalCountryId)
                    : null;

                const states =
                    Boolean(selectedCountry) && !isEmpty(selectedCountry.states)
                        ? selectedCountry.states
                        : [];
                const postalStates =
                    Boolean(selectedPostalCountry) &&
                    !isEmpty(selectedPostalCountry.states)
                        ? selectedPostalCountry.states
                        : [];

                const businessAndPostalAddressAreTheSame = () =>
                    Boolean(values.address) &&
                    Boolean(values.postal_address) &&
                    values.address === values.postal_address &&
                    Boolean(values.city) &&
                    Boolean(values.postal_city) &&
                    values.city === values.postal_city &&
                    Boolean(values.zip_code) &&
                    Boolean(values.postal_zip_code) &&
                    values.zip_code === values.postal_zip_code &&
                    Boolean(values.stateId) &&
                    Boolean(values.postalStateId) &&
                    values.stateId === values.postalStateId &&
                    Boolean(values.countryId) &&
                    Boolean(values.postalCountryId) &&
                    values.countryId === values.postalCountryId;

                const businessAddressDetailsCompleted = () =>
                    Boolean(values.address) &&
                    Boolean(values.city) &&
                    Boolean(values.zip_code) &&
                    Boolean(values.stateId) &&
                    Boolean(values.countryId);

                const setPostalSameAsBusinessAddress = () => {
                    setFieldValue("postal_address", values.address);
                    setFieldValue("postal_city", values.city);
                    setFieldValue("postal_zip_code", values.zip_code);
                    setFieldValue("postalStateId", values.postalStateId);
                    setFieldValue("postalCountryId", values.countryId);
                };

                return (
                    <Form>
                        <ContainerDiv>
                            <SectionDiv
                                flexBasis="40%"
                                flexDirection="column"
                                paddingRight="10px"
                            >
                                <SectionTitleDiv>
                                    Advertiser Information
                                </SectionTitleDiv>
                                {CLIENT_FIELDS.map((row_fields, index) => (
                                    <FieldContainerDiv
                                        key={`FIELDS-ROW-${index}`}
                                    >
                                        {row_fields.map(
                                            (
                                                {
                                                    name,
                                                    label,
                                                    required,
                                                    paddingRight
                                                },
                                                field_index
                                            ) => (
                                                <FieldDivEqual
                                                    key={`INNER-FIELD=${index}-${field_index}`}
                                                    paddingRight={paddingRight}
                                                >
                                                    {renderTextField(
                                                        name,
                                                        label,
                                                        required
                                                    )}
                                                </FieldDivEqual>
                                            )
                                        )}
                                    </FieldContainerDiv>
                                ))}
                                <FieldContainerDiv>
                                    <AddressContainerDiv marginRight="10px">
                                        <AddressSectionTitleDiv>
                                            Business Address
                                        </AddressSectionTitleDiv>
                                        {CLIENT_ADDRESS_FIELDS.map(
                                            (row_fields, index) => (
                                                <FieldContainerDiv
                                                    key={`FIELDS-ROW-${index}`}
                                                >
                                                    {row_fields.map(
                                                        (
                                                            {
                                                                name,
                                                                label,
                                                                required,
                                                                paddingRight
                                                            },
                                                            field_index
                                                        ) => (
                                                            <FieldDivEqual
                                                                key={`INNER-FIELD=${index}-${field_index}`}
                                                                paddingRight={
                                                                    paddingRight
                                                                }
                                                            >
                                                                {renderTextField(
                                                                    name,
                                                                    label,
                                                                    required
                                                                )}
                                                            </FieldDivEqual>
                                                        )
                                                    )}
                                                </FieldContainerDiv>
                                            )
                                        )}
                                        <FieldContainerDiv>
                                            <FieldDiv
                                                flexBasis="95%"
                                                marginRight="0px"
                                            >
                                                {renderSelectField(
                                                    "countryId",
                                                    "Country",
                                                    countries,
                                                    errors
                                                )}
                                            </FieldDiv>
                                        </FieldContainerDiv>
                                        <FieldContainerDiv>
                                            <FieldDiv
                                                flexBasis="95%"
                                                marginRight="0px"
                                            >
                                                {renderSelectField(
                                                    "stateId",
                                                    "State / Province (If Applicable)",
                                                    states,
                                                    errors
                                                )}
                                            </FieldDiv>
                                        </FieldContainerDiv>
                                    </AddressContainerDiv>
                                    <AddressContainerDiv>
                                        <AddressSectionTitleDiv>
                                            Postal Address
                                        </AddressSectionTitleDiv>
                                        {CLIENT_POSTAL_FIELDS.map(
                                            (row_fields, index) => (
                                                <FieldContainerDiv
                                                    key={`FIELDS-ROW-${index}`}
                                                >
                                                    {row_fields.map(
                                                        (
                                                            {
                                                                name,
                                                                label,
                                                                required,
                                                                paddingRight
                                                            },
                                                            field_index
                                                        ) => (
                                                            <FieldDivEqual
                                                                key={`INNER-FIELD=${index}-${field_index}`}
                                                                paddingRight={
                                                                    paddingRight
                                                                }
                                                            >
                                                                {renderTextField(
                                                                    name,
                                                                    label,
                                                                    required
                                                                )}
                                                            </FieldDivEqual>
                                                        )
                                                    )}
                                                </FieldContainerDiv>
                                            )
                                        )}
                                        <FieldContainerDiv>
                                            <FieldDiv
                                                flexBasis="95%"
                                                marginRight="0px"
                                            >
                                                {renderSelectField(
                                                    "postalCountryId",
                                                    "Country",
                                                    countries,
                                                    errors
                                                )}
                                            </FieldDiv>
                                        </FieldContainerDiv>
                                        <FieldContainerDiv>
                                            <FieldDiv
                                                flexBasis="95%"
                                                marginRight="0px"
                                            >
                                                {renderSelectField(
                                                    "postalStateId",
                                                    "State / Province (If Applicable)",
                                                    postalStates,
                                                    errors
                                                )}
                                            </FieldDiv>
                                        </FieldContainerDiv>
                                    </AddressContainerDiv>
                                </FieldContainerDiv>
                            </SectionDiv>
                            <SectionDiv
                                flexBasis="60%"
                                flexDirection="column"
                                paddingRight="0px"
                            >
                                <FieldArray name="contacts">
                                    {({ push, remove }) => {
                                        const addContact = () =>
                                            push({ ...EMPTY_CONTACT });
                                        return (
                                            <div
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "80%",
                                                        display: "flex"
                                                    }}
                                                >
                                                    {values.contacts.map(
                                                        (
                                                            contact,
                                                            contactIndex
                                                        ) => {
                                                            const deleteContact = index => _event => {
                                                                if (
                                                                    Boolean(
                                                                        values
                                                                            .contacts[
                                                                            index
                                                                        ].id
                                                                    ) &&
                                                                    has_data
                                                                ) {
                                                                    setFieldValue(
                                                                        "deleteContacts",
                                                                        [
                                                                            ...values.deleteContacts,
                                                                            values
                                                                                .contacts[
                                                                                index
                                                                            ]
                                                                        ]
                                                                    );
                                                                }
                                                                remove(index);
                                                            };

                                                            return (
                                                                <ContactEntryContainerDiv
                                                                    key={`CONTACT-ENTRY-${contactIndex}`}
                                                                >
                                                                    <SectionContactTitleDiv>
                                                                        <div
                                                                            style={{
                                                                                flexBasis:
                                                                                    "90%"
                                                                            }}
                                                                        >
                                                                            Contact
                                                                            Person
                                                                            #
                                                                            {contactIndex +
                                                                                1}
                                                                        </div>

                                                                        {values
                                                                            .contacts
                                                                            .length >
                                                                            1 && (
                                                                            <div
                                                                                style={{
                                                                                    flexBasis:
                                                                                        "10%",
                                                                                    display:
                                                                                        "flex",
                                                                                    flexDirection:
                                                                                        "row-reverse",
                                                                                    marginBottom:
                                                                                        "-11px"
                                                                                }}
                                                                            >
                                                                                <IconButton
                                                                                    onClick={deleteContact(
                                                                                        contactIndex
                                                                                    )}
                                                                                    fontSize="small"
                                                                                    className={
                                                                                        classes.deleteIconButton
                                                                                    }
                                                                                >
                                                                                    <DeleteIcon />
                                                                                </IconButton>
                                                                            </div>
                                                                        )}
                                                                    </SectionContactTitleDiv>
                                                                    <div
                                                                        style={{
                                                                            width:
                                                                                "100%"
                                                                        }}
                                                                    >
                                                                        {CONTACT_FIELDS.map(
                                                                            (
                                                                                {
                                                                                    name,
                                                                                    label,
                                                                                    required
                                                                                },
                                                                                contactFieldIndex
                                                                            ) => (
                                                                                <FieldContainerDiv
                                                                                    key={`CONTACT-FIELD-${contactIndex}-${name}-${contactFieldIndex}`}
                                                                                >
                                                                                    {renderTextField(
                                                                                        `contacts[${contactIndex}].${name}`,
                                                                                        label,
                                                                                        required
                                                                                    )}
                                                                                </FieldContainerDiv>
                                                                            )
                                                                        )}
                                                                        <div
                                                                            style={{
                                                                                width:
                                                                                    "100%",
                                                                                display:
                                                                                    "flex"
                                                                            }}
                                                                        >
                                                                            {CONTACT_PHONE_FIELDS.map(
                                                                                (
                                                                                    {
                                                                                        name,
                                                                                        label,
                                                                                        required
                                                                                    },
                                                                                    contactPhoneFieldIndex
                                                                                ) => (
                                                                                    <div
                                                                                        style={{
                                                                                            flex: 1,
                                                                                            paddingRight:
                                                                                                contactPhoneFieldIndex ===
                                                                                                CONTACT_PHONE_FIELDS.length -
                                                                                                    1
                                                                                                    ? 0
                                                                                                    : 10
                                                                                        }}
                                                                                        key={`CONTACT-FIELD-PHONE-${contactIndex}-${name}-${contactPhoneFieldIndex}`}
                                                                                    >
                                                                                        {renderTextField(
                                                                                            `contacts[${contactIndex}].${name}`,
                                                                                            label,
                                                                                            required
                                                                                        )}
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </ContactEntryContainerDiv>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                                {values.contacts.length < 2 && (
                                                    <div
                                                        style={{
                                                            width: "40%",
                                                            display: "flex",
                                                            flexDirection:
                                                                "row-reverse",
                                                            paddingRight: 10
                                                        }}
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            className={
                                                                classes.addContactButton
                                                            }
                                                            onClick={addContact}
                                                            disabled={
                                                                isSubmitting
                                                            }
                                                        >
                                                            ADD ADDITIONAL
                                                            CONTACT
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }}
                                </FieldArray>
                                <div
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        alignItems: "flex-end"
                                    }}
                                >
                                    <ContinueButton type="submit">
                                        Confirm & Continue
                                    </ContinueButton>
                                </div>
                            </SectionDiv>
                        </ContainerDiv>
                    </Form>
                );
            }}
        </Formik>
    );
};

const StepAdvertiserWithStyles = withStyles(styles)(StepAdvertiser);

export default StepAdvertiserHOC;
