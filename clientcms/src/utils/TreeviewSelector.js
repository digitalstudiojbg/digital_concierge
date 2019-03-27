import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import ExpandIcon from "@material-ui/icons/ChevronRight";
import CompressIcon from "@material-ui/icons/ExpandMore";
import CheckIcon from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import PropTypes from "prop-types";
import { getAllUniqueItems } from "./Constants";
import DirListIcon from "@material-ui/icons/List";

const styles = () => ({
    expansionButton: {
        color: "white",
        background: "rgb(38,153,251)",
        padding: 0,
        margin: 0,
        width: 24,
        height: 24
    },
    dirListIcon: {
        paddingLeft: 5
    },
    filterQueryList: {
        borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 8
    },
    checkIcon: {
        color: "white"
    }
});

const paddingSize = 24;
const approximateButtonSize = 24;

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    /* padding-left: 20px;
    padding-right: 20px; */
`;

const TitleHeaderDiv = styled.div`
    font-size: 1.5em;
    color: rgb(10, 10, 10);
    padding-bottom: 30px;
`;

const SearchFilterContainerDiv = styled.div`
    flex-basis: 30%;
    padding-right: 10px;
    border-right: 2px solid rgb(187, 187, 187);
    margin-right: 10px;
`;

const DirectoryListContainerDiv = styled.div`
    /* flex-grow: 1; */
    overflow-y: auto;
    border-top: 1px solid rgb(200, 199, 200);
    /* border-bottom: 1px solid rgb(204, 204, 204); */
    border-left: 1px solid rgb(207, 207, 209);
    border-right: 1px solid rgb(195, 194, 195);
    display: flex;
    flex-direction: column;
`;
const DirectoryListEntryDiv = styled.div`
    width: 100%;
    flex-grow: 1;
    background-color: ${props =>
        props.selected ? "rgb(144,199,253)" : "white"};
    border-bottom: 1px solid rgb(226, 226, 226);
    padding-left: ${props => props.depth * paddingSize + 10}px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
