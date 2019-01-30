import React from "react";
import Wizard from "./WizardCreateClient";
import { Field, ErrorMessage } from "formik";

class WizardCreateClientPageTwo extends React.Component {
    render() {
        return (
            <Wizard.Page>
                <Field
                    name="nature_of_business"
                    component="input"
                    type="text"
                    placeholder="Nature of Business"
                />
                <ErrorMessage name="nature_of_business" component="div" />
            </Wizard.Page>
        );
    }
}

export default WizardCreateClientPageTwo;
