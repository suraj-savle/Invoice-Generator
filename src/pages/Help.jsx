import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Help() {
  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* How to Use Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              How to Use the Invoice Generator
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <div className="bg-primary text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  1
                </div>
                <p>
                  <span className="font-medium">Fill in your details:</span>{" "}
                  Enter your business name, address, and contact information in
                  the "From" section.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-primary text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  2
                </div>
                <p>
                  <span className="font-medium">Add client information:</span>{" "}
                  Fill in your client's details in the "Bill To" section.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-primary text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  3
                </div>
                <p>
                  <span className="font-medium">Enter invoice items:</span> Add
                  each product/service with description, quantity, rate, and
                  amount will calculate automatically.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-primary text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  4
                </div>
                <p>
                  <span className="font-medium">Review totals:</span> Check the
                  subtotal, tax (if applicable), and grand total calculations.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-primary text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  5
                </div>
                <p>
                  <span className="font-medium">Print your invoice:</span> Click
                  the "Print" button to generate a PDF or print directly from
                  your browser.
                </p>
              </div>
            </div>
          </section>

          {/* About This Project Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About This Project
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <span className="font-medium">Why I built this:</span> This
                project was created to sharpen my React skills while solving a
                real-world need problem.
              </div>
              <div>
                <span className="font-medium">Technology used:</span> Built with
                React.js for the frontend, Tailwind CSS for styling, and
                React-to-Print library for PDF generation.
              </div>
              <div>
                <span className="font-medium">Key features:</span>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Responsive design works on all devices</li>
                  <li>Automatic calculations for amounts and totals</li>
                  <li>Clean, professional invoice templates</li>
                  <li>No data leaves your browser - privacy focused</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Help;
