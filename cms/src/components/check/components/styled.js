import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button } from "@material-ui/core";

export const CheckCol = styled(Box)`
    position: relative;
    
    &:after {
        content: "";
        position: absolute;
        top: 90px;
        bottom: 40px;
        right: 0;
        display: block;
        width: 0;
        border-right: 1px solid #DDDDDD;
    }
`;

export const CheckSubmitButton = styled(Button)`

`;

export const CheckCheckbox = withStyles({
    root: {
        width: 18,
        height: 18,
    }
})(Checkbox);

