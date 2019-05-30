import styled from "styled-components";
import { Button, Tab } from "@material-ui/core/index";

export const GuestsNavButton = styled(Button)`
    && { 
        background-color: #fff;
        color: #2699FB;
        border: 2px solid #2699FB;
        font-weight: bold;
        min-width: 170px;
    }
`;

export const GuestsNavTab = styled(Tab)`
    && { 
        font-size: 14px;
        font-weight: bold;
        text-transform: none;
    }
`;

export const GuestsNavTabActiveStyle = {
    borderBottom: "1px solid #2699FB",
    color: "#000",
};
