import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Button from "@/components/ui/Button";
import { Bold, Italic, Underline, Strikethrough } from "lucide-react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  mergeRegister,
} from "lexical";
import { useCallback, useEffect, useState } from "react";

type ToolbarStatus = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikeThrough: boolean;
};

const initToolbarStatus: ToolbarStatus = {
  bold: false,
  italic: false,
  underline: false,
  strikeThrough: false,
};

const TOOLBAR_BUTTON_SIZE = 20;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  // we need to put all of the states into a single object, to avoid
  // multiple re-renderings
  const [toolbarStatus, setToolbarStatus] = useState<ToolbarStatus>(initToolbarStatus);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setToolbarStatus((prev) => {
        return {
          ...prev,
          bold: selection.hasFormat("bold"),
          italic: selection.hasFormat("italic"),
          underline: selection.hasFormat("underline"),
          strikeThrough: selection.hasFormat("strikethrough"),
        };
      });
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
      <Button
        active={toolbarStatus.bold}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      >
        <Bold size={TOOLBAR_BUTTON_SIZE} />
      </Button>
      <Button
        active={toolbarStatus.italic}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      >
        <Italic size={TOOLBAR_BUTTON_SIZE} />
      </Button>
      <Button
        active={toolbarStatus.underline}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      >
        <Underline size={TOOLBAR_BUTTON_SIZE} />
      </Button>
      <Button
        active={toolbarStatus.strikeThrough}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
      >
        <Strikethrough size={TOOLBAR_BUTTON_SIZE} />
      </Button>
    </div>
  );
}
