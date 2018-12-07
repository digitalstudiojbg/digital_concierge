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
import * as Yup from 'yup';

const styles = theme => ({
    saveButton: {
        color: "white",
        background: "#A5A4BF",
    },
    categoryNameTextField: {
        width: "100%",
    },
    categoryNameFormHelper: {
        fontSize: "0.7em",
        marginLeft: "0px",
    }
});

const CategorySchema = Yup.object().shape({
    name: Yup.string().required('Required'),
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
                    onSubmit={(values, { setSubmitting }) => {
                        //TODO: Add logic to send mutation to DB
                        alert(values.name);
                        setSubmitting(false);
                    }}
                    validationSchema={CategorySchema}
                >
                {({ isSubmitting, errors, values, touched }) => 
                    <Form>
                        <div style={{display: "flex", alignItems: "center", marginBottom: 40}}>
                            <div style={{color: "rgb(35,38,92)", fontSize: "2.7em", width: "62%"}}>ADD CATEGORY</div>
                            <div style={{color: "rgb(35,38,92)", fontSize: "1.2em", width: "10%"}}>
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
                                {/* <Field name="name" style={{width: "100%", height: "5vh", fontSize: "1.5em"}} /> */}
                                <Field 
                                    name="name"
                                    validateOnBlur
                                    validateOnChange
                                    render={({ field, form }) => (
                                        <TextField 
                                            className={classes.categoryNameTextField}
                                            variant="outlined"
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            error={form.errors[field.name] && form.touched[field.name]}
                                            helperText={
                                                form.errors[field.name] &&
                                                form.touched[field.name] &&
                                                String(form.errors[field.name])
                                            }
                                            FormHelperTextProps={{
                                                classes: {
                                                    root: classes.categoryNameFormHelper
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <div style={{width: "60%", marginTop: 40}}>
                                    <div style={{fontSize: "0.8em"}}>IMAGE NAME</div>
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