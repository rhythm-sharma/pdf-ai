import { PdfOperations } from "./pdf-operations";

interface PdfItemProps {
  pdf: any;
}

export function PdfItem({ pdf }: PdfItemProps) {
  return (
    <div className="group flex flex-row justify-between items-center space-y-2 border-2 p-4 rounded-lg	">
      <h2 className="text-2xl font-extrabold">{pdf.title}</h2>
      <PdfOperations editorId={pdf.id} />
    </div>
  );
}
