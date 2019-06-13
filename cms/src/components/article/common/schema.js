import * as Yup from "yup";

const requiredErrorMessage = "Required";

export const createArticleSchema = Yup.object().shape({
    name: Yup.string().required(requiredErrorMessage),
    description: Yup.string(),
    introductionText: Yup.string(),
    justBrilliantGuideId: Yup.string().required(requiredErrorMessage),
    jbgTemplateId: Yup.string().required(requiredErrorMessage),
    jbgLayoutId: Yup.string().required(requiredErrorMessage)
});

export const editArticleSchema = Yup.object().shape({
    id: Yup.string().required(requiredErrorMessage),
    name: Yup.string().required(requiredErrorMessage),
    description: Yup.string(),
    introductionText: Yup.string(),
    justBrilliantGuideId: Yup.string().required(requiredErrorMessage),
    jbgTemplateId: Yup.string().required(requiredErrorMessage),
    jbgLayoutId: Yup.string().required(requiredErrorMessage)
});
