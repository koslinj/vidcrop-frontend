import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post('http://vidcrop.com/auth/logout', null)
      navigate('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-4"
    >
      Logout
    </button>
  )
}
