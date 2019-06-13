import React from "react";
import TabbedPageSingleForm from "../../../utils/TabbedPageSingleForm";
import {
    GUIDE_MAIN_URL,
    WELCOME_URL,
    renderTabletMockUp
} from "../../../utils/Constants";
import { Redirect } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { EDIT_ARTICLE } from "../../../data/mutation";
import {
    getArticleDetail,
    getJbgLayoutFamilyDetailedList,
    getJbgTemplateList,
    getArticleListFromPublication,
    getJustBrilliantGuideLayoutFamilyDefaults,
    CLIENT_JBG
} from "../../../data/query";
import Loading from "../../loading/Loading";
import TabLayout from "../common/TabLayout";
import TabContent from "../common/TabContent";
import { sanitize } from "dompurify";
import { isEmpty } from "lodash";
import { editArticleSchema } from "../common/schema";

const EditExistingArticle = ({ match }) => {
    const { params } = match || {};
    const { pub_id = null, article_id = null } = params || {};
    const tabs = [
        {
            name: "Preview",
            withButtons: true,
            withCancel: true,
            component: () => (
                <div style={{ width: "70%", height: "100%" }}>
                    {renderTabletMockUp()}
                </div>
            )
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
                        editArticle,
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

                                                                const {
                                                                    setSubmitting
                                                                } = formikBag;

                                                                setSubmitting(
                                                                    true
                                                                );

                                                                const {
                                                                    id,
                                                                    name,
                                                                    description,
                                                                    introductionText,
                                                                    headerImage,
                                                                    featureImage,
                                                                    jbgTemplateId,
                                                                    jbgLayoutId,
                                                                    clientId
                                                                } = values;
                                                                const header_image_upload =
                                                                    !isEmpty(
                                                                        headerImage
                                                                    ) &&
                                                                    !headerImage.uploaded
                                                                        ? headerImage
                                                                        : null;
                                                                const headerMediumId =
                                                                    !isEmpty(
                                                                        headerImage
                                                                    ) &&
                                                                    headerImage.uploaded &&
                                                                    headerImage.changed &&
                                                                    headerImage.id
                                                                        ? headerImage.id
                                                                        : null;

                                                                const feature_image_upload =
                                                                    !isEmpty(
                                                                        featureImage
                                                                    ) &&
                                                                    !featureImage.uploaded
                                                                        ? featureImage
                                                                        : null;
                                                                const featureMediumId =
                                                                    !isEmpty(
                                                                        featureImage
                                                                    ) &&
                                                                    featureImage.uploaded &&
                                                                    featureImage.changed &&
                                                                    featureImage.id
                                                                        ? featureImage.id
                                                                        : null;

                                                                const toSubmit = {
                                                                    id,
                                                                    name,
                                                                    description: sanitize(
                                                                        description
                                                                    ),
                                                                    introductionText: sanitize(
                                                                        introductionText
                                                                    ),
                                                                    jbgTemplateId,
                                                                    jbgLayoutId,
                                                                    ...(Boolean(
                                                                        header_image_upload
                                                                    ) && {
                                                                        header_image_upload
                                                                    }),
                                                                    ...(Boolean(
                                                                        headerMediumId
                                                                    ) && {
                                                                        headerMediumId
                                                                    }),
                                                                    ...(Boolean(
                                                                        feature_image_upload
                                                                    ) && {
                                                                        feature_image_upload
                                                                    }),
                                                                    ...(Boolean(
                                                                        featureMediumId
                                                                    ) && {
                                                                        featureMediumId
                                                                    }),
                                                                    clientId
                                                                };

                                                                console.log(
                                                                    "To submit ",
                                                                    toSubmit
                                                                );

                                                                editArticle({
                                                                    variables: {
                                                                        input: {
                                                                            ...toSubmit
                                                                        }
                                                                    }
                                                                }).then(() => {
                                                                    setSubmitting(
                                                                        false
                                                                    );
                                                                });
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
                                                                            <Query
                                                                                query={
                                                                                    CLIENT_JBG
                                                                                }
                                                                            >
                                                                                {({
                                                                                    loading: loadingJBG,
                                                                                    error: errorJBG,
                                                                                    data: {
                                                                                        clientJBG
                                                                                    }
                                                                                }) => {
                                                                                    if (
                                                                                        loadingJBG
                                                                                    )
                                                                                        return (
                                                                                            <Loading
                                                                                                loadingData
                                                                                            />
                                                                                        );
                                                                                    if (
                                                                                        errorJBG
                                                                                    )
                                                                                        return (
                                                                                            <React.Fragment>
                                                                                                Error!{" "}
                                                                                                {
                                                                                                    errorJBG.message
                                                                                                }
                                                                                            </React.Fragment>
                                                                                        );

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
                                                                                        headerImage: Boolean(
                                                                                            data.header_image
                                                                                        )
                                                                                            ? {
                                                                                                  ...data.header_image,
                                                                                                  uploaded: true,
                                                                                                  changed: false
                                                                                              }
                                                                                            : null,
                                                                                        featureImage: Boolean(
                                                                                            data.featureImage
                                                                                        )
                                                                                            ? {
                                                                                                  ...data.feature_image,
                                                                                                  uploaded: true,
                                                                                                  changed: false
                                                                                              }
                                                                                            : null,
                                                                                        name:
                                                                                            data.name,
                                                                                        introductionText:
                                                                                            data.introductionText,
                                                                                        description:
                                                                                            data.description,
                                                                                        clientId:
                                                                                            clientJBG.id
                                                                                    };
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
                                                                                                defaultFamilyLayouts,
                                                                                                clientId:
                                                                                                    clientJBG.id
                                                                                            }}
                                                                                            validationSchema={
                                                                                                editArticleSchema
                                                                                            }
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
