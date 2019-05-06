import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SimpleImageUploader from "../../../utils/SimpleImageUploader";
import { MenuItem, OutlinedInput } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import { Query, Mutation } from "react-apollo";
import {
    getJustBrilliantGuideDetail,
    getJustBrilliantGuideList,
    getJbgLayoutFamilyList
} from "../../../data/query";
import { CREATE_GUIDE, EDIT_GUIDE } from "../../../data/mutation";
import Loading from "../../loading/Loading";
import * as Yup from "yup";
import { mapValues, isEmpty } from "lodash";
import { DECIMAL_RADIX } from "../../../utils/Constants";

class ModifyPublicationHOC extends React.Component {
    render() {
        const { onRef } = this.props;
        const { pub_id } = this.props.data;
        return (
            <Query query={getJbgLayoutFamilyList}>
                {({
                    loading: loadingInitialQuery,
                    error: errorInitialQuery,
                    data: { jbgLayoutFamilies: jbgLayoutFamiliesBefore }
                }) => {
                    if (loadingInitialQuery) return <Loading loadingData />;
                    if (errorInitialQuery)
                        return (
                            <React.Fragment>
                                Error: {errorInitialQuery.message}
                            </React.Fragment>
                        );
                    const jbgLayoutFamilies = jbgLayoutFamiliesBefore.map(
                        ({ __typename, ...others }) => ({ ...others })
                    );
                    return (
                        <React.Fragment>
                            {Boolean(pub_id) ? (
                                <Query
                                    query={getJustBrilliantGuideDetail}
                                    variables={{ id: pub_id }}
                                >
                                    {({
                                        loading: loadingQuery,
                                        error: errorQuery,
                                        data: { justBrilliantGuide: dataBefore }
                                    }) => {
                                        if (loadingQuery)
                                            return <Loading loadingData />;
                                        if (errorQuery)
                                            return (
                                                <React.Fragment>
                                                    Error!: {errorQuery.message}
                                                </React.Fragment>
                                            );
                                        const {
                                            __typename,
                                            ...data
                                        } = dataBefore;
                                        return (
                                            <Mutation
                                                mutation={EDIT_GUIDE}
                                                refetchQueries={[
                                                    {
                                                        query: getJustBrilliantGuideList
                                                    }
                                                ]}
                                            >
                                                {(
                                                    action,
                                                    {
                                                        loading: loadingMutation,
                                                        error: errorMutation
                                                    }
                                                ) => {
                                                    if (loadingMutation)
                                                        return (
                                                            <Loading
                                                                loadingData
                                                            />
                                                        );
                                                    if (errorMutation)
                                                        return (
                                                            <React.Fragment>
                                                                Error!{" "}
                                                                {
                                                                    errorMutation.message
                                                                }
                                                            </React.Fragment>
                                                        );
                                                    return (
                                                        <ModifyPublication
                                                            has_data={true}
                                                            data={data}
                                                            layoutFamilies={
                                                                jbgLayoutFamilies
                                                            }
                                                            action={action}
                                                            onRef={onRef}
                                                        />
                                                    );
                                                }}
                                            </Mutation>
                                        );
                                    }}
                                </Query>
                            ) : (
                                <Mutation
                                    mutation={CREATE_GUIDE}
                                    refetchQueries={[
                                        {
                                            query: getJustBrilliantGuideList
                                        }
                                    ]}
                                >
                                    {(action, { loading, error }) => {
                                        if (loading)
                                            return <Loading loadingData />;
                                        if (error)
                                            return (
                                                <React.Fragment>
                                                    Error! {error.message}
                                                </React.Fragment>
                                            );
                                        return (
                                            <ModifyPublication
                                                has_data={false}
                                                layoutFamilies={
                                                    jbgLayoutFamilies
                                                }
                                                action={action}
                                                onRef={onRef}
                                            />
                                        );
                                    }}
                                </Mutation>
                            )}
                        </React.Fragment>
                    );
                }}
            </Query>
        );
    }
}

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const FirstSectionContainerDiv = styled.div`
    flex: 1;
    width: 70%;
    padding-right: 20px;
`;

