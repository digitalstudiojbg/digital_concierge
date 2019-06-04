import * as Yup from "yup";
import { CHECK_FORM_NAMES } from "./constants";

export const CheckReservationValidationSchema = Yup.object().shape({
    [CHECK_FORM_NAMES.firstname]: Yup.string().required("First name is required field"),
    [CHECK_FORM_NAMES.lastname]: Yup.string().required("Last name is required field"),
    [CHECK_FORM_NAMES.email]: Yup.string().email().required("Email is required field"),
    [CHECK_FORM_NAMES.primaryNumber]: Yup.number().required("Primary number is required field"),
    [CHECK_FORM_NAMES.secondaryNumber]: Yup.number(),
});

export const CheckSchema = Yup.object().shape({
    [CHECK_FORM_NAMES.guestCount]: Yup.number().required("Guest count is required field"),
    [CHECK_FORM_NAMES.roomNumber]: Yup.number().required("Room number is required field"),
}).concat(CheckReservationValidationSchema);
