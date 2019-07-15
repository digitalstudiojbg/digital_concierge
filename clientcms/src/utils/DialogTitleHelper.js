//Taken from https://github.com/mui-org/material-ui/issues/13520#issuecomment-436011875

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 3}px 0`
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing.unit / 2,
        top: theme.spacing.unit / 2,
        color: theme.palette.grey[500]
    }
});

function DialogTitleHelper(props) {
    const {
        children,
        classes,
        onClose,
        TypographyProps,
        variant,
        className
    } = props;

    return (
        <div className={classes.root}>
            <Typography
                align="center"
                variant={Boolean(variant) ? variant : "h4"}
                {...TypographyProps}
                {...Boolean(className) && { classes: { root: className } }}
            >
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    aria-label="Close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </div>
    );
}

DialogTitleHelper.displayName = "DialogTitle";

DialogTitleHelper.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    TypographyProps: PropTypes.object
};

export default withStyles(styles)(DialogTitleHelper);
