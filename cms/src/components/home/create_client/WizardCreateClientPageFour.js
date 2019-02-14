import React from "react";
import MediaLibrary from "../../../utils/MediaLibrary";
import { getCurrentUserQuery as query } from "../../../data/query";
import { withApollo } from "react-apollo";
import { getNewCreatedClientId } from "../../../data/query";
import Loading from "../../loading/Loading";
//import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import {
    TextField,
    fieldToTextField,
    Select,
    RadioGroup,
    Checkbox
} from "formik-material-ui";
import styled from "styled-components";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormControlLabel, Radio, Button } from "@material-ui/core";

const FiledContainer = styled.div`
    padding-bottom: 20px;
`;

class WizardCreateClientPageFour extends React.Component {
    renderAddSystem() {
        return (
            <div
                style={{
                    width: "33%",
                    padding: "20px 20px 20px 0"
                }}
            >
                <h1>Add System</h1>
                <FiledContainer>
                    <Field
                        name="name"
                        label="SYSTEM NAME"
                        required={true}
                        type="text"
                        component={TextField}
                        variant="outlined"
                        fullWidth={true}
                    />
                </FiledContainer>
                <FiledContainer>
                    <Field
                        name="aif_boolean"
                        label="AIF"
                        required={true}
                        color="primary"
                        component={RadioGroup}
                        variant="outlined"
                        fullWidth={true}
                    >
                        <FormControlLabel
                            value="yes"
                            control={<Radio color="primary" />}
                            label="Yes"
                        />
                        <FormControlLabel
                            value="no"
                            control={<Radio color="primary" />}
                            label="No"
                        />
                    </Field>
                </FiledContainer>
                <FiledContainer>
                    <Field
                        name="numberOfDevices"
                        label="NUMBER OF DEVICES"
                        required={true}
                        type="text"
                        component={TextField}
                        variant="outlined"
                        fullWidth={true}
                    />
                </FiledContainer>
            </div>
        );
    }

    render() {
        const { client } = this.props;
        const { getCurrentUser: user } = client.readQuery({ query });

        /* try {
            client.readQuery({
                query: getNewCreatedClientId
            });
        } catch {
            return (
                <React.Fragment>
                    <h1>Can't Find ClientId From Step 1</h1>
                    <Loading />
                </React.Fragment>
            );
        }*/

        return (
            <Formik
                initialValues={{}}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log("On-submit");
                }}
                render={({ errors, values, isSubmitting }) => {
                    console.log(errors);
                    return (
                        <Form>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                {this.renderAddSystem()}

                                <div
                                    style={{
                                        width: "33%",
                                        padding: "20px 20px 20px 0"
                                    }}
                                >
                                    <h1>Feature</h1>
                                </div>
                                <div
                                    style={{
                                        width: "33%",
                                        padding: "20px 20px 20px 0"
                                    }}
                                >
                                    <h1>All Client System</h1>
                                </div>
                            </div>
                            <div
                                style={{
                                    paddingBottom: "20px"
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={
                                        isSubmitting ||
                                        Object.keys(errors).length > 0 ||
                                        !values.license_type
                                    }
                                >
                                    CONFIRM & CONTINUE
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            />
        );
    }
}

export default withApollo(WizardCreateClientPageFour);
