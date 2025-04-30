import React, { useEffect, useRef, useState } from "react";
import { useInvoice } from "../context/InvoiceContext";
import Items from "./Items";
import { FiPrinter } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';
import { PrintInvoice } from "./PrintInvoice";

function InvoiceForm() {
  const { invoiceData, updateField, updateAddress } = useInvoice();
  const [showPrintModal, setShowPrintModal] = useState(false);
  const printRef = useRef();

  // Calculate current date and set it automatically
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    updateField("date", formattedDate);
  }, [updateField]);

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => 
      sum + (item.quantity * item.price), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = subtotal * (invoiceData.taxRate / 100);
    const discountAmount = subtotal * (invoiceData.discount / 100);
    return subtotal + taxAmount - discountAmount;
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  const PrintModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-lg max-h-[90vh] overflow-auto w-full max-w-6xl">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Invoice Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FiPrinter /> Print/Download
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="p-4">
          <PrintInvoice ref={printRef} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-2 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        <section className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-bold text-gray-500 mb-6">Invoice</h2>

          <form className="space-y-8">
            {/* Date and Invoice Number Section */}
            <div className="flex justify-between items-start border-b border-gray-300 pb-5">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <label className="block text-xs font-medium text-gray-700">
                    Current Date:
                  </label>
                  <span>{invoiceData.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="block text-xs font-medium text-gray-700">
                    Due Date:
                  </label>
                  <input
                    value={invoiceData.dueDate}
                    onChange={(e) => updateField("dueDate", e.target.value)}
                    type="date"
                    min={invoiceData.date}
                    className="w-[125px] md:w-[150px] px-2 py-0.5 border border-gray-300 rounded bg-main text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center mb-5 md:mt-0 gap-5">
                <label className="block text-xs font-medium text-gray-700">
                  Invoice #:
                </label>
                <input
                  type="number"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => updateField("invoiceNumber", e.target.value)}
                  className="w-[40px] md:w-[60px] px-2 py-0.5 border border-gray-300 rounded-md bg-main text-sm"
                  required
                />
              </div>
            </div>

            {/* Billing Information */}
            <div className="w-full border-b pb-5 border-gray-300">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8">
                {/* Bill to */}
                <div className="w-full md:w-1/2">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Bill to:
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={invoiceData.from.name}
                      onChange={(e) => updateAddress("from", "name", e.target.value)}
                      placeholder="Client/Company name"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                    <input
                      type="email"
                      value={invoiceData.from.email}
                      onChange={(e) => updateAddress("from", "email", e.target.value)}
                      placeholder="client@example.com"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                    <textarea
                      value={invoiceData.from.add}
                      onChange={(e) => updateAddress("from", "add", e.target.value)}
                      placeholder="Street address, City, State, ZIP"
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Bill from */}
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Bill from:
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={invoiceData.to.name}
                      onChange={(e) => updateAddress("to", "name", e.target.value)}
                      placeholder="Your/Company name"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                    <input
                      type="email"
                      value={invoiceData.to.email}
                      onChange={(e) => updateAddress("to", "email", e.target.value)}
                      placeholder="your@example.com"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                    <textarea
                      value={invoiceData.to.add}
                      onChange={(e) => updateAddress("to", "add", e.target.value)}
                      placeholder="Street address, City, State, ZIP"
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-primary text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table Section */}
            <Items />

            {/* Invoice Summary */}
            <div className="w-full md:flex justify-end">
              <div className="md:w-[300px] py-6 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-4">
                  Invoice Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>₹ {calculateSubtotal().toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax:</span>
                    <div className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={invoiceData.taxRate}
                        onChange={(e) => updateField("taxRate", e.target.value)}
                        className="w-12 text-right focus:outline-none text-sm bg-transparent"
                      />
                      <span>%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Discount:</span>
                    <div className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={invoiceData.discount}
                        onChange={(e) => updateField("discount", e.target.value)}
                        className="w-12 text-right focus:outline-none text-sm bg-transparent"
                      />
                      <span>%</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold border-t pt-2 text-lg">
                    <span>Total:</span>
                    <span>₹ {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Print Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <FiPrinter /> View/Print Invoice
              </button>
            </div>
          </form>
        </section>
      </div>

      {showPrintModal && <PrintModal onClose={() => setShowPrintModal(false)} />}
    </div>
  );
}

export default InvoiceForm;