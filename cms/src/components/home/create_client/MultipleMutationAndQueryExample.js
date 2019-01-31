import React, { Component, Fragment, lazy, Suspense } from "react";
import { compose, withApollo, graphql } from "react-apollo";
import {
    CREATE_CLIENT,
    CREATE_CONTACT,
    CREATE_USER
} from "../../../data/mutation";
import { getCountryList, getSelectedCountry } from "../../../data/query";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    text: {
        backgroundColor: "red"
    }
});
class MultipleMutationAndQueryExample extends Component {
    /**
     * Another way of running query just in case
     */
    runQuery() {
        this.props.client
            .query({
                query: getSelectedCountry,
                variables: { id: 1 }
            })
            .then(data => {
                console.log(data);
            });
    }

    render() {
        const {
            createContact,
            createClient,
            createUser,
            getSelectedCountry,
            data,
            classes
        } = this.props;
        return (
            <React.Fragment>
                <h1
                    className={classes.text}
                    onClick={() => {
                        /**
                         * Execute first mutation
                         */
                        createContact({
                            variables: {
                                input: {
                                    name: "Yijie From Front End",
                                    title: "Owner",
                                    phone: "0424195945",
                                    mobile: "0424195945",
                                    email: "shenyijie5580@gmail.com",
                                    clientId: 1
                                }
                            }
                        });

                        /**
                         * Execute second mutation
                         */
                        /* createClient({
                            variables: {
                                input: {
                                    name: "Neal's Hotel",
                                    full_company_name: "Jonathan's Hotel",
                                    nature_of_business: "Hotel",
                                    venue_address: "48-50 Charter Street",
                                    venue_city: "Ringwood",
                                    venue_zip_code: "3134",
                                    venue_state_id: 7,
                                    postal_address: "48-50 Charter Street",
                                    postal_city: "Ringwood",
                                    postal_zip_code: "3134",
                                    postal_state_id: 7,
                                    phone: "0425872504",
                                    email: "nealshen@johnbatman.com.au",
                                    number_of_users: 5
                                }
                            }
                        });*/

                        /**
                         * Execute third mutation
                         */
                        createUser({
                            variables: {
                                input: {
                                    name: "Jonathan Neal 123",
                                    email: "shenyijie5580@gmail.com",
                                    password: "Owner & Founder",
                                    first_phone_number: "0424195945",
                                    second_phone_number: "0424195945",
                                    position: "Boss",
                                    clientId: 1
                                }
                            }
                        }).then(data => {
                            console.log(data);
                        });

                        //this.runQuery();
                        console.log("clicked");
                    }}
                >
                    Click Me Executing Mutations
                </h1>
                <p>
                    Result from getCountryList{" "}
                    {data.countries ? data.countries[0].name : "No Data"}
                </p>
                <p>
                    Result from getSelectedCountry{" "}
                    {getSelectedCountry.country
                        ? getSelectedCountry.country.name
                        : "No Data"}
                </p>
            </React.Fragment>
        );
    }
}

export default compose(
    withApollo,
    withStyles(styles),
    graphql(getCountryList),
    graphql(getSelectedCountry, {
        options: ownProps => ({
            variables: { id: 1 }
        }),
        name: "getSelectedCountry"
    }),
    graphql(CREATE_USER(), { name: "createUser" }),
    graphql(CREATE_CONTACT(), { name: "createContact" }),
    graphql(CREATE_CLIENT(), { name: "createClient" })
)(MultipleMutationAndQueryExample);
