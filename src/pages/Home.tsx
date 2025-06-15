import { useState } from 'react'
import { FileUpload } from '../components/FileUpload'
import { LogoutButton } from '../components/LogoutButton'
import { Message } from '../components/Message'
import { FilesList } from '../components/FilesList'

export default function Home() {
  const [uploadMessage, setUploadMessage] = useState('')

  const handleUploadSuccess = () => {
    setUploadMessage('✅ Upload successful!')
  }

  const handleUploadError = (message: string) => {
    setUploadMessage(message)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <p className="text-center text-gray-600">Welcome! You are logged in.</p>

        <FileUpload onSuccess={handleUploadSuccess} onError={handleUploadError} />

        {uploadMessage && <Message message={uploadMessage} type={uploadMessage.includes('success') ? 'success' : 'error'} />}

        <h2 className="text-xl font-bold text-center mb-0">Your files:</h2>
        <FilesList />

        <LogoutButton />
      </div>
    </div>
  )
}
