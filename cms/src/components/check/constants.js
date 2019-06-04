/* TODO: Hardcode clientId for hotel */
import proxyEnum from "../../utils/proxyEnum";
import dayjs from "dayjs";

export const CHECK_HARDCODE_CLIENT_ID = 1;
export const CHECK_HARDCODE_PIN = 1111;
export const CHECK_HARDCODE_ACTIVE = 0;

export const CHECK_OUT_DATE_FORMAT = "DD MMMM YYYY, hh:mm a";

/**
 * A person object with a name and age.
 * @typedef {Object<string, string>} CheckFormNames
 * @property {string} roomNumber
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} primaryNumber
 * @property {string} secondaryNumber
 * @property {string} email
 * @property {string} checkOutBasename
 * @property {string} checkOutDate
 * @property {string} checkOutDateTime
 * @property {string} checkInBasename
 * @property {string} checkInDate
 * @property {string} checkInDateTime
 * @property {string} guestCount
 * @property {string} guestId
 * @property {string} clientId
 * @property {string} pin
 * @property {string} active
 */
/**
 * @type {CheckFormNames} CHECK_FORM_NAMES
 */
export const CHECK_FORM_NAMES = proxyEnum({
    roomNumber: "room_number",
    firstname: "firstname",
    lastname: "lastname",
    primaryNumber: "primary_number",
    secondaryNumber: "secondary_number",
    email: "email",

    checkOutBasename: "checkout",
    checkOutDate: "checkout_date",
    checkOutDateTime: "checkout_date_time",

    checkInBasename: "checkin",
    checkInDate: "checkin_date",
    checkInDateTime: "checkin_date_time",

    guestCount: "guest_count",
    guestId: "guestId",
    clientId: "clientId",
    pin: "pin",
    active: "active",
});

export const CHECK_INITIAL_DATE = dayjs(new Date());
const NEXT_DAY = CHECK_INITIAL_DATE.clone().add(3, "day");

export const CheckInitialValues = {
    [CHECK_FORM_NAMES.roomNumber]: "",
    [CHECK_FORM_NAMES.firstname]: "",
    [CHECK_FORM_NAMES.lastname]: "",
    [CHECK_FORM_NAMES.primaryNumber]: "",
    [CHECK_FORM_NAMES.secondaryNumber]: "",
    [CHECK_FORM_NAMES.email]: "",
    [CHECK_FORM_NAMES.checkOutDate]: NEXT_DAY,
    [CHECK_FORM_NAMES.checkOutDateTime]: NEXT_DAY,
    [CHECK_FORM_NAMES.checkInDate]: CHECK_INITIAL_DATE,
    [CHECK_FORM_NAMES.checkInDateTime]: CHECK_INITIAL_DATE,
    [CHECK_FORM_NAMES.guestCount]: 2,
    [CHECK_FORM_NAMES.clientId]: CHECK_HARDCODE_CLIENT_ID,
    [CHECK_FORM_NAMES.pin]: CHECK_HARDCODE_PIN,
    [CHECK_FORM_NAMES.active]: CHECK_HARDCODE_ACTIVE,
};
