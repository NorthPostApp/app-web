import { atom } from "jotai";

import type { ElementFormatType, RangeSelection } from "lexical";
import type { ListType } from "@lexical/list";
import type { HeadingTagType } from "@lexical/rich-text";

/**
 * Toolbar Status Atom
 */

type BlockType = ListType | HeadingTagType | "paragraph";

type ToolbarStatusType = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  elementFormat: ElementFormatType;
  blockType: BlockType;
};

const initialToolbarStatus: ToolbarStatusType = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  elementFormat: "",
  blockType: "paragraph",
};

const toolbarStatusAtom = atom<ToolbarStatusType>(initialToolbarStatus);
const derivedToolbarStatusAtom = atom(
  (get) => get(toolbarStatusAtom),
  (
    _,
    set,
    selection: RangeSelection,
    format: ElementFormatType,
    blockType: BlockType,
  ) => {
    const newStatus: ToolbarStatusType = {
      bold: selection.hasFormat("bold"),
      italic: selection.hasFormat("italic"),
      underline: selection.hasFormat("underline"),
      strikethrough: selection.hasFormat("strikethrough"),
      elementFormat: format,
      blockType,
    };
    set(toolbarStatusAtom, newStatus);
  },
);

export { derivedToolbarStatusAtom };
export type { ToolbarStatusType, BlockType };
