import * as Yup from "yup";

const requiredErrorMessage = "Required";

function validState(ref, message, countries) {
    return Yup.mixed().test({
        name: "validState",
        exclusive: false,
        message: message,
        test: function(value) {
            const country_id = this.resolve(ref);
            const country = countries.find(({ id }) => id === country_id);
            const state = Boolean(country)
                ? country.states.find(({ id }) => id === value)
                : null;
            return Boolean(state);
        }
    });
}

Yup.addMethod(Yup.string, "validState", validState);

export default countries => {
    console.log(countries);
    return Yup.object().shape({
        //Advertiser validation
        name: Yup.string().required(requiredErrorMessage),
        nature_of_business: Yup.string().required(requiredErrorMessage),
        phone: Yup.string().required(requiredErrorMessage),
        email: Yup.string()
            .email("Incorrect email format")
            .required(requiredErrorMessage),
        address: Yup.string().required(requiredErrorMessage),
        postal_address: Yup.string().required(requiredErrorMessage),
        city: Yup.string().required(requiredErrorMessage),
        zip_code: Yup.string().required(requiredErrorMessage),
        postal_city: Yup.string().required(requiredErrorMessage),
        postal_zip_code: Yup.string().required(requiredErrorMessage),
        countryId: Yup.string().required(requiredErrorMessage),
        postalCountryId: Yup.string().required(requiredErrorMessage),
        stateId: Yup.string()
            .validState(Yup.ref("countryId"), "Invalid State", countries)
            .required(requiredErrorMessage),
        postalStateId: Yup.string()
            .validState(Yup.ref("postalCountryId"), "Invalid State", countries)
            .required(requiredErrorMessage),

        //Contacts validation
        contacts: Yup.array()
            .of(
                Yup.object({
                    email: Yup.string()
                        .email("Incorrect email format")
                        .required(requiredErrorMessage),
                    mobile: Yup.string(),
                    name: Yup.string().required(requiredErrorMessage),
                    phone: Yup.string().required(requiredErrorMessage),
                    title: Yup.string().required(requiredErrorMessage)
                })
            )
            .min(1)
            .required(requiredErrorMessage)
    });
};
