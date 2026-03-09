import { useAtomValue } from "jotai";
import { derivedToolbarStatusAtom } from "@/atoms/editorAtoms";
import {
  DEFAULT_BLOCK_TYPE,
  SUPPORTED_BLOCK_TYPES,
} from "@/components/editor/editor-config";
import { $createParagraphNode, $getSelection, $isRangeSelection } from "lexical";
import { $createHeadingNode, type HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  type ListType,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Select from "@/components/ui/Select";

export default function BlockTypeControls() {
  const [editor] = useLexicalComposerContext();
  const toolbarStatus = useAtomValue(derivedToolbarStatusAtom);

  const setHeadingType = (headingType: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      $setBlocksType(selection, () => $createHeadingNode(headingType));
    });
  };

  const setParagraphType = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      $setBlocksType(selection, () => $createParagraphNode());
    });
  };

  const setListType = (listType: ListType) => {
    switch (listType) {
      case "bullet":
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        break;
      case "number":
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        break;
      default:
        break;
    }
  };

  const updateBlockType = (blockType: string | null) => {
    if (!blockType) return;
    switch (blockType) {
      case "h1":
      case "h2":
      case "h3":
        setHeadingType(blockType);
        break;
      case "bullet":
      case "number":
        setListType(blockType);
        break;
      default:
        setParagraphType();
        break;
    }
  };
  return (
    <Select
      items={SUPPORTED_BLOCK_TYPES}
      defaultValue={DEFAULT_BLOCK_TYPE}
      onValueChange={updateBlockType}
      activeValue={toolbarStatus.blockType}
    />
  );
}
