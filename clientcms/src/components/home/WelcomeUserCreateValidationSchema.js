import * as Yup from "yup";

const requiredErrorMessage = "Required";

export default Yup.object().shape({
    //Client validation
    name: Yup.string().required(requiredErrorMessage),
    email: Yup.string()
        .email("Incorrect email format")
        .required(requiredErrorMessage),
    password: Yup.string().required(requiredErrorMessage),
    confirm_password: Yup.string()
        .equalTo(Yup.ref("password"), "Passwords must match")
        .required(requiredErrorMessage),
    department: Yup.string().required(requiredErrorMessage)
});
