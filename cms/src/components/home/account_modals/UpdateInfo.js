import React from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const FormContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FieldContainerDiv = styled.div`
    width: 75%;
    margin-top: 10px;
    margin-bottom: 10px;
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

const ClientInfoSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    full_company_name: Yup.string(),
    nature_of_business: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    postal_address: Yup.string(),
    phone: Yup.string().required("Required"),
    email: Yup.string()
        .email()
        .required("Required")
});

const FIELDS = [
    { name: "name", label: "Business Trading Name", required: true },
    { name: "full_company_name", label: "Full Company Name", required: false },
    { name: "nature_of_business", label: "Nature Of Business", required: true },
    { name: "address", label: "Business Location Address", required: true },
    { name: "postal_address", label: "Postal Address", required: false },
    { name: "phone", label: "Phone Number", required: true },
    { name: "email", label: "Email Address", required: true }
];

const UpdateInfo = ({
    data: {
        name = "",
        full_company_name = "",
        nature_of_business = "",
        address = "",
        postal_address = "",
        phone = "",
        email = ""
    }
}) => (
    <Formik
        initialValues={{
            name,
            full_company_name,
            nature_of_business,
            address,
            postal_address,
            phone,
            email
        }}
        onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            alert("TO DO SUBMIT");
            setSubmitting(false);
        }}
        validationSchema={ClientInfoSchema}
    >
        <Form>
            <FormContainerDiv>
                {FIELDS.map((item, index) => (
                    <FieldContainerDiv key={`Modal=Info-${index}`}>
                        {renderTextField(item.name, item.label, item.required)}
                    </FieldContainerDiv>
                ))}
                <Button type="submit" variant="outlined" size="large">
                    UPDATE
                </Button>
            </FormContainerDiv>
        </Form>
    </Formik>
);

export default UpdateInfo;
