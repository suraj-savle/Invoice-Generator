import React from "react";

function Items() {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Items</label>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Description
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Quantity
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Price
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2">
                <input type="text" className="w-full p-1 border rounded" />
              </td>
              <td className="px-4 py-2">
                <input type="number" className="w-full p-1 border rounded" />
              </td>
              <td className="px-4 py-2">
                <input type="number" className="w-full p-1 border rounded" />
              </td>
              <td className="px-4 py-2">$0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="mt-2 text-sm text-primary hover:text-primary-dark"
      >
        + Add Item
      </button>
    </div>
  );
}

export default Items;
