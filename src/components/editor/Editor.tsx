import clsx from "clsx";
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

const styles = {
  container: clsx("relative flex flex-col items-start gap-4 w-200 my-5 mx-auto p-6"),
  decoration: clsx(
    "bg-grid absolute left-0 top-0 w-full h-full rounded-4xl shadow-(--base-shadow)",
  ),
  inner: clsx(
    "relative rounded-2xl p-4 pr-2 shadow w-full h-180 overflow-y-auto border-dashed border-2 border-(--accent-6)",
  ),
  input: clsx(
    "editor-input relative resize-none text-base h-full caret-slate-400 outline-none overflow-y-auto tab-4",
  ),
  placeholder: clsx(
    "absolute top-4 left-4 select-none text-gray-400 overflow-hidden text-ellipsis",
  ),
};

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
      <div className={styles.container}>
        <div className={`${styles.decoration} bg-grid`}></div>
        <div className={styles.inner}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={styles.input}
                aria-placeholder={"Enter some text"}
                placeholder={<div className={styles.placeholder}>{placeholder}</div>}
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
