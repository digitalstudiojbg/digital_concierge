import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";

const styles = theme => ({
    expansionButton: {
        margin: theme.spacing.unit,
        color: "white",
        background: "rgb(155,157,183)"
    },
    icon: {
        fontSize: "small"
    }
});

const paddingSize = 30;
// const approximateButtonSize = 40;

class TreeviewCheckbox extends React.PureComponent {
    constructor(props) {
        super(props);
        const selected_dir_list_empty =
            props.selectAmount === "single" ? null : [];
        let selected_dir_list = selected_dir_list_empty;
        if (props.selectAmount === "single" && Boolean(props.selectedValue)) {
            selected_dir_list = props.selectedValue;
        } else if (
            props.selectAmount === "multiple" &&
            Boolean(props.selectedValues)
        ) {
            selected_dir_list = props.selectedValues;
        }
        this.state = {
            expanded: [],
            selected_dir_list
        };
        this.addToExpanded = this.addToExpanded.bind(this);
        this.removeFromExpanded = this.removeFromExpanded.bind(this);
        this.addToSelected = this.addToSelected.bind(this);
        this.removeFromSelected = this.removeFromSelected.bind(this);
        this.handleChangeRadioButton = this.handleChangeRadioButton.bind(this);
    }

    //Method gets called when we expand a directory list
    addToExpanded(dir_list_id) {
        if (this.state.expanded.indexOf(dir_list_id) === -1) {
            this.setState({
                expanded: [...this.state.expanded, dir_list_id]
            });
        }
    }

    //Method gets called when we minimise a directory list
    removeFromExpanded(dir_list_id) {
        const index = this.state.expanded.indexOf(dir_list_id);
        if (index !== -1) {
            this.setState({
                expanded: [
                    ...this.state.expanded.slice(0, index),
                    ...this.state.expanded.slice(index + 1)
                ]
            });
        }
    }

    addToSelected(dir_list_id) {
        const { selected_dir_list } = this.state;
        const { updateSelectedDirectory } = this.props;
        if (selected_dir_list.indexOf(dir_list_id) === -1) {
            this.setState(
                {
                    selected_dir_list: [...selected_dir_list, dir_list_id]
                },
                () => {
                    updateSelectedDirectory &&
                        updateSelectedDirectory(this.state.selected_dir_list);
                }
            );
        }
    }

    removeFromSelected(dir_list_id) {
        const { selected_dir_list } = this.state;
        const { updateSelectedDirectory } = this.props;
        const index = selected_dir_list.indexOf(dir_list_id);
        if (index !== -1) {
            this.setState(
                {
                    selected_dir_list: [
                        ...selected_dir_list.slice(0, index),
                        ...selected_dir_list.slice(index + 1)
                    ]
                },
                () => {
                    updateSelectedDirectory &&
                        updateSelectedDirectory(this.state.selected_dir_list);
                }
            );
        }
    }

    handleChangeRadioButton(event) {
        const { updateSelectedDirectory } = this.props;
        this.setState(
            {
                selected_dir_list: event.target.value
            },
            () => {
                updateSelectedDirectory &&
                    updateSelectedDirectory(this.state.selected_dir_list);
            }
        );
    }

    //Render expand or minimise icon on a directory list based on whether it is expanded or minimised
    renderAddOrRemoveIcon(dir_list_id) {
        const { expanded } = this.state;
        const { classes } = this.props;
        if (expanded.indexOf(dir_list_id) !== -1) {
            //Inside expanded array
            return (
                <IconButton
                    className={classes.expansionButton}
                    onClick={() => this.removeFromExpanded(dir_list_id)}
                >
                    <RemoveIcon className={classes.icon} />
                </IconButton>
            );
        } else {
            //Not inside expanded array
            return (
                <IconButton
                    className={classes.expansionButton}
                    onClick={() => this.addToExpanded(dir_list_id)}
                >
                    <AddIcon className={classes.icon} />
                </IconButton>
            );
        }
    }

