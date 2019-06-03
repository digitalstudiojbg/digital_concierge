import React, { useState } from 'react';
import Box from "@material-ui/core/Box";
import { Formik, Form } from "formik"
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
import { withApollo, graphql, compose } from "react-apollo";

const NOW = new Date();
const NEXT_DAY = dayjs(NOW).clone().add(3, "day");

const CheckInSchema = Yup.object().shape({
    guest_count: Yup.number().required(),
    room_number: Yup.number().required(),
}).concat(CheckReservationValidationSchema);

/* TODO: Hardcode clientId for hotel */
const CHECK_HARDCODE_CLIENT_ID = 1;
const CHECK_HARDCODE_PIN = 1111;
const CHECK_HARDCODE_ACTIVE = 0;

const CheckInInitialValues = {
    checkout_date: NEXT_DAY,
    checkout_date_time: NEXT_DAY,
    checkin_date: NOW,
    checkin_date_time: NOW,
    guest_count: 2,
    clientId: CHECK_HARDCODE_CLIENT_ID,
    pin: CHECK_HARDCODE_PIN,
    active: CHECK_HARDCODE_ACTIVE,
};

const GuestFields = ["firstname", "lastname", "primary_number", "secondary_number", "email"];

const pickGuestData = (obj) => pick(
    obj,
    GuestFields,
);

const transformData = (obj, isRemoveUserData) => omit(
    obj,
    [
        "checkout_date_time",
        "checkin_date_time",
        ...(isRemoveUserData ? [
            "firstname",
            "lastname",
            "primary_number",
            "secondary_number",
            "email"
        ] : [])
    ],
);

const CheckIn = ({ mutationNewGuestCheckIn, mutationCreateGuestRoom }) => {
    const [user, setUser] = useState(false);

    return (
        <Formik
            validationSchema={CheckInSchema}
            validateOnBlur={false}
            onSubmit={(fd) => {
                console.log(user);
                if (user) {
                    mutationCreateGuestRoom({
                        variables: {
                            input: {
                                ...transformData(fd, true),
                                guestId: ++user.id
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
                                basename="checkin"
                                isShowCurrentCheckboxes={true}
                                minDate={NOW}
                                maxDate={values["checkout_date"]}
                            />

                            <CheckTimeForm
                                title="Check-out"
                                basename="checkout"
                                minDate={values["checkin_date"]}
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
