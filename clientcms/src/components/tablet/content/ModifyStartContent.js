import React from "react";
import {
    ContainerDiv,
    CreateContentContainerDiv,
    SYSTEM_CMS_CONTENT_URL
} from "../../../utils/Constants";
import Loading from "../../loading/Loading";
import styled from "styled-components";
import { Query } from "react-apollo";
import { getLayoutListFromType } from "../../../data/query";
import Button from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { withApollo } from "react-apollo";
import Dropzone from "react-dropzone";
import { withRouter } from "react-router-dom";
import BrowserMedia from "../../../utils/BrowserMedia";
import ColourSchemePicker from "../../../utils/ColourSchemePicker";
import TextEditorField from "../../../utils/TextEditorField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
    SectionHeader,
    SubSectionHeader,
    SubSectionTop,
    MainSubSections,
    SubSectionDiv
} from "../../home/WelcomeStyleSet";

const QueryHOC = ({ ...props }) => (
    <Query query={getLayoutListFromType} variables={{ typeName: "start" }}>
        {({ loading, error, data: { layoutsFromType: layouts } }) => {
            if (loading) return <Loading loadingData />;
            if (error) return "Error message: " + error.message;
            const combinedProps = { ...props, layouts };
            return <ModifyStartContent {...combinedProps} />;
        }}
    </Query>
);

const styles = () => ({
    saveButton: {
        color: "white",
        background: "#A5A4BF",
        marginLeft: 0
    },
    cancelButton: {
        marginLeft: 30,
        color: "#A2A2A2"
    },
    descriptionTextField: {
        margin: 0
    },
    imageNameTextField: {
        // marginTop: 15,
        paddingBottom: 20,
        width: "60%"
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
    },
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    Button: {
        backgroundColor: "white",
        marginBottom: 10,
        padding: "5px 10px"
    }
});

const ImageDiv = styled.div`
    // width: 100%;
    height: 350px;
    background-image: url(${props => props.imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: white;
`;

function SlideUpTransition(props) {
    return <Slide direction="up" {...props} />;
}

class ModifyStartContent extends React.PureComponent {
    constructor(props) {
        super(props);
        const has_header_media_data =
            Array.isArray(props.values.headers) &&
            props.values.headers.length > 0;

        const has_logos_media_data =
            Array.isArray(props.values.logos) && props.values.logos.length > 0;

        this.state = {
            headerImageName: has_header_media_data
                ? props.values.headers[0].name
                : "",
            logoImageName: has_logos_media_data
                ? props.values.logos[0].name
                : "",
            openDialog: false,
            whichDialog: ""
        };

        //Create Referencess
        this.dropZoneRefHeader = React.createRef();
        this.dropZoneRefLogo = React.createRef();

        this.changeImageName = this.changeImageName.bind(this);
        this.removeImageForHeader = this.removeImageForHeader.bind(this);
        this.removeImageForLogo = this.removeImageForLogo.bind(this);
        this.navigateAway = this.navigateAway.bind(this);
        this.openDialogImageHeader = this.openDialogImageHeader.bind(this);
        this.openDialogImageLogo = this.openDialogImageLogo.bind(this);
        this.openDialogCancel = this.openDialogCancel.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.openFileBrowserForHeader = this.openFileBrowserForHeader.bind(
            this
        );
        this.openFileBrowserForLogo = this.openFileBrowserForLogo.bind(this);
        this.mediaSelectImageForHeader = this.mediaSelectImageForHeader.bind(
            this
        );
        this.mediaSelectImageForLogo = this.mediaSelectImageForLogo.bind(this);
    }

    changeImageName(imageName) {
        this.setState({ imageName });
    }

    navigateAway() {
        const {
            history,
            match: {
                params: { system_id }
            }
        } = this.props;
        this.setState({ openDialog: false }, () => {
            history.push(
                SYSTEM_CMS_CONTENT_URL.replace(":system_id", system_id)
            );
        });
    }

