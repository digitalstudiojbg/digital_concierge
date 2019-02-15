import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    COLOR_JBG_PURPLE,
    SYSTEM_CMS_INDEX_URL,
    TOUCHSCREEN_CMS_INDEX_URL
} from "../../utils/Constants";
import "./Welcome.css";
import Button from "@material-ui/core/Button";
import { isEmpty } from "lodash";
import { Redirect } from "react-router";
import { getCurrentUserQuery as query } from "../../data/query";
import { withApollo } from "react-apollo";

class Welcome extends Component {
    render() {
        const SELECT_FONT_STYLE = {
            textAlign: "center",
            fontSize: "1.5em",
            height: "50px",
            lineHeight: "50px",
            fontWeight: "bold",
            color: COLOR_JBG_PURPLE
        };
        const { client } = this.props;
        const { getCurrentUser: user } = client.readQuery({
            query
        });
        const { has_tablet, has_touchscreen } = user.client;

        if (has_tablet && !has_touchscreen)
            return (
                <Redirect
                    to={{
                        pathname: SYSTEM_CMS_INDEX_URL
                    }}
                />
            );

        if (!has_tablet && has_touchscreen)
            return (
                <Redirect
                    to={{
                        pathname: TOUCHSCREEN_CMS_INDEX_URL
                    }}
                />
            );

        return (
            <div
                style={{
                    width: "100vw",
                    height: `calc(100vh - 80px)`,
                    position: "relative",
                    backgroundColor: "rgb(247,247,247)"
                }}
            >
                <div
                    style={{
                        margin: "auto",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <p
                        style={{
                            color: COLOR_JBG_PURPLE,
                            textAlign: "center",
                            textTransform: "uppercase",
                            fontSize: "1.8em",
                            fontWeight: "bold"
                        }}
                    >
                        PLEASE SELECT WHICH PLATFORM TO EDIT
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center"
                        }}
                    >
                        {!isEmpty(user) && has_tablet && (
                            <Link
                                to={SYSTEM_CMS_INDEX_URL}
                                style={{
                                    textDecoration: "none",
                                    margin: "10px",
                                    backgroundColor: "white"
                                }}
                            >
                                <div className="welcome_page_selection_image_container">
                                    <img
                                        className="welcome_page_selection_image_container_image"
                                        src="https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_assets/welcome_page_tablet_small.png"
                                        alt="welcome_page_tablet_small"
                                    />
                                    <div className="welcome_page_selection_image_container_middle">
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            style={{
                                                width: "200px",
                                                color: "white",
                                                fontSize: "1.3em",
                                                backgroundColor: COLOR_JBG_PURPLE
                                            }}
                                        >
                                            EDIT
                                        </Button>
                                    </div>
                                </div>
                                <p style={SELECT_FONT_STYLE}>
                                    DIGITAL COMPENDIUM
                                </p>
                            </Link>
                        )}

                        {!isEmpty(user) && has_touchscreen && (
                            <Link
                                to={TOUCHSCREEN_CMS_INDEX_URL}
                                style={{
                                    textDecoration: "none",
                                    margin: "10px",
                                    backgroundColor: "white"
                                }}
                            >
                                <div className="welcome_page_selection_image_container">
                                    <img
                                        className="welcome_page_selection_image_container_image"
                                        src="https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_assets/welcome_page_touchscreen_small.png"
                                        alt="welcome_page_tablet_small"
                                    />
                                    <div className="welcome_page_selection_image_container_middle">
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            style={{
                                                width: "200px",
                                                color: "white",
                                                fontSize: "1.3em",
                                                backgroundColor: COLOR_JBG_PURPLE
                                            }}
                                        >
                                            EDIT
                                        </Button>
                                    </div>
                                </div>
                                <p style={SELECT_FONT_STYLE}>
                                    DIGITAL CONCIERGE
                                </p>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default withApollo(Welcome);
