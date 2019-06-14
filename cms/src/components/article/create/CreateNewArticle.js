import React from "react";
import TabbedPageSingleForm from "../../../utils/TabbedPageSingleForm";
import {
    WELCOME_URL,
    renderTabletMockUp,
    GUIDE_MAIN_URL,
    ARTICLE_MAIN_URL
} from "../../../utils/Constants";
import { Redirect } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { CREATE_ARTICLE } from "../../../data/mutation";
import {
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
import { createArticleSchema } from "../common/schema";

const CreateNewArticle = ({ match }) => {
    const { params } = match || {};
    const { pub_id = null } = params || {};
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
    let formRef = null;

    return (
        <div style={{ flex: 1, height: "100%" }}>
            {Boolean(pub_id) ? (
                <Mutation
                    mutation={CREATE_ARTICLE}
                    refetchQueries={[
                        {
                            query: getArticleListFromPublication,
                            variables: { id: pub_id }
                        }
                    ]}
                >
                    {(
                        createArticle,
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

                                                const onSubmit = (
                                                    values,
                                                    formikBag
                                                ) => {
                                                    console.log(values);
                                                    console.log(formikBag);
                                                    console.log(formRef);

                                                    const {
                                                        setSubmitting
                                                    } = formikBag;

                                                    setSubmitting(true);

                                                    const {
                                                        name,
                                                        description,
                                                        introductionText,
                                                        justBrilliantGuideId,
                                                        headerImage,
                                                        featureImage,
                                                        jbgTemplateId,
                                                        jbgLayoutId,
                                                        clientId
                                                    } = values;
                                                    const header_image_upload =
                                                        !isEmpty(headerImage) &&
                                                        !headerImage.uploaded
                                                            ? headerImage
                                                            : null;
                                                    const headerMediumId =
                                                        !isEmpty(headerImage) &&
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
                                                        name,
                                                        description: sanitize(
                                                            description
                                                        ),
                                                        introductionText: sanitize(
                                                            introductionText
                                                        ),
                                                        justBrilliantGuideId,
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

                                                    createArticle({
                                                        variables: {
                                                            input: {
                                                                ...toSubmit
                                                            }
                                                        }
                                                    }).then(result => {
                                                        const { data } =
                                                            result || {};
                                                        const {
                                                            createArticle
                                                        } = data || {};
                                                        const {
                                                            id: article_id
                                                        } = createArticle || {};
                                                        setSubmitting(false);
                                                        if (
                                                            formRef.state.exit
                                                        ) {
                                                            formRef.exitAction();
                                                        } else {
                                                            formRef.props.history.push(
                                                                ARTICLE_MAIN_URL.replace(
                                                                    ":article_id",
                                                                    article_id
                                                                ).replace(
                                                                    ":pub_id",
                                                                    pub_id
                                                                )
                                                            );
                                                        }
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
                                                            loading: loadingQueryDefault,
                                                            error: errorQueryDefault,
                                                            data: {
                                                                justBrilliantGuide
                                                            }
                                                        }) => {
                                                            if (
                                                                loadingQueryDefault
                                                            )
                                                                return (
                                                                    <Loading
                                                                        loadingData
                                                                    />
                                                                );
                                                            if (
                                                                errorQueryDefault
                                                            )
                                                                return (
                                                                    <React.Fragment>
                                                                        Error!{" "}
                                                                        {
                                                                            errorQueryDefault.message
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
                                                                ).map(k =>
                                                                    k === "id"
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
                                                                        return (
                                                                            <TabbedPageSingleForm
                                                                                title="Editorial Article"
                                                                                data={{
                                                                                    justBrilliantGuideId: pub_id,
                                                                                    jbgLayoutId: null,
                                                                                    jbgFamilyLayoutId: null,
                                                                                    jbgTemplateId: null,
                                                                                    headerImage: null,
                                                                                    featureImage: null,
                                                                                    name:
                                                                                        "",
                                                                                    introductionText:
                                                                                        "",
                                                                                    description:
                                                                                        "",
                                                                                    clientId:
                                                                                        clientJBG.id
                                                                                }}
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
                                                                                    has_data: false,
                                                                                    layoutFamilies: jbgLayoutFamilies,
                                                                                    templates: jbgTemplates,
                                                                                    defaultFamilyLayouts,
                                                                                    clientId:
                                                                                        clientJBG.id
                                                                                }}
                                                                                validationSchema={
                                                                                    createArticleSchema
                                                                                }
                                                                                onRef={ref =>
                                                                                    (formRef = ref)
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
                </Mutation>
            ) : (
                <Redirect to={WELCOME_URL + "/guide"} />
            )}
        </div>
    );
};
export default CreateNewArticle;
