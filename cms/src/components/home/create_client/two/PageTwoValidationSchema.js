import * as Yup from "yup";

const requiredErrorMessage = "Required";

export default Yup.object().shape({
    //Client validation
    license_key: Yup.string().required(requiredErrorMessage),
    license_type: Yup.string().required(requiredErrorMessage),
    commence_date: Yup.string().required(requiredErrorMessage),
    expire_date: Yup.string().required(requiredErrorMessage),
    auto_renewal: Yup.string().required(requiredErrorMessage),
    agreement_number: Yup.string().required(requiredErrorMessage),
    agreement_date: Yup.string().required(requiredErrorMessage),
    agreement_renewal_date: Yup.string().required(requiredErrorMessage)
});
