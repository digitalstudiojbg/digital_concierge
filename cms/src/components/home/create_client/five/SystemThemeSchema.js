import * as Yup from "yup";
import FONT_OPTIONS from "./FontOptions";
import {
    HEX_COLOUR_REGEX
    // bytesToKb,
    // MAX_FILE_SIZE
} from "../../../../utils/Constants";

const font_values = FONT_OPTIONS.map(({ value }) => value);

export default layout_ids =>
    Yup.array().of(
        Yup.object().shape({
            companyLogo: Yup.mixed()
                // .test({
                //     name: "checkFileSize",
                //     message: "Company logo file size is too large",
                //     test: value => {
                //         console.log(value);
                //         return bytesToKb(value.size) <= MAX_FILE_SIZE;
                //     }
                // })
                .required("Company Logo Required"),
            headerFont: Yup.string()
                .oneOf(font_values)
                .required("Please select a Header Font"),
            subHeaderFont: Yup.string()
                .oneOf(font_values)
                .required("Please select a Sub Header Font"),
            bodyFont: Yup.string()
                .oneOf(font_values)
                .required("Please select a Body Copy Font"),
            captionFont: Yup.string()
                .oneOf(font_values)
                .required("Please select a Caption Copy Font"),
            defaultStartLayout: Yup.string()
                .oneOf(layout_ids)
                .required("Please select a Default Start Layout"),
            defaultHomeLayout: Yup.string()
                .oneOf(layout_ids)
                .required("Please select a Default Home Layout"),
            defaultDirListLayout: Yup.string()
                .oneOf(layout_ids)
                .required("Please select a Default Directory List Layout"),
            defaultDirEntryLayout: Yup.string()
                .oneOf(layout_ids)
                .required("Please select a Default Directory Entry Layout"),
            colours: Yup.array().of(
                Yup.object().shape({
                    hex: Yup.string()
                        .matches(HEX_COLOUR_REGEX)
                        .required("Please select the correct colour format"),
                    alpha: Yup.number()
                        .min(0)
                        .max(100)
                        .required("Please select the correct alpha format")
                })
            )
        })
    );
