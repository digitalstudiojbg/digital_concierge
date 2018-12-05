import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from "@material-ui/icons/Remove";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizontalIcon from "@material-ui/icons/MoreHoriz";
import styled from "styled-components";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import { TABLET_CMS_CREATE_CONTENT_INDEX_URL } from './Constants';

const styles = theme => ({
    buttonCreate: {
        color: "white",
        backgroundColor: "rgb(35,38,92)",
        marginRight: "15px",
        paddingLeft: "25px",
        paddingRight: "25px"
    },
    buttonDelete: {
        color: "white",
        backgroundColor: "rgb(35,38,92)",
        paddingLeft: "1px",
        paddingRight: "1px"
   },
   expansionButton: {
       color: "white",
       background: "rgb(155,157,183)",
       borderRadius: 25
   },
   icon: {
       fontSize: "small"
   },
   tableHeaderRow: {
       borderTop: "1px solid rgba(224, 224, 224, 1)",
       backgroundColor: "rgb(234,235,238)",
   },
   headerCol: {
       color: "rgb(131,134,166)",
   },
   tableEntryRow: {
        backgroundColor: "rgb(246,246,246)"
   },
   tableEntryCol: {
       color: "rgb(38,42,95)",
   }
});

//A few constants settings
const paddingSize = 30;
const approximateButtonSize = 40;
const TreeEntry = styled.div`
    padding-left: ${props => props.paddingSize}px;
    display: flex;
    align-items: center;
 `;

class TreeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: [],
            selected_category: [],
            selected_directory: [],
            dataTree: null
        };
        this.navigateToCreateContent = this.navigateToCreateContent.bind(this);
    }
    

    componentDidMount() {
        //mapping data tree for easier querying
        const { data } = this.props;
        let updated = [];
        data.forEach(category => {
            updated = [...updated, ...this.getItemAndAllChildItems(category, true)];
        });
        this.setState({
            dataTree: [...updated],
        });
    }

    componentDidUpdate(prevProps) {
        //mapping data tree for easier querying
        const { data } = this.props;
        if (prevProps.data !== data) {
            let updated = [];
            data.forEach(category => {
                updated = [...updated, ...this.getItemAndAllChildItems(category, true)];
            });
            this.setState({
                dataTree: [...updated],
            });
        }
    }

    //helper function to check whether a parent has the child as a direct descendant
    _isParentOf(parent, child_id,) {
        if (
            (parent.child_category && parent.child_category.length > 0) || 
            (parent.tb_directories && parent.tb_directories.length > 0)
        ) {
            const which = (parent.child_category && parent.child_category.length > 0) ? parent.child_category : parent.tb_directories;
            return Boolean(which.find(category => category.id === child_id));
        } else {
            return false;
        }
    }

    //a function that attempts to retrieve all of the parent category ids of a children (the children could be a child category or a directory entry)
    //via recursive function method
    getParentItem(category_id, is_category) {
        const { dataTree } = this.state;
        if (Boolean(dataTree && dataTree.length > 0)) {
            const foundItem = dataTree.find(category => {
                return category.id === category_id && category.is_category === is_category;
            });
            const possibleParents = Boolean(foundItem) 
            ? dataTree.filter(category => (Boolean(category.is_category) && category.depth === foundItem.depth - 1)) //Only get previous level parent
            : [];
            
            const parentArray = possibleParents.filter(item => this._isParentOf(item, category_id));
            return parentArray.length > 0 
                ? [ parentArray[0].id, ...this.getParentItem(parentArray[0].id, true)]
                : [];
        }
    }
    //Get a category and all of its child category or directory entries, as it is usually one or the other
    //I.E. one category can only have a child categories or directory entries
    //All attribute argument refer to whether the object should retrieve all of its category attributes, or just the ID
    getItemAndAllChildItems(category, allAttributes = false) {
        if (category.child_category && category.child_category.length > 0) {
            let output = allAttributes 
                            ? [{ ...category }] 
                            : [{ id: category.id, is_category: category.is_category, depth: category.depth }];
            category.child_category.forEach(item => {
                output = [...output, ...this.getItemAndAllChildItems(item, allAttributes)];
            });
            return output;
        } else if (category.tb_directories && category.tb_directories.length > 0) {
            let output = allAttributes 
                            ? [{ ...category }] 
                            : [{ id: category.id, is_category: category.is_category, depth: category.depth }];
            category.tb_directories.forEach(item => {
                output = [...output, ...this.getItemAndAllChildItems(item, allAttributes)];
            });
            return output;
        } else {
            const { is_category, depth, hash_id = "" } = category;
            return allAttributes 
            ? [{ ...category }]
            : [{ id: category.id, is_category, depth, hash_id }];
        }
    }

    //Helper recursive function utilised to recur and calculate the number of child elements in a category
    _totalCategoryLength(category) {
        if (category.child_category && category.child_category.length > 0) {
            //Category has a child category, recur in its child category
            return 1 + this.totalLength(category.child_category);
        } else if (category.tb_directories && category.tb_directories.length > 0) {
            //Category has no child category, but have directory entries, recur in the directory entries instead
            return 1 + this.totalLength(category.tb_directories);
        } else {
            //End of the line, no need to recur any more
            return 1;
        }
    }

    //Calculates the number of elements a category have along with its child categories or directory entries
    //Utilising recursion in the form of function _totalCategoryLength
    totalLength(categories) {
        let output = 0;
        categories.forEach(category => {
            output += this._totalCategoryLength(category);;
        });
        return output;
    }

    //Method gets called when we expand a category
    addToExpanded(category_id) {
        if (this.state.expanded.indexOf(category_id) === -1) {
            this.setState({
                expanded: [
                    ...this.state.expanded,
                    category_id
                ]
            });
        }
    }

    ////Method gets called when we minimise a category
    removeFromExpanded(category_id) {
        const index = this.state.expanded.indexOf(category_id);
        if (index !== -1) {
            this.setState({
                expanded: [
                    ...this.state.expanded.slice(0, index),
                    ...this.state.expanded.slice(index + 1)
                ]
            });
        }
    }

    //A function that ensures the category and all of its child directory are expanded
    ensureAllIsExpanded(category) {
        const { expanded } = this.state;
        //Filter only the items that are categories and have a child category or directory entries inside of it
        const categories = this.getItemAndAllChildItems(category, undefined, true).filter(item => 
            Boolean(item.is_category) && (
                (Boolean(item.child_category) && item.child_category.length > 0) || 
                (Boolean(item.tb_directories) && item.tb_directories.length > 0)
            )
        );
        let output = true;
        for (let category of categories) {
            if (!expanded.includes(category.id)) {
                output = false;
                break;
            }
        }
        return output;
    }

    //Adding category and / or directory ids into their relevant state arrays (selected_category or selected_directory)
    addToSelected(category, has_child) {
        const { selected_category, selected_directory } = this.state;
        if (has_child) {
            const items = this.getItemAndAllChildItems(category);
            const categories = items.filter(item => Boolean(item.is_category));
            const directories = items.filter(item => !item.is_category);
            this.setState({
                selected_category: [...selected_category, ...categories.map(category => category.id)],
                selected_directory: [...selected_directory, ...directories.map(directory => directory.hash_id)],
            });
        } else {
            //Differentiating between a category with empty directory or just a normal directory
            if (category.is_category) {
                //An category with empty child
                this.setState({
                   selected_category: [...selected_category, category.id],
                });
            } else {
                this.setState({
                    selected_directory: [...selected_directory, category.hash_id],
                });
            }
            
        }
    }

    //Removing category and / or directory ids from their relevant state arrays (selected_category or selected_directory)
    removeFromSelected(category, has_child) {
        const { selected_category, selected_directory } = this.state;
        if (has_child) {
            const items = this.getItemAndAllChildItems(category);
            const categories = items.filter(item => Boolean(item.is_category)).map(category => category.id);
            const directories = items.filter(item => !item.is_category).map(directory => directory.hash_id);
            this.setState({
                selected_category: selected_category.filter(category_id => !categories.includes(category_id)),
                selected_directory: selected_directory.filter(directory_id => !directories.includes(directory_id)),
            });
        } else {
            //Differentiating between a category with empty directory or just a normal directory
            const { is_category } = category;

            //Unselecting a child also means unselecting the parent as well
            const parents = this.getParentItem(category.id, is_category);
            if (is_category) {
                //An category with empty child
                //Unselecting parent categories as well
                this.setState({
                    selected_category: selected_category.filter(category_id => category_id !== category.id && !parents.includes(category_id)),
                 })
            } else {
                //Unselecting parent categories as well
                this.setState({
                    selected_category: selected_category.filter(category_id => !parents.includes(category_id)),
                    selected_directory: selected_directory.filter(directory_id => directory_id !== category.hash_id),
                });
            }
        }
    }

    // checkChildItemsSelected(category) {
    //     const { selected_category, selected_directory } = this.state;
    //     const childItems = this.getItemAndAllChildItems(category).slice(1); //Skipping first entry in the array because it is self
    //     const categories = childItems.filter(item => Boolean(item.is_category)).map(category => category.id);
    //     const directories = childItems.filter(item => !item.is_category).map(directory => directory.id);

    //     //Ensure everything is inside the selected state arrays
    //     let output = true;
    //     for (let category_id of categories) {
    //         if (!selected_category.includes(category_id)) {
    //             output = false;
    //             break;
    //         }
    //     }
    //     for (let directory_id of directories) {
    //         if (!selected_directory.includes(directory_id)) {
    //             output = false;
    //             break;
    //         }
    //     }
    //     return output;
    // }

    checkChildItemsIndeterminate(category) {
        const { selected_category, selected_directory } = this.state;
        const childItems = this.getItemAndAllChildItems(category).slice(1); //Skipping first entry in the array because it is self
        const categories = childItems.filter(item => Boolean(item.is_category)).map(category => category.id);
        const directories = childItems.filter(item => !item.is_category).map(directory => directory.id);

        //Ensure partial element is inside the selected state arrays
        let output = false;
        for (let category_id of categories) {
            if (selected_category.includes(category_id)) {
                output = true;
                break;
            }
        }
        for (let directory_id of directories) {
            if (selected_directory.includes(directory_id)) {
                output = true;
                break;
            }
        }
        return output;
    }

    //Render expand or minimise icon on a category entry based on whether it is expanded or minimised
    renderAddOrRemoveIcon(category_id) {
        const { expanded } = this.state;
        const { classes } = this.props;
        if (expanded.indexOf(category_id) !== -1) {
            //Inside expanded array
            return (
                <IconButton
                    className={classes.expansionButton}
                    onClick={() => this.removeFromExpanded(category_id)}
                >
                    <RemoveIcon className={classes.icon} />
                </IconButton>
            );
        } else {
            //Not inside expanded array
            return (
                <IconButton
                    className={classes.expansionButton}
                    onClick={() => this.addToExpanded(category_id)}
                >
                    <AddIcon className={classes.icon} />
                </IconButton>
            );
        }
    }

    renderCheck(is_active) {
        return is_active 
            ? <CheckIcon />
            : <CloseIcon />;
    }
    

    renderCategory(category, index) {
        const { depth } = category;
        const calculatedPaddingSize = depth * paddingSize;
        const { classes } = this.props;
        if (
            (category.child_category && category.child_category.length > 0) || 
            (category.tb_directories && category.tb_directories.length > 0)
        ) {
            //Rendering a table row for a category that has a child category or a directory inside of it
            const { selected_category, expanded } = this.state; 
            const is_expanded = expanded.indexOf(category.id) !== -1; //Check if the category entry is expanded or not

            //Determining which array to recur into based on whether it is a category that has another category or just a category with 
            //some directories in it
            const toLoop = category.child_category && category.child_category.length > 0 ? category.child_category : category.tb_directories;
            return (
                /*Rendering the row*/
                <React.Fragment key={`${category.id}-${index}`} >
                    <TableRow className={classes.tableEntryRow}>
                        <TableCell padding="checkbox">
                            <Checkbox 
                                onChange={() => { 
                                    if (selected_category.includes(category.id)) {
                                        return this.removeFromSelected(category, true);
                                    } else {
                                        return this.addToSelected(category, true);
                                    }
                                }}
                                disabled={!this.ensureAllIsExpanded(category)}
                                checked={selected_category.includes(category.id)}
                                indeterminate={!selected_category.includes(category.id) && this.checkChildItemsIndeterminate(category)}
                            />
                        </TableCell>
                        <TableCell className={classes.tableEntryCol}>
                            <TreeEntry paddingSize={calculatedPaddingSize}>
                                <div style={{marginRight: 15}}>
                                    {this.renderAddOrRemoveIcon(category.id)}
                                </div>
                                {category.name}
                            </TreeEntry>
                        </TableCell>
                        <TableCell>
                            {this.renderCheck(category.active)}
                        </TableCell>
                        <TableCell>
                            <MoreHorizontalIcon />
                        </TableCell>
                    </TableRow>
                    {is_expanded && toLoop.map((child_category_item, index_category) => {
                        //We do recursion here
                        return this.renderCategory(child_category_item, index_category);
                    })}
                </React.Fragment>
                
            );
        } else {
            //Just an empty category with no child category nor a directory. Another possibility is that the entry is a plain old directory
            const { selected_category, selected_directory } = this.state;
            //No more child, no need to recur any more
            return (
                <TableRow key={`${category.id}-${index}`} className={classes.tableEntryRow}>
                    <TableCell padding="checkbox">
                        <Checkbox 
                            onChange={() => { 
                                //Differentiating between a category with empty directory or just a normal directory
                                if (category.is_category) {
                                    if (selected_category.includes(category.id)) {
                                        return this.removeFromSelected(category);
                                    } else {
                                        return this.addToSelected(category, false);
                                    }
                                } else {
                                    if (selected_directory.includes(category.hash_id)) {
                                        return this.removeFromSelected(category);
                                    } else {
                                        return this.addToSelected(category, false);
                                    }
                                }
                            }} 
                            checked={
                                category.is_category 
                                ? selected_category.includes(category.id)
                                : selected_directory.includes(category.hash_id)
                            }
                        />
                    </TableCell>
                    <TableCell className={classes.tableEntryCol}>
                        <TreeEntry paddingSize={calculatedPaddingSize}>
                            <div style={{marginLeft: 15, width: `${approximateButtonSize}px`}} />
                            {category.name}
                        </TreeEntry>
                    </TableCell>
                    <TableCell>
                        {this.renderCheck(category.active)}
                    </TableCell>
                    <TableCell>
                        <MoreHorizontalIcon />
                    </TableCell>
                </TableRow>
            );
        }
    }

    //renders all of the categories in a table using Material UI framework for the Table Component
    //This method utilises recursion to render each of the categories,  child categories, and directory 
    //inside of a table row
    renderCategories() {
        // console.log(this.getParentItem("1", false));
        // console.log(this._isParentOf({
        //     id: "6", name: "SERVICES & FACILITIES", has_directory: false, active: true, image: null,
        //     child_category: [], tb_directories: [ {id: "1", name: "CHECK-OUT TIME", __typename: "TB_Directory"}, {id: "2", name: "IRON & IRONING BOARD", __typename: "TB_Directory"}]
        // }, "1"));
        const { selected_category, selected_directory, dataTree } = this.state;
        const { classes, data } = this.props;

        if (data && data.length > 0) {
            // const allItemsLength = this.totalLength(data);
            const allItemsLength = dataTree.length;

            let allExpanded = true;
            for (let tree of dataTree) {
                if (!this.ensureAllIsExpanded(tree)) {
                    allExpanded = false;
                    break;
                }
            }
            return (
                <Table>
                    <TableHead className={classes.tableHeaderRow}>
                        <TableRow>
                            <TableCell padding="checkbox">
                                {Boolean(dataTree) && dataTree.length > 0 && (
                                    <Checkbox
                                        indeterminate={
                                            (selected_category.length > 0 || selected_directory > 0) && 
                                            (selected_category.length + selected_directory.length < allItemsLength)
                                        }
                                        checked={selected_category.length + selected_directory.length === allItemsLength}
                                        onChange={() => {
                                            if (selected_category.length + selected_directory.length === allItemsLength) {
                                                //If everything is selected, un check everything
                                                this.setState({ 
                                                    selected_category: [],
                                                    selected_directory: [],
                                                });
                                            } else {
                                                this.setState({
                                                    selected_category: dataTree.filter(item => item.is_category).map(item => item.id),
                                                    selected_directory: dataTree.filter(item => !item.is_category).map(item => item.hash_id),
                                                });
                                            }
                                        }}
                                        disabled={!allExpanded}
                                    />
                                )}
                            </TableCell>
                            <TableCell className={classes.headerCol}>TITLE</TableCell>
                            <TableCell className={classes.headerCol}>VISIBLE</TableCell>
                            <TableCell className={classes.headerCol}>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((category, index) => {
                            return this.renderCategory(category, index);
                        })}
                    </TableBody>
                </Table>
        
            );
        } else {
            return <div />
        }
    }

    navigateToCreateContent() {
        const { history } = this.props;
        history.push(TABLET_CMS_CREATE_CONTENT_INDEX_URL);
    }

    render() {
        const { classes, data } = this.props;
        const { dataTree } = this.state;
        return (
            <React.Fragment>
                <div style={{marginTop: 30, marginBottom: 20, display: "flex", width: "50%"}}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonCreate}
                        onClick={this.navigateToCreateContent}
                    >
                        CREATE
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonDelete}
                    >
                        <DeleteIcon />
                    </Button>
                </div>
                
                {Boolean(data) && Array.isArray(data) && data.length > 0 && Boolean(dataTree) && dataTree.length > 0 && (
                    <React.Fragment>
                        {this.renderCategories()}
                    </React.Fragment>
                )}
                
            </React.Fragment>
        );
    }
}

TreeView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(TreeView);