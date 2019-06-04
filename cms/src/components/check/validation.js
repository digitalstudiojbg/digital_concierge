import * as Yup from "yup";
import { CHECK_FORM_NAMES } from "./constants";

export const CheckReservationValidationSchema = Yup.object().shape({
    [CHECK_FORM_NAMES.firstname]: Yup.string().required("First name is required"),
    [CHECK_FORM_NAMES.lastname]: Yup.string().required("Last name is required"),
    [CHECK_FORM_NAMES.email]: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
    [CHECK_FORM_NAMES.primaryNumber]: Yup.number()
        .typeError("Phone is not valid")
        .required("Primary number is required"),
    [CHECK_FORM_NAMES.secondaryNumber]: Yup.number("Phone is not valid"),
});

export const CheckSchema = Yup.object().shape({
    [CHECK_FORM_NAMES.guestCount]: Yup.number()
        .integer()
        .positive("Guest count must be positive")
        .typeError("Guest count is not valid")
        .required("Guest count is required"),
    [CHECK_FORM_NAMES.roomNumber]: Yup.number()
        .integer()
        .positive("Room number must be positive")
        .typeError("Room number is not valid")
        .required("Room number is required"),
}).concat(CheckReservationValidationSchema);
