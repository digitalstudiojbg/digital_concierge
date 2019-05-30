import React from 'react';
import dayjs from 'dayjs';
import ReactTable from "react-table";
import { Query, withApollo } from "react-apollo/index";

import Box from "@material-ui/core/Box/index";
import getGuestsRooms from "../../query/getGuestRooms";
import { GUEST_TABLE_FORMAT_DATE } from "../../constants";

import Loading from "../../../loading/Loading";
import GuestsLayout from "../GuestLayout";
import GuestsNav from "../GuestsNav";
import {
    GuestTable,
    GuestTD,
    GuestTR,
    GuestTH,
    GuestTHead,
    GuestDeviceStatus,
} from "./styled";
import s from "./GuestCurrent.module.scss";
import GuestsCurrentMenu from "./GuestsCurrentMenu";

const COLUMNS = [
    {
        Header: "GUEST NAME",
        id: "firstname",
        accessor: ({ guest }) => guest.firstname,
    },
    {
        Header: "GUEST ID",
        id: "guest.id",
        accessor: ({ guest }) => guest.id,
    },
    {
        Header: "# PEOPLE",
        accessor: "guest_count",
    },
    {
        Header: "CHECKED IN @",
        id: "CHECKED_IN",
        accessor: ({ checkin_date }) => checkin_date
            ? dayjs(checkin_date).format(GUEST_TABLE_FORMAT_DATE)
            : "-",
    },
    {
        Header: "CHECK OUT @",
        id: "CHECKED_OUT",
        accessor: ({ checkout_date }) => checkout_date
            ? dayjs(checkout_date).format(GUEST_TABLE_FORMAT_DATE)
            : "-",
    },
    {
        Header: "TOTAL NIGHTS",
        accessor: "total_nights",
    },
    {
        Header: "ROOM #",
        id: "room.id",
        accessor: ({ room }) => room.id,
    },
    {
        Header: "DEVICE STATUS",
        accessor: "device_status",
        width: 78,
        Cell: () => <GuestDeviceStatus />
    },
    {
        Header: "BOOKING STATUS",
        accessor: "booking_status",
        Cell: () => <b>Checked In</b>
    },
    {
        Header: "",
        id: "white_space_row",
        width: 280
    },
    {
        Header: "ACTIONS",
        accessor: "actions",
        Cell: () => <GuestsCurrentMenu />
    },
    {
        accessor: "white_space_row_2",
        width: 130
    },
];

const GuestsCurrent = () => (
    <Query query={getGuestsRooms}>
        {({ loading, error, data: { guestRooms } }) => {
            if (loading) return <Loading loadingData />;
            if (error) return `Error: ${error.message}`;

            return (
                <GuestsLayout title="Guests">
                    <GuestsNav />

                    <Box mt={8.5}>
                        <ReactTable
                            className={s.guest_current_table}
                            resizable={false}
                            data={guestRooms}
                            columns={COLUMNS}
                            defaultPageSize={guestRooms.length}
                            showPagination={false}
                            showPageSizeOptions={false}
                            showPaginationBottom={false}
                            NoDataComponent={() => null}
                            TableComponent={GuestTable}
                            TheadComponent={GuestTHead}
                            TrComponent={GuestTR}
                            ThComponent={GuestTH}
                            TdComponent={GuestTD}
                        />
                    </Box>
                </GuestsLayout>
            );
        }}
    </Query>
);

export default withApollo(GuestsCurrent);
