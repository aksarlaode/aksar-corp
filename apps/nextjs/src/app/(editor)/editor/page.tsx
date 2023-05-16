"use client";

import { useState } from "react";

import RichTextEditor from "~/components/editor";

export function EditorLayout() {
  const [doc, _] = useState("");
  /*function onChange() {
    setDoc(doc);
  }*/

  return <RichTextEditor content={doc} /*onChange={onChange}*/ />;
}
