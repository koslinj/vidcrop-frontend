import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, X } from 'lucide-react' // Or any icon lib you prefer
import axios from 'axios'

export function UserMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close drawer on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    else document.removeEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleLogout = async () => {
    try {
      await axios.post('http://vidcrop.com/auth/logout', null)
      navigate('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <>
      {/* User icon button */}
      <button
        onClick={() => setOpen(true)}
        className="p-3 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Open user menu"
      >
        <User className="w-6 h-6 text-gray-700" />
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black opacity-30 z-40"></div>
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Account</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-4">
          {/* You can add more account related links here */}
          {/* Example: <Link to="/profile" className="block text-gray-700 hover:text-blue-600">Profile</Link> */}

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            Logout
          </button>
        </nav>
      </div>
    </>
  )
}
