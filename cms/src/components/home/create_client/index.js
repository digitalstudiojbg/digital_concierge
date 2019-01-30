import React from "react";
import WizardCreateClient from "./WizardCreateClient";
import WizardCreateClientPageOne from "./WizardCreateClientPageOne";
import WizardCreateClientPageTwo from "./WizardCreateClientPageTwo";

const initialValues = {
    venue_name: "NEAL's HOTEL",
    nature_of_business: "HOTEL BBQ",
    venue_phone: "",
    venue_email: "",
    venue_address: "",
    venue_city: "",
    venue_postcode: "",
    venue_state: null,
    venue_country: null,
    venue_postal_address: "",
    venue_postal_city: "",
    venue_postal_postcode: "",
    venue_postal_state: null,
    venue_postal_country: null,
    contact_name: "",
    contact_position: "",
    contact_email: "",
    contact_phone: "",
    contact_mobile: ""
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const CreateClient = () => (
    <div>
        CREATE CLIENT PAGE
        <WizardCreateClient
            onSubmit={(values, actions) => {
                sleep(300).then(() => {
                    window.alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                });
            }}
            initialValues={{ ...initialValues }}
        >
            <WizardCreateClientPageOne />
            <WizardCreateClientPageTwo />
        </WizardCreateClient>
    </div>
);

export default CreateClient;
