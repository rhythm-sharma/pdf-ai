"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { pdfFromReact } from "@/lib/jsPDF";

export default function ExportPdfButton({}) {
  const exportToPdf = useCallback(() => {
    pdfFromReact({
      target: ".ql-editor",
      name: "PDF_WITH_AI",
      orientation: "p",
      resize: false,
      debug: false,
    });
  }, []);

  return (
    <Button onClick={exportToPdf}>
      <Icons.download className="w-[16px] h-[16px] mr-2" />
      Export PDF
    </Button>
  );
}
