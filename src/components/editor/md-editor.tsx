import MarkdownEditor from "@uiw/react-markdown-editor";
import styles from "./md-editor.module.css";

type EditorProps = {
  value: string;
  height: string;
  onChange: (value: string, viewUpdate: any) => void;
};

const Editor = ({ value, height = "200px", onChange }: EditorProps) => {
  return (
    <div className={styles.editorContainer} style={{ height }}>
      <MarkdownEditor
        value={value}
        height={height}
        onChange={(value, viewUpdate) => onChange(value, viewUpdate)}
        className={styles.markdownEditor}
      />
    </div>
  );
};

export default Editor;