const SecondSectionContainerDiv = styled.div`
    flex: 2;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const SecondSectionInnerContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
`;

const SecondSectionInnerInnerContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
`;

const SectionTitleDiv = styled.div`
    color: rgb(38, 153, 251);
    font-size: 1.4em;
    font-weight: 600;
    padding-bottom: 20px;
`;

const FormLabelDiv = styled.div`
    color: rgb(92, 92, 92);
    font-size: 0.8em;
`;

//Yup validation schema
const requiredErrorMessage = "Required";
const validationSchema = (isCreate, layoutFamiliesIds) =>
    Yup.object().shape({
        name: Yup.string().required(requiredErrorMessage),
        welcomeFamilyId: isCreate
            ? Yup.string()
                  .oneOf(layoutFamiliesIds)
                  .required(requiredErrorMessage)
            : Yup.string().oneOf(layoutFamiliesIds),
        featureFamilyId: isCreate
            ? Yup.string()
                  .oneOf(layoutFamiliesIds)
                  .required(requiredErrorMessage)
            : Yup.string().oneOf(layoutFamiliesIds),
        informationFamilyId: isCreate
            ? Yup.string()
                  .oneOf(layoutFamiliesIds)
                  .required(requiredErrorMessage)
            : Yup.string().oneOf(layoutFamiliesIds),
        mapFamilyId: isCreate
            ? Yup.string()
                  .oneOf(layoutFamiliesIds)
                  .required(requiredErrorMessage)
            : Yup.string().oneOf(layoutFamiliesIds),
        galleryFamilyId: isCreate
            ? Yup.string()
                  .oneOf(layoutFamiliesIds)
                  .required(requiredErrorMessage)
            : Yup.string().oneOf(layoutFamiliesIds),
        marketFamilyId: isCreate
            ? Yup.string()
                  .oneOf(layoutFamiliesIds)
                  .required(requiredErrorMessage)
            : Yup.string().oneOf(layoutFamiliesIds),
        foodFamilyId: isCreate
            ? Yup.string()
                  .oneOf(layoutFamiliesIds)
                  .required(requiredErrorMessage)
            : Yup.string().oneOf(layoutFamiliesIds),
        attractionFamilyId: isCreate
            ? Yup.string()
                  .oneOf(layoutFamiliesIds)
                  .required(requiredErrorMessage)
            : Yup.string().oneOf(layoutFamiliesIds),
        eventFamilyId: isCreate
            ? Yup.string()
                  .oneOf(layoutFamiliesIds)
                  .required(requiredErrorMessage)
            : Yup.string().oneOf(layoutFamiliesIds),
        essentialFamilyId: isCreate
            ? Yup.string()
                  .oneOf(layoutFamiliesIds)
                  .required(requiredErrorMessage)
            : Yup.string().oneOf(layoutFamiliesIds)
    });

class ModifyPublication extends React.Component {
    state = {
        imageError: false
    };
    imageUploaderRef = React.createRef();
    // logImageFilename = () => {
    //     if (this.imageUploaderRef.state.file) {
    //         console.log("filename: ", this.imageUploaderRef.state.file.name);
    //     } else {
    //         console.log("No File");
    //     }
    // };
    // logRef = () => console.log("Ref ", this.imageUploaderRef);

    prepareInitialValues = () => {
        const { has_data, data } = this.props;
        if (has_data && data) {
            const {
                id,
                name,
                welcomeFamily: { id: welcomeFamilyId },
                featureFamily: { id: featureFamilyId },
                informationFamily: { id: informationFamilyId },
                mapFamily: { id: mapFamilyId },
                galleryFamily: { id: galleryFamilyId },
                marketFamily: { id: marketFamilyId },
                foodFamily: { id: foodFamilyId },
                attractionFamily: { id: attractionFamilyId },
                eventFamily: { id: eventFamilyId },
                essentialFamily: { id: essentialFamilyId },
                media: [{ name: image_name, path: image_preview }]
            } = data;
            return {
                id,
                name,
                welcomeFamilyId,
                featureFamilyId,
                informationFamilyId,
                mapFamilyId,
                galleryFamilyId,
                marketFamilyId,
                foodFamilyId,
                attractionFamilyId,
                eventFamilyId,
                essentialFamilyId,
                image_preview,
                image_name
            };
        } else {
            return {
                id: null,
                name: "",
                welcomeFamilyId: "",
                featureFamilyId: "",
                informationFamilyId: "",
                mapFamilyId: "",
                galleryFamilyId: "",
                marketFamilyId: "",
                foodFamilyId: "",
                attractionFamilyId: "",
                eventFamilyId: "",
                essentialFamilyId: "",
                image_preview: null,
                image_name: null
            };
        }
    };

    componentWillUnmount() {
        //Prevent memory leak
        this.props.onRef && this.props.onRef(undefined);
    }

    firstColumnDropdownList = [
        { name: "welcomeFamilyId", label: "DEFAULT WELCOME FAMILY" },
        { name: "featureFamilyId", label: "DEFAULT FEATURE FAMILY" },
        { name: "informationFamilyId", label: "DEFAULT INFORMATION FAMILY" },
        { name: "mapFamilyId", label: "DEFAULT MAP FAMILY" },
        { name: "galleryFamilyId", label: "DEFAULT GALLERY FAMILY" }
    ];
    secondColumnDropdownList = [
        { name: "marketFamilyId", label: "DEFAULT MARKETS FAMILY" },
        { name: "foodFamilyId", label: "DEFAULT FOOD & DINING OUT FAMILY" },
        {
            name: "attractionFamilyId",
            label: "DEFAULT THINGS TO SEE & DO FAMILY"
        },
        { name: "eventFamilyId", label: "DEFAULT CALENDAR OF EVENTS FAMILY" },
        {
            name: "essentialFamilyId",
            label: "DEFAULT ESSENTIAL SERVICES FAMILY"
        }
    ];

    renderLayoutFamilyDropdown = (item, values) => {
        const { layoutFamilies } = this.props;
        const { name, label } = item;
        const foundItem = Boolean(values[name])
            ? layoutFamilies.find(({ id }) => id === values[name])
            : null;
        const imageUrl = Boolean(foundItem) ? foundItem.media.path : null;

        return (
            <React.Fragment>
                <FormLabelDiv>{label}</FormLabelDiv>
                <div
                    style={{
                        width: "100%",
                        paddingBottom: 10,
                        display: "flex"
                    }}
                >
                    <div
                        style={{
                            width: Boolean(imageUrl) ? "60%" : "100%",
                            marginRight: 20
                        }}
                    >
                        <Field
                            name={name}
                            component={Select}
                            disabled={layoutFamilies.length < 1}
                            fullWidth={true}
                            input={<OutlinedInput labelWidth={0} />}
                        >
                            {layoutFamilies.map(({ id, name }, index) => (
                                <MenuItem
                                    key={`ITEM-${name}-${id}-${index}`}
                                    value={id}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Field>
                    </div>
                    {Boolean(imageUrl) && (
                        <div
                            style={{
                                width: "30%",
                                border: "1px solid rgba(112, 112, 112, 1)"
                            }}
                        >
                            <img
                                style={{ width: "100%" }}
                                src={imageUrl}
                                alt={label}
                            />
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    };

    actionAfterSubmission = (data, setFieldValue) => {
        const { has_data } = this.props;
        console.log("Received data: ", data);
        if (!has_data && Boolean(data)) {
            //Need to set media and id values in formik if creating publication
            const {
                id,
                media: { name, path }
            } = data;
            setFieldValue("id", id);
            setFieldValue("image_name", name);
            setFieldValue("image_preview", path);
        }
    };

    render() {
        const { onRef, has_data, layoutFamilies, action } = this.props;
        const { imageError } = this.state;
        return (
            <Formik
                onSubmit={(values, { setFieldValue }) => {
                    if (
                        !has_data &&
                        !Boolean(this.imageUploaderRef.state.file)
                    ) {
                        this.setState({ imageError: true });
                        return undefined;
                    }
                    const {
                        id,
                        name,
                        image_name,
                        image_preview,
                        ...others
                    } = values;
                    let toSubmit = {
                        ...(Boolean(id) && { id }),
                        name,
                        ...mapValues(others, familyId =>
                            parseInt(familyId, DECIMAL_RADIX)
                        )
                    };

                    console.log("To Submit ", toSubmit);

                    action({ variables: { input: { ...toSubmit } } }).then(
                        ({ data }) => {
                            const returnedData =
                                !isEmpty(data) &&
                                !isEmpty(data.createJustBrilliantGuide)
                                    ? data.createJustBrilliantGuide
                                    : !isEmpty(data) &&
                                      !isEmpty(data.editJustBrilliantGuide)
                                    ? data.editJustBrilliantGuide
                                    : null;
                            this.actionAfterSubmission(
                                returnedData,
                                setFieldValue
                            );
                        }
                    );
                }}
                ref={onRef}
                initialValues={this.prepareInitialValues()}
                validationSchema={validationSchema(
                    !has_data,
                    layoutFamilies.map(({ id }) => id)
                )}
            >
                {({ values }) => (
                    <Form>
                        <ContainerDiv>
                            <FirstSectionContainerDiv>
                                <SectionTitleDiv>
                                    Publication Details
                                </SectionTitleDiv>
                                <FormLabelDiv>PUBLICATION NAME</FormLabelDiv>
                                <Field
                                    name="name"
                                    required={true}
                                    type="text"
                                    component={TextField}
                                    variant="outlined"
                                    fullWidth={true}
                                />
                                <div
                                    style={{
                                        marginTop: 20,
                                        border: imageError
                                            ? "1px solid red"
                                            : "none"
                                    }}
                                >
                                    <SimpleImageUploader
                                        onRef={ref =>
                                            (this.imageUploaderRef = ref)
                                        }
                                        previewUrl={values.image_preview}
                                        previewName={values.image_name}
                                    />
                                    {imageError && (
                                        <p
                                            style={{
                                                color: "red"
                                            }}
                                        >
                                            Required.
                                        </p>
                                    )}
                                </div>
                            </FirstSectionContainerDiv>
                            <SecondSectionContainerDiv>
                                <SectionTitleDiv>
                                    Default Layout Family
                                </SectionTitleDiv>
                                <SecondSectionInnerContainer>
                                    <SecondSectionInnerInnerContainer>
                                        {this.firstColumnDropdownList.map(
                                            (item, index) => (
                                                <React.Fragment
                                                    key={`1st-${
                                                        item.name
                                                    }-${index}`}
                                                >
                                                    {this.renderLayoutFamilyDropdown(
                                                        item,
                                                        values
                                                    )}
                                                </React.Fragment>
                                            )
                                        )}
                                    </SecondSectionInnerInnerContainer>
                                    <SecondSectionInnerInnerContainer>
                                        {this.secondColumnDropdownList.map(
                                            (item, index) => (
                                                <React.Fragment
                                                    key={`2nd-${
                                                        item.name
                                                    }-${index}`}
                                                >
                                                    {this.renderLayoutFamilyDropdown(
                                                        item,
                                                        values
                                                    )}
                                                </React.Fragment>
                                            )
                                        )}
                                    </SecondSectionInnerInnerContainer>
                                </SecondSectionInnerContainer>
                            </SecondSectionContainerDiv>
                        </ContainerDiv>
                    </Form>
                )}
            </Formik>
        );
    }
}

ModifyPublication.propTypes = {
    has_data: PropTypes.bool.isRequired,
    data: PropTypes.object,
    layoutFamilies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    action: PropTypes.func.isRequired,
    onRef: PropTypes.func.isRequired
};

export default ModifyPublicationHOC;
