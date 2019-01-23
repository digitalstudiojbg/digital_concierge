import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { getAllUniqueItems } from "./Constants";

const styles = theme => ({
    expansionButton: {
        margin: theme.spacing.unit,
        color: "white",
        background: "rgb(155,157,183)"
    },
    icon: {
        fontSize: "small"
    },
    clearSelectionButton: {
        color: "white",
        background: "#A5A4BF",
        marginLeft: 0
    }
});

const paddingSize = 30;
// const approximateButtonSize = 40;

class TreeviewCheckbox extends React.PureComponent {
    constructor(props) {
        super(props);

        //mapping data tree for easier querying
        let dataTree = [];
        props.data.forEach(entry => {
            dataTree = [
                ...dataTree,
                ...this.getItemAndAllChildItems(entry, true)
            ];
        });

        this.state = {
            expanded: [],
            selected_dir_list: props.selectAmount === "single" ? null : [], //Set selected directory list initial value
            dataTree
        };
        this.addToExpanded = this.addToExpanded.bind(this);
        this.removeFromExpanded = this.removeFromExpanded.bind(this);
        this.addToSelected = this.addToSelected.bind(this);
        this.removeFromSelected = this.removeFromSelected.bind(this);
        this.handleChangeRadioButton = this.handleChangeRadioButton.bind(this);
        this.handleClearSelection = this.handleClearSelection.bind(this);
    }

    componentDidMount() {
        const { selectAmount, selectedValue, selectedValues } = this.props;

        let selected_dir_list = null;
        let expanded = [];
        //Set initial selected directory list initial value(s) and expand parent items if necessary
        if (Boolean(selectedValue) && selectAmount === "single") {
            selected_dir_list = selectedValue;
            expanded = this.getParentItem(selectedValue).slice();
        } else if (Boolean(selectedValues) && selectAmount === "multiple") {
            selected_dir_list = [...selectedValues];
            selectedValues.forEach(value => {
                expanded = [...expanded, ...this.getParentItem(value).slice()];
            });
            expanded = getAllUniqueItems(expanded).slice();
        }

        //Setting state
        if (Boolean(selected_dir_list)) {
            this.setState({
                selected_dir_list,
                expanded
            });
        }
    }

    //helper function to check whether a parent has the child as a direct descendant
    _isParentOf(parent, child_id) {
        const { child_directory_lists_key, directory_entries_key } = this.props;
        if (
            (parent[child_directory_lists_key] &&
                parent[child_directory_lists_key].length > 0) ||
            (parent[directory_entries_key] &&
                parent[directory_entries_key].length > 0)
        ) {
            const which =
                parent[child_directory_lists_key] &&
                parent[child_directory_lists_key].length > 0
                    ? parent[child_directory_lists_key]
                    : parent[directory_entries_key];
            return Boolean(which.find(entry => entry.id === child_id));
        } else {
            return false;
        }
    }

    //a function that attempts to retrieve all of the parent directory_list ids of a children
    //(the children could be a child directory list or a directory entry)
    //via recursive function method the order of the array is from the direct parent and goes
    //on to the grand parents, great-grandparents, etc.
    //
    //UPDATE: THIS FUNCTION IS NOT RELIABLE TO USE FOR DIRECTORY ENTRIES DUE TO
    //DIRECTORY ENTRY'S MANY TO MANY RELATIONSHIP WITH DIRECTORY LIST
    //WHICH MEANS THAT ONE DIRECTORY ENTRY COULD BE A CHILD OF DIFFERENT DIRECTORY LIST
    //AND ONE DIRECTORY ENTRY HAS NO GUARANTEE THAT IT HAS A UNIQUE PARENT DIRECTORY LIST
    getParentItem(list_id) {
        const { dataTree } = this.state;
        if (Boolean(dataTree && dataTree.length > 0)) {
            const foundItem = dataTree.find(entry => {
                return entry.id === list_id && entry.is_dir_list;
            });
            if (foundItem.is_root) {
                //Root item certainly do not have parent
                return [];
            }
            const possibleParents = Boolean(foundItem)
                ? dataTree.filter(
                      entry =>
                          Boolean(entry.is_dir_list) &&
                          entry.depth === foundItem.depth - 1
                  ) //Only get previous level parent
                : [];

            const parentArray = possibleParents.filter(item =>
                this._isParentOf(item, list_id)
            );
            return parentArray.length > 0
                ? [
                      parentArray[0].id,
                      ...this.getParentItem(parentArray[0].id, true)
                  ]
                : [];
        }
    }
    //Get a directory list and all of its child directory list or directory entries, as it is usually one or the other
    //I.E. one directory list can only have a child directory lists or directory entries
    //All attribute argument refer to whether the object should retrieve all of its directory list attributes, or just the ID
    getItemAndAllChildItems(dir_list, allAttributes = false) {
        const { child_directory_lists_key, directory_entries_key } = this.props;
        if (
            dir_list[child_directory_lists_key] &&
            dir_list[child_directory_lists_key].length > 0
        ) {
            let output = allAttributes
                ? [{ ...dir_list }]
                : [
                      {
                          id: dir_list.id,
                          is_dir_list: dir_list.is_dir_list,
                          depth: dir_list.depth
                      }
                  ];
            dir_list[child_directory_lists_key].forEach(item => {
                output = [
                    ...output,
                    ...this.getItemAndAllChildItems(item, allAttributes)
                ];
            });
            return output;
        } else if (
            dir_list[directory_entries_key] &&
            dir_list[directory_entries_key].length > 0
        ) {
            let output = allAttributes
                ? [{ ...dir_list }]
                : [
                      {
                          id: dir_list.id,
                          is_dir_list: dir_list.is_dir_list,
                          depth: dir_list.depth
                      }
                  ];
            dir_list[directory_entries_key].forEach(item => {
                output = [
                    ...output,
                    ...this.getItemAndAllChildItems(item, allAttributes)
                ];
            });
            return output;
        } else {
            //https://stackoverflow.com/a/40560953
            const { is_dir_list, depth, hash_id } = dir_list;
            return allAttributes
                ? [{ ...dir_list }]
                : [
                      {
                          id: dir_list.id,
                          is_dir_list,
                          depth,
                          ...(Boolean(hash_id) && { hash_id })
                      }
                  ];
        }
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

    //Handle clearing selection when button clear selection is clicked
    handleClearSelection() {
        const { selectAmount } = this.props;
        this.setState({
            selected_dir_list: selectAmount === "single" ? null : []
        });
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

    renderClearSelectionButton() {
        const { classes } = this.props;
        const { selected_dir_list } = this.state;

        return (
            <Button
                className={classes.clearSelectionButton}
                variant="outlined"
                size="large"
                disabled={
                    !Boolean(selected_dir_list) ||
                    (Array.isArray(selected_dir_list) &&
                        selected_dir_list.length > 0)
                }
                onClick={this.handleClearSelection}
            >
                CLEAR SELECTION
            </Button>
        );
    }

    render() {
        const { data } = this.props;
        return (
            <React.Fragment>
                {Boolean(data) && Array.isArray(data) && data.length > 0 && (
                    <React.Fragment>
                        {this.renderClearSelectionButton()}
                        {this.renderDirectories()}
                    </React.Fragment>
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
