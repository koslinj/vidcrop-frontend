import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Download() {
  const { videoId = '' } = useParams()
  const [videoExists, setVideoExists] = useState<boolean | null>(null) // null = still checking

  const videoUrl = `http://vidcrop.com/download/${encodeURIComponent(videoId)}`

  useEffect(() => {
    const checkVideoExistence = async () => {
      try {
        await axios.head(videoUrl)
        setVideoExists(true) // File exists
      } catch (error: any) {
        if (error.response?.status !== 404) {
          console.error('Error checking video existence:', error)
        }
        setVideoExists(false)
      }
    }

    checkVideoExistence()
  }, [videoId])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = videoUrl
    link.download = '' // Let browser/server decide filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (videoExists === null) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <p className="text-gray-700 text-lg">Checking video availability...</p>
      </div>
    )
  }

  if (!videoExists) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Video Not Found</h1>
        <p className="text-gray-600 mb-4">The requested video does not exist or cannot be loaded.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Watch and Download Your Video</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full rounded"
        >
          Your browser does not support the video tag.
        </video>

        <button
          onClick={handleDownload}
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Video
        </button>
      </div>
    </div>
  )
}

export default Download