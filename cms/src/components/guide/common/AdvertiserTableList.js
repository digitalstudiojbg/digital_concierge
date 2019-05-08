import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import {
    MoreHoriz,
    SaveAlt,
    MailOutline,
    PrintOutlined,
    DeleteOutlined
} from "@material-ui/icons";
import MaterialTable from "material-table";
import dayJs from "dayjs";

const ContainerDiv = styled.div`
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
`;

const HeaderDiv = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: flex-end;
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
        marginRight: 10
    },
    iconButton: {
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "white",
        border: "1px solid rgba(112, 112, 112, 1)"
    },
    iconButtonEnd: {
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "white",
        border: "1px solid rgba(112, 112, 112, 1)",
        marginRight: 0
    }
});

class AdvertiserTableList extends React.Component {
    headerButtons = [
        { icon: MoreHoriz },
        { icon: SaveAlt },
        { icon: MailOutline },
        { icon: PrintOutlined },
        { icon: DeleteOutlined }
    ];

    formatDate = dateValue => dayJs(dateValue).format("HH:mm DD MMM YYYY");

    modifyAdvertiserList = () =>
        this.props.data.map(
            ({
                name,
                active_advertising: {
                    agreement_number,
                    articles: [article],
                    commence_date,
                    expire_date
                }
            }) => ({
                name,
                agreement_number,
                article_location: article.name,
                commence_date: this.formatDate(commence_date),
                expire_date: this.formatDate(expire_date)
            })
        );

    render() {
        const { classes } = this.props;
        return (
            <ContainerDiv>
                <HeaderDiv>
                    <Button className={classes.buttonNewAdvertisement}>
                        NEW ADVERTISEMENT
                    </Button>
                    {this.headerButtons.map(({ icon: ButtonIcon }, index) => (
                        <IconButton
                            key={`HEADER-BUTTON-${index}`}
                            className={
                                index + 1 === this.headerButtons.length
                                    ? classes.iconButtonEnd
                                    : classes.iconButton
                            }
                        >
                            <ButtonIcon />
                        </IconButton>
                    ))}
                </HeaderDiv>
                <TableDiv>
                    <MaterialTable
                        data={this.modifyAdvertiserList()}
                        columns={[
                            { title: "ADVERTISER", field: "name" },
                            { title: "INVOICE #", field: "agreement_number" },
                            {
                                title: "AD LOCATION",
                                field: "article_location"
                            },
                            {
                                title: "DATE ADDED",
                                field: "commence_date"
                            },
                            {
                                title: "EXPIRY DATE",
                                field: "expire_date"
                            }
                        ]}
                        title=""
                        options={{
                            selection: true
                        }}
                    />
                </TableDiv>
            </ContainerDiv>
        );
    }
}

export default withStyles(styles)(AdvertiserTableList);
