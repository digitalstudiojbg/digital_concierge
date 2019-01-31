import * as Yup from "yup";

const requiredErrorMessage = "Required";

//Yup confirm password === password
//https://github.com/jaredpalmer/formik/issues/90#issuecomment-317804880
function equalTo(ref, msg) {
    return Yup.mixed().test({
        name: "equalTo",
        exclusive: false,
        message: msg || "${path} must be the same as ${reference}",
        params: {
            reference: ref.path
        },
        test: function(value) {
            return value === this.resolve(ref);
        }
    });
}
Yup.addMethod(Yup.string, "equalTo", equalTo);

export default Yup.object().shape({
    //Client validation
    name: Yup.string().required(requiredErrorMessage),
    full_company_name: Yup.string().required(requiredErrorMessage),
    nature_of_business: Yup.string().required(requiredErrorMessage),
    phone: Yup.string().required(requiredErrorMessage),
    email: Yup.string()
        .email()
        .required(requiredErrorMessage),
    venue_address: Yup.string().required(requiredErrorMessage),
    postal_address: Yup.string().required(requiredErrorMessage),
    venue_city: Yup.string().required(requiredErrorMessage),
    venue_zip_code: Yup.string().required(requiredErrorMessage),
    postal_city: Yup.string().required(requiredErrorMessage),
    postal_zip_code: Yup.string().required(requiredErrorMessage),
    country_id: Yup.string().required(requiredErrorMessage),
    postal_country_id: Yup.string().required(requiredErrorMessage),
    venueStateId: Yup.string().required(requiredErrorMessage),
    postalStateId: Yup.string().required(requiredErrorMessage),

    //Contact validation
    contact_name: Yup.string().required(requiredErrorMessage),
    contact_title: Yup.string().required(requiredErrorMessage),
    contact_email: Yup.string()
        .email()
        .required(requiredErrorMessage),
    contact_first_phone_number: Yup.string().required(requiredErrorMessage),
    contact_second_phone_number: Yup.string().required(requiredErrorMessage),
    password: Yup.string().required(requiredErrorMessage),
    confirm_password: Yup.string()
        .equalTo(Yup.ref("password"), "Passwords must match")
        .required(requiredErrorMessage)
});
