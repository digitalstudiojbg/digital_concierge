import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import { getSystemsFromUser, getSystemsFromClient } from "../../data/query";
// import { Query, withApollo } from "react-apollo";
// import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { SYSTEM_INDEX_URL } from "../../utils/Constants";
import { withStyles } from "@material-ui/core/styles";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(244, 244, 244);
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    //  justify-content: center;
`;

const SubtitleContainerDiv = styled.div`
    color: black;
    font-size: 21px;
    font-weight: 600;
    padding: 1%;
`;

const InnerContainerDiv = styled.div`
    height: 80%;
    widht: 20%;
    display: flex;
    color: black;
    flex-wrap: wrap;
    margin: 1%;
`;

const system_entry_style = {
    flexBasis: "17%",
    height: "100%",
    backgroundColor: "white",
    marginRight: "15px",
    textDecoration: "none",
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "15px",
    padding: "1%"
};

const styles = () => ({
    addIcon: {
        width: 32,
        height: 32,
        color: "#ebebeb",
        alignItems: "center"
    }
});

// const renderSystems = (loading, error, data) => {
//     if (loading) return <Loading loadingData />;
//     if (error) return `Error! ${error.message}`;
//     const systems =
//         Boolean(data) &&
//         Boolean(data.systemsByUser) &&
//         Array.isArray(data.systemsByUser)
//             ? data.systemsByUser
//             : Boolean(data) &&
//               Boolean(data.systemsByClient) &&
//               Array.isArray(data.systemsByClient)
//             ? data.systemsByClient
//             : [];
//     return (
//         <React.Fragment>
//             <SubtitleContainerDiv>
//                 PLEASE SELECT SYSTEM TO EDIT
//             </SubtitleContainerDiv>
//             <InnerContainerDiv>
//                 {systems.map(system => (
//                     <Link
//                         style={system_entry_style}
//                         key={system.id}
//                         to={SYSTEM_INDEX_URL.replace(":system_id", system.id)}
//                     >
//                         {system.name}
//                     </Link>
//                 ))}
//             </InnerContainerDiv>
//         </React.Fragment>
//     );
// };

const WelcomeSystems = ({ data: { name, systems }, classes }) => (
    <ContainerDiv>
        {/* {Boolean(clientId) && clientId.length > 0 ? (
            <Query query={getSystemsFromClient} variables={{ id: clientId }}>
                {({ loading, error, data }) => (
                    <React.Fragment>
                        {renderSystems(loading, error, data)}
                    </React.Fragment>
                )}
            </Query>
        ) : (
            <Query query={getSystemsFromUser}>
                {({ loading, error, data }) => (
                    <React.Fragment>
                        {renderSystems(loading, error, data)}
                    </React.Fragment>
                )}
            </Query>
        )} */}
        <h2
            style={{
                height: "200px",
                fontSize: "30px",
                padding: "3% 0 0 0"
            }}
        >
            Systems
        </h2>
        <div style={{ padding: "2%", flexDirection: "centre" }}>
            <SubtitleContainerDiv>
                PLEASE SELECT SYSTEM TO EDIT
            </SubtitleContainerDiv>
            <InnerContainerDiv>
                {systems.map(
                    (
                        {
                            id,
                            name,
                            devices_count,
                            system_type: { name: systemTypeName },
                            device_type: { name: deviceTypeName }
                        },
                        index
                    ) => (
                        <Link
                            style={system_entry_style}
                            key={`${id}-${index}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            to={SYSTEM_INDEX_URL.replace(":system_id", id)}
                        >
                            <img
                                style={{
                                    display: "block",
                                    margin: "auto"
                                }}
                                src={
                                    systemTypeName.includes("TABLET")
                                        ? "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_assets/tabletIcon.png"
                                        : "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_assets/touchscreenIcon.png"
                                }
                                height="50%"
                            />
                            <div style={{ fontWeight: "bold" }}>{name}</div>
                            <div
                                style={{
                                    color: "#585858",
                                    borderBottom: "1px solid black",
                                    marginBottom: "5%",
                                    fontSize: "14px",
                                    fontWeight: "bold"
                                }}
                            >
                                {systemTypeName}
                            </div>
                            <div style={{ color: "#C1C1C1", fontSize: "12px" }}>
                                {deviceTypeName}
                            </div>
                            <div style={{ color: "#C1C1C1", fontSize: "12px" }}>
                                {devices_count} DEVICES
                            </div>
                        </Link>
                    )
                )}
                <a
                    style={system_entry_style}
                    href={`mailto:laura@johnbatman.com.au?subject=${name} request for additional system(s)`}
                >
                    <AddIcon
                        style={{
                            height: "80%",
                            flexDirection: "centre",
                            border: "2px solid #ebebeb",
                            width: "100%"
                        }}
                        className={classes.addIcon}
                    />
                    <p
                        style={{
                            fontSize: "15px",
                            padding: "0",
                            margin: "0",
                            fontWeight: "bold"
                        }}
                    >
                        NEW SYSTEM
                    </p>
                    <p
                        style={{
                            color: "#585858",
                            padding: "0",
                            // marginBottom: "5%",
                            fontSize: "14px",
                            fontWeight: "bold"
                        }}
                    >
                        REQUEST ADDITIONAL SYSTEM(S)
                    </p>
                </a>
            </InnerContainerDiv>
        </div>
    </ContainerDiv>
);

