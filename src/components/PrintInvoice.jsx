import React from "react";
import { useInvoice } from "../context/InvoiceContext";
import { FiX } from "react-icons/fi";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const PrintInvoice = ({ onClose, isModal }) => {
  const { invoiceData } = useInvoice();

  // Calculate amounts
  const subtotal = invoiceData.items.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);
  const taxRate = parseFloat(invoiceData.taxRate) || 0;
  const discount = parseFloat(invoiceData.discount) || 0;
  const taxAmount = (subtotal * taxRate) / 100;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  // Generate PDF from HTML snapshot (A5 on mobile, A4 on desktop)
  const generatePDF = () => {
    const node = document.getElementById("invoice-to-print");
    if (!node) return;

    toPng(node, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        const format = isMobile ? 'a5' : 'a4';
        const pdf = new jsPDF("p", "mm", format);
        const imgProps = pdf.getImageProperties(dataUrl);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = (imgProps.height * pageWidth) / imgProps.width;
        const finalHeight = imgHeight > pageHeight ? pageHeight : imgHeight;

        pdf.addImage(dataUrl, "PNG", 0, 0, pageWidth, finalHeight);
        pdf.save("invoice.pdf");
      })
      .catch((err) => {
        console.error("Failed to generate image for PDF:", err);
      });
  }; 

  // Wrapper for invoice HTML - full width to fill PDF
  const invoiceWrapper = (
    <div id="invoice-to-print" className="print:p-0 print:m-0 w-full">
      <InvoiceContent
        invoiceData={invoiceData}
        subtotal={subtotal}
        taxRate={taxRate}
        discount={discount}
        taxAmount={taxAmount}
        discountAmount={discountAmount}
        total={total}
      />
    </div>
  );

  return isModal ? (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-lg max-h-[90vh] overflow-auto w-full max-w-none md:max-w-3xl print:max-w-full print:shadow-none">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center print:hidden">
          <h2 className="text-sm md:text-xl font-bold">Invoice Preview</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={generatePDF}
              className="bg-primary text-white text-[10px] md:text-sm rounded px-2 md:px-4 py-2 cursor-pointer"
            >
              Download Invoice
            </button>
            <button
              onClick={onClose}
              className="p-2 cursor-pointer"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        <div className="p-4 print:p-0">{invoiceWrapper}</div>
      </div>
    </div>
  ) : (
    invoiceWrapper
  );
};

const InvoiceContent = ({
  invoiceData,
  subtotal,
  taxRate,
  discount,
  taxAmount,
  discountAmount,
  total,
}) => (
  <div className="p-4 print:p-4">
    {/* Header */}
    <div className="flex justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">INVOICE</h1>
        <div className="text-sm">
          <p>Date: {invoiceData.date || ""}</p>
          <p>Due Date: {invoiceData.dueDate || invoiceData.date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">{invoiceData.invoiceNumber || 1}</p>
      </div>
    </div>

    {/* From & To using flex */}
    <div className="flex justify-between mb-6 gap-5 flex-col-reverse md:flex-row-reverse">
      <div>
        <h2 className="font-semibold mb-1">Bill TO:</h2>
        <p>{invoiceData.from.name || "Unknown"}</p>
        <p>{invoiceData.from.email || "unknown@gmail.com"}</p>
        <p className="whitespace-pre-line">{invoiceData.from.add}</p>
      </div>
      <div className="">
        <h2 className="font-semibold mb-1">Bill From:</h2>
        <p>{invoiceData.to.name || "InvoiceGenerator"}</p>
        <p>{invoiceData.to.email || "InvoiceGenerator@gamil.com"}</p>
        <p className="whitespace-pre-line">{invoiceData.to.add}</p>
      </div>
    </div>

    {/* Items Table with horizontal scroll only on small screens */}
    <div className="overflow-x-auto md:overflow-visible mb-6 print:overflow-visible">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {['Item','Qty','Price','Total'].map((h) => (
              <th key={h} className="p-2 text-left border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseInt(item.quantity) || 0;
            return (
              <tr key={item.id} className="border-b">
                <td className="p-2 border">{item.itemname}</td>
                <td className="p-2 text-right border">{qty}</td>
                <td className="p-2 text-right border">₹{price.toFixed(2)}</td>
                <td className="p-2 text-right border">₹{(price * qty).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* Totals */}
    <div className="space-y-2 w-full sm:w-1/2 ml-auto print:w-full print:ml-0">
      {[
        { label: 'Subtotal', value: `₹${subtotal.toFixed(2)}` },
        { label: `Tax (${taxRate}%)`, value: `₹${taxAmount.toFixed(2)}` },
        { label: `Discount (${discount}%)`, value: `-₹${discountAmount.toFixed(2)}` }
      ].map(({ label, value }) => (
        <div key={label} className="flex justify-between">
          <span>{label}:</span>
          <span>{value}</span>
        </div>
      ))}
      <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

export default PrintInvoice;
