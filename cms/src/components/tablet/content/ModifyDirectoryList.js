import React from "react";
import {
    ContainerDiv,
    CreateContentContainerDiv,
    modifyDirectoryListData,
    TABLET_CMS_CONTENT_URL
} from "../../../utils/Constants";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TreeviewCheckbox from "../../../utils/TreeviewCheckbox";
import { Query, Mutation } from "react-apollo";
import Loading from "../../loading/Loading";
import { withApollo } from "react-apollo";
import { getDirectoryListBySystem } from "../../../data/query";
// import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import gql from "graphql-tag";

const styles = _theme => ({
    saveButton: {
        color: "white",
        background: "#A5A4BF",
        marginLeft: 0
    },
    cancelButton: {
        marginLeft: 30,
        color: "#A2A2A2"
    },
    categoryNameTextField: {
        width: "100%"
    },
    imageNameTextField: {
        width: "100%"
    },
    categoryNameFormHelper: {
        fontSize: "0.7em",
        marginLeft: "0px"
    },
    expansionButton: {
        color: "#F0F2F8",
        background: "#DDDFE7",
        borderRadius: 25
    },
    icon: {
        fontSize: "large"
    }
});

const CREATE_DIRECTORY_LIST = gql`
    mutation createDirListTest(
        $name: String!
        $is_root: Boolean!
        $parent_id: Int
        $system_id: Int!
        $layout_id: Int!
        $image: Upload
    ) {
        createDirectoryList(
            input: {
                name: $name
                is_root: $is_root
                layout_id: $layout_id
                system_id: $system_id
                parent_id: $parent_id
                image: $image
            }
        ) {
            id
            name
        }
    }
`;

const DirectoryListSchema = Yup.object().shape({
    name: Yup.string().required("Required")
});

function SlideUpTransition(props) {
    return <Slide direction="up" {...props} />;
}

class ModifyDirectoryList extends React.PureComponent {
    constructor(props) {
        super(props);
        const has_data =
            props.location && props.location.state && props.location.state.data;
        const has_media_data =
            has_data &&
            props.location.state.data.media &&
            props.location.state.data.media.length > 0;
        const images = has_media_data
            ? props.location.state.data.media.map(image => ({
                  ...image,
                  uploaded: true
              }))
            : [];

        this.state = {
            imageName: has_media_data
                ? props.location.state.data.media[0].name
                : "",
            openDialog: false,
            whichDialog: "",
            selected_directory:
                has_data &&
                !props.location.state.data.is_root &&
                props.location.state.data.is_dir_list
                    ? props.location.state.data.parent_id
                    : null,
            images
        };

        //Create Referencess
        this.dropZoneRef = React.createRef();

        this.updateSelectedDirectory = this.updateSelectedDirectory.bind(this);
        this.changeImageName = this.changeImageName.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.navigateAway = this.navigateAway.bind(this);
        this.openDialogImage = this.openDialogImage.bind(this);
        this.openDialogCancel = this.openDialogCancel.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
    }

    updateSelectedDirectory(selected_directory) {
        this.setState({ selected_directory });
    }

    changeImageName(imageName) {
        this.setState({ imageName });
    }

    navigateAway() {
        const { history } = this.props;
        this.setState({ openDialog: false }, () => {
            history.push(TABLET_CMS_CONTENT_URL);
        });
    }

    openDialogImage() {
        this.setState({ openDialog: true, whichDialog: "image" });
    }
    openDialogCancel() {
        this.setState({ openDialog: true, whichDialog: "cancel" });
    }
    closeDialog() {
        this.setState({ openDialog: false, whichDialog: "" });
    }

    openFileBrowser() {
        this.dropZoneRef.current.open();
    }

    componentWillUnmount() {
        this.state.images.forEach(image => {
            if (!Boolean(image.uploaded) && Boolean(image.preview)) {
                // Make sure to revoke the preview data uris to avoid memory leaks
                URL.revokeObjectURL(image.preview);
            }
        });
    }