WelcomeSystems.defaultProps = {
    data: {}
};

WelcomeSystems.propTypes = {
    // data: PropTypes.shape({
    //     id: PropTypes.string,
    //     name: PropTypes.string,
    //     full_company_name: PropTypes.string,
    //     nature_of_business: PropTypes.string,
    //     venue_address: PropTypes.string,
    //     venue_city: PropTypes.string,
    //     venue_zip_code: PropTypes.string,
    //     postal_address: PropTypes.string,
    //     postal_city: PropTypes.string,
    //     postal_zip_code: PropTypes.string,
    //     phone: PropTypes.string,
    //     email: PropTypes.string,
    //     active: PropTypes.bool,
    //     number_of_users: PropTypes.number,
    //     avatar: PropTypes.string,
    //     contacts: PropTypes.arrayOf(
    //         PropTypes.object({
    //             id: PropTypes.string,
    //             name: PropTypes.string,
    //             title: PropTypes.string,
    //             phone: PropTypes.string,
    //             mobile: PropTypes.string
    //         })
    //     ),
    //     active_contract: PropTypes.object({
    //         id: PropTypes.string,
    //         number: PropTypes.string,
    //         file: PropTypes.string,
    //         active: PropTypes.bool,
    //         renewal_date: PropTypes.string
    //     }),
    //     contracts: PropTypes.arrayOf(
    //         PropTypes.object({
    //             id: PropTypes.string,
    //             number: PropTypes.string,
    //             file: PropTypes.string,
    //             active: PropTypes.bool,
    //             renewal_date: PropTypes.string
    //         })
    //     ),
    //     postal_state: PropTypes.object({
    //         id: PropTypes.string,
    //         name: PropTypes.string
    //     }),
    //     venue_state: PropTypes.object({
    //         id: PropTypes.string,
    //         name: PropTypes.string
    //     }),
    //     media: PropTypes.object({
    //         id: PropTypes.string,
    //         name: PropTypes.string
    //     })

    //     // users: PropTypes.arrayOf(PropTypes.object({
    //     //     id: PropTypes.string,
    //     //     email: PropTypes.string,
    //     // })),
    //     // departments: PropTypes.arrayOf(PropTypes.object({
    //     //     id: PropTypes.string,
    //     //     name: PropTypes.string,
    //     // })),
    //     // rooms: PropTypes.arrayOf(PropTypes.object({
    //     //     id: PropTypes.string,
    //     //     name: PropTypes.string,
    //     // })),
    //     // guests: PropTypes.arrayOf(PropTypes.object({
    //     //     id: PropTypes.string,
    //     //     firstname: PropTypes.string,
    //     //     lastname: PropTypes.string,

    //     // })),
    // })
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(WelcomeSystems);
