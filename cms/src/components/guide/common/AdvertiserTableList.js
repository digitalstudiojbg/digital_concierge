import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import {
    MoreHoriz,
    SaveAlt,
    MailOutline,
    PrintOutlined,
    DeleteOutlined,
    arrowDropDown,
    arrowDropUp
} from "@material-ui/icons";
import MaterialTable, { MTableToolbar } from "material-table";

import dayJs from "dayjs";
import {
    ADVERTISER_CREATE_NEW_URL,
    sortDate,
    ADVERTISER_MAIN_URL
} from "../../../utils/Constants";
import { isEmpty } from "lodash";

const ContainerDiv = styled.div`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
`;

const HeaderDiv = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const TableDiv = styled.div`
    width: 100%;
`;

const styles = () => ({
    buttonNewAdvertisement: {
        backgroundColor: "white",
        color: "rgb(33,143,250)",
        border: "2px solid rgb(33,143,250)",
        fontWeight: 600,
        fontFamily: "Source Sans Pro, sans-serif",
        //   marginLeft: 10,
        width: "150px"
    },
    iconButton: {
        marginLeft: 8,
        //  height: "50%",
        padding: "7px",
        backgroundColor: "white",
        border: "1px solid grey",
        borderRadius: "5px",
        height: "fit-content"
    },
    iconButtonEnd: {
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "white",
        border: "1px solid rgba(112, 112, 112, 1)"
    },
    notchedOutline: {
        border: "1px solid black",
        backgroundColor: "white"
    }
});

class AdvertiserTableList extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToCreateNewAdvertiserPage = this.navigateToCreateNewAdvertiserPage.bind(
            this
        );
    }

    navigateToCreateNewAdvertiserPage = () => {
        const { history, pub_id } = this.props;
        Boolean(history) &&
            history.push({
                pathname: ADVERTISER_CREATE_NEW_URL,
                state: { pub_id }
            });
    };

    headerButtons = [
        { icon: MoreHoriz, action: () => alert("More Icon Clicked") },
        { icon: SaveAlt, action: () => alert("Save Icon Clicked") },
        { icon: MailOutline, action: () => alert("Mail Icon Clicked") },
        { icon: PrintOutlined, action: () => alert("Print Icon Clicked") },
        { icon: DeleteOutlined, action: () => alert("Delete Icon Clicked") }
    ];

    formatDate = dateValue => dayJs(dateValue).format("HH:mm DD MMM YYYY");

    modifyAdvertiserList = () =>
        this.props.data.map(({ id, name, active_advertising }) => ({
            id,
            name,
            agreement_number:
                !isEmpty(active_advertising) &&
                Boolean(active_advertising.agreement_number)
                    ? active_advertising.agreement_number
                    : "",
            article_location:
                !isEmpty(active_advertising) &&
                Array.isArray(active_advertising.articles) &&
                active_advertising.articles.length > 0 &&
                !isEmpty(active_advertising.articles[0])
                    ? active_advertising.articles[0].name
                    : "",
            commence_date:
                !isEmpty(active_advertising) &&
                Boolean(active_advertising.commence_date)
                    ? active_advertising.commence_date
                    : "",
            commence_date_format:
                !isEmpty(active_advertising) &&
                Boolean(active_advertising.commence_date)
                    ? this.formatDate(active_advertising.commence_date)
                    : "",
            expire_date:
                !isEmpty(active_advertising) &&
                Boolean(active_advertising.expire_date)
                    ? active_advertising.expire_date
                    : "",
            expire_date_format:
                !isEmpty(active_advertising) &&
                Boolean(active_advertising.expire_date)
                    ? this.formatDate(active_advertising.expire_date)
                    : ""
        }));

    handleClickRow = (_event, { id: advertiser_id }) => {
        const { history } = this.props;
        Boolean(history) &&
            history.push(
                ADVERTISER_MAIN_URL.replace(":advertiser_id", advertiser_id)
            );
    };

    render() {
        const { classes } = this.props;

        return (
            <ContainerDiv>
                <TableDiv>
                    <MaterialTable
                        style={{
                            boxShadow: "none",
                            width: "93%"
                        }}
                        data={this.modifyAdvertiserList()}
                        onRowClick={this.handleClickRow}
                        columns={[
                            { title: "ADVERTISER", field: "name" },
                            { title: "INVOICE #", field: "agreement_number" },
                            {
                                title: "AD LOCATION",
                                field: "article_location"
                            },
                            {
                                title: "DATE ADDED",
                                field: "commence_date_format",
                                customSort: (
                                    { commence_date: date1 },
                                    { commence_date: date2 }
                                ) => sortDate(date1, date2)
                            },
                            {
                                title: "EXPIRY DATE",
                                field: "expire_date_format",
                                customSort: (
                                    { expire_date: date1 },
                                    { expire_date: date2 }
                                ) => sortDate(date1, date2)
                            }
                        ]}
                        options={{
                            selection: true,
                            searchFieldAlignment: "left",

                            showTitle: false,
                            headerStyle: {
                                borderBottom: "2px solid grey"
                            }
                        }}
                        components={{
                            Toolbar: props => {
                                console.log(props);
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "#F4F4F4"
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "50%",
                                                marginLeft: "-2%"
                                            }}
                                        >
                                            <MTableToolbar {...props} />
                                        </div>
                                        <div
                                            style={{
                                                width: "80%",
                                                height: "100%"
                                            }}
                                        >
                                            <HeaderDiv
                                                style={{
                                                    backgroundColor: "#F4F4F4"
                                                }}
                                            >
                                                <div style={{ height: "50%" }}>
                                                    <Button
                                                        className={
                                                            classes.buttonNewAdvertisement
                                                        }
                                                        onClick={
                                                            this
                                                                .navigateToCreateNewAdvertiserPage
                                                        }
                                                    >
                                                        NEW ADVERTISEMENT
                                                    </Button>
                                                </div>

                                                {this.headerButtons.map(
                                                    (
                                                        {
                                                            icon: ButtonIcon,
                                                            action
                                                        },
                                                        index
                                                    ) => (
                                                        <IconButton
                                                            key={`HEADER-BUTTON-${index}`}
                                                            className={
                                                                classes.iconButton
                                                            }
                                                            onClick={action}
                                                        >
                                                            <ButtonIcon />
                                                        </IconButton>
                                                    )
                                                )}
                                            </HeaderDiv>
                                        </div>
                                    </div>
                                );
                            }
                        }}
                        options={{
                            selection: true,

                            searchFieldAlignment: "left",
                            showTitle: false,
                            searchFieldStyle: {
                                border: "1px solid lightGrey",
                                backgroundColor: "white",
                                borderRadius: "5px",
                                padding: "5px",
                                marginLeft: "0"
                            },
                            headerStyle: {
                                borderBottom: "2px solid grey",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                color: "black",
                                textAlign: "left"
                            },
                            footStyle: {
                                color: "black",
                                textAlign: "left"
                            }

                            // sortLabelStyle: {
                            //     color: "red"
                            //     content: "▼"
                            //     IconComponent: { arrowDropDown }
                            // }
                        }}
                    />
                </TableDiv>
            </ContainerDiv>
        );
    }
}

export default withRouter(withStyles(styles)(AdvertiserTableList));
