import React, { useRef } from 'react';
import PropTypes from "prop-types";
import Downshift from "downshift";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Query from "react-apollo/Query";
import getGuests from "../../../guests/query/getGuests";
import { CheckInput } from "../CheckTextField/styled";

const getName = (obj) => obj ? `${obj.firstname} ${obj.lastname}` : "";

const CheckAutocomplete = ({ onSelectItem }) => {
    const popperNode = useRef();

    return (
        <Query query={getGuests}>
            {({ data: { guests } = {} }) => (
                <Downshift
                    onSelect={onSelectItem}
                    itemToString={getName}
                >
                    {({
                          getInputProps,
                          getItemProps,
                          inputValue,
                          highlightedIndex,
                          isOpen,
                      }) => (
                        <div>
                            <CheckInput
                                ref={popperNode}
                                disableUnderline={true}
                                {...getInputProps()}
                            />

                            <Popper
                                open={isOpen}
                                anchorEl={popperNode.current}
                                style={{ width: popperNode.current ? popperNode.current.clientWidth : undefined }}
                            >
                                <Paper>
                                    {guests && guests
                                        .filter(item => !inputValue || getName(item).includes(inputValue))
                                        .map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                selected={highlightedIndex === index}
                                                {...getItemProps({
                                                    item,
                                                    index,
                                                    key: item.id,
                                                })}
                                            >
                                                {getName(item)}
                                            </MenuItem>
                                        ))}
                                </Paper>
                            </Popper>
                        </div>
                    )}
                </Downshift>
            )}
        </Query>
    )
};

CheckAutocomplete.propTypes = {
    onSelectItem: PropTypes.func.isRequired,
};

export default CheckAutocomplete;
