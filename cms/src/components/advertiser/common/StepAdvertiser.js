import React from "react";
import { Query, Mutation } from "react-apollo";
import { getCountryList } from "../../../data/query";
import Loading from "../../loading/Loading";
import { getAdvertiserDetail } from "../../../data/query/advertiser";
import { CREATE_ADVERTISER, EDIT_ADVERTISER } from "../../../data/mutation";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import { OutlinedInput, MenuItem } from "@material-ui/core";
import { isEmpty } from "lodash";

const StepAdvertiserHOC = ({ has_data, advertiserId, next }) => (
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
                                <Mutation mutation={EDIT_ADVERTISER}>
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
                                            <StepAdvertiser
                                                data={advertiser}
                                                has_data={true}
                                                next={next}
                                                action={action}
                                                countries={countries}
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
                                <StepAdvertiser
                                    has_data={false}
                                    next={next}
                                    action={action}
                                    countries={countries}
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
    <Field
        name={name}
        label={label}
        required={required}
        type="text"
        component={TextField}
        variant="outlined"
        fullWidth={true}
    />
);

const FormLabelDiv = styled.div`
    color: rgb(92, 92, 92);
    font-size: 0.8em;
`;

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
            flexBasis: "30%",
            marginRight: "10px"
        },
        {
            name: "nature_of_business",
            label: "Nature of Business",
            required: true,
            flexBasis: "30%",
            marginRight: "0px"
        }
    ],
    [
        {
            name: "phone",
            label: "Venue Phone Number",
            required: true,
            flexBasis: "45%",
            marginRight: "10px"
        },
        {
            name: "email",
            label: "Business Email",
            required: true,
            flexBasis: "45%",
            marginRight: "0px"
        }
    ],
    [
        {
            name: "address",
            label: "Address",
            required: true,
            flexBasis: "45%",
            marginRight: "10px"
        },
        {
            name: "postal_address",
            label: "Postal Address",
            required: false,
            flexBasis: "45%",
            marginRight: "0px"
        }
    ],
    [
        {
            name: "city",
            label: "City",
            required: true,
            flexBasis: "20%",
            marginRight: "10px"
        },
        {
            name: "zip_code",
            label: "Zip Code",
            required: true,
            flexBasis: "20%",
            marginRight: "30px"
        },
        {
            name: "postal_city",
            label: "City",
            required: true,
            flexBasis: "20%",
            marginRight: "10px"
        },
        {
            name: "postal_zip_code",
            label: "Zip Code",
            required: true,
            flexBasis: "20%",
            marginRight: "0px"
        }
    ]
];

const ContainerDiv = styled.div`
    width: 100%;
    display: flex;
`;

const SectionDiv = styled.div`
    flex-basis: ${props => props.flexBasis};
    display: flex;
    flex-direction: ${props => props.flexDirection};
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
    padding-right: ${props => props.marginRight};
`;

const FieldDiv = styled.div`
    flex-basis: ${props => props.flexBasis};
    margin-right: ${props => props.marginRight};
`;

const StepAdvertiser = ({ data, has_data, next, action, countries }) => {
    const contacts = has_data
        ? data.contacts.map(({ __typename, ...others }) => ({ ...others }))
        : [{ name: "", title: "", phone: "", mobile: "", email: "" }];

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
              contacts
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
              contacts
          };

    return (
        <Formik initialValues={initialValues}>
            {({ values, errors }) => {
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
                return (
                    <Form>
                        <ContainerDiv>
                            <SectionDiv flexBasis="45%" flexDirection="column">
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
                                                    flexBasis,
                                                    marginRight
                                                },
                                                field_index
                                            ) => (
                                                <FieldDivEqual
                                                    key={`INNER-FIELD=${index}-${field_index}`}
                                                    marginRight={marginRight}
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
                                    <FieldDiv
                                        flexBasis="45%"
                                        marginRight="10px"
                                    >
                                        {renderSelectField(
                                            "countryId",
                                            "Country",
                                            countries,
                                            errors
                                        )}
                                    </FieldDiv>
                                    <FieldDiv flexBasis="45%" marginRight="0px">
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
                                        flexBasis="45%"
                                        marginRight="10px"
                                    >
                                        {renderSelectField(
                                            "stateId",
                                            "State / Province (If Applicable)",
                                            states,
                                            errors
                                        )}
                                    </FieldDiv>
                                    <FieldDiv flexBasis="45%" marginRight="0px">
                                        {renderSelectField(
                                            "postalStateId",
                                            "State / Province (If Applicable)",
                                            postalStates,
                                            errors
                                        )}
                                    </FieldDiv>
                                </FieldContainerDiv>
                            </SectionDiv>
                        </ContainerDiv>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default StepAdvertiserHOC;
