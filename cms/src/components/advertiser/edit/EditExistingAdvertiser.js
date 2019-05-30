import React from "react";
import ModifyAdvertiser from "../common/ModifyAdvertiser";

const EditExistingAdvertiser = ({
    history: { goBack, push },
    match: {
        params: { advertiser_id }
    },
    location: { state }
}) => (
    <ModifyAdvertiser
        has_data={true}
        goBack={goBack}
        push={push}
        advertiserId={advertiser_id}
        goToNext={Boolean(state) && Boolean(state.goToNext)}
    />
);

export default EditExistingAdvertiser;
