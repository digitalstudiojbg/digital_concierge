import React, { useCallback, useState } from 'react';
import { withSnackbar } from "notistack";
import { Form, Formik } from "formik"
import { compose, graphql, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";

import ROUTES from "../../utils/routes";

import mutationCreateGuestRoom from "./query/mutationCreateGuestRoom";
import mutationNewGuestCheckIn from "./query/mutationNewGuestCheckIn";

import CheckGuestInfo from "./components/CheckGuestInfo";
import CheckReservation from "./components/CheckReservation";
import CheckTimeForm from "./components/CheckTimeForm";
import CheckAutocomplete from "./components/CheckGuestsAutocomplete";
import CheckTextField from "./components/CheckTextField";
import { CheckCol, CheckSubmitButton } from "./components/styled";
import { CHECK_FORM_NAMES, CHECK_INITIAL_DATE, CheckInitialValues, } from "./constants";
import { createCheckInFormData, getErrorMessage, pickGuest } from "./utils";
import { CheckSchema } from "./validation";

const CheckIn = (
    {
        mutationNewGuestCheckIn,
        mutationCreateGuestRoom,
        history: { push },
        enqueueSnackbar
    },
) => {
    const [user, setUser] = useState(false);

    const handleSubmit = useCallback(
        (fd) => {
            let promise;

            if (user) {
                promise = mutationCreateGuestRoom({
                    variables: {
                        input: {
                            ...createCheckInFormData(fd, true),
                            guestId: Number(user.id),
                        },
                    }
                })
            } else {
                promise = mutationNewGuestCheckIn({
                    variables: {
                        input: createCheckInFormData(fd),
                    }
                });
            }

            promise
                .then(() => {
                    enqueueSnackbar(
                        "Guest Check-in successfully created",
                        { variant: "success" }
                    );
                    push(ROUTES.guests);
                })
                .catch(err => enqueueSnackbar(
                    getErrorMessage(err),
                    { variant: "error" }
                ))
        },
        [user],
    );

    return (
        <Formik
            validationSchema={CheckSchema}
            validateOnBlur={false}
            onSubmit={handleSubmit}
            initialValues={CheckInitialValues}
            render={({ setValues, values, isValid }) => (
                <Form>
                    <Box width={900}>
                        <CheckTextField
                            label="SEARCH GUEST REGISTER"
                            name="guest"
                            onSelect={(data) => {
                                !user && setUser(data);
                                setValues({ ...values, ...pickGuest(data) });
                            }}
                            onUnselect={() => user && setUser(null)}
                            Component={CheckAutocomplete}
                        />
                    </Box>

                    <Box display="flex">
                        <CheckCol width={390}>
                            <CheckGuestInfo />

                            <CheckReservation isDisabled={Boolean(user)} />
                        </CheckCol>

                        <CheckCol
                            width={510}
                            pl={3}
                        >
                            <CheckTimeForm
                                title="Check-in"
                                basenameTitle="Check-in"
                                basename={CHECK_FORM_NAMES.checkInBasename}
                                isShowCurrentCheckboxes={true}
                                minDate={CHECK_INITIAL_DATE}
                                maxDate={values[CHECK_FORM_NAMES.checkOutDate]}
                            />

                            <CheckTimeForm
                                title="Check-out"
                                basenameTitle="Check-out"
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
                                    CHECK-IN GUEST
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
    withSnackbar,
    withRouter,
    graphql(mutationNewGuestCheckIn, { name: "mutationNewGuestCheckIn" }),
    graphql(mutationCreateGuestRoom, { name: "mutationCreateGuestRoom" }),
)(CheckIn);
