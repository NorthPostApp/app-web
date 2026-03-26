import {
  Bold,
  Italic,
  Underline,
  TextAlignCenter,
  TextAlignStart,
  TextAlignEnd,
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
    case "center":
      return <TextAlignCenter size={size} />;
    case "left":
      return <TextAlignStart size={size} />;
    case "right":
      return <TextAlignEnd size={size} />;
    default:
      return null;
  }
}
