import React, { useCallback, useRef } from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import Downshift from "downshift";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Query from "react-apollo/Query";
import getGuests from "../../../guests/query/getGuests";
import { CheckInput } from "../CheckTextField/styled";

const getName = (obj) => obj ? `${obj.firstname} ${obj.lastname}` : "";

const CheckAutocompletePaper = styled(Paper)`
  max-height: 300px;
  overflow: auto;
`;

function stateReducer(state, changes) {
    switch (changes.type) {
        case Downshift.stateChangeTypes.changeInput:
            return { ...changes, selectedItem: null };
        default:
            return changes
    }
}

const CheckAutocomplete = React.memo((
    {
        onSelect,
        onUnselect,
        isFilterByGuestsRoom,
    },
) => {
    const popperNode = useRef();

    const filter = useCallback(
        (obj, val) => {
            let result = getName(obj).toLowerCase().includes(val.toLowerCase());

            if (isFilterByGuestsRoom && result) {
                result = obj.guest_rooms && obj.guest_rooms.length;
            }

            return result;
        },
        [],
    );

    // TODO: now it load all guest on every mount; need create normal autocomplete
    return (
        <Query
            query={getGuests}
            fetchPolicy="no-cache"
        >
            {({ data: { guests } = {} }) => (
                <Downshift
                    onInputValueChange={onUnselect}
                    onSelect={onSelect}
                    itemToString={getName}
                    stateReducer={stateReducer}
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
                                <CheckAutocompletePaper>
                                    {guests && guests
                                        .filter(item => !inputValue || filter(item, inputValue))
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
                                </CheckAutocompletePaper>
                            </Popper>
                        </div>
                    )}
                </Downshift>
            )}
        </Query>
    )
});

CheckAutocomplete.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onUnselect: PropTypes.func.isRequired,

    isFilterByGuestsRoom: PropTypes.bool,
};

export default CheckAutocomplete;
