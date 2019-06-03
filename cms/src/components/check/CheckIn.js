import React, { useState } from 'react';
import Box from "@material-ui/core/Box";
import { Form, Formik } from "formik"
import * as Yup from 'yup';
import dayjs from "dayjs";
import pick from "lodash/pick";
import omit from "lodash/omit";

import CheckGuestInfo from "./components/CheckGuestInfo";
import CheckReservation from "./components/CheckReservation";
import CheckTimeForm from "./components/CheckTimeForm";
import CheckAutocomplete from "./components/CheckGuestsAutocomplete";
import CheckTextField from "./components/CheckTextField";
import { CheckCol, CheckSubmitButton } from "./components/styled";
import mutationCreateGuestRoom from "./query/mutationCreateGuestRoom";
import { CheckReservationValidationSchema } from "./components/CheckReservation/CheckReservation";
import mutationNewGuestCheckIn from "./query/mutationNewGuestCheckIn";
import { compose, graphql, withApollo } from "react-apollo";
import {
    CHECK_FORM_NAMES,
    CHECK_HARDCODE_ACTIVE,
    CHECK_HARDCODE_CLIENT_ID,
    CHECK_HARDCODE_PIN
} from "./constants";

const NOW = dayjs(new Date());
const NEXT_DAY = NOW.clone().add(3, "day");

const CheckInSchema = Yup.object().shape({
    [CHECK_FORM_NAMES.guestCount]: Yup.number().required(),
    [CHECK_FORM_NAMES.roomNumber]: Yup.number().required(),
}).concat(CheckReservationValidationSchema);

const CheckInInitialValues = {
    [CHECK_FORM_NAMES.roomNumber]: "",
    [CHECK_FORM_NAMES.firstname]: "",
    [CHECK_FORM_NAMES.lastname]: "",
    [CHECK_FORM_NAMES.primaryNumber]: "",
    [CHECK_FORM_NAMES.secondaryNumber]: "",
    [CHECK_FORM_NAMES.email]: "",
    [CHECK_FORM_NAMES.checkOutDate]: NEXT_DAY,
    [CHECK_FORM_NAMES.checkOutDateTime]: NEXT_DAY,
    [CHECK_FORM_NAMES.checkInDate]: NOW,
    [CHECK_FORM_NAMES.checkInDateTime]: NOW,
    [CHECK_FORM_NAMES.guestCount]: 2,
    [CHECK_FORM_NAMES.clientId]: CHECK_HARDCODE_CLIENT_ID,
    [CHECK_FORM_NAMES.pin]: CHECK_HARDCODE_PIN,
    [CHECK_FORM_NAMES.active]: CHECK_HARDCODE_ACTIVE,
};

const GuestFields = [
    CHECK_FORM_NAMES.firstname,
    CHECK_FORM_NAMES.lastname,
    CHECK_FORM_NAMES.primaryNumber,
    CHECK_FORM_NAMES.secondaryNumber,
    CHECK_FORM_NAMES.email,
];

const pickGuestData = (obj) => pick(
    obj,
    GuestFields,
);

const transformData = (obj, isRemoveUserData) => omit(
    obj,
    [
        CHECK_FORM_NAMES.checkOutDateTime,
        CHECK_FORM_NAMES.checkInDateTime,
        ...(isRemoveUserData ? GuestFields : [])
    ],
);

const CheckIn = ({ mutationNewGuestCheckIn, mutationCreateGuestRoom }) => {
    const [user, setUser] = useState(false);

    return (
        <Formik
            validationSchema={CheckInSchema}
            validateOnBlur={false}
            onSubmit={(fd) => {
                if (user) {
                    mutationCreateGuestRoom({
                        variables: {
                            input: {
                                ...transformData(fd, true),
                                guestId: +user.id
                            },
                        }
                    })
                } else {
                    mutationNewGuestCheckIn({ variables: { input: transformData(fd) } });
                }
            }}
            initialValues={CheckInInitialValues}
            render={({ setValues, values }) => (
                <Form>
                    <Box width={900}>
                        <CheckTextField
                            label="SEARCH GUEST REGISTER"
                            name="guest"
                            onSelect={(data) => {
                                !user && setUser(data);
                                setValues({...pickGuestData(data), ...values});
                            }}
                            onUnselect={() => user && setUser(null)}
                            Component={CheckAutocomplete}
                        />
                    </Box>

                    <Box display="flex">
                        <CheckCol width={390}>
                            <CheckGuestInfo />

                            <CheckReservation isDisabled={user} />
                        </CheckCol>

                        <CheckCol
                            width={510}
                            pl={3}
                        >
                            <CheckTimeForm
                                title="Check-in"
                                basename={CHECK_FORM_NAMES.checkInBasename}
                                isShowCurrentCheckboxes={true}
                                minDate={NOW}
                                maxDatxwe={values[CHECK_FORM_NAMES.checkOutDate]}
                            />

                            <CheckTimeForm
                                title="Check-out"
                                basename={CHECK_FORM_NAMES.checkOutBasename}
                                minDate={values[CHECK_FORM_NAMES.checkInDate]}
                            />

                            <Box mt={4}>
                                <CheckSubmitButton
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                >
                                    CHECK-OUT GUEST
                                </CheckSubmitButton>
                            </Box>
                        </CheckCol>

                    </Box>
                </Form>
            )}
        />
    );
};

export default compose(
    withApollo,
    graphql(mutationNewGuestCheckIn, { name: "mutationNewGuestCheckIn" }),
    graphql(mutationCreateGuestRoom, { name: "mutationCreateGuestRoom" }),
)(CheckIn);
