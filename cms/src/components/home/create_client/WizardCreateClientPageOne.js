import React from "react";
import Wizard from "./WizardCreateClient";
import { Field, ErrorMessage } from "formik";

class WizardCreateClientPageOne extends React.Component {
    render() {
        return (
            <Wizard.Page>
                <Field
                    name="venue_name"
                    component="input"
                    type="text"
                    placeholder="Venue Name"
                />
                <ErrorMessage name="venue_name" component="div" />
            </Wizard.Page>
        );
    }
}

export default WizardCreateClientPageOne;
