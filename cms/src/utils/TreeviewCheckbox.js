import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

const styles = theme => ({
   expansionButton: {
        margin: theme.spacing.unit,
        color: "white",
        background: "rgb(155,157,183)",
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
        this.state = {
            expanded: [],
            selected_category: [],
        };
        this.addToExpanded = this.addToExpanded.bind(this);
        this.removeFromExpanded = this.removeFromExpanded.bind(this);
        this.addToSelected = this.addToSelected.bind(this);
        this.removeFromSelected = this.removeFromSelected.bind(this);
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

    //Method gets called when we minimise a category
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
    addToSelected(category_id) {
        const { selected_category } = this.state;
        const { updateSelectedCategory } = this.props;
        if (selected_category.indexOf(category_id) === -1) {
            this.setState({
                selected_category: [
                    ...selected_category,
                    category_id
                ]
            }, () => {
                updateSelectedCategory && updateSelectedCategory(this.state.selected_category);
            });
        }
    }

    //Removing category and / or directory ids from their relevant state arrays (selected_category or selected_directory)
    removeFromSelected(category_id) {
        const { selected_category } = this.state;
        const { updateSelectedCategory } = this.props;
        const index = selected_category.indexOf(category_id);
        if (index !== -1) {
            this.setState({
                selected_category: [
                    ...selected_category.slice(0, index),
                    ...selected_category.slice(index + 1)
                ]
            }, () => {
                updateSelectedCategory && updateSelectedCategory(this.state.selected_category);
            });
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

    renderCheckboxAndLabel(category) {
        const { selected_category } = this.state;
        const { id, name } = category;
        return (
            <FormControlLabel
                control={
                    <Checkbox 
                        onChange={() => { 
                            if (selected_category.includes(id)) {
                                return this.removeFromSelected(id, true);
                            } else {
                                return this.addToSelected(id, true);
                            }
                        }}
                        checked={selected_category.includes(id)}
                    />
                }
                label={name.toUpperCase()}
            />
        );
    }

    renderCategory(category, index) {
        const { expanded } = this.state; 
        const is_expanded = expanded.indexOf(category.id) !== -1; //Check if the category entry is expanded or not
        const { depth } = category;
        const calculatedPaddingSize = (depth * paddingSize);

        if (category.child_category && category.child_category.length > 0) {
            return (
                <React.Fragment key={`${category.id}-${index}`}>
                    <div style={{display: "flex", paddingLeft: `${calculatedPaddingSize}px`}}>
                        {this.renderCheckboxAndLabel(category)}
                        {this.renderAddOrRemoveIcon(category.id)}
                    </div>
                    {is_expanded && category.child_category.map((child_category_item, index_category) => {
                        //We do recursion here
                        return this.renderCategory(child_category_item, index_category);
                    })}
                </React.Fragment>
            );
        } else {
            return (
                <div style={{display: "flex", paddingLeft: `${calculatedPaddingSize}px`}}>
                    {this.renderCheckboxAndLabel(category)}
                </div>
            );
        }
    }

    renderCategories() {
        const { data } = this.props;
        return (
            <React.Fragment>
                {data.map((category, index) => {
                    return this.renderCategory(category, index);
                })}
            </React.Fragment>    
        );
        
    }

    render() {
        const { classes, data } = this.props;
        return(
            <React.Fragment>
                {Boolean(data) && Array.isArray(data) && data.length > 0 && (
                    <React.Fragment>
                        {this.renderCategories()}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

TreeviewCheckbox.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    updateSelectedCategory: PropTypes.func,
};

export default withStyles(styles)(TreeviewCheckbox);