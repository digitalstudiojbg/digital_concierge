import React from "react";
import styled from "styled-components";
import { Query, withApollo } from "react-apollo";
import Loading from "../../loading/Loading";
import { Formik, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { getCountryList } from "../../../data/query";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const SectionDiv = styled.div`
    width: ${props => props.width};
    height: 100%;
`;

const ClientFieldContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
`;

const ClientFieldDiv = styled.div`
    flex-basis: ${props => props.flexBasis};
    margin-right: ${props => props.marginRight};
`;

const renderTextField = (name, label, required) => (
    <Field
        name={name}
        validateOnBlur
        validateOnChange
        render={({ field, form }) => (
            <TextField
                label={label}
                fullWidth={true}
                required={required}
                variant="outlined"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={form.errors[field.name] && form.touched[field.name]}
                helperText={
                    form.errors[field.name] &&
                    form.touched[field.name] &&
                    String(form.errors[field.name])
                }
            />
        )}
    />
);

const renderSelectField = (
    name,
    label,
    required,
    items,
    value,
    setFieldValue
    // changeState
) => {
    console.log(value);
    return (
        <Field
            name={name}
            validateOnBlur={false}
            validateOnChange
            render={() => (
                <React.Fragment>
                    <InputLabel htmlFor={`id-${name}`}>{label}</InputLabel>
                    <Select
                        value={value}
                        onChange={event => {
                            console.log("Event is: ", event);
                            setFieldValue(name, event.target.value);
                            // changeState(name, event.target.value);
                        }}
                        inputProps={{
                            id: `id-${name}`,
                            name,
                            required
                        }}
                    >
                        <MenuItem value="null" disabled>
                            {label}
                        </MenuItem>
                        {items.map(({ id, name }, index) => (
                            <MenuItem
                                key={`ITEM-${name}-${id}-${index}`}
                                value={id}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </React.Fragment>
            )}
        />
    );
};

const CLIENT_FIELDS = [
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
    ],
    [
        {
            name: "country_id",
            label: "Country",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            type: "select"
        },
        {
            name: "postal_country_id",
            label: "Country",
            required: true,
            flexBasis: "45%",
            marginRight: "0px",
            type: "select"
        }
    ],
    [
        {
            name: "venueStateId",
            label: "State / Province (If Applicable)",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            type: "select"
        },
        {
            name: "postalStateId",
            label: "State / Province (If Applicable)",
            required: true,
            flexBasis: "45%",
            marginRight: "0px",
            type: "select"
        }
    ]
];

class WizardCreateClientPageOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.selectRenderMethod = this.selectRenderMethod.bind(this);
    }

    selectRenderMethod(
        type,
        field_data,
        items = [],
        values = {},
        setFieldValue = null
    ) {
        const { name, label, required } = field_data;
        switch (type) {
            case "text":
                return renderTextField(name, label, required);
            case "select":
                return renderSelectField(
                    name,
                    label,
                    required,
                    this.selectItemsForRendering(name, values, items),
                    values[name],
                    setFieldValue
                );
            default:
                return <React.Fragment />;
        }
    }

    selectItemsForRendering(name, values, countries) {
        switch (name) {
            case "country_id":
            case "postal_country_id":
                return countries.map(({ id, name }) => ({ id, name }));
            case "venueStateId":
                const country_1 = countries.find(
                    ({ id }) => id === values.country_id
                );
                const { states: states_1 = [] } = country_1 || {};
                return states_1.map(({ id, name }) => ({ id, name }));
            case "postalStateId":
                const country_2 = countries.find(
                    ({ id }) => id === values.postal_country_id
                );
                const { states: states_2 = [] } = country_2 || {};
                return states_2.map(({ id, name }) => ({ id, name }));
            default:
                return undefined;
        }
    }

    render() {
        return (
            <Query query={getCountryList}>
                {({ loading, error, data: { countries } }) => {
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error! ${error.message}`;
                    console.log(countries);
                    return (
                        <Formik>
                            {({
                                // handleSubmit,
                                // handleChange,
                                // handleBlur,
                                values,
                                // errors
                                setFieldValue
                            }) => (
                                <ContainerDiv>
                                    <SectionDiv width="50%">
                                        Client Info
                                        {CLIENT_FIELDS.map(
                                            (fields_array, index) => {
                                                return (
                                                    <ClientFieldContainerDiv
                                                        key={`FIELD-CONTAINER-${index}`}
                                                    >
                                                        {fields_array.map(
                                                            (
                                                                {
                                                                    name,
                                                                    label,
                                                                    required,
                                                                    flexBasis,
                                                                    marginRight,
                                                                    type
                                                                },
                                                                field_index
                                                            ) => (
                                                                <ClientFieldDiv
                                                                    key={`FIELD=${index}-${field_index}`}
                                                                    flexBasis={
                                                                        flexBasis
                                                                    }
                                                                    marginRight={
                                                                        marginRight
                                                                    }
                                                                >
                                                                    {this.selectRenderMethod(
                                                                        type,
                                                                        {
                                                                            name,
                                                                            label,
                                                                            required
                                                                        },
                                                                        countries,
                                                                        values,
                                                                        setFieldValue
                                                                    )}
                                                                </ClientFieldDiv>
                                                            )
                                                        )}
                                                    </ClientFieldContainerDiv>
                                                );
                                            }
                                        )}
                                    </SectionDiv>
                                    <SectionDiv width="25%">
                                        Key Contact
                                    </SectionDiv>
                                    <SectionDiv width="25%">
                                        Client Profile Image
                                    </SectionDiv>
                                </ContainerDiv>
                            )}
                        </Formik>
                    );
                }}
            </Query>
        );
    }
}

export default withApollo(WizardCreateClientPageOne);
