import * as Yup from "yup";
import { Set } from "immutable";

const requiredErrorMessage = "Required";

export const createRoleSchema = Yup.object().shape({
    //create role validation
    name: Yup.string().required(requiredErrorMessage),
    departmentId: Yup.string().required(requiredErrorMessage),
    permissionIds: Yup.mixed()
        .test(
            "correct-data-type",
            "Permission IDs has to be a Set type",
            value => Set.isSet(value)
        )
        .test(
            "correct-set-length",
            "Permission IDs has to be greater than zero",
            value => value.size > 0
        )
        .required(requiredErrorMessage)
});

export const modifyRoleSchema = Yup.object().shape({
    //edit role validation
    id: Yup.string().required(requiredErrorMessage),
    name: Yup.string().required(requiredErrorMessage),
    departmentId: Yup.string().required(requiredErrorMessage),
    permissionIds: Yup.mixed()
        .test(
            "correct-data-type",
            "Permission IDs has to be a Set type",
            value => Set.isSet(value)
        )
        .test(
            "correct-set-length",
            "Permission IDs has to be greater than zero",
            value => value.size > 0
        )
        .required(requiredErrorMessage)
});
