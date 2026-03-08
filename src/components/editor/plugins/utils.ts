import type { BlockType } from "@/atoms/editorAtoms";
import {
  $isElementNode,
  $isRangeSelection,
  ElementNode,
  TextNode,
  type BaseSelection,
  type ElementFormatType,
  type RangeSelection,
} from "lexical";
import { $isHeadingNode } from "@lexical/rich-text";
import { $isListItemNode, $isListNode } from "@lexical/list";

function getElement(selection: RangeSelection): TextNode | ElementNode | null {
  const anchorNode = selection.anchor.getNode();
  const element =
    anchorNode.getKey() === "root"
      ? anchorNode
      : $isElementNode(anchorNode)
        ? anchorNode
        : anchorNode.getParent();
  return element;
}

function getElementFormat(selection: BaseSelection | null): ElementFormatType {
  let format: ElementFormatType = "";
  if ($isRangeSelection(selection)) {
    const element = getElement(selection);
    if (element instanceof ElementNode) {
      format = element.getFormatType();
    }
  }
  return format;
}

function getBlockType(selection: BaseSelection | null): BlockType {
  let blockType: BlockType = "paragraph";
  if ($isRangeSelection(selection)) {
    const element = getElement(selection);
    if ($isHeadingNode(element)) {
      blockType = element.getTag();
    } else if ($isListItemNode(element)) {
      const parentList = element.getParent();
      if ($isListNode(parentList)) blockType = parentList.getListType();
    }
  }
  return blockType;
}

export { getElementFormat, getBlockType };
