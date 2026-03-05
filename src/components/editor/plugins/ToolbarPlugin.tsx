import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Button from "@/components/ui/Button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  TextAlignCenter,
  TextAlignStart,
  TextAlignEnd,
} from "lucide-react";
import {
  $getSelection,
  $isRangeSelection,
  $isElementNode,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  mergeRegister,
  ElementNode,
  type ElementFormatType,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import {
  SUPPORTED_ELEMENT_FORMATS,
  SUPPORTED_TEXT_FORMATS,
  TOOLBAR_BUTTON_SIZE,
} from "../editor-config";
import { Separator } from "@base-ui/react";

type ToolbarStatus = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  center: boolean;
  left: boolean;
  right: boolean;
};

const initToolbarStatus: ToolbarStatus = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  center: false,
  left: false,
  right: false,
};

const getIcon = (format: keyof ToolbarStatus) => {
  const size = TOOLBAR_BUTTON_SIZE;
  switch (format) {
    case "bold":
      return <Bold size={size} />;
    case "italic":
      return <Italic size={size} />;
    case "underline":
      return <Underline size={size} />;
    case "strikethrough":
      return <Strikethrough size={size} />;
    case "center":
      return <TextAlignCenter size={size} />;
    case "left":
      return <TextAlignStart size={size} />;
    case "right":
      return <TextAlignEnd size={size} />;
    default:
      return null;
  }
};

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [toolbarStatus, setToolbarStatus] = useState<ToolbarStatus>(initToolbarStatus);
  const getStatus = (option: string) => {
    if (option in toolbarStatus) {
      return toolbarStatus[option as keyof ToolbarStatus];
    }
    return false;
  };

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $isElementNode(anchorNode)
            ? anchorNode
            : anchorNode.getParent();

      let alignment: ElementFormatType;
      if (element instanceof ElementNode) {
        alignment = element.getFormatType();
      }

      setToolbarStatus((prev) => {
        return {
          ...prev,
          bold: selection.hasFormat("bold"),
          italic: selection.hasFormat("italic"),
          underline: selection.hasFormat("underline"),
          strikethrough: selection.hasFormat("strikethrough"),
          center: alignment === "center",
          left: alignment === "left",
          right: alignment === "right",
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
      <div>
        {SUPPORTED_TEXT_FORMATS.map((format) => (
          <Button
            key={format}
            active={getStatus(format)}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)}
          >
            {getIcon(format as keyof ToolbarStatus)}
          </Button>
        ))}
      </div>
      <Separator orientation="vertical" className="w-px bg-gray-600" />
      <div>
        {SUPPORTED_ELEMENT_FORMATS.map((format) => (
          <Button
            key={format}
            active={getStatus(format)}
            onClick={() => {
              if (getStatus(format)) {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "");
              } else {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
              }
            }}
          >
            {getIcon(format as keyof ToolbarStatus)}
          </Button>
        ))}
      </div>
    </div>
  );
}
