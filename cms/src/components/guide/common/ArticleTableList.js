import React from "react";
import styled from "styled-components";
import MaterialTable, { MTableToolbar } from "material-table";
import { isEmpty } from "lodash";
import dayJs from "dayjs";
import { IconButton, Button, Menu, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
    MoreHoriz,
    SaveAlt,
    MailOutline,
    PrintOutlined,
    DeleteOutlined,
    Visibility,
    VisibilityOff,
    KeyboardArrowUp,
    KeyboardArrowDown
} from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import {
    ARTICLE_CREATE_NEW_URL,
    ARTICLE_MAIN_URL,
    sortDate
} from "../../../utils/Constants";

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
    },
    arrowButton: {
        color: "rgb(38,153,251)",
        padding: 0,
        margin: 0,
        width: 24,
        height: 24
    }
});

class ArticleTableList extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
    }
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

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    };

    handleOpenMenu = event => {
        // console.log("Clicked Article: ", event.currentTarget.id);
        this.setState({ anchorEl: event.currentTarget });
    };

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
                      createdAt,
                      updatedAt,
                      createdAtFormat: this.formatDate(createdAt).toUpperCase(),
                      updatedAtFormat: this.formatDate(updatedAt).toUpperCase()
                  })
              );
    };

    navigateToCreateNewArticlePage = () => {
        const { history, pub_id } = this.props;
        Boolean(history) &&
            history.push(ARTICLE_CREATE_NEW_URL.replace(":pub_id", pub_id));
    };

    render() {
        const {
            classes,
            handleActiveInactive,
            data,
            history,
            moveUpByOne,
            moveDownByOne,
            pub_id
        } = this.props;
        const { anchorEl } = this.state;
        const handleVisibleClick = id => _event => {
            Boolean(handleActiveInactive) &&
                handleActiveInactive({ variables: { id } });
        };

        const handleVisibleClickMenu = () => {
            if (
                Boolean(anchorEl) &&
                Boolean(anchorEl.id) &&
                Boolean(handleActiveInactive)
            ) {
                const { id } = anchorEl;
                handleActiveInactive({ variables: { id } });
            }
        };

        const handleEditClickMenu = () => {
            Boolean(anchorEl) &&
                Boolean(anchorEl.id) &&
                Boolean(history) &&
                Boolean(history.push) &&
                history.push(
                    ARTICLE_MAIN_URL.replace(
                        ":article_id",
                        anchorEl.id
                    ).replace(":pub_id", pub_id)
                );
        };

        const handleMoveUpClickMenu = () => {
            if (
                Boolean(anchorEl) &&
                Boolean(anchorEl.id) &&
                Boolean(moveUpByOne)
            ) {
                const { id } = anchorEl;
                moveUpByOne({ variables: { id } });
            }
        };

        const handleMoveDownClickMenu = () => {
            if (
                Boolean(anchorEl) &&
                Boolean(anchorEl.id) &&
                Boolean(moveDownByOne)
            ) {
                const { id } = anchorEl;
                moveDownByOne({ variables: { id } });
            }
        };

        const currentSelectedArticle =
            !isEmpty(data) && Boolean(anchorEl) && Boolean(anchorEl.id)
                ? data.find(({ id }) => id === anchorEl.id)
                : null;

        const currentSelectedArticleIsActive =
            Boolean(currentSelectedArticle) &&
            Boolean(currentSelectedArticle.active);

        const currentSelectedArticleIsFirstElement =
            Boolean(currentSelectedArticle) &&
            data[0].id === currentSelectedArticle.id;

        const currentSelectedArticleIsLastElement =
            Boolean(currentSelectedArticle) &&
            data[data.length - 1].id === currentSelectedArticle.id;

        const handleMoveUpClickArrow = id => () =>
            id !== data[0].id && moveUpByOne({ variables: { id } });

        const handleMoveDownClickArrow = id => () =>
            data[data.length - 1].id !== id &&
            moveDownByOne({ variables: { id } });

        return (
            <ContainerDiv>
                <MaterialTable
                    data={this.modifyArticleList()}
                    columns={[
                        {
                            title: "VISIBLE",
                            render: ({ id, active }) =>
                                active ? (
                                    <IconButton
                                        onClick={handleVisibleClick(id)}
                                    >
                                        <Visibility />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        onClick={handleVisibleClick(id)}
                                    >
                                        <VisibilityOff />
                                    </IconButton>
                                )
                        },
                        {
                            title: "ORDER",
                            field: "order",
                            render: ({ id, order }) => (
                                <div style={{ width: "100%", display: "flex" }}>
                                    <div style={{ width: "10%" }}>
                                        <KeyboardArrowUp
                                            className={classes.arrowButton}
                                            onClick={handleMoveUpClickArrow(id)}
                                        />
                                        <KeyboardArrowDown
                                            className={classes.arrowButton}
                                            onClick={handleMoveDownClickArrow(
                                                id
                                            )}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: "90%",
                                            display: "flex",
                                            paddingLeft: 20,
                                            alignItems: "center"
                                        }}
                                    >
                                        {order}
                                    </div>
                                </div>
                            )
                        },
                        { title: "ARTICLE TITLE", field: "article_name" },
                        { title: "TEMPLATE", field: "template_name" },
                        { title: "LAYOUT FAMILY", field: "layout_family_name" },
                        { title: "LAYOUT OPTION", field: "layout_option_name" },
                        {
                            title: "CREATED",
                            field: "createdAtFormat",
                            customSort: (
                                { createdAt: date1 },
                                { createdAt: date2 }
                            ) => sortDate(date1, date2)
                        },
                        {
                            title: "LAST EDITED",
                            field: "updatedAtFormat",
                            customSort: (
                                { updatedAt: date1 },
                                { updatedAt: date2 }
                            ) => sortDate(date1, date2)
                        },
                        {
                            title: "ACTIONS",
                            render: ({ id }) => (
                                <IconButton
                                    id={id}
                                    onClick={this.handleOpenMenu}
                                >
                                    <MoreHoriz />
                                </IconButton>
                            )
                        }
                    ]}
                    options={{
                        selection: true,
                        searchFieldAlignment: "left",
                        showTitle: false
                    }}
                    components={{
                        Toolbar: props => {
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
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleCloseMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "right"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                    }}
                >
                    <MenuItem onClick={handleEditClickMenu}>EDIT</MenuItem>
                    <MenuItem>DELETE</MenuItem>
                    {!currentSelectedArticleIsFirstElement && (
                        <MenuItem onClick={handleMoveUpClickMenu}>
                            MOVE UP
                        </MenuItem>
                    )}
                    {!currentSelectedArticleIsLastElement && (
                        <MenuItem onClick={handleMoveDownClickMenu}>
                            MOVE DOWN
                        </MenuItem>
                    )}
                    <MenuItem onClick={handleVisibleClickMenu}>
                        {currentSelectedArticleIsActive
                            ? "MAKE INVISIBLE"
                            : "MAKE VISIBLE"}
                    </MenuItem>
                </Menu>
            </ContainerDiv>
        );
    }
}

export default withRouter(withStyles(styles)(ArticleTableList));
