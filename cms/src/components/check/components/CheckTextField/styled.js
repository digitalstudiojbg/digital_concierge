import styled from "styled-components";
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import { FormHelperText } from "@material-ui/core";
import Box from "@material-ui/core/Box";

export const CheckInputStyles = {
    root: {
        fontSize: 14,
        fontFamily: "Arial",
        padding: "8px 16px",
        border: "1px solid #9D9D9D",
        background: "#fff !important",
        borderRadius: 4,
        width: "100%",
    },
    focused: {
        borderColor: "#2699FB",
    },
    error: {
        borderColor: "red",
    }
};

export const CheckInput = withStyles(CheckInputStyles)(Input);

export const CheckInputError = withStyles({
    root: {
        color: "red",
        fontSize: 10,
        marginTop: 2,
        position: "absolute",
    }
})(FormHelperText);

export const CheckIconButton = withStyles({
    root: {
        ...CheckInputStyles.root,
        width: 48,
    }
})(IconButton);

export const CheckLabel = withStyles({
    root: {
        fontSize: 10,
        fontFamily: "Arial",
        fontWeight: "bold",
        color: "#5C5C5C",
        textTransform: "uppercase",
    },
})(InputLabel);

export const CheckTextFieldBox = styled(Box)`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;
