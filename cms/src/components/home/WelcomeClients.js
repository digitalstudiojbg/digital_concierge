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
import { DECIMAL_RADIX } from "../../utils/Constants";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(244, 244, 244);
    padding-left: 50px;
    padding-right: 50px;
`;

const TitleDiv = styled.div`
    padding-top: 50px;
    height: 20%;
    font-size: 2em;
`;

const TableContainerDiv = styled.div`
    height: 80%;
`;

const centerHorizontalVertical = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export const WelcomeClients = () => {
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

    const handleCheckAll = clients => {
        if (selected.size === clients.length) {
            setSelected(Set());
        } else {
            setSelected(selected.union(clients.map(({ id }) => id)));
        }
    };

    return (
        <Query query={getAllClients}>
            {({ loading, error, data: { clients: originalClients } }) => {
                if (loading) return <Loading loadingData />;
                if (error) return `Error: ${error.message}`;

                //Format client for react-table data
                const clients = originalClients.map(
                    ({ id, name, users, licenses, systems, active }) => ({
                        id,
                        clientName: name,
                        keyUser:
                            Boolean(users) &&
                            Array.isArray(users) &&
                            users.length > 0 &&
                            Boolean(users[0].name)
                                ? users[0].name
                                : "",
                        licenseKey:
                            Boolean(licenses) &&
                            Array.isArray(licenses) &&
                            licenses.length > 0 &&
                            Boolean(licenses[0].key)
                                ? licenses[0].key
                                : "",
                        licenseExpiry:
                            Boolean(licenses) &&
                            Array.isArray(licenses) &&
                            licenses.length > 0 &&
                            Boolean(licenses[0].expire_date)
                                ? dayJs(licenses[0].expire_date).format(
                                      "DD MMMM YYYY"
                                  )
                                : "",
                        numberOfSystems:
                            Boolean(systems) && Array.isArray(systems)
                                ? systems.length
                                : 0,
                        status: Boolean(active) ? "ACTIVE" : "INACTIVE"
                    })
                );
                console.log(clients);

                return (
                    <ContainerDiv>
                        <TitleDiv>CLIENTS</TitleDiv>
                        <TableContainerDiv>
                            <ReactTable
                                defaultPageSize={10}
                                data={clients}
                                columns={[
                                    {
                                        Header: "CLIENT",
                                        accessor: "clientName",
                                        style: {
                                            ...centerHorizontalVertical
                                        },
                                        filterable: true,
                                        sortable: true,
                                        filterMethod: (filter, original) =>
                                            original.clientName
                                                .toLowerCase()
                                                .includes(
                                                    filter.value.toLowerCase()
                                                )
                                    },
                                    {
                                        Header: "KEY USER",
                                        accessor: "keyUser",
                                        style: {
                                            ...centerHorizontalVertical
                                        },
                                        filterable: true,
                                        sortable: true,
                                        filterMethod: (filter, original) =>
                                            original.keyUser
                                                .toLowerCase()
                                                .includes(
                                                    filter.value.toLowerCase()
                                                )
                                    },
                                    {
                                        Header: "LICENSE KEY",
                                        accessor: "licenseKey",
                                        style: {
                                            ...centerHorizontalVertical
                                        },
                                        sortable: true,
                                        filterable: true,
                                        filterMethod: (filter, original) =>
                                            original.licenseKey
                                                .toLowerCase()
                                                .includes(
                                                    filter.value.toLowerCase()
                                                )
                                    },
                                    {
                                        Header: "LICENSE EXPIRY",
                                        accessor: "licenseExpiry",
                                        style: {
                                            ...centerHorizontalVertical
                                        },
                                        sortable: true,
                                        filterable: true,
                                        filterMethod: (filter, original) =>
                                            original.licenseExpiry
                                                .toLowerCase()
                                                .includes(
                                                    filter.value.toLowerCase()
                                                )
                                    },
                                    {
                                        Header: "# OF SYSTEMS",
                                        accessor: "numberOfSystems",
                                        style: {
                                            ...centerHorizontalVertical
                                        },
                                        sortable: true,
                                        filterable: true,
                                        filterMethod: (filter, original) =>
                                            original.numberOfSystems ===
                                            parseInt(
                                                filter.value,
                                                DECIMAL_RADIX
                                            )
                                    },
                                    {
                                        Header: "STATUS",
                                        accessor: "status",
                                        style: {
                                            ...centerHorizontalVertical
                                        },
                                        sortable: true,
                                        filterable: true,
                                        filterMethod: (filter, original) =>
                                            original.status
                                                .toLowerCase()
                                                .includes(
                                                    filter.value.toLowerCase()
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
                                        filterable: true,
                                        sortable: false,
                                        resizable: false,
                                        width: 70,
                                        Cell: ({ original: { id } }) => (
                                            <Checkbox
                                                id={id}
                                                checked={selected.includes(id)}
                                                onChange={handleCheck}
                                            />
                                        ),
                                        Filter: (
                                            <Checkbox
                                                indeterminate={
                                                    selected.size > 0 &&
                                                    selected.size <
                                                        clients.length
                                                }
                                                checked={
                                                    selected.size ===
                                                    clients.length
                                                }
                                                onChange={() =>
                                                    handleCheckAll(clients)
                                                }
                                            />
                                        )
                                    }
                                ]}
                            />
                        </TableContainerDiv>
                    </ContainerDiv>
                );
            }}
        </Query>
    );
};

export default withApollo(WelcomeClients);
