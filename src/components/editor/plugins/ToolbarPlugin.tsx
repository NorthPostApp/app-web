import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  mergeRegister,
} from "lexical";
import { useCallback, useEffect, useState } from "react";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  // we need to put all of the states into a single object, to avoid
  // multiple re-renderings
  const [isBold, setIsBold] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(
          () => {
            $updateToolbar();
          },
          { editor },
        );
      }),
    );
  }, [$updateToolbar, editor]);

  return (
    <div className="toolbar">
      <button
        style={{ opacity: isBold ? 1 : 0.4 }}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      >
        B
      </button>
    </div>
  );
}
