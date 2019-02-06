import React from "react";
import { Query, withApollo, compose, graphql } from "react-apollo";
import { getClientImageById } from "../../../../data/query";
import PropTypes from "prop-types";
import Loading from "../../../loading/Loading";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { times } from "lodash";
import styled from "styled-components";
import { formatBytes } from "../../../../utils/Constants";
import { Mutation } from "react-apollo";

import { UPLOAD_FILES_WITH_CLIENT_ID } from "../../../../data/mutation";

const PaginationSection = styled.li`
    display: inline;
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: lightgrey;
    }
`;

const PaginationSectionDot = styled.li`
    display: inline;
    padding: 10px;
`;

const ImageLinkText = styled.a`
    cursor: pointer;
    color: blue;
    &:hover {
        font-weight: bold;
    }
`;

const UploadDeleteButton = styled.label`
    &:hover {
        background-color: lightgrey;
    }

    border: 3px solid rgb(64, 84, 178);
    display: inline-block;
    padding: 5px 50px;
    cursor: pointer;
    font-size: 1.5em;
    color: rgb(64, 84, 178);
    border-radius: 5px;
`;

class MediaLibrary extends React.Component {
    state = { limit: 10, offset: 0, files: null };

    handlePagination(id) {
        this.setState({
            offset: id * this.state.limit
        });
    }

