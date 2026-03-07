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
  Heading1,
  List,
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
  $createParagraphNode,
} from "lexical";
import {
  $createHeadingNode,
  $isHeadingNode,
  type HeadingTagType,
} from "@lexical/rich-text";
import {
  $isListItemNode,
  $isListNode,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  type ListType,
} from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
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
  elementFormat: ElementFormatType;
  blockType: ListType | HeadingTagType | "paragraph";
};

const initToolbarStatus: ToolbarStatus = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  elementFormat: "",
  blockType: "paragraph",
};

const getIcon = (format: string) => {
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
  const getStatus = (option: string, target?: string) => {
    if (option in toolbarStatus) {
      const value = toolbarStatus[option as keyof ToolbarStatus];
      if (typeof value === "boolean") {
        return value;
      } else {
        return value === target;
      }
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

      let format: ElementFormatType;
      if (element instanceof ElementNode) {
        format = element.getFormatType();
      }

      let blockType: ToolbarStatus["blockType"] = "paragraph";
      if ($isHeadingNode(element)) {
        blockType = element.getTag() as "h1" | "h2" | "h3";
      } else if ($isListItemNode(element)) {
        const parentList = element.getParent();
        if ($isListNode(parentList)) blockType = parentList.getListType();
      }
      setToolbarStatus((prev) => {
        return {
          ...prev,
          bold: selection.hasFormat("bold"),
          italic: selection.hasFormat("italic"),
          underline: selection.hasFormat("underline"),
          strikethrough: selection.hasFormat("strikethrough"),
          elementFormat: format,
          blockType,
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
            active={getStatus("elementFormat", format)}
            onClick={() => {
              if (getStatus("elementFormat", format)) {
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
        <Heading1 />
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
        <List />
      </Button>
    </div>
  );
}
