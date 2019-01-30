import React, { Component, Fragment, lazy, Suspense } from "react";
import { withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import WizardCreateClientPageOne from "./WizardCreateClientPageOne";
import WizardCreateClientPageTwo from "./WizardCreateClientPageTwo";
import WizardCreateClientPageThree from "./WizardCreateClientPageThree";
import WizardCreateClientPageFour from "./WizardCreateClientPageFour";
import WizardCreateClientPageFive from "./WizardCreateClientPageFive";
import WizardCreateClientPageSix from "./WizardCreateClientPageSix";

const styles = theme => ({
    root: {
        width: "90%"
    },
    button: {
        marginRight: theme.spacing.unit
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
});

const steps = [
    "Client",
    "Account set-up",
    "Structure",
    "System",
    "Theme",
    "Media"
];

class CreateClient extends Component {
    state = {
        activeStep: 0,
        skipped: new Set()
    };

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;

        this.setState({
            activeStep: activeStep + 1,
            skipped
        });
    };

    /*handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1
        }));
    };*/

    handleReset = () => {
        this.setState({
            activeStep: 0
        });
    };

    renderBodySection() {
        switch (this.state.activeStep) {
            case 0:
                return <WizardCreateClientPageOne />;
            case 1:
                return <WizardCreateClientPageTwo />;
            case 2:
                return <WizardCreateClientPageThree />;
            case 3:
                return <WizardCreateClientPageFour />;
            case 4:
                return <WizardCreateClientPageFive />;
            case 5:
                return <WizardCreateClientPageSix />;
            default:
                return "Unknown step";
        }
    }

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;
        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const props = {};
                        const labelProps = {};

                        return (
                            <Step key={label} {...props}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Button
                                onClick={this.handleReset}
                                className={classes.button}
                            >
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <div>
                            {this.renderBodySection()}
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1
                                        ? "Finish"
                                        : "Next"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

CreateClient.propTypes = {
    classes: PropTypes.object
};

export default withApollo(withStyles(styles)(CreateClient));

/*
import React from "react";
import WizardCreateClient from "./WizardCreateClient";
import WizardCreateClientPageOne from "./WizardCreateClientPageOne";
import WizardCreateClientPageTwo from "./WizardCreateClientPageTwo";

const initialValues = {
    venue_name: "NEAL's HOTEL",
    nature_of_business: "HOTEL BBQ",
    venue_phone: "",
    venue_email: "",
    venue_address: "",
    venue_city: "",
    venue_postcode: "",
    venue_state: null,
    venue_country: null,
    venue_postal_address: "",
    venue_postal_city: "",
    venue_postal_postcode: "",
    venue_postal_state: null,
    venue_postal_country: null,
    contact_name: "",
    contact_position: "",
    contact_email: "",
    contact_phone: "",
    contact_mobile: ""
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const CreateClient = () => (
    <div>
        CREATE CLIENT PAGE
        <WizardCreateClient
            onSubmit={(values, actions) => {
                sleep(300).then(() => {
                    window.alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                });
            }}
            initialValues={{ ...initialValues }}
        >
            <WizardCreateClientPageOne />
            <WizardCreateClientPageTwo />
        </WizardCreateClient>
    </div>
);

export default CreateClient;
*/
