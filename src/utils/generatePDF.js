// pdfUtils.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (elementRef) => {
  if (!elementRef.current) return;

  const element = elementRef.current;

  // Capture the element as a high-resolution canvas
  const canvas = await html2canvas(element, {
    scale: 3, // Higher resolution for better table rendering
    useCORS: true, // Ensure cross-origin images are handled
  });

  const imgData = canvas.toDataURL("image/png");

  // Initialize jsPDF in landscape mode
  const pdf = new jsPDF("landscape", "mm", "a4");

  // Calculate PDF dimensions based on the canvas
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  // Add the image to the PDF with adjustments for alignment
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
  pdf.save("download.pdf");
};
