import { ShieldCheck, FileText, Mail } from 'lucide-react';
import Github from '../icons/github.svg'

export function Footer() {
  return (
    <footer className="bg-white mt-8">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-2">🎬 VidCrop</h2>
          <p className="text-sm text-gray-500">
            Smart video uploading and management tool. Crop, store, download — all in one place.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 cursor-pointer">
              <ShieldCheck size={16} /> Privacy Policy
            </li>
            <li className="flex items-center gap-2 cursor-pointer">
              <FileText size={16} /> Terms of Use
            </li>
            <li className="flex items-center gap-2 cursor-pointer">
              <Mail size={16} /> Contact Support
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-2">Connect</h3>
          <ul className="flex gap-4 mt-2 text-sm">
            <li>
              <a
                href="https://github.com/koslinj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <img src={Github} width={26} alt="Link to Github" /> koslinj
              </a>
            </li>
            {/* Add more icons if needed */}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-xs text-center py-4 text-gray-500">
        © {new Date().getFullYear()} VidCrop. All rights reserved.
      </div>
    </footer>
  );
}
