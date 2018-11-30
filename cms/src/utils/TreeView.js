import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from "@material-ui/icons/Remove";
import PropTypes from 'prop-types';
import { ContainerDiv } from './Constants';
import styled from "styled-components";

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
   }
});

const paddingSize = 30;
const approximateButtonSize = 40;

const sample = {
    "data":{
       "tb_categories":[
          {
             "id":"1",
             "name":"IN-ROOM SERVICES",
             "has_directory":false,
             "is_parent":true,
             "active":true,
             "image":null,
             "child_category":[
                {
                   "id":"5",
                   "name":"IN-ROOM DINING",
                   "has_directory":false,
                   "is_parent":false,
                   "active":true,
                   "image":null,
                   "child_category":[
                      {
                         "id":"10",
                         "name":"BREAKFAST",
                         "has_directory":true,
                         "is_parent":false,
                         "active":true,
                         "image":null,
                         "child_category":[
 
                         ]
                      },
                      {
                         "id":"11",
                         "name":"LUNCH",
                         "has_directory":true,
                         "is_parent":false,
                         "active":true,
                         "image":null,
                         "child_category":[
 
                         ]
                      },
                      {
                         "id":"12",
                         "name":"DINNER",
                         "has_directory":true,
                         "is_parent":false,
                         "active":true,
                         "image":null,
                         "child_category":[
 
                         ]
                      }
                   ]
                },
                {
                   "id":"6",
                   "name":"SERVICES",
                   "has_directory":false,
                   "is_parent":false,
                   "active":true,
                   "image":null,
                   "child_category":[
 
                   ]
                },
                {
                   "id":"7",
                   "name":"PHONE DIRECTORY",
                   "has_directory":false,
                   "is_parent":false,
                   "active":true,
                   "image":null,
                   "child_category":[
 
                   ]
                },
                {
                   "id":"8",
                   "name":"TV GUIDE",
                   "has_directory":false,
                   "is_parent":false,
                   "active":true,
                   "image":null,
                   "child_category":[
 
                   ]
                },
                {
                   "id":"9",
                   "name":"HEALTH & SAFETY",
                   "has_directory":false,
                   "is_parent":false,
                   "active":true,
                   "image":null,
                   "child_category":[
 
                   ]
                }
             ]
          },
          {
             "id":"2",
             "name":"HOTEL SERVICES",
             "has_directory":false,
             "is_parent":true,
             "active":true,
             "image":null,
             "child_category":[
 
             ]
          },
          {
             "id":"3",
             "name":"DESTINATION VANUATU",
             "has_directory":false,
             "is_parent":true,
             "active":true,
             "image":null,
             "child_category":[
 
             ]
          },
          {
             "id":"4",
             "name":"HOLIDAY INN RESORT PHOTO GALLERY",
             "has_directory":false,
             "is_parent":true,
             "active":true,
             "image":null,
             "child_category":[
 
             ]
          }
       ]
    }
 }

 const TreeEntry = styled.div`
    padding-left: ${props => props.paddingSize}px;
    display: flex;
    align-items: center; 
    border-bottom: 2px solid rgb(213,213,213);
 `;

class TreeView extends React.Component {
    state = {
        data: null,
        expanded: []
    };

    updateData() {
        // const { data } = this.props;
        this.setState({ data: sample.data.tb_categories });
    }

    componentDidMount() {
        this.updateData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.updateData();
        }
    }

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

    renderCategory(category, index, depth = 0) {
        const calculatedPaddingSize = depth * paddingSize;
        if (category.child_category && category.child_category.length > 0) {
            const { expanded } = this.state;
            const is_expanded = expanded.indexOf(category.id) !== -1;
            return (
                <React.Fragment key={`${category.id}-${index}`}>
                    <TreeEntry key={`${category.id}-${index}`} paddingSize={calculatedPaddingSize}>
                        <div style={{marginRight: 15}}>
                            {this.renderAddOrRemoveIcon(category.id)}
                        </div>
                        {category.name}
                    </TreeEntry>
                    {is_expanded && category.child_category.map((child_category_item, index_category) => {
                        return this.renderCategory(child_category_item, index_category, depth + 1);
                    })}
                </React.Fragment>
            );
        } else {
            return (
                <TreeEntry paddingSize={calculatedPaddingSize}>
                    <div style={{marginLeft: 15, width: `${approximateButtonSize}px`}} />
                    <div key={`${category.id}-${index}`} style={{}}>
                        {category.name}
                    </div>
                </TreeEntry>
            );
        }
    }

    renderCategories() {
        const { data } = this.state;
        if (data && data.length > 0) {
            return data.map((category, index) => {
                return this.renderCategory(category, index);
            });
        } else {
            return <div />
        }
    }

    render() {
        const { classes } = this.props;
        const { data } = this.state;

        return (
            <React.Fragment>
                <div style={{marginTop: 30, display: "flex", width: "50%"}}>
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
                <ContainerDiv>
                    {Boolean(data) && Array.isArray(data) && data.length > 0 && (
                        <React.Fragment>
                            {this.renderCategories()}
                        </React.Fragment>
                    )}
                </ContainerDiv>
                
            </React.Fragment>
        );
    }
}

// Treeview.propTypes = {
//     headerColumnBgColor: PropTypes.string,
//     textColor: PropTypes.string,
//     buttonIconBgColor: PropTypes.string,
//     data: PropTypes.arrayOf(PropTypes.shape({
//         id: PropTypes.number,
//         name: PropTypes.string,
//         active: PropTypes.bool,
//         tbCategoryId: PropTypes.object,
//         is_parent: PropTypes.bool,
//         has_directory: PropTypes.bool
//     }))
// };


export default withStyles(styles)(TreeView);

