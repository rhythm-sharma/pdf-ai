"use client";

import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { PDFCreateButton } from "@/components/pdf-create-button";
import { PdfItem } from "@/components/pdf-item";
import { useEffect, useState } from "react";

export default function Home() {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const pdfs = window.localStorage.getItem("pdf")
      ? // @ts-ignore:next-line
        JSON.parse(window.localStorage.getItem("pdf"))
      : [];

    setPdfs(pdfs);
  }, []);

  return (
    <>
      {pdfs?.length ? (
        <>
          <div className="my-3 flex">
            <PDFCreateButton variant="outline" />
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {pdfs.map((pdf: any) => (
              <PdfItem key={pdf.id} pdf={pdf} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No PDF created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any PDF yet. Start creating it.
            </EmptyPlaceholder.Description>
            <PDFCreateButton variant="outline" />
          </EmptyPlaceholder>
        </div>
      )}
    </>
  );
}
