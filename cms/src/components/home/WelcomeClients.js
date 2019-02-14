import React, { useState } from "react";
import styled from "styled-components";
import { Query, withApollo } from "react-apollo";
import Loading from "../loading/Loading";
import { getAllClients } from "../../data/query";
import dayJs from "dayjs";
import MoreHorizontalIcon from "@material-ui/icons/MoreHoriz";
import Checkbox from "@material-ui/core/Checkbox";
import { Set } from "immutable";
import ReactTable from "react-table";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(244, 244, 244);
    padding-left: 50px;
`;

const centerHorizontalVertical = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export const WelcomeClients = props => {
    const [selected, setSelected] = useState(Set());

    const handleCheck = event => {
        if (selected.includes(event.target.id)) {
            //Remove from selected checkboxes
            setSelected(selected.delete(event.target.id));
        } else {
            //Add to selected checkboxes
            setSelected(selected.add(event.target.id));
        }
    };

    return (
        <Query query={getAllClients}>
            {({ loading, error, data: { clients } }) => {
                if (loading) return <Loading loadingData />;
                if (error) return `Error: ${error.message}`;
                console.log(clients);
                return (
                    <ContainerDiv>
                        CLIENTS
                        <ReactTable
                            defaultPageSize={10}
                            data={clients}
                            columns={[
                                {
                                    Header: "CLIENT",
                                    accessor: "name",
                                    style: {
                                        ...centerHorizontalVertical
                                    },
                                    // filterable: true,
                                    sortable: true
                                    // filterMethod: (filter, original) =>
                                    //     original.name
                                    //         .toLowerCase()
                                    //         .includes(
                                    //             filter.value.toLowerCase()
                                    //         )
                                },
                                {
                                    Header: "KEY USER",
                                    style: {
                                        ...centerHorizontalVertical
                                    },
                                    // filterable: true,
                                    sortable: true,
                                    Cell: ({ original: { users } }) =>
                                        Boolean(users) &&
                                        Array.isArray(users) &&
                                        users.length > 0 &&
                                        Boolean(users[0].name)
                                            ? users[0].name
                                            : ""
                                    // filterMethod: (filter, original) =>
                                    //     Boolean(original) &&
                                    //     Boolean(original._original) &&
                                    //     Boolean(original._original.users) &&
                                    //     Array.isArray(
                                    //         original._original.users
                                    //     ) &&
                                    //     original._original.users.length > 0
                                    //         ? original._original.users[0].name
                                    //               .toLowerCase()
                                    //               .includes(
                                    //                   filter.value.toLowerCase()
                                    //               )
                                    //         : false
                                },
                                {
                                    Header: "LICENSE KEY",
                                    style: {
                                        ...centerHorizontalVertical
                                    },
                                    sortable: true,
                                    Cell: ({ original: { licenses } }) => (
                                        <span>
                                            {Boolean(licenses) &&
                                            Array.isArray(licenses) &&
                                            licenses.length > 0 &&
                                            Boolean(licenses[0].key)
                                                ? licenses[0].key
                                                : ""}
                                        </span>
                                    )
                                },
                                {
                                    Header: "LICENSE EXPIRY",
                                    style: {
                                        ...centerHorizontalVertical
                                    },
                                    sortable: true,
                                    Cell: ({ original: { licenses } }) => (
                                        <span>
                                            {Boolean(licenses) &&
                                            Array.isArray(licenses) &&
                                            licenses.length > 0 &&
                                            Boolean(licenses[0].expire_date)
                                                ? dayJs(
                                                      licenses[0].expire_date
                                                  ).format("DD MMMM YYYY")
                                                : ""}
                                        </span>
                                    )
                                },
                                {
                                    Header: "# OF SYSTEMS",
                                    style: {
                                        ...centerHorizontalVertical
                                    },
                                    sortable: true,
                                    Cell: ({ original: { systems } }) => (
                                        <span>
                                            {Boolean(systems) &&
                                            Array.isArray(systems)
                                                ? systems.length
                                                : ""}
                                        </span>
                                    )
                                },
                                {
                                    Header: "STATUS",
                                    style: {
                                        ...centerHorizontalVertical
                                    },
                                    sortable: true,
                                    Cell: ({ original: { active } }) => (
                                        <span>
                                            {Boolean(active)
                                                ? "ACTIVE"
                                                : "INACTIVE"}
                                        </span>
                                    )
                                },
                                {
                                    Header: "ACTIONS",
                                    style: {
                                        ...centerHorizontalVertical
                                    },
                                    Cell: <MoreHorizontalIcon />,
                                    filterable: false,
                                    sortable: false,
                                    resizable: false,
                                    width: 70
                                },
                                {
                                    Header: "",
                                    style: {
                                        ...centerHorizontalVertical
                                    },
                                    filterable: false,
                                    sortable: false,
                                    resizable: false,
                                    width: 70,
                                    Cell: ({ original: { id } }) => (
                                        <Checkbox
                                            id={id}
                                            checked={selected.includes(id)}
                                            onChange={handleCheck}
                                        />
                                    )
                                }
                            ]}
                        />
                    </ContainerDiv>
                );
            }}
        </Query>
    );
};

export default withApollo(WelcomeClients);
