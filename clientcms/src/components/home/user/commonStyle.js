import styled from "styled-components";

export const FieldLabel = styled.div`
    font-size: 10px;
    margin-bottom: 2px;
    color: #5c5c5c;
    text-transform: uppercase;
`;
export const FieldContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    margin-bottom: 5px;
`;
export const NormalButton = styled.button`
    border: 3px solid #2699fb;
    background-color: white;
    display: inline-block;
    width: 40%;
    text-align: center;
    cursor: pointer;
    padding: 10px 5px;
    font-size: 14px;
    color: #2699fb;
    border-radius: 5px;
    margin-bottom: 20px;
    &:hover {
        background-color: #ebebf2;
    }
`;
