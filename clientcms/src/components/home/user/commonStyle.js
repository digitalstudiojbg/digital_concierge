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

export const RolePermissionContainerDiv = styled.div`
    width: 100%;
    height: 500px;
    overflow-y: scroll;
    border: 1px solid #9d9d9d;
    background-color: white;
`;

export const EachRolePermissionContainerDiv = styled.div`
    width: 100%;
    display: flex;
    padding: 10px;
`;
export const EachRoleContainerDiv = styled.div`
    width: 40%;
    display: flex;
    justify-content: left;
    margin-left: 0px;
    padding: 0px;
`;
export const AllPermissionContainerDiv = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    border: 1px solid #9d9d9d;
    padding: 3px;
    background-color: #f7f7f7;
`;
export const AllPermissionFooterContainerDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    color: #2699fb;
`;
export const PermissionFooterEntryDiv = styled.span`
    width: 45%;
    display: flex;
    margin-right: 5px;
    justify-content: center;
    border: 1px solid #2699fb;
`;
