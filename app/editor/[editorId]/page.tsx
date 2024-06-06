"use client";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

interface EditorPageProps {
  params: { editorId: string };
}

export default function PdfEditor({ params }: EditorPageProps) {
  return <Editor editorId={params.editorId} />;
}
