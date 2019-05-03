import React from "react";
import styled from "styled-components";
import { Query, withApollo, compose, graphql } from "react-apollo";
import Loading from "../../loading/Loading";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";
import { getCountryList } from "../../../data/query";

//FIELDS IMPORTING
import CLIENT_FIELDS from "./one/ClientFields";
import CONTACT_FIELDS from "./one/ContactFields";
import ValidationSchema from "./one/PageOneValidationSchema";
import { CREATE_CLIENT, CREATE_USER } from "../../../data/mutation";
import { DECIMAL_RADIX } from "../../../utils/Constants";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const SectionDiv = styled.div`
    width: ${props => props.width};
    height: ${props => (Boolean(props.height) ? props.height : "100%")};
    display: flex;
    flex-direction: column;
    padding: 30px;
`;

const ClientFieldContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
`;

const ClientFieldDiv = styled.div`
    padding :0;
`;

const FieldContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FieldDiv = styled.div`
    width: 100%;
    padding: 0px 0 10px 0px;
    
`;
const FieldLabel = styled.label`
    font-size: 10px;
    color:black;
`;

const SubFieldContainerDiv = styled.div`
    width : 100%;
    flex-basis: ${props => props.flexBasis};
    margin-right: ${props => props.marginRight};
    float:left;
`;

const SectionHeader = styled.h4`
    text-align: left;
    color: #2699FB;
