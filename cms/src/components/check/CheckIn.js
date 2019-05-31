import React from 'react';
import Box from "@material-ui/core/Box";
import { Formik, Form } from "formik"
import CheckGuestInfo from "./components/CheckGuestInfo";
import CheckReservation from "./components/CheckReservation";
import CheckTimeForm from "./components/CheckTimeForm";
import CheckAutocomplete from "./components/CheckGuestsAutocomplete";
import CheckTextField from "./components/CheckTextField";
import { CheckCol, CheckSubmitButton } from "./components/styled";
import Mutation from "react-apollo/Mutation";
import mutationUpdateGuest from "./query/mutationUpdateGuest";
import mutationCreateGuestRoom from "./query/mutationCreateGuestRoom";
import * as Yup from 'yup';
import { CheckReservationValidationSchema } from "./components/CheckReservation/CheckReservation";

const NOW = new Date();

const CheckInSchema = Yup.object().shape({
    people_number: Yup.number().required(),
}).concat(CheckReservationValidationSchema);


const CheckIn = (props) => {
    return (
        <Mutation mutation={mutationCreateGuestRoom}>
            {updateGuest => (
                <Formik
                    validationSchema={CheckInSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={(fd) => {
                        console.log(fd);
                        updateGuest(fd);
                    }}
                    initialValues={{
                        checkOut_date: NOW,
                        checkOut_date_time: NOW,
                        checkIn_date: NOW,
                        checkIn_date_time: NOW,
                    }}
                    render={({ setValues, values }) => (
                        <Form>
                            <Box width={900}>
                                <CheckTextField
                                    onSelectItem={(data) => {
                                        console.log(data);
                                        setValues({...data, ...values});
                                    }}
                                    label="SEARCH GUEST REGISTER"
                                    name="guest"
                                    Component={CheckAutocomplete}
                                />
                            </Box>

                            <Box display="flex">
                                <CheckCol width={390}>
                                    <CheckGuestInfo />

                                    <CheckReservation />
                                </CheckCol>

                                <CheckCol width={510} pl={3}>
                                    <CheckTimeForm
                                        title="Check-in"
                                        basename="checkIn"
                                        isShowCurrentCheckboxes={true}
                                    />

                                    <CheckTimeForm
                                        title="Check-out"
                                        basename="checkOut"
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
