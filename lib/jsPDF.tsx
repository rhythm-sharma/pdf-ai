// @ts-nocheck
import { jsPDF } from "jspdf";

interface PdfFromReactProps {
  target: string;
  name: string;
  orientation: string;
  resize: boolean;
  debug: boolean;
}

const pdfFromReact = ({
  target,
  name,
  orientation,
  resize,
  debug,
}: PdfFromReactProps) => {
  if (resize) {
    document.querySelector(target).style.width =
      orientation === "p" ? "600px" : "841px";
    document.querySelector(target).style.minHeight =
      orientation === "p" ? "841px" : "595px";
  }
  let pdf = new jsPDF(orientation, "pt", "a4");
  pdf.html(document.querySelector(target), {
    callback: () => {
      debug ? window.open(pdf.output("bloburl")) : pdf.save(`${name}.pdf`);
      if (resize) {
        document.querySelector(target).style = "";
      }
    },
  });
};

export { pdfFromReact };
