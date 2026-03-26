import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { $getSelection, $isRangeSelection, mergeRegister } from "lexical";
import { derivedToolbarStatusAtom, type ToolbarStatusType } from "@/atoms/editorAtoms";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { getBlockType, getElementFormat } from "@/components/editor/plugins/utils";
import TextFormatControls from "@/components/editor/plugins/TextFormatControls";
import ElementFormatControls from "@/components/editor/plugins/ElementFormatControls";
import BlockTypeControls from "@/components/editor/plugins/BlockTypeControls";
import { Tooltip } from "@base-ui/react";

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
    <Tooltip.Provider delay={100}>
      <div className="toolbar">
        <BlockTypeControls />
        <TextFormatControls getStatus={getStatus} />
        <ElementFormatControls getStatus={getStatus} />
      </div>
    </Tooltip.Provider>
  );
}
