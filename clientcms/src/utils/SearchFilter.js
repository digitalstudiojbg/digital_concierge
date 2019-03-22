import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

export const SearchFilter = ({
    data,
    child_directory_lists_key,
    directory_entries_key
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

    let all = [];
    data.forEach(entry => {
        all = [...all, ...getItemAndAllChildItems(entry, true)];
    });

    const dirListOnlyDataTree = all.filter(item => Boolean(item.is_dir_list));
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = event => {
        setSearchQuery(event.target.value);
    };

    const filterDirList = () =>
        dirListOnlyDataTree.filter(({ name }) =>
            name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div style={{ width: "80%" }}>
            <TextField
                variant="outlined"
                fullWidth={true}
                value={searchQuery}
                onChange={handleChange}
            />
            {searchQuery.length > 0 &&
                filterDirList().map(({ name, id }) => (
                    <div key={id}>{name.toUpperCase()}</div>
                ))}
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

export default SearchFilter;
