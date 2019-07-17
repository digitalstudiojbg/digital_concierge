import * as Yup from "yup";

const requiredErrorMessage = "Required";

const equalTo = (ref, msg) => {
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
};

Yup.addMethod(Yup.string, "equalTo", equalTo);

export const createUserSchema = Yup.object().shape({
    //create user validation
    name: Yup.string().required(requiredErrorMessage),
    email: Yup.string()
        .email("Incorrect email format")
        .required(requiredErrorMessage),
    departmentId: Yup.string().required(requiredErrorMessage),
    roleId: Yup.string().required(requiredErrorMessage),
    password: Yup.string().required(requiredErrorMessage),
    confirm_password: Yup.string()
        .equalTo(Yup.ref("password"), "Passwords must match")
        .required(requiredErrorMessage),
    active: Yup.number()
        .oneOf([0, 1])
        .required(requiredErrorMessage)
});

export const modifyUserSchema = Yup.object().shape({
    //edit user validation
    id: Yup.string().required(requiredErrorMessage),
    name: Yup.string().required(requiredErrorMessage),
    email: Yup.string()
        .email("Incorrect email format")
        .required(requiredErrorMessage),
    departmentId: Yup.string().required(requiredErrorMessage),
    roleId: Yup.string().required(requiredErrorMessage),
    password: Yup.string(),
    confirm_password: Yup.string().equalTo(
        Yup.ref("password"),
        "Passwords must match"
    ),
    active: Yup.number()
        .oneOf([0, 1])
        .required(requiredErrorMessage)
});
