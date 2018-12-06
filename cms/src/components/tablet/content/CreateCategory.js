import React from 'react'
import { ContainerDiv, CreateContentContainerDiv } from '../../../utils/Constants';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SingleImageUploader from '../../../utils/SingleImageUploader';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from "@material-ui/icons/Cancel";
import { Formik, Form, Field } from 'formik';

const styles = theme => ({
    saveButton: {
        color: "white",
        background: "#A5A4BF",
    },
});

class CreateCategory extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imageName: "",
        }
        this.changeImageName = this.changeImageName.bind(this);
        this.imageUploaderRef = React.createRef();
        this.removeImage = this.removeImage.bind(this);
    }

    changeImageName(imageName) {
        this.setState({ imageName });
    }

    removeImage() {
        this.imageUploaderRef.removeImage();
    }

    render() {
        const { classes } = this.props;

        return (
            <ContainerDiv>
                <Formik 
                    initialValues={{ name: '' }}
                    onSubmit={(values) => alert(values.name)}
                >
                {({ isSubmitting, errors, values }) => 
                    <Form>
                        <div style={{display: "flex", alignItems: "center", marginBottom: 40}}>
                            <div style={{color: "rgb(35,38,92)", fontSize: "2.5vw", width: "62%"}}>ADD CATEGORY</div>
                            <div style={{color: "rgb(35,38,92)", fontSize: "1vw", width: "10%"}}>
                                <Button 
                                    type="submit" 
                                    disabled={ isSubmitting || Boolean(errors.name) || !Boolean(values.name) || values.name.length === 0 } 
                                    className={classes.saveButton} variant="outlined" size="large"
                                >
                                        ADD & SAVE
                                </Button>
                            </div>
                        </div>
                        <CreateContentContainerDiv>
                            <div style={{width: "50%"}}>
                                <div style={{padding: 20}}>HEADER IMAGE:</div>
                                <SingleImageUploader onRef={ref => (this.imageUploaderRef = ref)} updateImageName={this.changeImageName} />
                            </div>
                            <div style={{width: "50%"}}>
                                <div style={{padding: "20px 20px 20px 0px"}}>CATEGORY TITLE:</div>
                                <Field name="name" style={{width: "100%", height: "5vh", fontSize: "3vh"}} />
                                <div style={{width: "60%", marginTop: 40}}>
                                    <div style={{fontSize: "0.6vw"}}>IMAGE NAME</div>
                                    <TextField
                                        disabled={true}
                                        value={this.state.imageName}
                                        // className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment:               
                                                <InputAdornment position="end">
                                                    <IconButton onClick={this.removeImage}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </InputAdornment>,
                                        }}
                                    />
                                </div>
                            </div>
                        </CreateContentContainerDiv>
                    </Form>
                }
                </Formik>
            </ContainerDiv>
        );
    }
}

export default withStyles(styles)(CreateCategory);