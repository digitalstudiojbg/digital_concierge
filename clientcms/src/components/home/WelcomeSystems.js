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
    justify-content: center;
`;

const SubtitleContainerDiv = styled.div`
    height: 10%;
    color: black;
    font-size: 2em;
    font-weight: 700;
`;

const InnerContainerDiv = styled.div`
    height: 60%;
    display: flex;
    color: black;
    flex-wrap: wrap;
`;

const system_entry_style = {
    flexBasis: "25%",
    height: "50%",
    backgroundColor: "white",
    border: "2px solid black",
    marginRight: "10px",
    textDecoration: "none",
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.7em",
    padding: 10
};

const styles = () => ({
    addIcon: {
        width: 64,
        height: 64
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
        <SubtitleContainerDiv>
            PLEASE SELECT SYSTEM TO EDIT
        </SubtitleContainerDiv>
        <InnerContainerDiv>
            {systems.map(system => (
                <Link
                    style={system_entry_style}
                    key={system.id}
                    to={SYSTEM_INDEX_URL.replace(":system_id", system.id)}
                >
                    {system.name}
                </Link>
            ))}
            <a
                style={system_entry_style}
                href={`mailto:laura@johnbatman.com.au?subject=${name} request for additional system(s)`}
            >
                REQUEST ADDITIONAL SYSTEM(S)
                <AddIcon className={classes.addIcon} />
            </a>
        </InnerContainerDiv>
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
