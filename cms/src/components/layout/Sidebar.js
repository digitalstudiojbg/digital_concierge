import React, { Component } from "react";
import styled from "styled-components";

const SIDEBAR_ITEMS = [
    {
        name: "VIEW_SITE",
        displayName: "View Site"
    },
    {
        name: "DASHBOARD",
        displayName: "Dashboard"
    },
    {
        name: "LANDING_PAGE",
        displayName: "Landing Page"
    },
    {
        name: "CONTENT",
        displayName: "Content"
    },
    {
        name: "SETTINGS",
        displayName: "Settings"
    }
];

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
    state = {
        selectedItem: "123"
    };

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
                {SIDEBAR_ITEMS.map((items, index) => {
                    const { name, displayName } = items;
                    return (
                        name &&
                        displayName && (
                            <SidebarItem
                                key={index}
                                onClick={() => {
                                    this.setState({ selectedItem: name });
                                }}
                                selectedItem={selectedItem}
                                expectedItem={name}
                            >
                                <h1>{displayName}</h1>
                            </SidebarItem>
                        )
                    );
                })}
            </div>
        );
    }
}

export default Sidebar;
