import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LexicalComposer, type InitialConfigType } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "@/components/editor/plugins/ToolbarPlugin";
import theme from "@/components/editor/EditorTheme";
import OnChangePlugin from "@/components/editor/plugins/OnChangePlugin";
import TabPlugin from "@/components/editor/plugins/TabPlugin";
import "./Editor.css";

const placeholder = "Begin your letter here...";

const onError = (error: Error) => {
  console.error(error);
};

export default function Editor() {
  const initialConfig: InitialConfigType = {
    namespace: "LetterEditor",
    nodes: [HeadingNode, ListNode, ListItemNode],
    onError,
    theme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <div className="editor-decoration"></div>
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={"Enter some text"}
                placeholder={<div className="editor-placeholder">{placeholder}</div>}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin />
          <ListPlugin />
          <TabPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
        <ToolbarPlugin />
      </div>
    </LexicalComposer>
  );
}
