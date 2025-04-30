import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PrintInvoice } from './PrintInvoice';
import { FiDownload, FiX, FiPrinter } from 'react-icons/fi';

export const PrintModal = ({ onClose }) => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-lg max-h-[90vh] overflow-auto w-full max-w-6xl">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Invoice Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1"
            >
              <FiDownload /> Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1"
            >
              <FiPrinter /> Print
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
        <div className="p-4">
          <PrintInvoice ref={printRef} />
        </div>
      </div>
    </div>
  );
};