import React from 'react';
import dayjs from 'dayjs';
import ReactTable from "react-table";
import { Query, withApollo } from "react-apollo";

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

const sortDateString = (d1, d2) => {
    return (new Date(d1)).getTime() > (new Date(d2)).getTime() ? 1 : -1;
};

const COLUMNS = [
    {
        Header: "GUEST NAME",
        id: "firstname",
        accessor: ({ guest }) => guest.firstname,
    },
    {
        Header: "GUEST ID",
        id: "guest.id",
        accessor: ({ guest }) => Number(guest.id),
    },
    {
        Header: "# PEOPLE",
        id: "guest_count",
        accessor: ({ guest_count }) => Number(guest_count),
    },
    {
        Header: "CHECKED IN @",
        id: "CHECKED_IN",
        accessor: ({ checkin_date }) => checkin_date
            ? dayjs(checkin_date).format(GUEST_TABLE_FORMAT_DATE)
            : "-",
        sortMethod: sortDateString,
    },
    {
        Header: "CHECK OUT @",
        id: "CHECKED_OUT",
        accessor: ({ checkout_date }) => checkout_date
            ? dayjs(checkout_date).format(GUEST_TABLE_FORMAT_DATE)
            : "-",
        sortMethod: sortDateString,
    },
    {
        Header: "TOTAL NIGHTS",
        id: "total_nights",
        accessor: ({ total_nights }) => Number(total_nights),
    },
    {
        Header: "ROOM #",
        id: "room.id",
        accessor: ({ room }) => Number(room.id),
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
    <Query
        query={getGuestsRooms}
        fetchPolicy="no-cache"
    >
        {({ loading, error, data: { guestRooms } }) => {
            if (loading) return <Loading loadingData />;
            if (error) return `Error: ${error.message}`;

            return (
                <GuestsLayout title="Guests">
                    <GuestsNav />

                    <Box
                        mt={8.5}
                        mb={3}
                    >
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
                            TableComponent={(props) => <GuestTable {...props} />}
                            TheadComponent={(props) => <GuestTHead {...props} />}
                            TrComponent={(props) => <GuestTR {...props} />}
                            ThComponent={(props) => <GuestTH {...props} onClick={props.toggleSort} />}
                            TdComponent={(props) => <GuestTD {...props} />}
                        />
                    </Box>
                </GuestsLayout>
            );
        }}
    </Query>
);

export default withApollo(GuestsCurrent);
