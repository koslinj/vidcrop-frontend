import { FilesList } from '../components/FilesList'
import { Link } from 'react-router-dom'

export default function Dashboard() {

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <p className="text-center text-gray-600">Welcome! You are logged in.</p>

        <div className="flex flex-col gap-2 mt-4">
          <Link
            to="/upload"
            className="bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
          >
            Upload Video
          </Link>
          <Link
            to="/library"
            className="bg-gray-600 text-white text-center py-2 rounded hover:bg-gray-700"
          >
            View All Videos
          </Link>
        </div>
      </div>

      <div className="w-full max-w-6xl p-6 bg-white rounded-lg shadow space-y-4 mt-4">
        <h2 className="text-xl font-semibold">Recently Cropped:</h2>
        <FilesList />
      </div>
    </div>
  )
}