    renderCheckboxAndLabel(directory) {
        const { selected_dir_list } = this.state;
        const { id, name } = directory;
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        onChange={() => {
                            if (selected_dir_list.includes(id)) {
                                return this.removeFromSelected(id, true);
                            } else {
                                return this.addToSelected(id, true);
                            }
                        }}
                        checked={selected_dir_list.includes(id)}
                    />
                }
                label={name.toUpperCase()}
            />
        );
    }

    renderDirectoryCheckboxes(directory, index) {
        const { expanded } = this.state;
        const is_expanded = expanded.indexOf(directory.id) !== -1; //Check if the directory list is expanded or not
        const { depth } = directory;
        const calculatedPaddingSize = depth * paddingSize;
        const { child_directory_lists_key } = this.props;

        if (
            directory[child_directory_lists_key] &&
            directory[child_directory_lists_key].length > 0
        ) {
            return (
                <React.Fragment key={`${directory.id}-${index}`}>
                    <div
                        style={{
                            display: "flex",
                            paddingLeft: `${calculatedPaddingSize}px`
                        }}
                    >
                        {this.renderCheckboxAndLabel(directory)}
                        {this.renderAddOrRemoveIcon(directory.id)}
                    </div>
                    {is_expanded &&
                        directory[child_directory_lists_key].map(
                            (child_directory, index_directory) => {
                                //We do recursion here
                                return this.renderDirectoryCheckboxes(
                                    child_directory,
                                    index_directory
                                );
                            }
                        )}
                </React.Fragment>
            );
        } else {
            return (
                <div
                    style={{
                        display: "flex",
                        paddingLeft: `${calculatedPaddingSize}px`
                    }}
                    key={`${directory.id}-${index}`}
                >
                    {this.renderCheckboxAndLabel(directory)}
                </div>
            );
        }
    }

    renderRadioButtonAndLabel(directory) {
        const { id, name } = directory;
        return (
            <FormControlLabel
                value={id}
                control={
                    <Radio
                        color="primary"
                        onChange={this.handleChangeRadioButton}
                        checked={this.state.selected_dir_list === id}
                    />
                }
                label={name.toUpperCase()}
                labelPlacement="end"
            />
        );
    }

    renderDirectoryRadioButton(directory, index) {
        const { expanded } = this.state;
        const is_expanded = expanded.indexOf(directory.id) !== -1; //Check if the directory list is expanded or not
        const { depth } = directory;
        const calculatedPaddingSize = depth * paddingSize;
        const { child_directory_lists_key } = this.props;

        if (
            directory[child_directory_lists_key] &&
            directory[child_directory_lists_key].length > 0
        ) {
            return (
                <React.Fragment key={`${directory.id}-${index}`}>
                    <div
                        style={{
                            display: "flex",
                            paddingLeft: `${calculatedPaddingSize}px`
                        }}
                    >
                        {this.renderRadioButtonAndLabel(directory)}
                        {this.renderAddOrRemoveIcon(directory.id)}
                    </div>
                    {is_expanded &&
                        directory[child_directory_lists_key].map(
                            (child_directory, index_directory) => {
                                //We do recursion here
                                return this.renderDirectoryRadioButton(
                                    child_directory,
                                    index_directory
                                );
                            }
                        )}
                </React.Fragment>
            );
        } else {
            return (
                <div
                    style={{ paddingLeft: `${calculatedPaddingSize}px` }}
                    key={`${directory.id}-${index}`}
                >
                    {this.renderRadioButtonAndLabel(directory)}
                </div>
            );
        }
    }

    renderDirectories() {
        const { data, selectAmount } = this.props;
        if (selectAmount === "multiple") {
            return (
                <React.Fragment>
                    {data.map((directory, index) => {
                        return this.renderDirectoryCheckboxes(directory, index);
                    })}
                </React.Fragment>
            );
        } else if (selectAmount === "single") {
            return (
                <React.Fragment>
                    {data.map((directory, index) => {
                        return this.renderDirectoryRadioButton(
                            directory,
                            index
                        );
                    })}
                </React.Fragment>
            );
        }
    }

    render() {
        const { data } = this.props;
        return (
            <React.Fragment>
                {Boolean(data) && Array.isArray(data) && data.length > 0 && (
                    <React.Fragment>{this.renderDirectories()}</React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

TreeviewCheckbox.defaultProps = {
    child_directory_lists_key: "child_directory_lists"
};

TreeviewCheckbox.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    updateSelectedDirectory: PropTypes.func,
    selectAmount: PropTypes.oneOf(["single", "multiple"]),
    child_directory_lists_key: PropTypes.string,
    selectedValue: PropTypes.string,
    selectedValues: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(TreeviewCheckbox);
