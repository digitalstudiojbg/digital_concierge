import React from "react";
import { Query, withApollo, compose, graphql } from "react-apollo";
import { getClientImageById } from "../../../../data/query";
import PropTypes from "prop-types";
import Loading from "../../../loading/Loading";

class MediaLibrary extends React.Component {
    render() {
        const { clientId: id } = this.props;
        return (
            <Query query={getClientImageById} variables={{ id }}>
                {({
                    loading,
                    error,
                    data: { client: { media: images = {} } = {} } = {}
                }) => {
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error! ${error.message}`;
                    console.log(images);

                    return (
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                overflowY: "scroll",
                                height: "60vh"
                            }}
                        >
                            {images.map(image => {
                                return (
                                    <div style={{ padding: "10px" }}>
                                        <p
                                            style={{
                                                width: "300px",
                                                textAlign: "center"
                                            }}
                                        >
                                            {image.name}
                                        </p>
                                        <img src={image.path} width={300} />
                                    </div>
                                );
                            })}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

MediaLibrary.propTypes = {
    clientId: PropTypes.number.isRequired
};

export default withApollo(MediaLibrary);
/*export default compose(
    withApollo,
    graphql(getClientImageById, {
        options: ownProps => ({
            variables: {
                id: ownProps.clientId
            }
        }),
        name: "getClientImageById"
    })
)(MediaLibrary);*/
