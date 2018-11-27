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

    &:hover {
        background-color: white;
        color: black;
    }
`;

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: ""
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
                    style={{
                        backgroundColor: selectedItem === VIEW_SITE && "white",
                        color: selectedItem === VIEW_SITE && "black"
                    }}
                >
                    <h1>ViewSite</h1>
                </SidebarItem>
                <SidebarItem
                    onClick={() => {
                        this.handleSidebarClick(DASHBOARD);
                    }}
                    style={{
                        backgroundColor: selectedItem === DASHBOARD && "white",
                        color: selectedItem === DASHBOARD && "black"
                    }}
                >
                    <h1>Dashboard</h1>
                </SidebarItem>
                <SidebarItem
                    onClick={() => {
                        this.handleSidebarClick(LANDING_PAGE);
                    }}
                    style={{
                        backgroundColor:
                            selectedItem === LANDING_PAGE && "white",
                        color: selectedItem === LANDING_PAGE && "black"
                    }}
                >
                    <h1>Landing Page</h1>
                </SidebarItem>
                <SidebarItem
                    onClick={() => {
                        this.handleSidebarClick(CONTENT);
                    }}
                    style={{
                        backgroundColor: selectedItem === CONTENT && "white",
                        color: selectedItem === CONTENT && "black"
                    }}
                >
                    <h1>Content</h1>
                </SidebarItem>
                <SidebarItem
                    onClick={() => {
                        this.handleSidebarClick(SETTINGS);
                    }}
                    style={{
                        backgroundColor: selectedItem === SETTINGS && "white",
                        color: selectedItem === SETTINGS && "black"
                    }}
                >
                    <h1>Settings</h1>
                </SidebarItem>
            </div>
        );
    }
}

export default Sidebar;
