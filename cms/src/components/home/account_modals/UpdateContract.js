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

const ContractSchema = Yup.object().shape({
    number: Yup.string().required("Required"),
    packageName: Yup.string().required("Required"),
    term_month: Yup.string().required("Required"),
    renewal_date: Yup.date().required("Required"),
    annual_fee: Yup.string().required("Required")
});

const FIELDS = [
    { name: "number", label: "Contract Number", required: true },
    { name: "packageName", label: "Package Name", required: true },
    { name: "term_month", label: "Contract Term", required: true },
    { name: "annual_fee", label: "Annual Fee", required: true }
];

const UpdateContract = ({
    data: {
        active_contract: {
            number = "",
            packageName = "",
            term_month = "",
            annual_fee = ""
        }
    }
}) => (
    <Formik
        initialValues={{
            number,
            packageName,
            term_month,
            annual_fee
        }}
        onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            alert("TO DO SUBMIT");
            setSubmitting(false);
        }}
        validationSchema={ContractSchema}
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

export default UpdateContract;
