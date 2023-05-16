import RichTextEditor from "~/components/editor";

export function EditorLayout() {
  const onChange = () => console.log("test");
  return <RichTextEditor initialValue="<h1>Hello World" onChange={onChange} />;
}
