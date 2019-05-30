import React from "react";
import ModifyAdvertiser from "../common/ModifyAdvertiser";

const CreateNewAdvertiser = ({
    history: { goBack, push },
    location: {
        state: { pub_id }
    }
}) => (
    <ModifyAdvertiser
        has_data={false}
        goBack={goBack}
        push={push}
        pubId={pub_id}
    />
);

export default CreateNewAdvertiser;
