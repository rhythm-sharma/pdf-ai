"use client";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

import Image from "next/image";

export default function Home() {
  return <Editor />;
}
