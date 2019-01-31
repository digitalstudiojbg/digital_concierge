import React from "react";
import styled from "styled-components";
import { Query, withApollo } from "react-apollo";
import Loading from "../../loading/Loading";
import { Formik, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getCountryList } from "../../../data/query";

//FIELDS IMPORTING
import CLIENT_FIELDS from "./one/ClientFields";

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
    }
});

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
        values = {}
        // setFieldValue = null
    ) {
        const { classes } = this.props;
        const { name, label, required, select_id } = field_data;
        switch (type) {
            case "text":
                return renderTextField(name, label, required);
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
                                values
                                // errors
                                // setFieldValue
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
                                                                    select_id,
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
                                                                            required,
                                                                            select_id
                                                                        },
                                                                        countries,
                                                                        values
                                                                        // setFieldValue
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

export default withApollo(withStyles(styles)(WizardCreateClientPageOne));