`;

const renderTextField = (name, label, required, type) => (
    // <Field
    //     name={name}
    //     validateOnBlur
    //     validateOnChange
    //     render={({ field, form }) => (
    //         <TextField
    //             label={label}
    //             fullWidth={true}
    //             required={required}
    //             variant="outlined"
    //             name={field.name}
    //             value={field.value}
    //             onChange={field.onChange}
    //             onBlur={field.onBlur}
    //             error={form.errors[field.name] && form.touched[field.name]}
    //             helperText={
    //                 form.errors[field.name] &&
    //                 form.touched[field.name] &&
    //                 String(form.errors[field.name])
    //             }
    //         />
    //     )}
    // />
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

//Bug in rendering material ui select label once value is selected
const renderSelectField = (
    name,
    select_id,
    label,
    items,
    value,
    // setFieldValue
    // changeState
    className = ""
) => (
    // <Field
    //     name={name}
    //     validateOnBlur={false}
    //     validateOnChange
    //     component={Select}
    //     render={() => (
    //         <FormControl className={className}>
    //             <InputLabel htmlFor={`id-${name}`}>{label}</InputLabel>
    //             <Field
    //                 name={name}
    //                 component={Select}
    //                 inputProps={{
    //                     name,
    //                     id: `id-${name}`,
    //                     required
    //                 }}
    //             >
    //                 <MenuItem value="null" disabled>
    //                     {label}
    //                 </MenuItem>
    // {items.map(({ id, name }, index) => (
    //     <MenuItem
    //         key={`ITEM-${name}-${id}-${index}`}
    //         value={id}
    //     >
    //         {name}
    //     </MenuItem>
    // ))}
    //             </Field>
    //         </FormControl>
    //     )}
    // />

    <FormControl className={className} fullWidth={true}>
        {/* <InputLabel htmlFor={select_id}>{label}</InputLabel> */}
        <InputLabel htmlFor={select_id}>
            {Boolean(value) ? "" : label}
        </InputLabel>
        <Field
            id={select_id}
            name={name}
            component={Select}
            disabled={items.length < 1}
        >
            <MenuItem value="null" disabled>
                {label}
            </MenuItem>
            {items.map(({ id, name }, index) => (
                <MenuItem key={`ITEM-${name}-${id}-${index}`} value={id}>
                    {name}
                </MenuItem>
            ))}
        </Field>
    </FormControl>
);

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit
    },
    hideFileInput: {
        display: "none"
    },
    uploadButton: {
        margin: theme.spacing.unit,
        color: "blue",
        border: "1px solid blue",
        width: "100%"
    }
});

class WizardCreateClientPageOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = { client_image: null };
        this.fileInput = React.createRef();
        this.selectRenderMethod = this.selectRenderMethod.bind(this);
        this.updateClientImage = this.updateClientImage.bind(this);
    }

    selectRenderMethod(
        type,
        field_data,
        items = [],
        values = {}
        // setFieldValue = null
    ) {
        const { classes } = this.props;
        const { name, label, required, select_id } = field_data;
        switch (type) {
            case "text":
            case "password":
                return renderTextField(name, label, required, type);
            case "select":
                return renderSelectField(
                    name,
                    select_id,
                    label,
                    // required,
                    this.selectItemsForRendering(name, values, items),
                    values[name],
                    // setFieldValue
                    classes.formControl
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

    updateClientImage() {
        this.setState({
            client_image: this.fileInput.current.files[0]
        });
    }

    render() {
        const { classes, createClient, createUser, client, next } = this.props;
        const { name: client_image_name = "" } = this.state.client_image || {};

        return (
            <Query query={getCountryList}>
                {({ loading, error, data: { countries } }) => {
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error! ${error.message}`;
                    console.log(countries);
                    return (
                        <Formik
                            validationSchema={ValidationSchema(countries)}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values);
                                const { client_image } = this.state;
                                const {
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
                                    // country_id,
                                    // postal_country_id,
                                    venueStateId,
                                    postalStateId,

                                    contact_name,
                                    contact_title,
                                    contact_email,
                                    contact_first_phone_number,
                                    contact_second_phone_number,
                                    password
                                    // confirm_password
                                } = values;
                                createClient({
                                    variables: {
                                        input: {
                                            name,
                                            full_company_name,
                                            nature_of_business,
                                            venue_address,
                                            venue_city,
                                            venue_zip_code,
                                            venue_state_id: parseInt(
                                                venueStateId,
                                                DECIMAL_RADIX
                                            ),
                                            postal_address,
                                            postal_city,
                                            postal_zip_code,
                                            postal_state_id: parseInt(
                                                postalStateId,
                                                DECIMAL_RADIX
                                            ),
                                            phone,
                                            email,
                                            number_of_users: 5,
                                            file: client_image
                                        }
                                    }
                                }).then(
                                    ({
                                        data: {
                                            createClient: { id }
                                        }
                                    }) => {
                                        // console.log(data);
                                        const clientId = parseInt(
                                            id,
                                            DECIMAL_RADIX
                                        );
                                        client.writeData({
                                            data: {
                                                new_create_client_id: clientId
                                            }
                                        });
                                        createUser({
                                            variables: {
                                                input: {
                                                    name: contact_name,
                                                    position: contact_title,
                                                    email: contact_email,
                                                    first_phone_number: contact_first_phone_number,
                                                    second_phone_number: contact_second_phone_number,
                                                    password,
                                                    clientId
                                                }
                                            }
                                        }).then(() => {
                                            next && next();
                                        });
                                    }
                                );
                                setSubmitting(false);
                            }}
                        >
                            {({
                                // handleSubmit,
                                // handleChange,
                                // handleBlur,
                                values,
                                errors,
                                // errors
                                // setFieldValue,
                                isSubmitting
                            }) => {
                                return (
                                    <Form>
                                        <ContainerDiv>
                                            <SectionDiv width="50%">
                                                <SectionHeader >Client Info</SectionHeader>
                                                
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
                                                                            select_id,
                                                                            type
                                                                        },
                                                                        field_index

                                                                    ) => (
                                                                        <SubFieldContainerDiv 
                                                                            key={`CLIENT-FIELD=${index}-${field_index}`}

                                                                            flexBasis={
                                                                                flexBasis
                                                                            }
                                                                            marginRight={
                                                                                marginRight
                                                                            }  
                                                                        >
                                                                            <FieldLabel>{label}</FieldLabel>  
                                                                            <ClientFieldDiv>
                                                                       

                                                                                {this.selectRenderMethod(
                                                                                    type,
                                                                                    {
                                                                                        name,
                                                                                       // label,
                                                                                        required,
                                                                                        select_id
                                                                                    },
                                                                                    countries,
                                                                                    values
                                                                                    // setFieldValue
                                                                                )}
                                                                            </ClientFieldDiv>
                                                                            </SubFieldContainerDiv>
                                                                    
                                                                    )
                                                                )}
                                                            </ClientFieldContainerDiv>
                                                        );
                                                    }
                                                )}
                                            </SectionDiv>
                                            <SectionDiv width="25%">
                                            <SectionHeader >Key Contact</SectionHeader>
                                                <FieldContainerDiv>
                                                    {CONTACT_FIELDS.map(
                                                        (
                                                            {
                                                                name,
                                                                label,
                                                                required,
                                                                type
                                                            },
                                                            index
                                                        ) => (
                                                          <SubFieldContainerDiv >  
                                                            <FieldLabel>{(label)}</FieldLabel>
                                                            <FieldDiv
                                                                key={`CONTACT-FIELD-${index}`}
                                                            >
                                                                {renderTextField(
                                                                    name,
                                                                  //  label,
                                                                    required,
                                                                    type
                                                                )}
                                                            </FieldDiv>
                                                          </SubFieldContainerDiv >
                                                        )
                                                    )}
                                                </FieldContainerDiv>
                                            </SectionDiv>
                                            <SectionDiv
                                                width="25%"
                                                height="500px"
                                            >
                                                <SectionHeader >Client Profile Image</SectionHeader>
                                                <div style={{ height: 100 }}>
                                                    <FieldContainerDiv>
                                                        <SubFieldContainerDiv > 
                                                            <FieldLabel>File Name</FieldLabel>
                                                            <FieldDiv>
                                                                <MuiTextField
                                                                     value={
                                                                         client_image_name
                                                                    }
                                                                    disabled={true}
                                                                    fullWidth={true}
                                                                   // label="File Name"
                                                                    variant="outlined"
                                                                 />
                                                            </FieldDiv>
                                                        </SubFieldContainerDiv > 
                                                        <FieldDiv>
                                                            <input
                                                                accept="image/*"
                                                                className={
                                                                    classes.hideFileInput
                                                                }
                                                                ref={
                                                                    this
                                                                        .fileInput
                                                                }
                                                                onChange={
                                                                    this
                                                                        .updateClientImage
                                                                }
                                                                id="upload-client-image"
                                                                type="file"
                                                            />
                                                            <div
                                                                style={{
                                                                    width:
                                                                        "100%",
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "row-reverse"
                                                                }}
                                                            >
                                                                <label htmlFor="upload-client-image">
                                                                    <Button
                                                                        
                                                                        variant="outlined"
                                                                        component="span"
                                                                        className={
                                                                            classes.uploadButton
                                                                        }
                                                                    >
                                                                        Browse
                                                                    </Button>
                                                                </label>
                                                            </div>
                                                        </FieldDiv>
                                                    </FieldContainerDiv>
                                                </div>
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent:
                                                            "flex-end",
                                                        alignItems: "flex-end"
                                                    }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={
                                                            isSubmitting ||
                                                            Object.keys(errors)
                                                                .length > 0 ||
                                                            !Boolean(
                                                                this.state
                                                                    .client_image
                                                            )
                                                        }
                                                    >
                                                        Confirm & Continue
                                                    </Button>
                                                </div>
                                            </SectionDiv>
                                        </ContainerDiv>
                                    </Form>
                                );
                            }}
                        </Formik>
                    );
                }}
            </Query>
        );
    }
}

export default compose(
    withApollo,
    withStyles(styles),
    graphql(CREATE_CLIENT(), { name: "createClient" }),
    graphql(CREATE_USER(), { name: "createUser" })
)(WizardCreateClientPageOne);
