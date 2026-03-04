// import { $getRoot, $getSelection } from "lexical";

import { LexicalComposer, type InitialConfigType } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "@/components/editor/plugins/ToolbarPlugin";
import "./Editor.css";

import theme from "@/components/editor/EditorTheme";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import OnChangePlugin from "./plugins/OnChangePlugin";

const placeholder = "Enter some rich text...";

const onError = (error: Error) => {
  console.error(error);
};

export default function Editor() {
  const initialConfig: InitialConfigType = {
    namespace: "LetterEditor",
    nodes: [HeadingNode, QuoteNode],
    onError,
    theme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
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
          <AutoFocusPlugin />
          <ToolbarPlugin />
          <OnChangePlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
