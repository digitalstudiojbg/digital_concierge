import * as Yup from "yup";

const requiredErrorMessage = "Required";

export default Yup.object().shape({
    //Client validation
    name: Yup.string().required(requiredErrorMessage),
    aif_boolean: Yup.string().required(requiredErrorMessage),
    device_type: Yup.string().required(requiredErrorMessage),
    numberOfDevices: Yup.number().required(requiredErrorMessage),
    system_type: Yup.string().required(requiredErrorMessage)
});