`;

class TreeviewSelector extends React.PureComponent {
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
            selected_dir_lists: [], //Set selected directory list initial value
            dataTree: dataTree.filter(({ is_dir_list }) => is_dir_list),
            searchQuery: "",
            showListItems: false
        };

        this.addOrRemoveFromSelected = this.addOrRemoveFromSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { selectAmount, selectedValue, selectedValues } = this.props;

        let selected_dir_lists = null;
        let expanded = [];
        //Set initial selected directory list initial value(s) and expand parent items if necessary
        if (Boolean(selectedValue) && selectAmount === "single") {
            selected_dir_lists = [selectedValue];
            expanded = this.getParentItem(selectedValue).slice();
        } else if (Boolean(selectedValues) && selectAmount === "multiple") {
            selected_dir_lists = [...selectedValues];
            selectedValues.forEach(value => {
                expanded = [...expanded, ...this.getParentItem(value).slice()];
            });
            expanded = getAllUniqueItems(expanded).slice();
        }

        //Setting state
        if (Boolean(selected_dir_lists)) {
            this.setState({
                selected_dir_lists,
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
            console.log(foundItem);
            if (Boolean(foundItem) && foundItem.is_root) {
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

    filterDirList = () => {
        const { dataTree, searchQuery } = this.state;
        return dataTree.filter(({ name }) =>
            name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    handleChange = event => {
        this.setState({
            searchQuery: event.target.value,
            showListItems: event.target.value.length > 0
        });
    };

    handleClickListItem = dir_list_id => {
        const {
            selected_dir_lists,
            expanded: expandedOriginal,
            dataTree
        } = this.state;

        if (!selected_dir_lists.includes(dir_list_id)) {
            //Not inside selected list
            this.addToSelected(dir_list_id);
            const expanded = [
                ...expandedOriginal,
                ...this.getParentItem(dir_list_id)
            ];
            this.setState({
                showListItems: false,
                expanded: [...getAllUniqueItems(expanded)],
                searchQuery: dataTree.find(({ id }) => id === dir_list_id).name
            });
        }
    };

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
        const { selected_dir_lists } = this.state;
        const { updateSelectedDirectory, selectAmount } = this.props;
        if (!selected_dir_lists.includes(dir_list_id)) {
            this.setState(
                {
                    selected_dir_lists:
                        selectAmount === "single"
                            ? [dir_list_id]
                            : [...selected_dir_lists, dir_list_id]
                },
                () => {
                    updateSelectedDirectory &&
                        updateSelectedDirectory(this.state.selected_dir_lists);
                }
            );
        }
    }

    removeFromSelected(dir_list_id) {
        const { selected_dir_lists } = this.state;
        const { updateSelectedDirectory } = this.props;
        const index = selected_dir_lists.indexOf(dir_list_id);
        if (index !== -1) {
            this.setState(
                {
                    selected_dir_lists: [
                        ...selected_dir_lists.slice(0, index),
                        ...selected_dir_lists.slice(index + 1)
                    ]
                },
                () => {
                    updateSelectedDirectory &&
                        updateSelectedDirectory(this.state.selected_dir_lists);
                }
            );
        }
    }

    addOrRemoveFromSelected(event) {
        const { selected_dir_lists } = this.state;
        const dir_list_id = event.target.id;
        if (selected_dir_lists.includes(dir_list_id)) {
            //Is inside selected array
            this.removeFromSelected(dir_list_id);
        } else {
            //Is not inside selected array
            this.addToSelected(dir_list_id);
        }
    }

    //Render expand or minimise icon on a directory list based on whether it is expanded or minimised
    renderExpandOrCompressIcon(dir_list_id) {
        const { expanded } = this.state;
        const { classes } = this.props;
        if (expanded.includes(dir_list_id)) {
            //Inside expanded array
            return (
                <IconButton
                    className={classes.expansionButton}
                    onClick={this.removeFromExpanded.bind(this, dir_list_id)}
                >
                    <CompressIcon fontSize="small" />
                </IconButton>
            );
        } else {
            //Not inside expanded array
            return (
                <IconButton
                    className={classes.expansionButton}
                    onClick={this.addToExpanded.bind(this, dir_list_id)}
                >
                    <ExpandIcon fontSize="small" />
                </IconButton>
            );
        }
    }

    renderDirectory(directory, index) {
        const { selected_dir_lists, expanded } = this.state;
        const { id, name, depth } = directory;
        const { child_directory_lists_key, classes } = this.props;
        const selected = selected_dir_lists.includes(id);
        const is_expanded = expanded.includes(id); //Check if the directory list is expanded or not
        const has_child =
            directory[child_directory_lists_key] &&
            directory[child_directory_lists_key].length > 0;
        return (
            <React.Fragment key={`DIR-LIST-VIEW-${index}-${id}`}>
                <DirectoryListEntryDiv
                    selected={selected}
                    depth={depth}
                    id={id}
                    onClick={this.addOrRemoveFromSelected}
                >
                    {has_child ? (
                        this.renderExpandOrCompressIcon(id)
                    ) : (
                        <div style={{ width: approximateButtonSize }} />
                    )}
                    <DirListIcon
                        fontSize="large"
                        className={classes.dirListIcon}
                        id={id}
                        onClick={this.addOrRemoveFromSelected}
                    />
                    <span
                        style={{ paddingLeft: 5, fontSize: "1.5em" }}
                        id={id}
                        onClick={this.addOrRemoveFromSelected}
                    >
                        {name}
                    </span>
                    {selected && (
                        <span
                            style={{
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "row-reverse",
                                paddingRight: 10
                            }}
                            id={id}
                            onClick={this.addOrRemoveFromSelected}
                        >
                            <CheckIcon
                                fontSize="large"
                                className={classes.checkIcon}
                            />
                        </span>
                    )}
                </DirectoryListEntryDiv>
                {has_child &&
                    is_expanded &&
                    directory[child_directory_lists_key].map(
                        (item, innerIndex) => {
                            return this.renderDirectory(item, innerIndex);
                        }
                    )}
            </React.Fragment>
        );
    }

    renderDirectories() {
        const { dataTree } = this.state;
        const rootDirLists = dataTree.filter(({ depth }) => depth === 0);
        return (
            <div
                style={{
                    flexBasis: "70%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <div
                    style={{
                        fontSize: "1em",
                        color: "rgb(137,137,137)"
                    }}
                >
                    SELECT LOCATION BY EXPANDING AND COLLAPSING THE LISTS BELOW
                </div>
                <DirectoryListContainerDiv>
                    {rootDirLists.map((item, index) => {
                        return this.renderDirectory(item, index);
                    })}
                </DirectoryListContainerDiv>
            </div>
        );
    }

    renderSearchQuerySection() {
        const { searchQuery, showListItems } = this.state;
        const { classes } = this.props;
        const filterResults = this.filterDirList();
        return (
            <SearchFilterContainerDiv>
                <div style={{ width: "100%" }}>
                    <div style={{ fontSize: "1em", color: "rgb(137,137,137)" }}>
                        SEARCH BY NAME
                    </div>
                    <TextField
                        variant="outlined"
                        fullWidth={true}
                        value={searchQuery}
                        onChange={this.handleChange}
                    />
                </div>
                {showListItems && (
                    <List className={classes.filterQueryList}>
                        {filterResults.length > 0 && <Divider />}
                        {filterResults.map(({ name, id }, index) => (
                            <ListItem
                                button
                                divider
                                key={`DIR_LIST-${index}-${id}`}
                                onClick={this.handleClickListItem.bind(
                                    this,
                                    id
                                )}
                            >
                                <ListItemText primary={name} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </SearchFilterContainerDiv>
        );
    }

    render() {
        const { data } = this.props;
        return (
            <ContainerDiv>
                <TitleHeaderDiv>LINKS FROM</TitleHeaderDiv>
                {Boolean(data) && Array.isArray(data) && data.length > 0 && (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex"
                        }}
                    >
                        {this.renderSearchQuerySection()}
                        {this.renderDirectories()}
                    </div>
                )}
            </ContainerDiv>
        );
    }
}

TreeviewSelector.defaultProps = {
    child_directory_lists_key: "child_directory_lists",
    directory_entries_key: "directory_entries"
};

TreeviewSelector.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    updateSelectedDirectory: PropTypes.func,
    selectAmount: PropTypes.oneOf(["single", "multiple"]),
    child_directory_lists_key: PropTypes.string,
    directory_entries_key: PropTypes.string,
    selectedValue: PropTypes.string,
    selectedValues: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(TreeviewSelector);
