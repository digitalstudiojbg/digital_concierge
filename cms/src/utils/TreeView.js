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
    state = {
        expanded: [],
        selected_category: [],
        selected_directory: [],
    };

    //Get a category and all of its child category or directory entries, as it is usually one or the other
    //I.E. one category can only have a child categories or directory entries
    getItemAndAllChildItems(category) {
        if (category.child_category && category.child_category.length > 0) {
            let output = [{ id: category.id, is_category: true }];
            category.child_category.forEach(item => {
                output = [...output, ...this.getItemAndAllChildItems(item)];
            });
            return output;
        } else if (category.tb_directories && category.tb_directories.length > 0) {
            let output = [{ id: category.id, is_category: true }];
            category.tb_directories.forEach(item => {
                output = [...output, ...this.getItemAndAllChildItems(item)];
            });
            return output;
        } else {
            return [{ id: category.id, is_category: false }];
        }
    }

    //Recursive function utilised to recur and calculate the number of child elements in a category
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

    //Adding category and / or directory ids into their relevant state arrays (selected_category or selected_directory)
    addToSelected(category, has_child) {
        const { selected_category, selected_directory } = this.state;
        if (has_child) {
            const items = this.getItemAndAllChildItems(category);
            const categories = items.filter(item => Boolean(item.is_category));
            const directories = items.filter(item => !item.is_category);
            this.setState({
                selected_category: [...selected_category, ...categories.map(category => category.id)],
                selected_directory: [...selected_directory, ...directories.map(directory => directory.id)],
            });
        } else {
            //Differentiating between a category with empty directory or just a normal directory
            if (category.tb_directories && category.tb_directories.length === 0) {
                //An category with empty child
                this.setState({
                   selected_category: [...selected_category, category.id],
                });
            } else {
                this.setState({
                    selected_directory: [...selected_directory, category.id],
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
            const directories = items.filter(item => !item.is_category).map(directory => directory.id);
            this.setState({
                selected_category: selected_category.filter(category_id => !categories.includes(category_id)),
                selected_directory: selected_directory.filter(directory_id => !directories.includes(directory_id)),
            });
        } else {
            //Differentiating between a category with empty directory or just a normal directory
            if (category.tb_directories && category.tb_directories.length === 0) {
                //An category with empty child
                this.setState({
                    selected_category: selected_category.filter(category_id => category_id !== category.id),
                 })
            } else {
                this.setState({
                    selected_directory: selected_directory.filter(directory_id => directory_id !== category.id),
                });
            }
            
        }
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

    renderCategory(category, index, depth = 0) {
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
                                checked={selected_category.includes(category.id)}
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
                        return this.renderCategory(child_category_item, index_category, depth + 1);
                    })}
                </React.Fragment>
                
            );
        } else {
            //Just an empty category with no child category nor a directory. Another possibility is that the entry is a plain old directory
            const { selected_category, selected_directory } = this.state;
            
            //Differentiating between a category with empty directory or just a normal directory
            const checkedArray = (category.tb_directories && category.tb_directories.length === 0) ? selected_category : selected_directory;

            //No more child, no need to recur any more
            return (
                <TableRow key={`${category.id}-${index}`} className={classes.tableEntryRow}>
                    <TableCell padding="checkbox">
                        <Checkbox 
                            onChange={() => { 
                                if (selected_directory.includes(category.id)) {
                                    return this.removeFromSelected(category);
                                } else {
                                    return this.addToSelected(category, false);
                                }
                            }} 
                            checked={checkedArray.includes(category.id)}
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
        const { selected_category, selected_directory } = this.state;
        const { classes, data } = this.props;

        if (data && data.length > 0) {
            const allItemsLength = this.totalLength(data);
            return (
                <Table>
                    <TableHead className={classes.tableHeaderRow}>
                        <TableRow>
                            <TableCell padding="checkbox">
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
                                            let items = [];
                                            data.forEach(item => {
                                                items = [...items, ...this.getItemAndAllChildItems(item)];
                                            });
                                            this.setState({
                                                selected_category: items.filter(item => Boolean(item.is_category)).map(item => item.id),
                                                selected_directory: items.filter(item => !item.is_category).map(item => item.id),
                                            });
                                        }
                                    }}
                                />
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

    render() {
        const { classes, data } = this.props;
        return (
            <React.Fragment>
                <div style={{marginTop: 30, marginBottom: 20, display: "flex", width: "50%"}}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonCreate}
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
                
                {Boolean(data) && Array.isArray(data) && data.length > 0 && (
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