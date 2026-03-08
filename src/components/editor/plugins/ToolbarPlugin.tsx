import { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Button from "@/components/ui/Button";
import {
  $getSelection,
  $isRangeSelection,
  mergeRegister,
  $createParagraphNode,
} from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import { Separator } from "@base-ui/react";
import { useAtom } from "jotai";
import { derivedToolbarStatusAtom, type ToolbarStatusType } from "@/atoms/editorAtoms";
import ToolbarIcon from "./ToolbarIcon";
import { getBlockType, getElementFormat } from "./utils";
import TextFormatControls from "./TextFormatControls";
import ElementFormatControls from "./ElementFormatControls";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [toolbarStatus, writeToolbarStatus] = useAtom(derivedToolbarStatusAtom);

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
    );
  }, [$updateToolbar, editor]);

  return (
    <div className="toolbar">
      <TextFormatControls getStatus={getStatus} />
      <Separator orientation="vertical" className="w-px bg-gray-600" />
      <ElementFormatControls getStatus={getStatus} />
      <Separator orientation="vertical" className="w-px bg-gray-600" />
      <Button
        active={getStatus("blockType", "h1")}
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              if (getStatus("blockType", "h1")) {
                $setBlocksType(selection, () => $createParagraphNode());
              } else {
                $setBlocksType(selection, () => $createHeadingNode("h1"));
              }
            }
          });
        }}
      >
        <ToolbarIcon name={"h1"} />
      </Button>
      <Button
        active={getStatus("blockType", "bullet")}
        onClick={() => {
          if (getStatus("blockType", "bullet")) {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }
        }}
      >
        <ToolbarIcon name="bullet" />
      </Button>
    </div>
  );
}
