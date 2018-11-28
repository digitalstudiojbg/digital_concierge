import React, { Component } from "react";
import styled from "styled-components";

const VIEW_SITE = "VIEW_SITE";
const DASHBOARD = "DASHBOARD";
const LANDING_PAGE = "LANDING_PAGE";
const CONTENT = "CONTENT";
const SETTINGS = "SETTINGS";

const SidebarItem = styled.div`
    height: 70px;
    line-height: 70px;
    padding-left: 30px;
    transition: all 0.3s linear;

    background-color: ${({ selectedItem, expectedItem }) =>
        selectedItem === expectedItem && "white"};
    color: ${({ selectedItem, expectedItem }) =>
        selectedItem === expectedItem && "black"};

    &:hover {
        background-color: white;
        color: black;
    }
`;

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: "123"
        };
    }

    handleSidebarClick(text) {
        this.setState({ selectedItem: text });
    }

    render() {
        const { selectedItem } = this.state;
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    alignContent: "stretch",
                    width: "350px",
                    backgroundColor: "rgb(70,73,124)",
                    color: "white",
                    height: "100vh"
                }}
            >
                <SidebarItem
                    onClick={() => {
                        this.handleSidebarClick(VIEW_SITE);
                    }}
                    selectedItem={selectedItem}
                    expectedItem={VIEW_SITE}
                >
                    <h1>ViewSite</h1>
                </SidebarItem>
                <SidebarItem
                    onClick={() => {
                        this.handleSidebarClick(DASHBOARD);
                    }}
                    selectedItem={selectedItem}
                    expectedItem={DASHBOARD}
                >
                    <h1>Dashboard</h1>
                </SidebarItem>
                <SidebarItem
                    onClick={() => {
                        this.handleSidebarClick(LANDING_PAGE);
                    }}
                    selectedItem={selectedItem}
                    expectedItem={LANDING_PAGE}
                >
                    <h1>Landing Page</h1>
                </SidebarItem>
                <SidebarItem
                    onClick={() => {
                        this.handleSidebarClick(CONTENT);
                    }}
                    selectedItem={selectedItem}
                    expectedItem={CONTENT}
                >
                    <h1>Content</h1>
                </SidebarItem>
                <SidebarItem
                    onClick={() => {
                        this.handleSidebarClick(SETTINGS);
                    }}
                    selectedItem={selectedItem}
                    expectedItem={SETTINGS}
                >
                    <h1>Settings</h1>
                </SidebarItem>
            </div>
        );
    }
}

export default Sidebar;
