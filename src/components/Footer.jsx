import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-700 px-4 sm:px-8 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold text-sm mb-4">RESOURCES</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline hover:text-blue-600 transition-colors">Home</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-600 transition-colors">Invoicing Guide</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-600 transition-colors">Github</a></li>
          </ul>
        </div>

        <div className="flex flex-col-reverse gap-5 items-center justify-between md:col-span-2 md:items-end">
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <FaGithub size={20} />
            </a>
          </div>

          <div className="mt-4 md:mt-0 text-center md:text-right">
            <div className="text-sm text-gray-500">
              © {currentYear} Invoice-Generator.com
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Developed by Suraj Savle
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}