    render() {
        const { clientId: id } = this.props;
        const { limit, offset } = this.state;
        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        paddingBottom: "20px"
                    }}
                >
                    <Mutation
                        mutation={UPLOAD_FILES_WITH_CLIENT_ID}
                        update={(cache, data) => {
                            console.log(data);
                        }}
                    >
                        {(uploadFilesWithClientId, { loading, error }) => (
                            <div>
                                <UploadDeleteButton>
                                    <input
                                        style={{ display: "none" }}
                                        type="file"
                                        accept=".png,.jpg"
                                        multiple
                                        required
                                        onChange={({
                                            target: { validity, files }
                                        }) => {
                                            console.log(files);
                                            uploadFilesWithClientId({
                                                variables: {
                                                    files,
                                                    clientId: id
                                                }
                                            });
                                        }}
                                    />
                                    UPLOAD FILE
                                </UploadDeleteButton>

                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        )}
                    </Mutation>
                </div>

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
                        let currentPage = 1;

                        if (images.length > 0) {
                            totalImages = images[0].totalImages;
                            pages =
                                (totalImages - (totalImages % limit)) / limit;
                            currentPage =
                                offset / limit > 0 ? offset / limit : 1;
                        }

                        return (
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        height: "3vh"
                                    }}
                                >
                                    <div>
                                        <p
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "1.3em"
                                            }}
                                        >
                                            Images {offset + 1} -{" "}
                                            {offset + limit > totalImages
                                                ? totalImages
                                                : offset + limit}{" "}
                                            of {totalImages} Images Shown Below
                                        </p>
                                    </div>
                                    <div>
                                        <Select
                                            value={this.state.limit}
                                            onChange={event => {
                                                this.setState({
                                                    limit: event.target.value
                                                });
                                            }}
                                        >
                                            <MenuItem value={5}>
                                                Show 5 Images Per Page
                                            </MenuItem>
                                            <MenuItem value={10}>
                                                Show 10 Images Per Page
                                            </MenuItem>
                                            <MenuItem value={20}>
                                                Show 20 Images Per Page
                                            </MenuItem>
                                            <MenuItem value={30}>
                                                Show 30 Images Per Page
                                            </MenuItem>
                                            <MenuItem value={50}>
                                                Show 50 Images Per Page
                                            </MenuItem>
                                            <MenuItem value={100}>
                                                Show 100 Images Per Page
                                            </MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        overflowY: "scroll",
                                        height: "60vh",
                                        flexWrap: "wrap",
                                        alignItems: "center"
                                    }}
                                >
                                    {images.length > 0 &&
                                        images.map(image => {
                                            return (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        padding: "10px"
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            width: "300px",
                                                            textAlign: "center",
                                                            fontWeight: "bold",
                                                            fontSize: "1.1em"
                                                        }}
                                                    >
                                                        {image.name}
                                                    </p>
                                                    <a
                                                        onClick={() => {
                                                            window.open(
                                                                image.path
                                                            );
                                                        }}
                                                    >
                                                        <img
                                                            style={{
                                                                width: "300px",
                                                                maxHeight:
                                                                    "200px"
                                                            }}
                                                            src={image.path}
                                                        />
                                                    </a>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center"
                                                        }}
                                                    >
                                                        <div>
                                                            <ImageLinkText
                                                                onClick={() => {
                                                                    window.open(
                                                                        image.path
                                                                    );
                                                                }}
                                                            >
                                                                View Full Size
                                                            </ImageLinkText>
                                                        </div>
                                                        <div
                                                            style={{
                                                                marginLeft:
                                                                    "5px",
                                                                paddingLeft:
                                                                    "5px",
                                                                borderLeft:
                                                                    "1px solid black",

                                                                marginRight:
                                                                    "5px",
                                                                paddingRight:
                                                                    "5px",
                                                                borderRight:
                                                                    "1px solid black"
                                                            }}
                                                        >
                                                            <ImageLinkText
                                                                onClick={() => {
                                                                    window.open(
                                                                        image.path
                                                                    );
                                                                }}
                                                            >
                                                                Download
                                                            </ImageLinkText>
                                                        </div>
                                                        <div>
                                                            <ImageLinkText
                                                                onClick={() => {
                                                                    console.log(
                                                                        "OnClick"
                                                                    );
                                                                }}
                                                            >
                                                                Edit
                                                            </ImageLinkText>
                                                        </div>
                                                    </div>

                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center"
                                                        }}
                                                    >
                                                        <p>
                                                            Size:
                                                            {formatBytes(
                                                                image.size
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        height: "5vh",
                                        alignItems: "center"
                                    }}
                                >
                                    {images.length > 0 ? (
                                        <div>
                                            <ul>
                                                {pages > 0 && (
                                                    <a
                                                        onClick={this.handlePagination.bind(
                                                            this,
                                                            0
                                                        )}
                                                    >
                                                        <PaginationSection>
                                                            <span>1</span>
                                                        </PaginationSection>
                                                    </a>
                                                )}
                                                {currentPage >= 4 && (
                                                    <PaginationSectionDot>
                                                        <span>...</span>
                                                    </PaginationSectionDot>
                                                )}
                                                {times(pages, index => {
                                                    if (
                                                        index < pages - 1 &&
                                                        index > 0
                                                    ) {
                                                        console.log(
                                                            `current page${currentPage}`
                                                        );
                                                        console.log(
                                                            `index${index}`
                                                        );

                                                        if (
                                                            currentPage <
                                                                index + 3 &&
                                                            currentPage >
                                                                index - 3
                                                        ) {
                                                            return (
                                                                <a
                                                                    onClick={this.handlePagination.bind(
                                                                        this,
                                                                        index +
                                                                            1
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
                                                    }
                                                })}
                                                {currentPage <= pages - 5 && (
                                                    <PaginationSectionDot>
                                                        <span>...</span>
                                                    </PaginationSectionDot>
                                                )}
                                                {pages > 0 && (
                                                    <a
                                                        onClick={this.handlePagination.bind(
                                                            this,
                                                            pages
                                                        )}
                                                    >
                                                        <PaginationSection>
                                                            <span>
                                                                {totalImages %
                                                                    limit >
                                                                    0 &&
                                                                pages < 3
                                                                    ? pages + 1
                                                                    : pages}
                                                            </span>
                                                        </PaginationSection>
                                                    </a>
                                                )}
                                            </ul>
                                        </div>
                                    ) : (
                                        <PaginationSection>
                                            <span>1</span>
                                        </PaginationSection>
                                    )}
                                    <div>
                                        Page {currentPage} of {pages - 1}
                                    </div>
                                </div>
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
