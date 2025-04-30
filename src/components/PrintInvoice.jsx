import React from 'react';
import { useInvoice } from '../context/InvoiceContext';

export const PrintInvoice = React.forwardRef((props, ref) => {
  const { invoiceData } = useInvoice();

  const subtotal = invoiceData.items.reduce((sum, item) => 
    sum + (item.quantity * item.price), 0);
  const taxAmount = subtotal * (invoiceData.taxRate / 100);
  const discountAmount = subtotal * (invoiceData.discount / 100);
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div ref={ref} className="p-8 print:p-0 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
          <p className="text-gray-600">#{invoiceData.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Date: {invoiceData.date}</p>
          <p className="text-gray-600">Due Date: {invoiceData.dueDate}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">From:</h2>
          <p className="font-medium">{invoiceData.from.name}</p>
          <p>{invoiceData.from.email}</p>
          <p className="whitespace-pre-line">{invoiceData.from.add}</p>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">To:</h2>
          <p className="font-medium">{invoiceData.to.name}</p>
          <p>{invoiceData.to.email}</p>
          <p className="whitespace-pre-line">{invoiceData.to.add}</p>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border">Item</th>
              <th className="p-3 text-right border">Qty</th>
              <th className="p-3 text-right border">Price</th>
              <th className="p-3 text-right border">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3 border">{item.itemname}</td>
                <td className="p-3 text-right border">{item.quantity}</td>
                <td className="p-3 text-right border">{item.price.toFixed(2)}</td>
                <td className="p-3 text-right border">{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ml-auto w-full md:w-1/3">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax ({invoiceData.taxRate}%):</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount ({invoiceData.discount}%):</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
});