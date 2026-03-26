import { useCallback, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  mergeRegister,
} from "lexical";
import { Tooltip } from "@base-ui/react";
import {
  derivedEditHistoryStatusAtom,
  derivedToolbarStatusAtom,
  type ToolbarStatusType,
} from "@/atoms/editorAtoms";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { getBlockType, getElementFormat } from "@/components/editor/plugins/utils";
import TextFormatControls from "@/components/editor/plugins/TextFormatControls";
import ElementFormatControls from "@/components/editor/plugins/ElementFormatControls";
import BlockTypeControls from "@/components/editor/plugins/BlockTypeControls";
import EditHistoryControls from "@/components/editor/plugins/EditHistoryControls";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [toolbarStatus, writeToolbarStatus] = useAtom(derivedToolbarStatusAtom);
  const setEditHistory = useSetAtom(derivedEditHistoryStatusAtom);

  const getStatus = (option: string, target?: string): boolean => {
    if (option in toolbarStatus) {
      const value = toolbarStatus[option as keyof ToolbarStatusType];
      return typeof value === "boolean" ? value : value === target;
    }
    return false;
  };

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const format = getElementFormat(selection);
      const blockType = getBlockType(selection);
      writeToolbarStatus(selection, format, blockType);
    }
  }, [writeToolbarStatus]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read($updateToolbar, { editor });
      }),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setEditHistory("redo", payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setEditHistory("undo", payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [$updateToolbar, editor, setEditHistory]);

  return (
    <Tooltip.Provider delay={100}>
      <div className="toolbar">
        <BlockTypeControls />
        <TextFormatControls getStatus={getStatus} />
        <ElementFormatControls getStatus={getStatus} />
        <EditHistoryControls getStatus={getStatus} />
      </div>
    </Tooltip.Provider>
  );
}
