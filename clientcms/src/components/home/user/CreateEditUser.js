import React from "react";
import PropTypes from "prop-types";
import CustomSaveButton from "../../../utils/CustomSaveButton";
import { ContainerDiv } from "../../../utils/Constants";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import { OutlinedInput, MenuItem } from "@material-ui/core";
import { FieldContainerDiv, FieldLabel } from "./commonStyle";

const ContainerDivModified = styled(ContainerDiv)`
    padding-left: 50px;
    display: flex;
    flex-direction: column;
`;

const FormContainerDiv = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

const SectionDiv = styled.div`
    width: ${props => props.width};
    height: ${props => (Boolean(props.height) ? props.height : "100%")};
    display: flex;
    flex-direction: column;
    padding: 0 4%;
    border-right: ${props => (props.withBorder ? "1px solid #DDDDDD" : "none")};
`;

const SECTION_ONE_FIELDS = [
    {
        name: "name",
        label: "USER",
        required: true,
        type: "text"
    },
    {
        name: "email",
        label: "EMAIL",
        required: true,
        type: "text"
    }
];
const SECTION_TWO_FIELDS = ({ departmentList, roleList }) => [
    {
        name: "department",
        label: "DEPARTMENT",
        type: "select",
        required: true,
        optionList: departmentList
    },
    {
        name: "role",
        label: "ROLE",
        type: "select",
        required: true,
        optionList: roleList
    }
];
const SECTION_THREE_FIELDS = [
    {
        name: "password",
        label: "PASSWORD",
        required: false,
        type: "password"
    },
    {
        name: "confirm_password",
        label: "CONFIRM PASSWORD",
        required: false,
        type: "password"
    },
    {
        name: "active",
        label: "STATUS",
        type: "select",
        required: true
    }
];

const styles = () => ({
    textInput: {
        padding: "12px 10px",
        backgroundColor: "white"
    }
});

class CreateEditUser extends React.Component {
    renderTextField = (name, label, required, type) => (
        <FieldContainerDiv style={{ width: "100%" }}>
            <FieldLabel>{label}</FieldLabel>
            <Field
                name={name}
                required={required}
                type={type}
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

    renderSelectField = (nameValue, label, optionList) => {
        // console.log(optionList);

        return (
            <React.Fragment>
                <FieldLabel
                    style={{
                        color: "#5c5c5c",
                        fontsize: "10px",
                        marginbottom: "5px"
                    }}
                >
                    {label}
                </FieldLabel>
                <Field
                    style={{
                        height: 43,
                        backgroundColor: "white"
                    }}
                    name={nameValue}
                    component={Select}
                    disabled={optionList.length < 1}
                    fullWidth={true}
                    input={<OutlinedInput />}
                >
                    <MenuItem value="null" disabled>
                        {label}
                    </MenuItem>
                    {optionList.map(({ id, name }, index) => (
                        <MenuItem
                            key={`ITEM-${name}-${id}-${index}`}
                            value={id}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Field>
            </React.Fragment>
        );
    };

    renderField(fieldData) {
        const { type, name, label, required } = fieldData;
        if (type === "text" || type === "password") {
            return this.renderTextField(name, label, required, type);
        }
    }
    renderHeaderSection() {
        const { match = {} } = this.props;
        const { params = {} } = match;
        const { user_id = "" } = params;
        const headerText = user_id === "new" ? "CREATE USER" : "MODIFY USER";
        return (
            <div style={{ width: "100%", height: 100, display: "flex" }}>
                <div style={{ width: "90%" }}>{headerText}</div>
                <div
                    style={{
                        width: "10%",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <CustomSaveButton
                        options={[
                            {
                                label: "SAVE & EXIT",
                                action: () => alert("SAVE & EXIT")
                            },
                            {
                                label: "SAVE & KEEP EDITING",
                                action: () => alert("SAVE & KEEP EDITING")
                            }
                        ]}
                    />
                </div>
            </div>
        );
    }
    renderFormSection() {
        return (
            <FormContainerDiv>
                <SectionDiv width="33%" withBorder>
                    {this.renderSectionOne()}
                </SectionDiv>
                <SectionDiv width="33%" withBorder>
                    SECTION TWO
                </SectionDiv>
                <SectionDiv width="33%">SECTION THREE</SectionDiv>
            </FormContainerDiv>
        );
    }
    renderSectionOne() {
        return (
            <React.Fragment>
                {SECTION_ONE_FIELDS.map((fieldData, index) => (
                    <React.Fragment key={`SECTION-ONE-${index}`}>
                        {this.renderField(fieldData)}
                    </React.Fragment>
                ))}
            </React.Fragment>
        );
    }
    render() {
        return (
            <ContainerDivModified>
                <Formik>
                    {() => (
                        <Form>
                            {this.renderHeaderSection()}
                            {this.renderFormSection()}
                        </Form>
                    )}
                </Formik>
            </ContainerDivModified>
        );
    }
}

CreateEditUser.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            action: PropTypes.func.isRequired
        })
    ).isRequired
};

export default withStyles(styles)(CreateEditUser);
