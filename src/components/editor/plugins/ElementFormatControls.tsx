import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Button from "@/components/ui/Button";
import ToolbarIcon from "@/components/editor/plugins/ToolbarIcon";
import { FORMAT_ELEMENT_COMMAND } from "lexical";

import { SUPPORTED_ELEMENT_FORMATS } from "@/components/editor/editor-config";

type ElementFormatControlsProps = {
  getStatus: (option: string, target?: string) => boolean;
};

export default function ElementFormatControls({ getStatus }: ElementFormatControlsProps) {
  const [editor] = useLexicalComposerContext();
  return (
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
  );
}
