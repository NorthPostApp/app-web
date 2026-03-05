import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { useEffect } from "react";

type OnChangePluginProps = {
  onChange?: (markdown: string) => void;
};

export default function OnChangePlugin({ onChange }: OnChangePluginProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!onChange) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    return editor.registerUpdateListener(({ editorState }) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () =>
          editorState.read(() => {
            const markdown = $convertToMarkdownString(TRANSFORMERS);
            onChange(markdown);
          }),
        500,
      );
    });
  }, [editor, onChange]);
  return null;
}