    onDrop(images) {
        this.setState({
            images: images.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    uploaded: false
                })
            ),
            imageName: images[0].name
        });
    }

    removeImage() {
        this.setState({
            images: [],
            imageName: "",
            openDialog: false,
            whichDialog: ""
        });
    }

    renderImageUploader() {
        const { classes } = this.props;
        const { images } = this.state;
        const image = images.length > 0 ? images[0] : null;
        return (
            <div
                style={{
                    width: "90%",
                    border: "1px solid #CACED5",
                    padding: 10
                }}
            >
                {!Boolean(image) && (
                    <p
                        style={{
                            fontSize: "0.5em",
                            color: "#4D4F5C",
                            marginLeft: "1.2vw"
                        }}
                    >
                        UPLOAD
                    </p>
                )}
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Dropzone
                        ref={this.dropZoneRef}
                        disableClick={true}
                        style={{
                            position: "relative",
                            width: "90%",
                            backgroundColor: "#F0F2F8",
                            height: "320px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onDrop={this.onDrop.bind(this)}
                    >
                        {!Boolean(image) ? (
                            <React.Fragment>
                                <div
                                    style={{
                                        padding: 10,
                                        border: "1px solid #DDDFE7",
                                        borderRadius: 45
                                    }}
                                    onClick={this.openFileBrowser}
                                >
                                    <div
                                        style={{
                                            padding: 10,
                                            border: "1px solid #DDDFE7",
                                            borderRadius: 35,
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <IconButton
                                            className={`fas fa-arrow-circle-up ${
                                                classes.expansionButton
                                            }`}
                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        marginTop: 10,
                                        textAlign: "center",
                                        color: "#43425D",
                                        fontSize: "1em"
                                    }}
                                >
                                    DRAG & DROP
                                    <p
                                        style={{
                                            color: "#aaaaaa",
                                            fontSize: "0.5em"
                                        }}
                                    >
                                        YOUR FILES OR{" "}
                                        <span
                                            onClick={this.openFileBrowser}
                                            style={{
                                                color: "#3B86FF",
                                                textDecoration: "underline",
                                                fontWeight: 700
                                            }}
                                        >
                                            BROWSE
                                        </span>
                                    </p>
                                </div>
                            </React.Fragment>
                        ) : (
                            <img
                                src={
                                    image.uploaded ? image.path : image.preview
                                }
                                alt=""
                                style={{ height: 320 }}
                            />
                        )}
                    </Dropzone>
                </div>
            </div>
        );
    }

    render() {
        const { selected_directory, images } = this.state;
        const { classes, location = {} } = this.props;
        const { data: editData = null } = location.state || {};
        const titleText = Boolean(editData)
            ? "EDIT DIRECTORY LIST ENTRY"
            : "ADD DIRECTORY LIST ENTRY";
        const subTitleText = "DIRECTORY LIST TITLE";

        return (
            <ContainerDiv>
                <Mutation mutation={CREATE_DIRECTORY_LIST}>
                    {(createDirectoryList, { loading, error }) => (
                        <React.Fragment>
                            {loading && <p>Loading...</p>}
                            {error && (
                                <p>Error :( Please try again {error.message}</p>
                            )}
                            <Formik
                                initialValues={{
                                    name: Boolean(editData) ? editData.name : ""
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    //TODO: Add logic to send mutation to DB
                                    alert(values.name);
                                    setSubmitting(false);

                                    if (images && images.length === 1) {
                                        createDirectoryList({
                                            variables: {
                                                name: values.name,
                                                is_root: selected_directory
                                                    ? true
                                                    : false,
                                                layout_id: 1,
                                                system_id: 4,
                                                image: images[0]
                                            }
                                        });
                                    } else {
                                        createDirectoryList({
                                            variables: {
                                                name: values.name,
                                                is_root: selected_directory
                                                    ? true
                                                    : false,
                                                layout_id: 1,
                                                system_id: 4
                                            }
                                        });
                                    }
                                }}
                                validationSchema={DirectoryListSchema}
                            >
                                {({ isSubmitting, errors, values }) => (
                                    <Form>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginBottom: 40
                                            }}
                                        >
                                            <div
                                                style={{
                                                    color: "rgb(35,38,92)",
                                                    fontSize: "2.7em",
                                                    width: "52%"
                                                }}
                                            >
                                                {titleText}
                                            </div>
                                            <div style={{ width: "10%" }}>
                                                <Button
                                                    className={
                                                        classes.cancelButton
                                                    }
                                                    disabled={isSubmitting}
                                                    size="large"
                                                    variant="outlined"
                                                    onClick={
                                                        this.openDialogCancel
                                                    }
                                                >
                                                    CANCEL
                                                </Button>
                                            </div>
                                            <div style={{ width: "10%" }}>
                                                <Button
                                                    type="submit"
                                                    disabled={
                                                        isSubmitting ||
                                                        Boolean(errors.name) ||
                                                        !Boolean(values.name) ||
                                                        values.name.length ===
                                                            0 ||
                                                        !Boolean(
                                                            selected_directory
                                                        )
                                                    }
                                                    className={
                                                        classes.saveButton
                                                    }
                                                    variant="outlined"
                                                    size="large"
                                                >
                                                    ADD & SAVE
                                                </Button>
                                            </div>
                                        </div>
                                        <CreateContentContainerDiv>
                                            <div style={{ width: "50%" }}>
                                                <div style={{ padding: 20 }}>
                                                    HEADER IMAGE:
                                                </div>

                                                {this.renderImageUploader()}
                                            </div>
                                            <div style={{ width: "50%" }}>
                                                <div
                                                    style={{
                                                        padding:
                                                            "20px 20px 20px 0px"
                                                    }}
                                                >
                                                    {subTitleText}
                                                </div>
                                                {/* <Field name="name" style={{width: "100%", height: "5vh", fontSize: "1.5em"}} /> */}
                                                <Field
                                                    name="name"
                                                    validateOnBlur
                                                    validateOnChange
                                                    render={({
                                                        field,
                                                        form
                                                    }) => (
                                                        <TextField
                                                            className={
                                                                classes.categoryNameTextField
                                                            }
                                                            variant="outlined"
                                                            name={field.name}
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            onBlur={
                                                                field.onBlur
                                                            }
                                                            error={
                                                                form.errors[
                                                                    field.name
                                                                ] &&
                                                                form.touched[
                                                                    field.name
                                                                ]
                                                            }
                                                            helperText={
                                                                form.errors[
                                                                    field.name
                                                                ] &&
                                                                form.touched[
                                                                    field.name
                                                                ] &&
                                                                String(
                                                                    form.errors[
                                                                        field
                                                                            .name
                                                                    ]
                                                                )
                                                            }
                                                            FormHelperTextProps={{
                                                                classes: {
                                                                    root:
                                                                        classes.categoryNameFormHelper
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <div
                                                    style={{
                                                        width: "60%",
                                                        marginTop: 40
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontSize: "0.8em"
                                                        }}
                                                    >
                                                        IMAGE NAME
                                                    </div>
                                                    <TextField
                                                        disabled={true}
                                                        value={
                                                            this.state.imageName
                                                        }
                                                        className={
                                                            classes.imageNameTextField
                                                        }
                                                        margin="normal"
                                                        variant="outlined"
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        disabled={
                                                                            this
                                                                                .state
                                                                                .imageName
                                                                                .length ===
                                                                            0
                                                                        }
                                                                        onClick={
                                                                            this
                                                                                .openDialogImage
                                                                        }
                                                                    >
                                                                        <CancelIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "0.8em",
                                                        marginTop: 20
                                                    }}
                                                >
                                                    SELECT LOCATION
                                                    <p
                                                        style={{
                                                            fontSize: "0.7em"
                                                        }}
                                                    >
                                                        LEAVE BLANK IF CREATING
                                                        A FIRST DIRECTORY LIST
                                                        CATEGORY
                                                    </p>
                                                </div>
                                                <Query
                                                    query={getDirectoryListBySystem(
                                                        1
                                                    )}
                                                >
                                                    {({
                                                        loading,
                                                        error,
                                                        data
                                                    }) => {
                                                        if (loading)
                                                            return (
                                                                <Loading
                                                                    loadingData
                                                                />
                                                            );
                                                        if (error)
                                                            return `Error! ${
                                                                error.message
                                                            }`;
                                                        const modifiedData = modifyDirectoryListData(
                                                            data.directoryLists_by_system
                                                        );
                                                        if (
                                                            !Boolean(editData)
                                                        ) {
                                                            return (
                                                                <TreeviewCheckbox
                                                                    data={
                                                                        modifiedData
                                                                    }
                                                                    updateSelectedDirectory={
                                                                        this
                                                                            .updateSelectedDirectory
                                                                    }
                                                                    selectAmount="single"
                                                                />
                                                            );
                                                        } else {
                                                            return (
                                                                <TreeviewCheckbox
                                                                    data={
                                                                        modifiedData
                                                                    }
                                                                    updateSelectedDirectory={
                                                                        this
                                                                            .updateSelectedDirectory
                                                                    }
                                                                    selectAmount="single"
                                                                    selectedValue={
                                                                        selected_directory
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    }}
                                                </Query>
                                            </div>
                                        </CreateContentContainerDiv>
                                    </Form>
                                )}
                            </Formik>
                        </React.Fragment>
                    )}
                </Mutation>
                <Dialog
                    open={this.state.openDialog}
                    TransitionComponent={SlideUpTransition}
                    keepMounted
                    onClose={this.closeDialog}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.state.whichDialog === "image" && (
                            <p>CONFIRM IMAGE DELETION</p>
                        )}
                        {this.state.whichDialog === "cancel" && (
                            <p>CONFIRM PAGE NAVIGATION</p>
                        )}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.state.whichDialog === "image" && (
                                <p>
                                    PLEASE CONFIRM IF YOU WANT TO REMOVE
                                    DIRECTORY LIST IMAGE.
                                </p>
                            )}
                            {this.state.whichDialog === "cancel" && (
                                <p>ARE YOU SURE YOU WANT TO LEAVE THIS PAGE?</p>
                            )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {this.state.whichDialog === "image" && (
                            <React.Fragment>
                                <Button
                                    onClick={this.removeImage}
                                    color="primary"
                                >
                                    YES
                                </Button>
                                <Button
                                    onClick={this.closeDialog}
                                    color="primary"
                                >
                                    NO
                                </Button>
                            </React.Fragment>
                        )}
                        {this.state.whichDialog === "cancel" && (
                            <React.Fragment>
                                <Button
                                    onClick={this.navigateAway}
                                    color="primary"
                                >
                                    LEAVE
                                </Button>
                                <Button
                                    onClick={this.closeDialog}
                                    color="primary"
                                >
                                    STAY
                                </Button>
                            </React.Fragment>
                        )}
                    </DialogActions>
                </Dialog>
            </ContainerDiv>
        );
    }
}

ModifyDirectoryList.defaultProps = {};

ModifyDirectoryList.propTypes = {};

export default withApollo(withStyles(styles)(ModifyDirectoryList));
