import RichTextEditor from "~/components/editor";

export function EditorLayout() {
  function onChange() {
    "use server";

    console.log("test");
  }
  return <RichTextEditor initialValue="<h1>Hello World" onChange={onChange} />;
}
