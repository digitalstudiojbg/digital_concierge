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
import {
    OutlinedInput,
    MenuItem,
    Button,
    IconButton,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";
import { ADVERTISER_MAIN_URL } from "../../../utils/Constants";
import StepContractValidationSchema from "./StepAdvertiserValidationSchema";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Typography from "@material-ui/core/Typography";

import {
    ContainerDiv,
    SectionDiv,
    SectionHeader,
    FormLabelDiv,
    ContinueButton,
    FieldLabel,
    FieldContainerDiv,
    SubSectionDiv,
    AddressSectionTitleDiv,
    FieldDivEqual,
    FieldDiv,
    ContactEntryContainerDiv,
    AddressContainerDiv,
    SectionContactTitleDiv,
    ContactFirstRow
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
    <FieldContainerDiv style={{ width: "100%" }}>
        <FieldLabel>{label}</FieldLabel>
        <Field
            name={name}
            required={required}
            type="text"
            component={TextField}
            variant="outlined"
            fullWidth={true}
            inputProps={{
                style: {
                    padding: "12px 10px",
                    backgroundColor: "white"
                }
            }}
        />
    </FieldContainerDiv>
);

const renderSelectField = (name, label, optionValues, errors) => (
    <FieldContainerDiv style={{}}>
        <FieldLabel>{label}</FieldLabel>
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
                    style={{ height: "43px", backgroundColor: "white" }}
                />
            }
        >
            {optionValues.map(({ id, name }, index) => (
                <MenuItem key={`ITEM-${name}-${id}-${index}`} value={id}>
                    {name}
                </MenuItem>
            ))}
        </Field>
    </FieldContainerDiv>
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
            paddingRight: "2%",
            flexBasis: "50%"
        },
        {
            name: "city",
            label: "City",
            required: true,
            paddingRight: "1%",
            flexBasis: "24%"
        },
        {
            name: "zip_code",
            label: "Zip Code",
            required: true,
            paddingRight: "1%",
            flexBasis: "24%"
        }
    ]
];

const CLIENT_POSTAL_FIELDS = [
    [
        {
            name: "postal_address",
            label: "Postal Address",
            required: false,
            paddingRight: "2%",
            flexBasis: "50%"
        },
        {
            name: "postal_city",
            label: "City",
            required: true,
            paddingRight: "1%",
            flexBasis: "24%"
        },
        {
            name: "postal_zip_code",
            label: "Zip Code",
            required: true,
            paddingRight: "0px",
            flexBasis: "24%"
        }
    ]
];

const CONTACT_FIELDS = [
    {
        name: "name",
        label: "Contact Name",
        required: true,
        paddingRight: "2%",
        flexBasis: "50%"
    },
    {
        name: "title",
        label: "Position",
        required: true,
        paddingRight: "0%",
        flexBasis: "50%"
    }
];

