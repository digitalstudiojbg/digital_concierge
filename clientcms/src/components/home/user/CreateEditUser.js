import React from "react";
import PropTypes from "prop-types";
import CustomSaveButton from "../../../utils/CustomSaveButton";
import { ContainerDiv } from "../../../utils/Constants";
import styled from "styled-components";

const ContainerDivModified = styled(ContainerDiv)`
    padding-left: 50px;
    display: flex;
    flex-direction: column;
`;

const FormContainerDiv = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

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
                            {
                                label: "SAVE & EXIT",
                                action: () => alert("SAVE & EXIT")
                            },
                            {
                                label: "SAVE & KEEP EDITING",
                                action: () => alert("SAVE & KEEP EDITING")
                            }
                        ]}
                    />
                </div>
            </div>
        );
    }
    renderFormSection() {
        return <FormContainerDiv>TEST</FormContainerDiv>;
    }
    render() {
        return (
            <ContainerDivModified>
                {this.renderHeaderSection()}
                {this.renderFormSection()}
            </ContainerDivModified>
        );
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
