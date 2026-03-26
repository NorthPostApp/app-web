import { FORMAT_TEXT_COMMAND, type TextFormatType } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Button from "@/components/ui/Button";
import { SUPPORTED_TEXT_FORMATS } from "@/components/editor/editor-config";
import ToolbarIcon from "@/components/editor/plugins/ToolbarIcon";
import TooltipButton from "@/components/ui/TooltipButton";
import Kbd from "@/components/ui/Kbd";

type TextFormatControlsProps = {
  getStatus: (option: string, target?: string) => boolean;
};

const formatShortcut: Partial<Record<TextFormatType, string>> = {
  bold: "B",
  italic: "I",
  underline: "U",
};

const modifierKeyPrefix = navigator.platform.startsWith("Mac") ? "⌘" : "Ctrl";

export default function TextFormatControls({ getStatus }: TextFormatControlsProps) {
  const [editor] = useLexicalComposerContext();
  return (
    <div>
      {SUPPORTED_TEXT_FORMATS.map((format) => (
        <TooltipButton
          key={format}
          render={
            <Button
              data-testid={`editor-toolbar-${format}`}
              active={getStatus(format)}
              onClick={(e) => {
                e.stopPropagation();
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
              }}
            >
              <ToolbarIcon name={format} />
            </Button>
          }
          tooltip={
            <div className="toolbar-tooltip">
              <Kbd>{modifierKeyPrefix}</Kbd>
              <p>{"+"}</p>
              <Kbd>{formatShortcut[format]}</Kbd>
            </div>
          }
        ></TooltipButton>
      ))}
    </div>
  );
}
