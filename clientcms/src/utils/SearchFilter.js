import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
    filterQueryList: {
        borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 8
    }
});

const SearchFilter = ({
    data,
    child_directory_lists_key,
    directory_entries_key,
    classes
}) => {
    //Get a directory list and all of its child directory list or directory entries, as it is usually one or the other
    //I.E. one directory list can only have a child directory lists or directory entries
    //All attribute argument refer to whether the object should retrieve all of its directory list attributes, or just the ID
    const getItemAndAllChildItems = (dir_list, allAttributes = false) => {
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
                    ...getItemAndAllChildItems(item, allAttributes)
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
                    ...getItemAndAllChildItems(item, allAttributes)
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
    };

    //Merge / flatten an array https://stackoverflow.com/a/10865042
    const dirListOnlyDataTree = [].concat
        .apply([], data.map(entry => getItemAndAllChildItems(entry, true)))
        .filter(item => Boolean(item.is_dir_list));

    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = event => {
        setSearchQuery(event.target.value);
    };

    const filterDirList = () =>
        dirListOnlyDataTree.filter(({ name }) =>
            name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const filterResults = filterDirList();

    return (
        <div style={{ width: "80%" }}>
            <TextField
                variant="outlined"
                fullWidth={true}
                value={searchQuery}
                onChange={handleChange}
            />
            {searchQuery.length > 0 && (
                <List className={classes.filterQueryList}>
                    {filterResults.length > 0 && <Divider />}
                    {filterResults.map(({ name, id }, index) => (
                        <ListItem
                            button
                            divider
                            key={`DIR_LIST-${index}-${id}`}
                        >
                            <ListItemText primary={name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

SearchFilter.defaultProps = {
    data: [],
    child_directory_lists_key: "child_directory_lists",
    directory_entries_key: "directory_entries"
};

SearchFilter.propTypes = {
    data: PropTypes.array,
    child_directory_lists_key: PropTypes.string,
    directory_entries_key: PropTypes.string
};

export default withStyles(styles)(React.memo(SearchFilter));
