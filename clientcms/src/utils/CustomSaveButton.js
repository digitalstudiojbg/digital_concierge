import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
    Grid,
    Button,
    ButtonGroup,
    MenuItem,
    Menu,
    MenuList
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const styles = () => ({
    saveButton: {
        backgroundColor: "#2699FB",
        borderRight: "1px solid rgb(0,117,179)"
    },
    saveIconButton: {
        backgroundColor: "#2699FB"
    }
});

class CustomSaveButton extends React.Component {
    anchorRef = null;
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            index: 0
        };
        this.anchorRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick() {
        const { options } = this.props;
        const { index } = this.state;
        options[index] && options[index].action();
    }

    handleMenuItemClick(_event, index) {
        const { options } = this.props;
        this.setState({ index, open: false }, () => {
            options[index] && options[index].action();
        });
    }

    handleToggle() {
        const { open } = this.state;
        this.setState({ open: !open });
    }

    handleClose(event) {
        if (
            this.anchorRef.current &&
            this.anchorRef.current.contains(event.target)
        ) {
            return;
        } else {
            this.setState({ open: false });
        }
    }

    render() {
        const { index, open } = this.state;
        const { options, classes } = this.props;
        return (
            <Grid container>
                <Grid item xs={12} align="center">
                    <ButtonGroup
                        variant="contained"
                        color="primary"
                        ref={this.anchorRef}
                        aria-label="Split button"
                    >
                        <Button
                            onClick={this.handleClick}
                            className={classes.saveButton}
                        >
                            {options[index].label}
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            aria-owns={open ? "menu-list-grow" : undefined}
                            aria-haspopup="true"
                            onClick={this.handleToggle}
                            className={classes.saveIconButton}
                        >
                            <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                    <Menu
                        anchorEl={this.anchorRef.current}
                        open={open}
                        onClose={this.handleClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                    >
                        <MenuList>
                            {options.map((option, optionIndex) => (
                                <MenuItem
                                    key={`${optionIndex}-${option.label}`}
                                    selected={optionIndex === index}
                                    onClick={event =>
                                        this.handleMenuItemClick(
                                            event,
                                            optionIndex
                                        )
                                    }
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </Grid>
            </Grid>
        );
    }
}

CustomSaveButton.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            action: PropTypes.func.isRequired
        })
    ).isRequired
};
export default withStyles(styles)(CustomSaveButton);
