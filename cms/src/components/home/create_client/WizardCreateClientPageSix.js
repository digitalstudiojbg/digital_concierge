import React from "react";
import MediaLibrary from "./two/MediaLibrary";
class WizardCreateClientPageSix extends React.Component {
    render() {
        return (
            <div>
                <h1>MEDIA PAGE</h1>
                <MediaLibrary clientId={1} />
            </div>
        );
    }
}

export default WizardCreateClientPageSix;
