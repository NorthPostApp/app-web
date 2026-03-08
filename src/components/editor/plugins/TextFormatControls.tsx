import { FORMAT_TEXT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Button from "@/components/ui/Button";
import { SUPPORTED_TEXT_FORMATS } from "@/components/editor/editor-config";
import ToolbarIcon from "@/components/editor/plugins/ToolbarIcon";

type TextFormatControlsProps = {
  getStatus: (option: string, target?: string) => boolean;
};

export default function TextFormatControls({ getStatus }: TextFormatControlsProps) {
  const [editor] = useLexicalComposerContext();
  return (
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
  );
}
