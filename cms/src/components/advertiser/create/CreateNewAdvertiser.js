import React from "react";
import ModifyAdvertiser from "../common/ModifyAdvertiser";
import { GUIDE_MAIN_URL } from "../../../utils/Constants";
import { Redirect } from "react-router-dom";

const CreateNewAdvertiser = ({ history: { push }, location }) => (
    <React.Fragment>
        {Boolean(location) &&
        Boolean(location.state) &&
        Boolean(location.state.pub_id) ? (
            <ModifyAdvertiser
                has_data={false}
                push={push}
                pubId={location.state.pub_id}
                exitUrl={GUIDE_MAIN_URL.replace(
                    ":pub_id",
                    location.state.pub_id
                )}
            />
        ) : (
            <Redirect to="/main/guide" />
        )}
    </React.Fragment>
);

export default CreateNewAdvertiser;
