import React from "react";
import PropTypes from "prop-types";
import CustomSaveButton from "../../../utils/CustomSaveButton";
import { ContainerDiv } from "../../../utils/Constants";

class CreateEditUser extends React.Component {
    renderHeaderSection() {
        const { match = {} } = this.props;
        const { params = {} } = match;
        const { user_id = "" } = params;
        const headerText = user_id === "new" ? "CREATE USER" : "MODIFY USER";
        return (
            <div style={{ width: "100%", height: 100, display: "flex" }}>
                <div style={{ width: "90%" }}>{headerText}</div>
                <div
                    style={{
                        width: "10%",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <CustomSaveButton
                        options={[
                            { label: "test1", action: () => alert("test1") },
                            { label: "test2", action: () => alert("test2") }
                            // { label: "test3", action: () => alert("test3") },
                            // { label: "test4", action: () => alert("test4") }
                        ]}
                    />
                </div>
            </div>
        );
    }
    render() {
        return <ContainerDiv>{this.renderHeaderSection()}</ContainerDiv>;
    }
}

CreateEditUser.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            action: PropTypes.func.isRequired
        })
    ).isRequired
};

export default CreateEditUser;
