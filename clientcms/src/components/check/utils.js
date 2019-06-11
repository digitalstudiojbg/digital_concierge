import pick from "lodash/pick";
import omit from "lodash/omit";
import { CHECK_FORM_NAMES } from "./constants";
import dayjs from "dayjs";

const CHECK_GUEST_FIELDS = [
    CHECK_FORM_NAMES.firstname,
    CHECK_FORM_NAMES.lastname,
    CHECK_FORM_NAMES.primaryNumber,
    CHECK_FORM_NAMES.secondaryNumber,
    CHECK_FORM_NAMES.email,
];

export const pickGuest = (obj) => pick(
    obj,
    CHECK_GUEST_FIELDS,
);

export const pickGuestRoom = (obj) => {
    const room = obj && obj.guest_rooms && obj.guest_rooms[obj.guest_rooms.length - 1];

    if (!room) {
        return null;
    }

    const result = pick(room, [
        CHECK_FORM_NAMES.checkOutDate,
        CHECK_FORM_NAMES.checkInDate,
        CHECK_FORM_NAMES.guestCount,
    ]);

    result[CHECK_FORM_NAMES.roomNumber] = room.room.number;
    result[CHECK_FORM_NAMES.checkInDate] = dayjs(result[CHECK_FORM_NAMES.checkInDate]);
    result[CHECK_FORM_NAMES.checkOutDate] = dayjs(result[CHECK_FORM_NAMES.checkOutDate]);

    result[CHECK_FORM_NAMES.checkInDateTime] = result[CHECK_FORM_NAMES.checkInDate];
    result[CHECK_FORM_NAMES.checkOutDateTime] = result[CHECK_FORM_NAMES.checkOutDate];

    return result;
};

const setMinutesAndHours = (date1, date2) => {
    let date = date1.clone();
    date = date.set("hour", date2.hour());
    date = date.set("minute", date2.minute());
    return date;
};

export const createCheckInFormData = (obj, isRemoveGuestData) => {
    obj[CHECK_FORM_NAMES.checkInDate] = setMinutesAndHours(
        obj[CHECK_FORM_NAMES.checkInDate],
        obj[CHECK_FORM_NAMES.checkInDateTime],
    );

    obj[CHECK_FORM_NAMES.checkOutDate] = setMinutesAndHours(
        obj[CHECK_FORM_NAMES.checkOutDate],
        obj[CHECK_FORM_NAMES.checkOutDateTime],
    );

    return omit(
        obj,
        [
            CHECK_FORM_NAMES.checkOutDateTime,
            CHECK_FORM_NAMES.checkInDateTime,
            ...(isRemoveGuestData ? CHECK_GUEST_FIELDS : [])
        ],
    );
};

export const getErrorMessage = (err) => err && (err.graphQLErrors &&  err.graphQLErrors[0]
    ? err.graphQLErrors[0].message
    : err.message);
