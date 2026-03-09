import { type ElementFormatType, type TextFormatType } from "lexical";

const TOOLBAR_BUTTON_SIZE = 20;

const SUPPORTED_TEXT_FORMATS: TextFormatType[] = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
];

const SUPPORTED_ELEMENT_FORMATS: ElementFormatType[] = ["left", "center", "right"];
const SUPPORTED_BLOCK_TYPES = [
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
  { label: "Paragraph", value: "paragraph" },
  { label: "Bulleted List", value: "bullet" },
  { label: "Numbered List", value: "number" },
];
const DEFAULT_BLOCK_TYPE = "paragraph";

export {
  SUPPORTED_TEXT_FORMATS,
  SUPPORTED_ELEMENT_FORMATS,
  TOOLBAR_BUTTON_SIZE,
  DEFAULT_BLOCK_TYPE,
  SUPPORTED_BLOCK_TYPES,
};
