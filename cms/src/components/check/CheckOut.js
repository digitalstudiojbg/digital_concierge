import React, { useState } from 'react';
import Box from "@material-ui/core/Box";
import { Form, Formik } from "formik"
import * as Yup from 'yup';
import dayjs from "dayjs";

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
    CHECK_OUT_DATE_FORMAT,
    CHECK_FORM_NAMES,
    CHECK_HARDCODE_ACTIVE,
    CHECK_HARDCODE_CLIENT_ID,
    CHECK_HARDCODE_PIN,
} from "./constants";
import { pickGuest, createCheckInFormData, pickGuestRoom } from "./utils";
import CheckSection from "./components/CheckSection";
import mutationCheckOut from "./query/mutationCheckOut";

const NOW = dayjs(new Date());
const NEXT_DAY = NOW.clone().add(3, "day");

const CheckInSchema = Yup.object().shape({
    [CHECK_FORM_NAMES.guestCount]: Yup.number().required(),
    [CHECK_FORM_NAMES.roomNumber]: Yup.number().required(),
}).concat(CheckReservationValidationSchema);

const CheckOutInitialValues = {
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

const CheckOut = ({ mutationCheckOut }) => {
    const [user, setUser] = useState(false);

    return (
        <Formik
            validationSchema={CheckInSchema}
            validateOnBlur={false}
            onSubmit={(fd) => {
                const data = {
                    [CHECK_FORM_NAMES.roomNumber]: fd[CHECK_FORM_NAMES.roomNumber],
                    [CHECK_FORM_NAMES.guestId]: Number(user.id),
                    [CHECK_FORM_NAMES.clientId]: fd[CHECK_FORM_NAMES.clientId],
                };

                const updateFd = {
                    ...data,
                    [CHECK_FORM_NAMES.checkOutDate]: fd[CHECK_FORM_NAMES.checkOutDate]
                };

                const deleteFd = data;

                mutationCheckOut({
                    variables: {
                        input: updateFd,
                        deleteInput: deleteFd,
                    }
                }).then(() => {
                    console.log("GOGOGOGO");
                })

            }}
            initialValues={CheckOutInitialValues}
            render={({ setValues, values }) => (
                <Form>
                    <Box width={900}>
                        <CheckTextField
                            label="SEARCH GUEST REGISTER"
                            name="guest"
                            onSelect={(data) => {
                                !user && setUser(data);
                                setValues({
                                    ...values,
                                    ...pickGuest(data),
                                    ...pickGuestRoom(data)
                                });
                            }}
                            onUnselect={() => user && setUser(null)}
                            Component={CheckAutocomplete}
                        />
                    </Box>

                    <Box display="flex">
                        <CheckCol width={390}>
                            <CheckGuestInfo />

                            <CheckReservation isDisabled={true} />
                        </CheckCol>

                        <CheckCol
                            width={510}
                            pl={3}
                        >
                            <CheckSection title="Check-in">
                                {
                                    dayjs(values[CHECK_FORM_NAMES.checkInDate]).format(CHECK_OUT_DATE_FORMAT)
                                }
                            </CheckSection>

                            <CheckTimeForm
                                title="Check-out"
                                basename={CHECK_FORM_NAMES.checkOutBasename}
                                minDate={values[CHECK_FORM_NAMES.checkInDate]}
                                isShowCurrentCheckboxes={true}
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
    graphql(mutationCheckOut, { name: "mutationCheckOut" }),
)(CheckOut);