const CONTACT_PHONE_FIELDS = [
    {
        name: "email",
        label: "Contact Email",
        required: true,
        paddingRight: "2%",
        flexBasis: "50%"
    },
    {
        name: "phone",
        label: "Contact Phone Number 1",
        required: true,
        paddingRight: "1%",
        flexBasis: "24%"
    },
    {
        name: "mobile",
        label: "Contact Phone Number 2",
        required: false,
        paddingRight: "0%",
        flexBasis: "24%"
    }
];

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
        border: "2px solid #2699FB",
        width: "100%",
        backgroundColor: "white",
        width: "75%"
    },
    deleteIconButton: {
        padding: "0px",
        backgroundColor: "white",
        border: "1px solid grey",
        borderRadius: "5px",

        height: "fit-content"
    },
    formLabel: {
        color: "#5C5C5C",
        fontSize: "10px",
        fontFamily: "Arial, Helvetica, sans-serif",
        marginLeft: "0",
        fontWeight: "bold",
        textTransform: "uppercase",
        alignItems: "center",
        display: "flex"
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
            // enableReinitialize={true}
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
                    setSubmitting(false);
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

                const businessAndPostalAddressAreTheSame = () => {
                    const sameAddress =
                        Boolean(values.address) &&
                        Boolean(values.postal_address) &&
                        values.address === values.postal_address;
                    // console.log("Same address ", sameAddress);

                    const sameCity =
                        Boolean(values.city) &&
                        Boolean(values.postal_city) &&
                        values.city === values.postal_city;
                    // console.log("City is ", values.city);
                    // console.log("Postal city is ", values.postal_city);
                    // console.log("Same city ", sameCity);

                    const sameZip =
                        Boolean(values.zip_code) &&
                        Boolean(values.postal_zip_code) &&
                        values.zip_code === values.postal_zip_code;
                    // console.log("Same Zip ", sameZip);

                    const sameState =
                        Boolean(values.stateId) &&
                        Boolean(values.postalStateId) &&
                        values.stateId === values.postalStateId;
                    // console.log("Same State ", sameState);

                    const sameCountry =
                        Boolean(values.countryId) &&
                        Boolean(values.postalCountryId) &&
                        values.countryId === values.postalCountryId;
                    // console.log("Same Country ", sameCountry);

                    return (
                        sameAddress &&
                        sameCity &&
                        sameZip &&
                        sameState &&
                        sameCountry
                    );
                };

                const businessAddressDetailsNotCompleted = () =>
                    !(
                        Boolean(values.address) &&
                        Boolean(values.city) &&
                        Boolean(values.zip_code) &&
                        Boolean(values.stateId) &&
                        Boolean(values.countryId)
                    );

                const setPostalSameAsBusinessAddress = () => {
                    setFieldValue("postal_address", values.address);
                    setFieldValue("postal_city", values.city);
                    setFieldValue("postal_zip_code", values.zip_code);
                    setFieldValue("postalStateId", values.stateId);
                    setFieldValue("postalCountryId", values.countryId);
                };

                const handleCheck = () => {
                    if (businessAndPostalAddressAreTheSame()) {
                        setFieldValue("postal_address", "");
                        setFieldValue("postal_city", "");
                        setFieldValue("postal_zip_code", "");
                        setFieldValue("postalStateId", null);
                        setFieldValue("postalCountryId", null);
                    } else {
                        return setPostalSameAsBusinessAddress();
                    }
                };

                return (
                    <Form>
                        <ContainerDiv style={{ paddingTop: "30px" }}>
                            <SectionDiv
                                flexBasis="44%"
                                flexDirection="column"
                                paddingRight="10px"
                                style={{
                                    padding: "0 3%",
                                    borderRight: "1px solid #DDDDDD"
                                }}
                            >
                                <SubSectionDiv>
                                    <SectionHeader>
                                        Advertiser Information
                                    </SectionHeader>
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
                                                        paddingRight={
                                                            paddingRight
                                                        }
                                                        // flexBasis={flexBasis}
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
                                </SubSectionDiv>
                                <SubSectionDiv>
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
                                                            flexBasis,
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
                                                            style={{
                                                                flex: flexBasis
                                                            }}
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
                                            flexBasis="49%"
                                            marginRight="2%"
                                        >
                                            {renderSelectField(
                                                "countryId",
                                                "Country",
                                                countries,
                                                errors
                                            )}
                                        </FieldDiv>

                                        <FieldDiv
                                            flexBasis="49%"
                                            marginRight="0"
                                        >
                                            {renderSelectField(
                                                "stateId",
                                                "State / Province (If Applicable)",
                                                states,
                                                errors
                                            )}
                                        </FieldDiv>
                                    </FieldContainerDiv>
                                </SubSectionDiv>

                                <SubSectionDiv>
                                    <AddressContainerDiv>
                                        <AddressSectionTitleDiv>
                                            Postal Address
                                        </AddressSectionTitleDiv>
                                        <FormControlLabel
                                            style={{ alignItems: "center" }}
                                            control={
                                                <Checkbox
                                                    style={{
                                                        color: "#2699FB",
                                                        paddingRight: 2
                                                    }}
                                                    checked={businessAndPostalAddressAreTheSame()}
                                                    onChange={handleCheck}
                                                    disabled={businessAddressDetailsNotCompleted()}
                                                />
                                            }
                                            label={
                                                <Typography
                                                    className={
                                                        classes.formLabel
                                                    }
                                                    variant="p"
                                                >
                                                    Same as Business Address
                                                </Typography>
                                            }
                                            //    label="Same as Business Address"
                                        />
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
                                                                paddingRight,
                                                                flexBasis
                                                            },
                                                            field_index
                                                        ) => (
                                                            <FieldDivEqual
                                                                key={`INNER-FIELD=${index}-${field_index}`}
                                                                paddingRight={
                                                                    paddingRight
                                                                }
                                                                style={{
                                                                    flex: flexBasis
                                                                }}
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
                                                flexBasis="49%"
                                                marginRight="2%"
                                            >
                                                {renderSelectField(
                                                    "postalCountryId",
                                                    "Country",
                                                    countries,
                                                    errors
                                                )}
                                            </FieldDiv>
                                            <FieldDiv
                                                flexBasis="49%"
                                                marginRight="0"
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
                                </SubSectionDiv>
                            </SectionDiv>
                            <SectionDiv
                                flexBasis="44%"
                                flexDirection="column"
                                paddingLeft="10px"
                                style={{
                                    padding: "0 3%"
                                }}
                            >
                                <SubSectionDiv>
                                    <FieldArray name="contacts">
                                        {({ push, remove }) => {
                                            const addContact = () =>
                                                push({ ...EMPTY_CONTACT });
                                            return (
                                                <div>
                                                    <div>
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
                                                                    remove(
                                                                        index
                                                                    );
                                                                };

                                                                return (
                                                                    <ContactEntryContainerDiv
                                                                        style={{}}
                                                                        key={`CONTACT-ENTRY-${contactIndex}`}
                                                                    >
                                                                        <SectionContactTitleDiv>
                                                                            Contact
                                                                        </SectionContactTitleDiv>
                                                                        <AddressSectionTitleDiv
                                                                            style={{
                                                                                display:
                                                                                    "flex",
                                                                                width:
                                                                                    "100%"
                                                                            }}
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    flexBasis:
                                                                                        "50%",
                                                                                    display:
                                                                                        "flex",
                                                                                    alignItems:
                                                                                        "center"
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
                                                                                .length <
                                                                                2 && (
                                                                                <div
                                                                                    style={{
                                                                                        display:
                                                                                            "flex",
                                                                                        justifyContent:
                                                                                            "flex-end",
                                                                                        flexBasis:
                                                                                            "50%"
                                                                                    }}
                                                                                >
                                                                                    <Button
                                                                                        variant="outlined"
                                                                                        className={
                                                                                            classes.addContactButton
                                                                                        }
                                                                                        onClick={
                                                                                            addContact
                                                                                        }
                                                                                        disabled={
                                                                                            isSubmitting
                                                                                        }
                                                                                    >
                                                                                        ADD
                                                                                        ADDITIONAL
                                                                                        CONTACT
                                                                                    </Button>
                                                                                </div>
                                                                            )}

                                                                            {values
                                                                                .contacts
                                                                                .length >
                                                                                1 && (
                                                                                <div
                                                                                    style={{
                                                                                        display:
                                                                                            "flex",

                                                                                        justifyContent:
                                                                                            "flex-end",
                                                                                        flexBasis:
                                                                                            "50%"
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
                                                                                        <DeleteOutlinedIcon fontSize="large" />
                                                                                    </IconButton>
                                                                                </div>
                                                                            )}
                                                                        </AddressSectionTitleDiv>
                                                                        <FieldContainerDiv
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
                                                                                        required,
                                                                                        paddingRight,
                                                                                        flexBasis
                                                                                    },
                                                                                    contactFieldIndex
                                                                                ) => (
                                                                                    <ContactFirstRow
                                                                                        key={`CONTACT-FIELD-${contactIndex}-${name}-${contactFieldIndex}`}
                                                                                        // flexBasis={
                                                                                        //     flexBasis
                                                                                        // }
                                                                                        style={{
                                                                                            flex: flexBasis,
                                                                                            paddingRight: paddingRight
                                                                                        }}
                                                                                    >
                                                                                        {renderTextField(
                                                                                            `contacts[${contactIndex}].${name}`,
                                                                                            label,
                                                                                            required
                                                                                        )}
                                                                                    </ContactFirstRow>
                                                                                )
                                                                            )}
                                                                        </FieldContainerDiv>
                                                                        <FieldContainerDiv>
                                                                            {CONTACT_PHONE_FIELDS.map(
                                                                                (
                                                                                    {
                                                                                        name,
                                                                                        label,
                                                                                        required,
                                                                                        flexBasis,
                                                                                        paddingRight
                                                                                    },
                                                                                    contactPhoneFieldIndex
                                                                                ) => (
                                                                                    <div
                                                                                        style={{
                                                                                            flex: flexBasis,
                                                                                            paddingRight: paddingRight
                                                                                            // paddingRight:
                                                                                            //     contactPhoneFieldIndex ===
                                                                                            //     CONTACT_PHONE_FIELDS.length -
                                                                                            //         1
                                                                                            //         ? 0
                                                                                            //         : 10
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
                                                                        </FieldContainerDiv>
                                                                    </ContactEntryContainerDiv>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    </FieldArray>
                                    <div
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            alignItems: "flex-end",
                                            marginBottom: "-50px"
                                        }}
                                    >
                                        <ContinueButton type="submit">
                                            Confirm & Continue
                                        </ContinueButton>
                                    </div>
                                </SubSectionDiv>
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
