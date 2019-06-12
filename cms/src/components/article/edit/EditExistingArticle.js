import React from "react";
import TabbedPageSingleForm from "../../../utils/TabbedPageSingleForm";
import { GUIDE_MAIN_URL, WELCOME_URL } from "../../../utils/Constants";
import { Redirect } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { EDIT_ARTICLE } from "../../../data/mutation";
import {
    getArticleDetail,
    getJbgLayoutFamilyDetailedList,
    getJbgTemplateList,
    getArticleListFromPublication,
    getJustBrilliantGuideLayoutFamilyDefaults
} from "../../../data/query";
import Loading from "../../loading/Loading";
import TabLayout from "../common/TabLayout";
import TabContent from "../common/TabContent";

const EditExistingArticle = ({ match }) => {
    const { params } = match || {};
    const { pub_id = null, article_id = null } = params || {};
    const tabs = [
        {
            name: "Preview",
            withButtons: true,
            withCancel: true,
            component: () => <div>Preview</div>
        },
        {
            name: "Layout",
            withButtons: true,
            withCancel: true,
            component: TabLayout
        },
        {
            name: "Content",
            withButtons: true,
            withCancel: true,
            component: TabContent
        }
    ];

    return (
        <div style={{ flex: 1, height: "100%" }}>
            {Boolean(pub_id) && Boolean(article_id) ? (
                <Mutation
                    mutation={EDIT_ARTICLE}
                    refetchQueries={[
                        {
                            query: getArticleListFromPublication,
                            variables: { id: pub_id }
                        }
                    ]}
                >
                    {(
                        action,
                        { loading: loadingMutation, error: errorMutation }
                    ) => {
                        if (loadingMutation) return <Loading loadingData />;
                        if (errorMutation)
                            return (
                                <React.Fragment>
                                    Error! ${errorMutation.message}
                                </React.Fragment>
                            );
                        return (
                            <Query query={getJbgLayoutFamilyDetailedList}>
                                {({
                                    loading: loadingQueryLayout,
                                    error: errorQueryLayout,
                                    data: {
                                        jbgLayoutFamilies: jbgLayoutFamiliesBefore
                                    }
                                }) => {
                                    if (loadingQueryLayout)
                                        return <Loading loadingData />;
                                    if (errorQueryLayout)
                                        return (
                                            <React.Fragment>
                                                Error!{" "}
                                                {errorQueryLayout.message}
                                            </React.Fragment>
                                        );
                                    const jbgLayoutFamilies = jbgLayoutFamiliesBefore.map(
                                        ({ __typename, ...others }) => ({
                                            ...others
                                        })
                                    );
                                    return (
                                        <Query query={getJbgTemplateList}>
                                            {({
                                                loading: loadingQueryTemplate,
                                                error: errorQueryTemplate,
                                                data: {
                                                    jbgTemplates: jbgTemplatesBefore
                                                }
                                            }) => {
                                                if (loadingQueryTemplate)
                                                    return (
                                                        <Loading loadingData />
                                                    );
                                                if (errorQueryTemplate)
                                                    return (
                                                        <React.Fragment>
                                                            Error!{" "}
                                                            {
                                                                errorQueryTemplate.message
                                                            }
                                                        </React.Fragment>
                                                    );
                                                const jbgTemplates = jbgTemplatesBefore.map(
                                                    ({
                                                        __typename,
                                                        ...others
                                                    }) => ({
                                                        ...others
                                                    })
                                                );
                                                return (
                                                    <Query
                                                        query={getArticleDetail}
                                                        variables={{
                                                            id: article_id
                                                        }}
                                                        fetchPolicy="network-only"
                                                    >
                                                        {({
                                                            loading: loadingQuery,
                                                            error: errorQuery,
                                                            data: dataArticleBefore
                                                        }) => {
                                                            if (loadingQuery)
                                                                return (
                                                                    <Loading
                                                                        loadingData
                                                                    />
                                                                );
                                                            if (errorQuery)
                                                                return (
                                                                    <React.Fragment>
                                                                        Error!{" "}
                                                                        {
                                                                            errorQuery.message
                                                                        }
                                                                    </React.Fragment>
                                                                );
                                                            const {
                                                                article: dataArticle
                                                            } =
                                                                dataArticleBefore ||
                                                                {};
                                                            const {
                                                                __typename,
                                                                ...data
                                                            } =
                                                                dataArticle ||
                                                                {};

                                                            const onSubmit = (
                                                                values,
                                                                formikBag
                                                            ) => {
                                                                console.log(
                                                                    values
                                                                );
                                                                console.log(
                                                                    formikBag
                                                                );
                                                                //TODO: Do action here
                                                            };

                                                            const initialValues = {
                                                                id: article_id,
                                                                justBrilliantGuideId: pub_id,
                                                                jbgLayoutId:
                                                                    data
                                                                        .jbg_layout
                                                                        .id,
                                                                jbgFamilyLayoutId:
                                                                    data
                                                                        .jbg_layout
                                                                        .jbg_layout_family
                                                                        .id,
                                                                jbgTemplateId:
                                                                    data
                                                                        .jbg_template
                                                                        .id,
                                                                headerMediumId:
                                                                    data
                                                                        .header_image
                                                                        .id,
                                                                header_preview:
                                                                    data
                                                                        .header_image
                                                                        .path,
                                                                featureMediumId:
                                                                    data
                                                                        .feature_image
                                                                        .id,
                                                                feature_preview:
                                                                    data
                                                                        .feature_image
                                                                        .path,
                                                                name: data.name,
                                                                introductionText:
                                                                    data.introductionText,
                                                                description:
                                                                    data.description
                                                            };

                                                            return (
                                                                <Query
                                                                    query={
                                                                        getJustBrilliantGuideLayoutFamilyDefaults
                                                                    }
                                                                    variables={{
                                                                        id: pub_id
                                                                    }}
                                                                >
                                                                    {({
                                                                        loading: loadingDefaultQuery,
                                                                        error: errorDefaultQuery,
                                                                        data: {
                                                                            justBrilliantGuide
                                                                        }
                                                                    }) => {
                                                                        if (
                                                                            loadingDefaultQuery
                                                                        )
                                                                            return (
                                                                                <Loading
                                                                                    loadingData
                                                                                />
                                                                            );
                                                                        if (
                                                                            errorDefaultQuery
                                                                        )
                                                                            return (
                                                                                <React.Fragment>
                                                                                    Error!{" "}
                                                                                    {
                                                                                        errorDefaultQuery.message
                                                                                    }
                                                                                </React.Fragment>
                                                                            );

                                                                        const {
                                                                            __typename,
                                                                            ...otherDefaults
                                                                        } = justBrilliantGuide;

                                                                        //https://stackoverflow.com/a/38829074 -- Mapping keys inside an array to create a new array
                                                                        const defaultFamilyLayouts = Object.assign(
                                                                            {},
                                                                            ...Object.keys(
                                                                                otherDefaults
                                                                            ).map(
                                                                                k =>
                                                                                    k ===
                                                                                    "id"
                                                                                        ? {}
                                                                                        : {
                                                                                              [k]: otherDefaults[
                                                                                                  k
                                                                                              ].toString()
                                                                                          }
                                                                            )
                                                                        );

                                                                        return (
                                                                            <TabbedPageSingleForm
                                                                                title="Editorial Article"
                                                                                data={
                                                                                    initialValues
                                                                                }
                                                                                exitUrl={GUIDE_MAIN_URL.replace(
                                                                                    ":pub_id",
                                                                                    pub_id
                                                                                )}
                                                                                cancelUrl={GUIDE_MAIN_URL.replace(
                                                                                    ":pub_id",
                                                                                    pub_id
                                                                                )}
                                                                                tabs={
                                                                                    tabs
                                                                                }
                                                                                tooltipText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                                                                onSubmit={
                                                                                    onSubmit
                                                                                }
                                                                                otherProps={{
                                                                                    has_data: true,
                                                                                    layoutFamilies: jbgLayoutFamilies,
                                                                                    templates: jbgTemplates,
                                                                                    defaultFamilyLayouts
                                                                                }}
                                                                            />
                                                                        );
                                                                    }}
                                                                </Query>
                                                            );
                                                        }}
                                                    </Query>
                                                );
                                            }}
                                        </Query>
                                    );
                                }}
                            </Query>
                        );
                    }}
                </Mutation>
            ) : (
                <React.Fragment>
                    {Boolean(pub_id) ? (
                        <Redirect
                            to={GUIDE_MAIN_URL.replace(":pub_id", pub_id)}
                        />
                    ) : (
                        <Redirect to={WELCOME_URL + "/guide"} />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};
export default EditExistingArticle;
