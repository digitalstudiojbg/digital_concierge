import React from "react";
import { Query, withApollo, compose, graphql } from "react-apollo";
import { getClientImageById } from "../../../../data/query";
import PropTypes from "prop-types";
import Loading from "../../../loading/Loading";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { times } from "lodash";
import styled from "styled-components";

const PaginationSection = styled.li`
    display: inline;
    padding: 10px;
    background-color: yellow;
`;

class MediaLibrary extends React.Component {
    state = { limit: 5, offset: 0 };

    handlePagination(id) {
        console.log(id);

        this.setState({
            offset: id * this.state.limit
        });
    }

    render() {
        const { clientId: id } = this.props;
        const { limit, offset } = this.state;
        return (
            <div>
                <Query
                    query={getClientImageById}
                    variables={{ id, limit, offset }}
                >
                    {({
                        loading,
                        error,
                        // data: { client: { media: images = {} } = {} } = {}
                        data: { mediaByClient: images = {} } = {}
                    }) => {
                        if (loading) return <Loading loadingData />;
                        if (error) return `Error! ${error.message}`;
                        console.log(images);
                        let totalImages;
                        let pages;
                        if (images.length > 0) {
                            totalImages = images[0].totalImages;
                            pages =
                                (totalImages - (totalImages % limit)) / limit;
                        }

                        return (
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        overflowY: "scroll",
                                        height: "60vh"
                                    }}
                                >
                                    {images.length > 0 &&
                                        images.map(image => {
                                            return (
                                                <div
                                                    style={{ padding: "10px" }}
                                                >
                                                    <p
                                                        style={{
                                                            width: "300px",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        {image.name}
                                                    </p>
                                                    <p
                                                        style={{
                                                            width: "300px",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        {image.createdAt}
                                                    </p>
                                                    <img
                                                        src={image.path}
                                                        width={300}
                                                    />
                                                </div>
                                            );
                                        })}
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        height: "5vh"
                                    }}
                                >
                                    {images.length > 0 ? (
                                        <div>
                                            <ul>
                                                {times(pages, index => {
                                                    if (index < 4) {
                                                        return (
                                                            <a
                                                                onClick={this.handlePagination.bind(
                                                                    this,
                                                                    index + 1
                                                                )}
                                                            >
                                                                <PaginationSection>
                                                                    <span>
                                                                        {index +
                                                                            1}
                                                                    </span>
                                                                </PaginationSection>
                                                            </a>
                                                        );
                                                    }
                                                })}
                                                {pages >= 6 && (
                                                    <PaginationSection>
                                                        <span>...</span>
                                                    </PaginationSection>
                                                )}
                                                {pages > 0 && (
                                                    <PaginationSection>
                                                        <span>{pages}</span>
                                                    </PaginationSection>
                                                )}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div>Number 1</div>
                                    )}

                                    <div>Page</div>
                                </div>
                                {/*<div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-around"
                                    }}
                                >
                                    <div>
                                        <p>Show images per page</p>
                                        <Select
                                            value={this.state.limit}
                                            onChange={event => {
                                                this.setState({
                                                    limit: event.target.value
                                                });
                                            }}
                                        >
                                            <MenuItem value={5}>Five</MenuItem>

                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>
                                                Twenty
                                            </MenuItem>
                                            <MenuItem value={30}>
                                                Thirty
                                            </MenuItem>
                                        </Select>
                                    </div>
                                    <div>
                                        <p>
                                            {images.length > 0 &&
                                                images[0].totalImages}
                                        </p>
                                    </div>
                                    <div>
                                        <p>Page</p>
                                        <Select
                                            value={this.state.offset}
                                            onChange={event => {
                                                this.setState({
                                                    offset: event.target.value
                                                });
                                            }}
                                        >
                                            <MenuItem value={0}>1</MenuItem>
                                            <MenuItem value={limit * 1}>
                                                2
                                            </MenuItem>
                                            <MenuItem value={limit * 2}>
                                                3
                                            </MenuItem>
                                            <MenuItem value={limit * 3}>
                                                4
                                            </MenuItem>
                                            <MenuItem value={limit * 4}>
                                                5
                                            </MenuItem>
                                        </Select>
                                    </div>
                                </div>*/}
                            </div>
                        );
                    }}
                </Query>
            </div>
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