    openDialogImageHeader() {
        this.setState({ openDialog: true, whichDialog: "header" });
    }
    openDialogImageLogo() {
        this.setState({ openDialog: true, whichDialog: "logo" });
    }
    openDialogCancel() {
        this.setState({ openDialog: true, whichDialog: "cancel" });
    }
    closeDialog() {
        this.setState({ openDialog: false, whichDialog: "" });
    }

    openFileBrowserForHeader() {
        this.dropZoneRefHeader.current.open();
    }

    openFileBrowserForLogo() {
        this.dropZoneRefLogo.current.open();
    }

    onDropHeader(images) {
        this.setState({ headerImageName: images[0].name }, () => {
            this.props.setFieldValue(
                "headers",
                images.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        uploaded: false,
                        changed: true
                    })
                ),
                false
            );
        });
    }

    onDropLogo(images) {
        this.setState({ logoImageName: images[0].name }, () => {
            this.props.setFieldValue(
                "logos",
                images.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        uploaded: false,
                        changed: true
                    })
                ),
                false
            );
        });
    }

    mediaSelectImageForHeader(images) {
        this.setState({ headerImageName: images[0].name }, () => {
            this.props.setFieldValue(
                "headers",
                images.map(image => ({
                    ...image,
                    uploaded: true,
                    changed: true
                })),
                false
            );
        });
    }

    mediaSelectImageForLogo(images) {
        this.setState({ logoImageName: images[0].name }, () => {
            this.props.setFieldValue(
                "logos",
                images.map(image => ({
                    ...image,
                    uploaded: true,
                    changed: true
                })),
                false
            );
        });
    }

    removeImageForHeader() {
        this.setState(
            {
                headerImageName: "",
                openDialog: false,
                whichDialog: ""
            },
            () => {
                this.props.setFieldValue("headers", [], false);
            }
        );
    }

    removeImageForLogo() {
        this.setState(
            {
                logoImageName: "",
                openDialog: false,
                whichDialog: ""
            },
            () => {
                this.props.setFieldValue("logos", [], false);
            }
        );
    }

    renderImageUploaderForHeader() {
        const { classes, values } = this.props;
        const { headerImageName } = this.state;
        const { headers } = values;
        const image =
            Array.isArray(headers) && headers.length > 0 ? headers[0] : null;
        return (
            <React.Fragment>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <MuiTextField
                        label="FILENAME"
                        disabled={true}
                        value={headerImageName}
                        className={classes.imageNameTextField}
                        fullWidth={true}
                        variant="outlined"
                    />
                    <div
                        style={{
                            width: "35%",
                            //  height: "80%",
                            display: "flex",
                            paddingLeft: 10,
                            alignItems: "center"
                        }}
                    >
                        <Button
                            className={classes.Button}
                            style={{ padding: 10 }}
                            variant="outlined"
                            //  className={classes.Button}
                            // fullWidth={true}
                            disabled={
                                !Boolean(headerImageName) &&
                                Boolean(headerImageName.length === 0)
                            }
                            onClick={this.openDialogImageHeader}
                        >
                            REMOVE EXISTING
                        </Button>
                    </div>
                </div>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        height: "45%"
                    }}
                >
                    <div style={{ width: "60%", height: "100%" }}>
                        <Dropzone
                            ref={this.dropZoneRefHeader}
                            disableClick={true}
                            style={{
                                color: "rgb(123,123,123)",
                                fontSize: "0.8em",
                                position: "relative",
                                width: "100%",
                                backgroundColor: "rgb(221, 221, 221)",
                                height: "90%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundImage:
                                    Boolean(image) && Boolean(image.uploaded)
                                        ? `url(${image.path})`
                                        : Boolean(image) &&
                                          !Boolean(image.uploaded)
                                        ? `url(${image.preview})`
                                        : "none",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain"
                            }}
                            onDrop={this.onDropHeader.bind(this)}
                        >
                            {!Boolean(image) && (
                                <div
                                    style={{
                                        padding: "100px 0",
                                        width: "300px",
                                        textAlign: "center"
                                    }}
                                >
                                    DRAG & DROP HERE
                                </div>
                            )}
                        </Dropzone>
                    </div>
                    <div
                        style={{
                            width: "35%",
                            marginTop: "28%",
                            paddingLeft: 10,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Button
                            variant="outlined"
                            className={classes.Button}
                            fullWidth={true}
                            onClick={this.openFileBrowserForHeader}
                        >
                            UPLOAD FILE
                        </Button>
                        <BrowserMedia
                            variant="outlined"
                            color="default"
                            buttonStyle={{ backgroundColor: "white" }}
                            fullWidth={true}
                            multipleSelect={false}
                            updateImageSelection={
                                this.mediaSelectImageForHeader
                            }
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderImageUploaderForLogo() {
        const { classes, values } = this.props;
        const { logoImageName } = this.state;
        const { logos } = values;
        const image =
            Array.isArray(logos) && logos.length > 0 ? logos[0] : null;
        return (
            <React.Fragment>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center"
                        // height: "400px"
                    }}
                >
                    <MuiTextField
                        label="FILENAME"
                        disabled={true}
                        value={logoImageName}
                        className={classes.imageNameTextField}
                        fullWidth={true}
                        variant="outlined"
                    />
                    <div
                        style={{
                            display: "flex",
                            padding: 10,
                            alignItems: "center"
                        }}
                    >
                        <Button
                            variant="outlined"
                            className={classes.Button}
                            fullWidth={true}
                            disabled={
                                !Boolean(logoImageName) &&
                                Boolean(logoImageName.length === 0)
                            }
                            onClick={this.openDialogImageLogo}
                        >
                            REMOVE EXISTING
                        </Button>
                    </div>
                </div>
                <div
                    style={{
                        width: "100%",
                        display: "flex"
                        //  height: "45%"
                    }}
                >
                    <div style={{ width: "60%" }}>
                        <Dropzone
                            ref={this.dropZoneRefLogo}
                            disableClick={true}
                            style={{
                                color: "rgb(123,123,123)",
                                fontSize: "0.8em",
                                position: "relative",
                                width: "100%",
                                backgroundColor: "rgb(221, 221, 221)",
                                // height: "90%",
                                display: "flex",
                                flexDirection: "column",

                                alignItems: "center",
                                backgroundImage:
                                    Boolean(image) && Boolean(image.uploaded)
                                        ? `url(${image.path})`
                                        : Boolean(image) &&
                                          !Boolean(image.uploaded)
                                        ? `url(${image.preview})`
                                        : "none",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain"
                            }}
                            onDrop={this.onDropLogo.bind(this)}
                        >
                            {!Boolean(image) && (
                                <div
                                    style={{
                                        padding: "100px 0",
                                        width: "300px",
                                        textAlign: "center"
                                    }}
                                >
                                    DRAG & DROP HERE
                                </div>
                            )}
                        </Dropzone>
                    </div>
                    <div
                        style={{
                            width: "35%",
                            //  height: "90%",
                            marginTop: "28%",
                            paddingLeft: 10,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Button
                            variant="outlined"
                            className={classes.Button}
                            fullWidth={true}
                            onClick={this.openFileBrowserForLogo}
                        >
                            UPLOAD FILE
                        </Button>
                        <BrowserMedia
                            variant="outlined"
                            color="default"
                            buttonStyle={{ backgroundColor: "white" }}
                            fullWidth={true}
                            multipleSelect={false}
                            updateImageSelection={this.mediaSelectImageForLogo}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderColourSchemePicker() {
        const { setFieldValue, values } = this.props;
        // const is_create = !Boolean(values.id);
        // const initialColours = !is_create ? location.state.data.colours : [];
        const { colours, initial_colours } = values;
        const handleOnChange = colours =>
            setFieldValue("colours", colours, false);
        return (
            <div
                style={{
                    width: "100%",
                    fontSize: "0.5em",
                    //  height: "40%",
                    color: "black",
                    borderColor: "#9D9D9D"
                }}
            >
                <ColourSchemePicker
                    initialColours={initial_colours}
                    currentColours={colours}
                    handleOnChange={handleOnChange}
                    withWrap={true}
                />
            </div>
        );
    }

    render() {
        const { classes, setFieldValue, values, layouts } = this.props;
        const { layout_id } = values;
        const layout =
            Boolean(layout_id) && Array.isArray(layouts) && layouts.length > 0
                ? layouts.find(({ id }) => id === layout_id)
                : {};
        const { media = {} } = layout;
        const { path: imageUrl = null } = media;

        return (
            <ContainerDiv>
                <CreateContentContainerDiv>
                    <MainSubSections
                        style={{
                            width: "100%",
                            //   height: "60%",
                            display: "flex"
                        }}
                    >
                        <SubSectionDiv
                            style={{
                                flexBasis: "30%",
                                margin: "1% 3% 1% 0",
                                borderRight: "1px solid #DDDDDD"
                            }}
                        >
                            <div
                                style={{
                                    width: "90%",
                                    paddingBottom: 20
                                    // height: "70vh"
                                }}
                            >
                                <SectionHeader style={{ color: "black" }}>
                                    LAYOUT DIAGRAM
                                </SectionHeader>
                                {Boolean(imageUrl) && (
                                    <ImageDiv imageUrl={imageUrl} />
                                )}
                            </div>
                            <div
                                style={{
                                    width: "90%",
                                    margin: "5%",
                                    paddingBottom: 20
                                }}
                            >
                                <SubSectionHeader>TEXT FIELD</SubSectionHeader>
                                <TextEditorField
                                    name="description"
                                    setFieldValue={setFieldValue}
                                    initialValue={values.description}
                                    withPlaintext={false}
                                />
                            </div>
                            <div
                                style={{
                                    width: "90%",
                                    margin: "5%",
                                    paddingBottom: 20
                                }}
                            >
                                <SubSectionHeader>BUTTON</SubSectionHeader>
                                <TextEditorField
                                    name="button_text"
                                    setFieldValue={setFieldValue}
                                    initialValue={values.button_text}
                                    withPlaintext={false}
                                />
                            </div>
                        </SubSectionDiv>
                        <SubSectionDiv
                            style={{
                                flexBasis: "30%",
                                margin: "1% 3% 1% 0",
                                borderRight: "1px solid #DDDDDD"
                            }}
                        >
                            <div style={{ width: "95%" }}>
                                <SectionHeader
                                    style={{
                                        paddingBottom: 15,
                                        color: "black"
                                    }}
                                >
                                    LOGO
                                </SectionHeader>

                                {this.renderImageUploaderForLogo()}
                            </div>
                            <div style={{ width: "95%", marginTop: "7%" }}>
                                <SectionHeader
                                    style={{
                                        paddingBottom: 15,
                                        color: "black"
                                    }}
                                >
                                    HEADER
                                </SectionHeader>

                                {this.renderImageUploaderForHeader()}
                            </div>
                        </SubSectionDiv>

                        <SubSectionDiv
                            style={{ flexBasis: "25%", marginRight: "5%" }}
                        >
                            {this.renderColourSchemePicker()}
                        </SubSectionDiv>
                    </MainSubSections>
                </CreateContentContainerDiv>
                <Dialog
                    open={this.state.openDialog}
                    TransitionComponent={SlideUpTransition}
                    keepMounted
                    onClose={this.closeDialog}
                >
                    <DialogTitle
                        id="alert-dialog-slide-title"
                        disableTypography
                        className={classes.dialogTitle}
                    >
                        {(this.state.whichDialog === "header" ||
                            this.state.whichDialog === "logo") && (
                            <h2>CONFIRM IMAGE DELETION</h2>
                        )}
                        {this.state.whichDialog === "cancel" && (
                            <h2>CONFIRM PAGE NAVIGATION</h2>
                        )}
                        <IconButton onClick={this.closeDialog}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {(this.state.whichDialog === "header" ||
                                this.state.whichDialog === "logo") && (
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
                        {(this.state.whichDialog === "header" ||
                            this.state.whichDialog === "logo") && (
                            <React.Fragment>
                                <Button
                                    onClick={
                                        this.state.whichDialog === "header"
                                            ? this.removeImageForHeader
                                            : this.removeImageForLogo
                                    }
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

export default withApollo(withRouter(withStyles(styles)(QueryHOC)));
