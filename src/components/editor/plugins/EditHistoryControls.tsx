import TooltipButton from "@/components/ui/TooltipButton";
import ToolbarIcon from "@/components/editor/plugins/ToolbarIcon";
import Button from "@/components/ui/Button";
import Kbd from "@/components/ui/Kbd";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { REDO_COMMAND, UNDO_COMMAND } from "lexical";
import { MODIFIER_KEY_PREFIX } from "@/consts/app-config";

type EditHistoryControlsProps = {
  getStatus: (option: string, target?: string) => boolean;
};

export default function EditHistoryControls({ getStatus }: EditHistoryControlsProps) {
  const [editor] = useLexicalComposerContext();
  return (
    <div>
      <TooltipButton
        render={
          <Button
            data-testid={"editor-toolbar-undo"}
            active={getStatus("canUndo")}
            onClick={(e) => {
              e.stopPropagation();
              editor.dispatchCommand(UNDO_COMMAND, undefined);
            }}
          >
            <ToolbarIcon name="undo" />
          </Button>
        }
        tooltip={
          <div className="toolbar-tooltip">
            <Kbd>{MODIFIER_KEY_PREFIX}</Kbd>
            <p>+</p>
            <Kbd>Z</Kbd>
          </div>
        }
      />
      <TooltipButton
        render={
          <Button
            data-testid={"editor-toolbar-redo"}
            active={getStatus("canRedo")}
            onClick={(e) => {
              e.stopPropagation();
              editor.dispatchCommand(REDO_COMMAND, undefined);
            }}
          >
            <ToolbarIcon name="redo" />
          </Button>
        }
        tooltip={
          <div className="toolbar-tooltip">
            <Kbd>{MODIFIER_KEY_PREFIX}</Kbd>
            <p>+</p>
            <Kbd>Shift</Kbd>
            <p>+</p>
            <Kbd>Z</Kbd>
          </div>
        }
      />
    </div>
  );
}
