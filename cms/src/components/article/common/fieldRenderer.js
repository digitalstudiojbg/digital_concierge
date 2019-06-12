import React from "react";
import { FormLabelDiv } from "./commonStyle";
import { Field } from "formik";
import { Select, TextField } from "formik-material-ui";
import { OutlinedInput, MenuItem } from "@material-ui/core";
import SelectOriginal from "@material-ui/core/Select";
import { isEmpty } from "lodash";

export const renderSelectField = (name, label, optionValues, errors) => (
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

export const renderSelectFieldCustom = (
    name,
    label,
    optionValues,
    errors,
    values,
    onChange
) => (
    <div style={{ width: "100%" }}>
        {label.length > 0 && <FormLabelDiv>{label}</FormLabelDiv>}
        <SelectOriginal
            name={name}
            disabled={optionValues.length < 1}
            fullWidth={true}
            input={
                <OutlinedInput
                    labelWidth={0}
                    name={name}
                    error={!isEmpty(errors) && errors[name]}
                />
            }
            onChange={onChange}
            value={values[name]}
        >
            {optionValues.map(({ id, name }, index) => (
                <MenuItem key={`ITEM-${name}-${id}-${index}`} value={id}>
                    {name}
                </MenuItem>
            ))}
        </SelectOriginal>
    </div>
);

export const renderTextField = (name, label, required) => (
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
