import axios from 'axios'
import { useState } from 'react'

axios.defaults.withCredentials = true // ✅ important for sending cookies

function App() {
  const [message, setMessage] = useState('')

  const login = async () => {
    try {
      const res = await axios.post('http://vidcrop.com/auth/login', {
        username: 'user1',
        password: 'password1',
      })
      setMessage(`Login success: ${res.status}`)
    } catch (err: any) {
      console.log(err)
      setMessage(`Login error: ${err.response?.status} - ${err.response?.data}`)
    }
  }

  const testProtected = async () => {
    try {
      const res = await axios.get('http://vidcrop.com/test')
      setMessage(`Test success: ${res.status} - ${res.data}`)
    } catch (err: any) {
      console.log(err)
      setMessage(`Test error: ${err.response?.status} - ${JSON.stringify(err.response?.data)}`)
    }
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Vidcrop</h1>

      <button onClick={login} className="bg-green-500 text-white px-4 py-2 rounded">
        Login
      </button>

      <button onClick={testProtected} className="bg-blue-500 text-white px-4 py-2 rounded">
        Call /test
      </button>

      <p className="text-gray-700">{message}</p>
    </div>
  )
}

export default App
