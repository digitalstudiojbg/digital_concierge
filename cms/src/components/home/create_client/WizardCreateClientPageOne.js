import React from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

const CLIENT_FIELDS = [
    [
        {
            name: "name",
            label: "Client Name",
            required: true,
            flexBasis: "30%",
            marginRight: "10px",
            renderMethod: renderTextField
        },
        {
            name: "full_company_name",
            label: "Full Client Name",
            required: false,
            flexBasis: "30%",
            marginRight: "10px",
            renderMethod: renderTextField
        },
        {
            name: "nature_of_business",
            label: "Nature of Business",
            required: true,
            flexBasis: "30%",
            marginRight: "0px",
            renderMethod: renderTextField
        }
    ],
    [
        {
            name: "phone",
            label: "Venue Phone Number",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            renderMethod: renderTextField
        },
        {
            name: "email",
            label: "Business Email",
            required: true,
            flexBasis: "45%",
            marginRight: "0px",
            renderMethod: renderTextField
        }
    ],
    [
        {
            name: "venue_address",
            label: "Venue Address",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            renderMethod: renderTextField
        },
        {
            name: "postal_address",
            label: "Postal Address",
            required: false,
            flexBasis: "45%",
            marginRight: "0px",
            renderMethod: renderTextField
        }
    ],
    [
        {
            name: "venue_city",
            label: "City",
            required: true,
            flexBasis: "20%",
            marginRight: "10px",
            renderMethod: renderTextField
        },
        {
            name: "venue_zip_code",
            label: "Zip Code",
            required: true,
            flexBasis: "20%",
            marginRight: "30px",
            renderMethod: renderTextField
        },
        {
            name: "postal_city",
            label: "City",
            required: true,
            flexBasis: "20%",
            marginRight: "10px",
            renderMethod: renderTextField
        },
        {
            name: "postal_zip_code",
            label: "Zip Code",
            required: true,
            flexBasis: "20%",
            marginRight: "0px",
            renderMethod: renderTextField
        }
    ],
    [
        {
            name: "country_id",
            label: "Country",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            renderMethod: renderTextField
        },
        {
            name: "postal_country_id",
            label: "Country",
            required: true,
            flexBasis: "45%",
            marginRight: "0px",
            renderMethod: renderTextField
        }
    ],
    [
        {
            name: "venueStateId",
            label: "State / Province (If Applicable)",
            required: true,
            flexBasis: "45%",
            marginRight: "10px",
            renderMethod: renderTextField
        },
        {
            name: "postalStateId",
            label: "State / Province (If Applicable)",
            required: true,
            flexBasis: "45%",
            marginRight: "0px",
            renderMethod: renderTextField
        }
    ]
];

class WizardCreateClientPageOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Formik>
                <ContainerDiv>
                    <SectionDiv width="50%">
                        Client Info
                        {CLIENT_FIELDS.map((fields_array, index) => {
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
                                                renderMethod
                                            },
                                            field_index
                                        ) => (
                                            <ClientFieldDiv
                                                key={`FIELD=${index}-${field_index}`}
                                                flexBasis={flexBasis}
                                                marginRight={marginRight}
                                            >
                                                {renderMethod(
                                                    name,
                                                    label,
                                                    required
                                                )}
                                            </ClientFieldDiv>
                                        )
                                    )}
                                </ClientFieldContainerDiv>
                            );
                        })}
                    </SectionDiv>
                    <SectionDiv width="25%">Key Contact</SectionDiv>
                    <SectionDiv width="25%">Client Profile Image</SectionDiv>
                </ContainerDiv>
            </Formik>
        );
    }
}

export default WizardCreateClientPageOne;
