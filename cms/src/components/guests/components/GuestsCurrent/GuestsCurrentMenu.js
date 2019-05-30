import React from 'react';
import { Popover } from "@material-ui/core/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import MenuList from "@material-ui/core/MenuList/index";
import Box from "@material-ui/core/Box/index";
import MoreHoriz from "@material-ui/icons/MoreHoriz";

const GuestsCurrentMenuItem = ({ children }) => (
    <MenuItem fontWeight="bold" minWidth={108} component={Box}>
        {children}
    </MenuItem>
);

const GuestsCurrentMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : null;

    return (
        <>
            <MoreHoriz
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                fontSize="large"
                cursor="pointer"
            />

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <MenuList>
                    <GuestsCurrentMenuItem>Check Out</GuestsCurrentMenuItem>
                    <GuestsCurrentMenuItem>Edit</GuestsCurrentMenuItem>
                </MenuList>
            </Popover>
        </>
    );
};


export default GuestsCurrentMenu;
