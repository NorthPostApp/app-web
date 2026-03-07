import { type ElementFormatType, type TextFormatType } from "lexical";

const TOOLBAR_BUTTON_SIZE = 20;

const SUPPORTED_TEXT_FORMATS: TextFormatType[] = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
];

const SUPPORTED_ELEMENT_FORMATS: ElementFormatType[] = ["left", "center", "right"];

export { SUPPORTED_TEXT_FORMATS, SUPPORTED_ELEMENT_FORMATS, TOOLBAR_BUTTON_SIZE };
