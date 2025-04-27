import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn, FaGithub } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 px-8 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* First Column */}
        <div>
          <h4 className="font-semibold text-sm mb-4">USE INVOICE GENERATOR</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Invoice Template</a></li>
            <li><a href="#" className="hover:underline">Credit Note Template</a></li>
            <li><a href="#" className="hover:underline">Quote Template</a></li>
            <li><a href="#" className="hover:underline">Purchase Order Template</a></li>
          </ul>
        </div>

        {/* Second Column */}
        <div>
          <h4 className="font-semibold text-sm mb-4">RESOURCES</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Invoicing Guide</a></li>
            <li><a href="#" className="hover:underline">Help</a></li>
            <li><a href="#" className="hover:underline">Sign In</a></li>
            <li><a href="#" className="hover:underline">Sign Up</a></li>
            <li><a href="#" className="hover:underline">Release Notes</a></li>
            <li><a href="#" className="hover:underline">Developer API</a></li>
          </ul>
        </div>

        {/* Third Column */}
        <div className="flex flex-col justify-between">
          <div className="text-sm text-gray-500">
            © 2012-2025 Invoice-Generator.com
          </div>

          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="text-black hover:text-gray-700"><FaFacebookF size={20} /></a>
            <a href="#" className="text-black hover:text-gray-700"><FaXTwitter size={20} /></a>
            <a href="#" className="text-black hover:text-gray-700"><FaYoutube size={20} /></a>
            <a href="#" className="text-black hover:text-gray-700"><FaLinkedinIn size={20} /></a>
            <a href="#" className="text-black hover:text-gray-700"><FaGithub size={20} /></a>
          </div>

          <div className="flex flex-col space-y-2 mt-6 text-sm">
            <a href="#" className="text-gray-600 hover:underline">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
