import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
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
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Home - Protected</h1>
      <p>Welcome! You are logged in.</p>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}
