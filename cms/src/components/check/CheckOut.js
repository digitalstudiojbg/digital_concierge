import React, { useCallback, useState } from 'react';
import { compose, graphql, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import Box from "@material-ui/core/Box";
import { Form, Formik } from "formik"
import dayjs from "dayjs";

import mutationDeleteGuestRoom from "./query/mutationDeleteGuestRoom";
import mutationUpdateGuestRoom from "./query/mutationUpdateGuestRoom";

import CheckGuestInfo from "./components/CheckGuestInfo";
import CheckReservation from "./components/CheckReservation";
import CheckTimeForm from "./components/CheckTimeForm";
import CheckAutocomplete from "./components/CheckGuestsAutocomplete";
import CheckTextField from "./components/CheckTextField";
import { CheckCol, CheckSubmitButton } from "./components/styled";
import CheckSection from "./components/CheckSection";
import ROUTES from "../../utils/routes";

import {
    getErrorMessage,
    pickGuest,
    pickGuestRoom
} from "./utils";
import {
    CHECK_FORM_NAMES,
    CHECK_OUT_DATE_FORMAT,
    CheckInitialValues,
} from "./constants";
import { CheckSchema } from "./validation";

const CheckOut = (
    {
        mutationDeleteGuestRoom,
        mutationUpdateGuestRoom,
        history: { push },
        enqueueSnackbar,
    },
) => {
    const [user, setUser] = useState(false);

    const getIsChangedDate = useCallback(
        (date) => {
            const prev = pickGuestRoom(user);
            const prevDate = prev && prev[CHECK_FORM_NAMES.checkOutDate];

            return prevDate === date;
        },
        [user],
    );

    const handleSubmit = useCallback(
        async (fd) => {
            const data = {
                [CHECK_FORM_NAMES.roomNumber]: fd[CHECK_FORM_NAMES.roomNumber],
                [CHECK_FORM_NAMES.guestId]: Number(user.id),
                [CHECK_FORM_NAMES.clientId]: fd[CHECK_FORM_NAMES.clientId],
            };

            const update = {
                ...data,
                [CHECK_FORM_NAMES.checkOutDate]: fd[CHECK_FORM_NAMES.checkOutDate]
            };

            const isChangedDate = getIsChangedDate(fd);

            try {
                if (isChangedDate) {
                    await mutationUpdateGuestRoom({ variables: { input: update } })
                }

                await mutationDeleteGuestRoom({ variables: { input: data } });

                enqueueSnackbar(
                    "The guest has been checked out",
                    { variant: "success" }
                );

                push(ROUTES.guests);
            } catch (err) {
                enqueueSnackbar(
                    getErrorMessage(err),
                    { variant: "error" }
                )
            }
        },
        [user],
    );

    return (
        <Formik
            validationSchema={CheckSchema}
            validateOnBlur={false}
            onSubmit={handleSubmit}
            initialValues={CheckInitialValues}
            render={({ setValues, values }) => (
                <Form>
                    <Box
                        mt={2}
                        width={900}
                    >
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
                            isFilterByGuestsRoom={true}
                            Component={CheckAutocomplete}
                        />
                    </Box>

                    <Box display="flex">
                        <CheckCol width={390}>
                            <CheckGuestInfo isDisabled={true} />

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
                                basenameTitle="Check-out"
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
                                    disabled={!Boolean(user)}
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
    withRouter,
    withSnackbar,
    graphql(mutationDeleteGuestRoom, { name: "mutationDeleteGuestRoom" }),
    graphql(mutationUpdateGuestRoom, { name: "mutationUpdateGuestRoom" }),
)(CheckOut);
