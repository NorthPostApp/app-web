import { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Button from "@/components/ui/Button";
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
import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";
import {
  $isListItemNode,
  $isListNode,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import { SUPPORTED_ELEMENT_FORMATS, SUPPORTED_TEXT_FORMATS } from "../editor-config";
import { Separator } from "@base-ui/react";
import { useAtom } from "jotai";
import {
  derivedToolbarStatusAtom,
  type BlockType,
  type ToolbarStatusType,
} from "@/atoms/editorAtoms";
import ToolbarIcon from "./ToolbarIcon";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [toolbarStatus, writeToolbarStatus] = useAtom(derivedToolbarStatusAtom);

  const getStatus = (option: string, target?: string) => {
    if (option in toolbarStatus) {
      const value = toolbarStatus[option as keyof ToolbarStatusType];
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

      let format: ElementFormatType = "";
      if (element instanceof ElementNode) {
        format = element.getFormatType();
      }

      let blockType: BlockType = "paragraph";
      if ($isHeadingNode(element)) {
        blockType = element.getTag() as "h1" | "h2" | "h3";
      } else if ($isListItemNode(element)) {
        const parentList = element.getParent();
        if ($isListNode(parentList)) blockType = parentList.getListType();
      }
      writeToolbarStatus(selection, format, blockType);
    }
  }, [writeToolbarStatus]);

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
            <ToolbarIcon name={format} />
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
            <ToolbarIcon name={format} />
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
