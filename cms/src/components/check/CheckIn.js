import React, { useState } from 'react';
import Box from "@material-ui/core/Box";
import { Formik, Form } from "formik"
import CheckGuestInfo from "./components/CheckGuestInfo";
import CheckReservation from "./components/CheckReservation";
import CheckTimeForm from "./components/CheckTimeForm";
import CheckAutocomplete from "./components/CheckGuestsAutocomplete";
import CheckTextField from "./components/CheckTextField";
import { CheckCol, CheckSubmitButton } from "./components/styled";
import Mutation from "react-apollo/Mutation";
import mutationCreateGuestRoom from "./query/mutationCreateGuestRoom";
import * as Yup from 'yup';
import { CheckReservationValidationSchema } from "./components/CheckReservation/CheckReservation";
import dayjs from "dayjs";

const NOW = new Date();
const NEXT_DAY = dayjs(NOW).clone().add(3, "day");

const CheckInSchema = Yup.object().shape({
    people_number: Yup.number().required(),
}).concat(CheckReservationValidationSchema);

const CheckInInitialValues = {
    checkOut_date: NEXT_DAY,
    checkOut_date_time: NEXT_DAY,
    checkIn_date: NOW,
    checkIn_date_time: NOW,
    people_number: 2,
};

const CheckIn = (props) => {
    const [isDisabledReservation, setIsDisabledReservation] = useState(false);

    return (
        <Mutation mutation={mutationCreateGuestRoom}>
            {updateGuest => (
                <Formik
                    validationSchema={CheckInSchema}
                    validateOnBlur={false}
                    onSubmit={(fd) => {
                        console.log(fd);
                        updateGuest(fd);
                    }}
                    initialValues={CheckInInitialValues}
                    render={({ setValues, values }) => (
                        <Form>
                            <Box width={900}>
                                <CheckTextField
                                    label="SEARCH GUEST REGISTER"
                                    name="guest"
                                    onSelect={(data) => {
                                        !isDisabledReservation && setIsDisabledReservation(true);
                                        setValues({...data, ...values});
                                    }}
                                    onUnselect={() => isDisabledReservation && setIsDisabledReservation(false)}
                                    Component={CheckAutocomplete}
                                />
                            </Box>

                            <Box display="flex">
                                <CheckCol width={390}>
                                    <CheckGuestInfo />

                                    <CheckReservation isDisabled={isDisabledReservation} />
                                </CheckCol>

                                <CheckCol width={510} pl={3}>
                                    <CheckTimeForm
                                        title="Check-in"
                                        basename="checkIn"
                                        isShowCurrentCheckboxes={true}
                                        minDate={NOW}
                                        maxDate={values["checkOut_date"]}
                                    />

                                    <CheckTimeForm
                                        title="Check-out"
                                        basename="checkOut"
                                        minDate={values["checkIn_date"]}
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
            )}
        </Mutation>
    );
};

export default CheckIn;
