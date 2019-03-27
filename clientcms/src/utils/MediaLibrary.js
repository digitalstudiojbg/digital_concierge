import React from "react";
import { Query, Mutation, withApollo } from "react-apollo";
import { getClientImageById } from "../data/query";
import PropTypes from "prop-types";
import Loading from "../components/loading/Loading";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { times } from "lodash";
import styled from "styled-components";
import { formatBytes } from "./Constants";
import { UPLOAD_FILES_WITH_CLIENT_ID, DELETE_FILES } from "../data/mutation";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";

const Transition = props => {
    return <Slide direction="up" {...props} />;
};

const styles = theme => ({
    select: {
        width: "300px"
    },
    buttonFont: {
        fontSize: "1.2em"
    },
    checkbox: {
        paddingTop: "0px",
        paddingBottom: "0px"
    }
});

const EachMediaSection = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0 10px 0;
    padding: 10px;
    height: 280px;
    justify-content: space-between;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #fff0f5;
    }
`;
const PaginationSection = styled.li`
    display: inline;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
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
    border: 3px solid rgb(64, 84, 178);
    display: inline-block;
    width: 200px;
    text-align: center;
    cursor: pointer;
    padding: 5px;
    font-size: 1.3em;
    color: rgb(64, 84, 178);
    border-radius: 5px;
    &:hover {
        font-weight: bold;
    }
