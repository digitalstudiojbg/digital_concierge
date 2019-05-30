import React from "react";
import ModifyAdvertiser from "../common/ModifyAdvertiser";
import { GUIDE_MAIN_URL } from "../../../utils/Constants";

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
        exitUrl={GUIDE_MAIN_URL.replace(":pub_id", pub_id)}
    />
);

export default CreateNewAdvertiser;
