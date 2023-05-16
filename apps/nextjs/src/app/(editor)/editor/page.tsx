"use client";

import { useState } from "react";

import RichTextEditor from "~/components/editor";

export function EditorLayout() {
  const [doc, setDoc] = useState("");
  function onChange() {
    setDoc(doc);
  }

  return <RichTextEditor content={doc} onChange={onChange} />;
}
