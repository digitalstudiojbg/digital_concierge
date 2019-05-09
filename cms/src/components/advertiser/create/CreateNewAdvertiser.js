import React from "react";
import ModifyAdvertiser from "../common/ModifyAdvertiser";

export const CreateNewAdvertiser = ({ history: { goBack } }) => (
    <ModifyAdvertiser has_data={false} goBack={goBack} />
);

export default CreateNewAdvertiser;
