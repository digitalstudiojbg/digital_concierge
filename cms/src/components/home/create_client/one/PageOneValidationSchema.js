import * as Yup from "yup";

const requiredErrorMessage = "Required";

//Yup confirm password === password
//https://github.com/jaredpalmer/formik/issues/90#issuecomment-317804880
function equalTo(ref, msg) {
    return Yup.mixed().test({
        name: "equalTo",
        exclusive: false,
        message: msg || `${ref.path} must be the same as ${ref.reference}`,
        params: {
            reference: ref.path
        },
        test: function(value) {
            return value === this.resolve(ref);
        }
    });
}
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

Yup.addMethod(Yup.string, "equalTo", equalTo);
Yup.addMethod(Yup.string, "validState", validState);

export default countries =>
    Yup.object().shape({
        //Client validation
        name: Yup.string().required(requiredErrorMessage),
        full_company_name: Yup.string().required(requiredErrorMessage),
        nature_of_business: Yup.string().required(requiredErrorMessage),
        phone: Yup.string()
            .required(requiredErrorMessage)
            .matches(
                /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
                "Phone number is not valid"
            ),
        email: Yup.string()
            .email("Incorrect email format")
            .required(requiredErrorMessage),
        venue_address: Yup.string().required(requiredErrorMessage),
        postal_address: Yup.string().required(requiredErrorMessage),
        venue_city: Yup.string().required(requiredErrorMessage),
        venue_zip_code: Yup.string().notRequired(),
        postal_city: Yup.string().required(requiredErrorMessage),
        postal_zip_code: Yup.string().notRequired(),
        country_id: Yup.string().required(requiredErrorMessage),
        postal_country_id: Yup.string().required(requiredErrorMessage),
        venueStateId: Yup.string()
            .validState(Yup.ref("country_id"), "Invalid State", countries)
            .required(requiredErrorMessage),
        postalStateId: Yup.string()
            .validState(
                Yup.ref("postal_country_id"),
                "Invalid State",
                countries
            )
            .required(requiredErrorMessage),

        //Contact validation
        contact_name: Yup.string().required(requiredErrorMessage),
        contact_title: Yup.string().required(requiredErrorMessage),
        contact_email: Yup.string()
            .email()
            .required(requiredErrorMessage),
        contact_first_phone_number: Yup.string()
            .required(requiredErrorMessage)
            .matches(
                /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
                "Phone number is not valid"
            ),
        contact_second_phone_number: Yup.string()
            .required(requiredErrorMessage)
            .matches(
                /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
                "Phone number is not valid"
            ),
        password: Yup.string()
            .required(requiredErrorMessage)
            .min(4),
        confirm_password: Yup.string()
            .equalTo(Yup.ref("password"), "Passwords must match")
            .required(requiredErrorMessage)
    });
