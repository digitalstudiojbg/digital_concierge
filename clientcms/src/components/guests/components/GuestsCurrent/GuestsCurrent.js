import React from 'react';
import dayjs from 'dayjs';
import ReactTable from "react-table";
import { compose, Query, withApollo } from "react-apollo";

import Box from "@material-ui/core/Box";
import getGuestsRooms from "../../query/getGuestRooms";
import { GUEST_TABLE_FORMAT_DATE } from "../../constants";

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
import GuestsCurrentMenu from "./GuestsCurrentMenu";
import Loading from "../../../loading/Loading";
import withClientId from "../../withClientId";

const sortDateString = (d1, d2) => {
    return (new Date(d1)).getTime() > (new Date(d2)).getTime() ? 1 : -1;
};

const COLUMNS = [
    {
        Header: "GUEST NAME",
        id: "firstname",
        accessor: ({ guest }) => `${guest.firstname} ${guest.lastname}`,
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
        width: 80,
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

const GuestsCurrent = ({ clientId }) => (
    <Query
        query={getGuestsRooms}
        variables={{ clientId }}
        fetchPolicy="no-cache"
    >
        {({ loading, error, data: { guestRooms } }) => {
            if (loading) return <Loading loadingData />;
            if (error) return `Error: ${error.message}`;

            return (
                <GuestsLayout title="Guests">
                    <Box
                        mt={5}
                        pr={5}
                        style={{ minWidth: 1300 }}
                    >
                        <GuestsNav />

                        <Box
                            mt={8.5}
                            mb={3}
                        >
                            <ReactTable
                                style={{ border: 0 }}
                                resizable={false}
                                data={guestRooms}
                                columns={COLUMNS}
                                defaultPageSize={guestRooms.length}
                                showPagination={false}
                                showPageSizeOptions={false}
                                showPaginationBottom={false}
                                NoDataComponent={() => <div>Not found guest rooms</div>}
                                TableComponent={(props) => <GuestTable {...props} />}
                                TheadComponent={(props) => <GuestTHead {...props} />}
                                TrComponent={(props) => <GuestTR {...props} />}
                                ThComponent={(props) => <GuestTH {...props} onClick={props.toggleSort} />}
                                TdComponent={(props) => <GuestTD {...props} />}
                            />
                        </Box>
                    </Box>
                </GuestsLayout>
            );
        }}
    </Query>
);

export default compose(
    withApollo,
    withClientId,
)(GuestsCurrent);
