import React from "react";

class TabContent extends React.Component {
    render() {
        console.log("Tab content props ", this.props);
        return <div>Content</div>;
    }
}

export default TabContent;