`;

class MediaLibrary extends React.Component {
    state = {
        limit: 10,
        offset: 0,
        selected: [],
        deleteAlertOpen: false,
        sort: 1
    };

    handlePagination(id) {
        this.setState(
            {
                offset: id * this.state.limit
            },
            () => {
                this.resetSelected();
            }
        );
    }

    handleCheckbox(image) {
        const { selected } = this.state;
        this.setState({
            selected: selected.includes(image)
                ? selected.filter(each => {
                      return each !== image;
                  })
                : [...selected, image]
        });
    }

    handleClickOpen = () => {
        this.setState({ deleteAlertOpen: true });
    };

    handleClose = () => {
        this.setState({ deleteAlertOpen: false });
    };

    resetSelected = () => {
        this.setState({ selected: [] });
    };

    eachMediaSectionOnClick = image => {
        const { isBrowserMedia, multipleSelect } = this.props;
        if (isBrowserMedia && multipleSelect) {
            this.handleCheckbox(image);
        }
    };

    render() {
        const {
            clientId: id,
            classes,
            isBrowserMedia = false,
            setSelectedImages = null,
            multipleSelect = false
        } = this.props;
        const { limit, offset, selected, sort } = this.state;

        const toRenderCheckbox = multipleSelect || !isBrowserMedia;

        return (
            <div style={{ width: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        paddingBottom: "20px"
                    }}
                >
                    {!isBrowserMedia && (
                        <Mutation
                            mutation={UPLOAD_FILES_WITH_CLIENT_ID}
                            refetchQueries={[
                                {
                                    query: getClientImageById,
                                    variables: { id, limit, offset, sort }
                                }
                            ]}
                            update={(cache, data) => {
                                this.resetSelected();
                            }}
                        >
                            {(uploadFilesWithClientId, { loading, error }) => {
                                return (
                                    <div>
                                        <UploadDeleteButton>
                                            {!loading ? (
                                                <React.Fragment>
                                                    <input
                                                        style={{
                                                            display: "none"
                                                        }}
                                                        type="file"
                                                        accept=".png,.jpg"
                                                        multiple
                                                        required
                                                        onChange={({
                                                            target: {
                                                                validity,
                                                                files
                                                            }
                                                        }) => {
                                                            uploadFilesWithClientId(
                                                                {
                                                                    variables: {
                                                                        files,
                                                                        clientId: id
                                                                    }
                                                                }
                                                            );
                                                            this.resetSelected();
                                                        }}
                                                    />
                                                    UPLOAD FILE
                                                </React.Fragment>
                                            ) : (
                                                <Loading button />
                                            )}
                                            {error && (
                                                <p
                                                    style={{
                                                        color: "red",
                                                        fontSize: "1.2em"
                                                    }}
                                                >
                                                    `Error! ${error.message}`
                                                </p>
                                            )}
                                        </UploadDeleteButton>
                                    </div>
                                );
                            }}
                        </Mutation>
                    )}

                    {!isBrowserMedia && (
                        <Mutation
                            mutation={DELETE_FILES}
                            refetchQueries={[
                                {
                                    query: getClientImageById,
                                    variables: { id, limit, offset, sort }
                                }
                            ]}
                            update={(cache, data) => {
                                this.resetSelected();
                            }}
                        >
                            {(deleteFiles, { loading, error }) => {
                                return (
                                    <div style={{ paddingLeft: "25px" }}>
                                        <UploadDeleteButton
                                            onClick={() => {
                                                this.handleClickOpen();
                                            }}
                                        >
                                            {!loading ? (
                                                <span>DELETE SELECTED</span>
                                            ) : (
                                                <Loading button />
                                            )}
                                        </UploadDeleteButton>

                                        <Dialog
                                            open={this.state.deleteAlertOpen}
                                            TransitionComponent={Transition}
                                            onClose={this.handleClose}
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                <h2>Confirmation</h2>
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    {selected.length > 0 ? (
                                                        <React.Fragment>
                                                            <p
                                                                style={{
                                                                    fontSize:
                                                                        "1.3em"
                                                                }}
                                                            >
                                                                Are you sure you
                                                                want to delete
                                                                the selected
                                                                images? Click OK
                                                                to confirm.
                                                            </p>
                                                            <ul
                                                                style={{
                                                                    paddingLeft:
                                                                        "30px",
                                                                    paddingRight:
                                                                        "30px"
                                                                }}
                                                            >
                                                                {selected.map(
                                                                    each => {
                                                                        return (
                                                                            <li
                                                                                style={{
                                                                                    fontSize:
                                                                                        "1.2em"
                                                                                }}
                                                                            >
                                                                                {
                                                                                    each.name
                                                                                }
                                                                            </li>
                                                                        );
                                                                    }
                                                                )}
                                                            </ul>
                                                        </React.Fragment>
                                                    ) : (
                                                        <p
                                                            style={{
                                                                fontSize:
                                                                    "1.3em"
                                                            }}
                                                        >
                                                            Please choose at
                                                            least one image to
                                                            delete first.
                                                        </p>
                                                    )}
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                {selected.length > 0 ? (
                                                    <React.Fragment>
                                                        <Button
                                                            onClick={
                                                                this.handleClose
                                                            }
                                                            color="secondary"
                                                            className={
                                                                classes.buttonFont
                                                            }
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            onClick={() => {
                                                                // let toDelete = [];
                                                                // selected.map(
                                                                //     each => {
                                                                //         toDelete.push(
                                                                //             {
                                                                //                 id: parseInt(
                                                                //                     each.id
                                                                //                 ),
                                                                //                 key:
                                                                //                     each.key
                                                                //             }
                                                                //         );
                                                                //     }
                                                                // );
                                                                const toDelete = selected.map(
                                                                    each => ({
                                                                        id: parseInt(
                                                                            each.id
                                                                        ),
                                                                        key:
                                                                            each.key
                                                                    })
                                                                );
                                                                selected.length >
                                                                0
                                                                    ? deleteFiles(
                                                                          {
                                                                              variables: {
                                                                                  media: toDelete
                                                                              }
                                                                          }
                                                                      )
                                                                    : alert(
                                                                          "Please select one image"
                                                                      );
                                                                this.handleClose();
                                                                this.resetSelected();
                                                            }}
                                                            color="primary"
                                                            autoFocus
                                                            className={
                                                                classes.buttonFont
                                                            }
                                                        >
                                                            Ok
                                                        </Button>
                                                    </React.Fragment>
                                                ) : (
                                                    <Button
                                                        onClick={
                                                            this.handleClose
                                                        }
                                                        color="primary"
                                                        className={
                                                            classes.buttonFont
                                                        }
                                                    >
                                                        Ok
                                                    </Button>
                                                )}
                                            </DialogActions>
                                        </Dialog>
                                        {error && (
                                            <p
                                                style={{
                                                    color: "red",
                                                    fontSize: "1.2em"
                                                }}
                                            >
                                                `Error! ${error.message}`
                                            </p>
                                        )}
                                    </div>
                                );
                            }}
                        </Mutation>
                    )}

                    {isBrowserMedia && setSelectedImages && multipleSelect && (
                        <div
                            style={{ paddingLeft: "25px" }}
                            onClick={() => {
                                setSelectedImages(this.state.selected);
                            }}
                        >
                            <UploadDeleteButton>SAVE</UploadDeleteButton>
                        </div>
                    )}
                </div>

                <Query
                    query={getClientImageById}
                    variables={{ id, limit, offset, sort }}
                    fetchPolicy="no-cache"
                >
                    {({
                        loading,
                        error,
                        // data: { client: { media: images = {} } = {} } = {}
                        data: { mediaByClient: images = {} } = {}
                    }) => {
                        if (loading) return <Loading loadingData />;
                        if (error) return `Error! ${error.message}`;

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
                                    <div
                                        style={{
                                            display: "flex"
                                        }}
                                    >
                                        <div style={{ paddingRight: "20px" }}>
                                            <Select
                                                className={classes.select}
                                                value={limit}
                                                onChange={event => {
                                                    this.setState({
                                                        limit:
                                                            event.target.value,
                                                        selected: [],
                                                        offset: 0
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

                                        <div style={{ paddingLeft: "20px" }}>
                                            <Select
                                                className={classes.select}
                                                value={sort}
                                                onChange={event => {
                                                    this.setState({
                                                        sort:
                                                            event.target.value,
                                                        selected: [],
                                                        offset: 0
                                                    });
                                                }}
                                            >
                                                <MenuItem value={1}>
                                                    Sort by name (A-Z)
                                                </MenuItem>
                                                <MenuItem value={2}>
                                                    Sort by name (Z-A)
                                                </MenuItem>
                                                <MenuItem value={3}>
                                                    Sort by date modified
                                                    (Oldest first)
                                                </MenuItem>
                                                <MenuItem value={4}>
                                                    Sort by date modified
                                                    (Newest first)
                                                </MenuItem>
                                                <MenuItem value={5}>
                                                    Sort by file size (Smallest
                                                    first)
                                                </MenuItem>
                                                <MenuItem value={6}>
                                                    Sort by file size (Largest
                                                    first)
                                                </MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        overflowY: "scroll",
                                        height: this.props.height,
                                        flexWrap: "wrap",
                                        alignItems: "center"
                                    }}
                                >
                                    {images.length > 0 &&
                                        images.map((image, index) => {
                                            return (
                                                <EachMediaSection
                                                    key={index}
                                                    onClick={this.eachMediaSectionOnClick.bind(
                                                        this,
                                                        image
                                                    )}
                                                >
                                                    <p
                                                        style={{
                                                            width: "300px",
                                                            overflow: "hidden",
                                                            whiteSpace:
                                                                "nowrap",
                                                            textOverflow:
                                                                "ellipsis",
                                                            textAlign: "center",
                                                            fontWeight: "bold",
                                                            fontSize: "1.1em",
                                                            marginBottom: "0px"
                                                        }}
                                                    >
                                                        {toRenderCheckbox && (
                                                            <Checkbox
                                                                checked={this.state.selected.includes(
                                                                    image
                                                                )}
                                                                onChange={this.handleCheckbox.bind(
                                                                    this,
                                                                    image
                                                                )}
                                                                className={
                                                                    classes.checkbox
                                                                }
                                                                value="checkedB"
                                                                color="primary"
                                                            />
                                                        )}

                                                        {image.name}
                                                    </p>
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                !isBrowserMedia
                                                            ) {
                                                                window.open(
                                                                    image.path
                                                                );
                                                            } else if (
                                                                !multipleSelect
                                                            ) {
                                                                setSelectedImages(
                                                                    [image]
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <img
                                                            style={{
                                                                width: "300px",
                                                                maxHeight:
                                                                    "200px"
                                                            }}
                                                            src={image.path}
                                                            alt="Entry for CLient Library"
                                                        />
                                                    </div>

                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center"
                                                        }}
                                                    >
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
                                                                    View Full
                                                                    Size
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
                                                                        /*downloadFile(
                                                                            image.path,
                                                                            image.name
                                                                        );*/
                                                                        window.open(
                                                                            image.path
                                                                        );
                                                                    }}
                                                                >
                                                                    Download
                                                                </ImageLinkText>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    Size:
                                                                    {formatBytes(
                                                                        image.size
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </EachMediaSection>
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
                                                        if (
                                                            currentPage <
                                                                index + 3 &&
                                                            currentPage >
                                                                index - 3
                                                        ) {
                                                            return (
                                                                <a
                                                                    key={index}
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
                                        Page {currentPage} of {pages}
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
    clientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    height: PropTypes.string.isRequired,
    isBrowserMedia: PropTypes.bool,
    setSelectedImages: PropTypes.func,
    multipleSelect: PropTypes.bool
};

export default withStyles(styles)(withApollo(MediaLibrary));
