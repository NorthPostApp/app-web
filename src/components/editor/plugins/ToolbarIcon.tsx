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
import { TOOLBAR_BUTTON_SIZE } from "@/components/editor/editor-config";

type ToolbarIconProps = {
  name: string;
};

export default function ToolbarIcon({ name }: ToolbarIconProps) {
  const size = TOOLBAR_BUTTON_SIZE;
  switch (name) {
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
    case "h1":
      return <Heading1 size={size} />;
    case "bullet":
      return <List size={size} />;
    default:
      return null;
  }
}
