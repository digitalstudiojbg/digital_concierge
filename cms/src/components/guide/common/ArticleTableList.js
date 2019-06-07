import React from "react";
import styled from "styled-components";
import MaterialTable, { MTableToolbar } from "material-table";
import { isEmpty } from "lodash";
import dayJs from "dayjs";
import { IconButton, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
    MoreHoriz,
    SaveAlt,
    MailOutline,
    PrintOutlined,
    DeleteOutlined,
    Visibility,
    VisibilityOff
} from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import { ARTICLE_CREATE_NEW_URL } from "../../../utils/Constants";

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

const styles = () => ({
    buttonNewAdvertisement: {
        backgroundColor: "white",
        color: "rgb(33,143,250)",
        border: "2px solid rgb(33,143,250)",
        fontWeight: 600,
        fontFamily: "Source Sans Pro, sans-serif",
        marginRight: 10
    },
    iconButton: {
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "white",
        border: "1px solid rgba(112, 112, 112, 1)",
        height: "50%"
    },
    iconButtonEnd: {
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "white",
        border: "1px solid rgba(112, 112, 112, 1)"
    }
});

class ArticleTableList extends React.Component {
    state = {
        anchorEl: null
    };

    headerButtons = [
        { icon: MoreHoriz, action: () => alert("More Icon Clicked") },
        { icon: SaveAlt, action: () => alert("Save Icon Clicked") },
        { icon: MailOutline, action: () => alert("Mail Icon Clicked") },
        { icon: PrintOutlined, action: () => alert("Print Icon Clicked") },
        { icon: DeleteOutlined, action: () => alert("Delete Icon Clicked") }
    ];

    formatDate = dateValue => dayJs(dateValue).format("HH:mm DD MMM YYYY");

    modifyArticleList = () => {
        const { data } = this.props;
        return isEmpty(data)
            ? []
            : data.map(
                  ({
                      id,
                      active,
                      order,
                      name: article_name,
                      jbg_template: { name: template_name },
                      jbg_layout: {
                          jbg_layout_family: { name: layout_family_name },
                          name: layout_option_name
                      },
                      createdAt,
                      updatedAt
                  }) => ({
                      id,
                      active,
                      order,
                      article_name,
                      template_name,
                      layout_family_name,
                      layout_option_name,
                      createdAt: this.formatDate(createdAt).toUpperCase(),
                      updatedAt: this.formatDate(updatedAt).toUpperCase()
                  })
              );
    };

    navigateToCreateNewArticlePage = () => {
        const { history, pub_id } = this.props;
        Boolean(history) &&
            history.push({
                pathname: ARTICLE_CREATE_NEW_URL,
                state: { pub_id }
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <ContainerDiv>
                <MaterialTable
                    data={this.modifyArticleList()}
                    columns={[
                        {
                            title: "VISIBLE",
                            field: "active",
                            render: ({ active }) =>
                                active ? (
                                    <IconButton>
                                        <Visibility />
                                    </IconButton>
                                ) : (
                                    <IconButton>
                                        <VisibilityOff />
                                    </IconButton>
                                )
                        },
                        { title: "ORDER", field: "order" },
                        { title: "ARTICLE TITLE", field: "article_name" },
                        { title: "TEMPLATE", field: "template_name" },
                        { title: "LAYOUT FAMILY", field: "layout_family_name" },
                        { title: "LAYOUT OPTION", field: "layout_option_name" },
                        { title: "CREATED", field: "createdAt" },
                        { title: "LAST EDITED", field: "updatedAt" }
                    ]}
                    options={{
                        selection: true,
                        searchFieldAlignment: "left",
                        showTitle: false
                    }}
                    components={{
                        Toolbar: props => {
                            console.log(props);
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        height: "100%"
                                    }}
                                >
                                    <div style={{ width: "50%" }}>
                                        <MTableToolbar {...props} />
                                    </div>
                                    <div
                                        style={{
                                            width: "80%",
                                            height: "100%"
                                        }}
                                    >
                                        <HeaderDiv>
                                            <div style={{ height: "50%" }}>
                                                <Button
                                                    className={
                                                        classes.buttonNewAdvertisement
                                                    }
                                                    onClick={
                                                        this
                                                            .navigateToCreateNewArticlePage
                                                    }
                                                >
                                                    NEW ARTICLE
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
                />
            </ContainerDiv>
        );
    }
}

export default withRouter(withStyles(styles)(ArticleTableList));
