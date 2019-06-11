import styled from "styled-components";

export const GuestTable = styled.div`
    color: #5C5C5C;
    font-family: "Arial", sans-serif;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    background-color: #fff;
    border: 1px solid #9D9D9D;
    border-radius: 4px;
    overflow: hidden;
`;

export const GuestTR = styled.div`
    display: flex;
    align-items: center;
    border-bottom: solid 1px rgba(0,0,0,0.05);
`;

export const GuestTD = styled.div`
    border-right: none;
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const GuestTH = styled.div`
    padding: 18px 0;
    cursor: pointer;
`;

export const GuestTHead = styled.div`
    border-bottom: 3px solid #5C5C5C;
`;

export const GuestDeviceStatus = styled.div`
    display: inline-block;
    border-radius: 100%;
    background: #04D12B;
    width: 14px;
    height: 14px;
`;
