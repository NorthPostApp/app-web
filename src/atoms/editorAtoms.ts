import { atom } from "jotai";
import type { ElementFormatType, RangeSelection } from "lexical";
import type { ListType } from "@lexical/list";
import type { HeadingTagType } from "@lexical/rich-text";
import { DEFAULT_BLOCK_TYPE } from "@/components/editor/editor-config";

/**
 * Toolbar Status Atom
 */

type BlockType = ListType | HeadingTagType | "paragraph";
type EditHistoryMode = "undo" | "redo";

type ToolbarStatusType = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  elementFormat: ElementFormatType;
  blockType: BlockType;
  canRedo: boolean;
  canUndo: boolean;
};

const initialToolbarStatus: ToolbarStatusType = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  canRedo: false,
  canUndo: false,
  elementFormat: "",
  blockType: DEFAULT_BLOCK_TYPE,
};

const toolbarStatusAtom = atom<ToolbarStatusType>(initialToolbarStatus);
const derivedToolbarStatusAtom = atom(
  (get) => get(toolbarStatusAtom),
  (
    get,
    set,
    selection: RangeSelection,
    format: ElementFormatType,
    blockType: BlockType,
  ) => {
    const prevStatus = get(toolbarStatusAtom);
    const newStatus: Partial<ToolbarStatusType> = {
      bold: selection.hasFormat("bold"),
      italic: selection.hasFormat("italic"),
      underline: selection.hasFormat("underline"),
      strikethrough: selection.hasFormat("strikethrough"),
      elementFormat: format,
      blockType,
    };
    set(toolbarStatusAtom, { ...prevStatus, ...newStatus });
  },
);
// Undo and Redo availability are handled with separate logic in Lexical
// therefore we use an individual set atom to control canUndo and canRedo status
const derivedEditHistoryStatusAtom = atom(
  null,
  (get, set, editMode: EditHistoryMode, payload: boolean) => {
    const prevStatus = get(toolbarStatusAtom);
    if (editMode === "redo" && payload !== prevStatus.canRedo) {
      set(toolbarStatusAtom, { ...prevStatus, canRedo: payload });
    } else if (editMode === "undo" && payload !== prevStatus.canUndo) {
      set(toolbarStatusAtom, { ...prevStatus, canUndo: payload });
    }
  },
);

export { derivedToolbarStatusAtom, derivedEditHistoryStatusAtom };
export type { ToolbarStatusType, BlockType, EditHistoryMode };
