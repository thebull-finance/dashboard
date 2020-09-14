// @ts-nocheck
import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import GFMDataProcessor from "@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Mention from "@ckeditor/ckeditor5-mention/src/mention";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import "./Editor.scss";

const Markdown = (editor) => {
  editor.data.processor = new GFMDataProcessor(editor.editing.view.document);
};

/**
 * @typedef {import('react').MouseEventHandler} MouseEventHandler
 * @typedef {import('react').ButtonHTMLAttributes<HTMLButtonElement>} ButtonHTMLAttributes
 * @typedef {import('@material-ui/core').ButtonProps} ButtonProps
 */

/**
 * Default properties.
 *
 * @typedef {Object} DefaultProps
 * @property {string} content Editor content
 * @property {function} onChange
 */

/**
 * Render Editor.
 *
 * @param {DefaultProps} props Props
 * @returns {JSX.Element} JSX
 */
const Editor = ({ content, onChange }) => {
  const editorConfiguration = {
    plugins: [
      Essentials,
      Autoformat,
      Bold,
      Italic,
      Underline,
      BlockQuote,
      EasyImage,
      Heading,
      Image,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Link,
      List,
      MediaEmbed,
      Markdown,
      Mention,
      Paragraph,
      SimpleUploadAdapter,
      Table,
      TableToolbar,
      TextTransformation,
    ],
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "imageUpload",
        "blockQuote",
        "insertTable",
        "mediaEmbed",
        "undo",
        "redo",
      ],
    },
    image: {
      toolbar: ["imageStyle:full", "imageStyle:side", "|", "imageTextAlternative"],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: "en",
  };

  return (
    <div className="ckEditor">
      <CKEditor
        config={editorConfiguration}
        data={content}
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default Editor;
