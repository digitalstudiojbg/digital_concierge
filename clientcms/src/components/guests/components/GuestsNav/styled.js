import styled from "styled-components";
import { Button, Tab } from "@material-ui/core";

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
        margin-bottom: -2px;
    }
`;

export const GuestsNavTabActiveStyle = {
    borderBottom: "2px solid #2699FB",
    color: "#000",
};
