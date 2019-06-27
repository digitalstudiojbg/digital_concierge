import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { IconButton } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import { isEmpty } from "lodash";

const UserTableList = ({ data: users = [] }) => {
    const modifiedUsers = users.map(({ id, name, email, roles, active }) => {
        let roleNames = roles.map(({ name }) => name).join("; ");
        let departmentNames = roles
            .map(({ department: { name } }) => name)
            .join("; ");
        return {
            id,
            name,
            email,
            active: active ? "Active" : "Inactive",
            role: roleNames,
            department: departmentNames
        };
    });

    return (
        <div style={{ width: "100%", height: "100%", padding: "3%" }}>
            <MaterialTable
                data={modifiedUsers}
                columns={[
                    { title: "USER", field: "name" },
                    { title: "USERNAME", field: "email" },
                    { title: "ROLE", field: "role" },
                    { title: "DEPARTMENT", field: "department" },
                    { title: "STATUS", field: "active" },
                    {
                        title: "ACTIONS",
                        render: ({ id }) => (
                            <IconButton id={id}>
                                <MoreHoriz />
                            </IconButton>
                        ),
                        disableClick: true
                    }
                ]}
                options={{
                    selection: true,
                    showTitle: false,
                    searchFieldAlignment: "left"
                }}
            />
        </div>
    );
};

export default UserTableList;
