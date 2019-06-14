import React, { useState } from "react";
import { sanitize } from "dompurify";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import PropTypes from "prop-types";
import { isString } from "lodash";

const TextEditorField = ({
    name,
    initialValue,
    setFieldValue,
    withPlaintext,
    error
}) => {
    let initialEditorState = null;
    if (isString(initialValue) && initialValue.length > 0) {
        const initialHtmlSanitized = sanitize(initialValue);
        const { contentBlocks, entityMap } = htmlToDraft(initialHtmlSanitized);
        const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
        );
        initialEditorState = EditorState.createWithContent(contentState);
    } else {
        initialEditorState = EditorState.createEmpty();
    }

    const [editorState, setEditorState] = useState(initialEditorState);

    const handleEditorChange = editorState => {
        setEditorState(editorState);
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const value = draftToHtml(rawContentState);
        const plaintext = editorState.getCurrentContent().getPlainText();
        setFieldValue(name, value, true);
        if (withPlaintext) {
            setFieldValue(`${name}_plaintext`, plaintext, true);
        }
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                editorClassName="demo-editor"
                wrapperClassName="demo-wrapper"
                toolbar={{
                    options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "fontFamily",
                        "list",
                        "textAlign",
                        "history",
                        "colorPicker"
                    ],
                    inline: {
                        options: ["bold", "italic", "underline"]
                    }
                }}
            />
            {Boolean(error) && String.isString(error) && error.length > 0 && (
                <div style={{ color: "red" }}>{error}</div>
            )}
        </div>
    );
};

TextEditorField.propTypes = {
    name: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    setFieldValue: PropTypes.func.isRequired,
    withPlaintext: PropTypes.bool.isRequired
};

export default TextEditorField;
