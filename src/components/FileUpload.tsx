import { useState } from 'react'
import axios from 'axios'
import { ProgressBar } from './ProgressBar'
import { UploadButton } from './UploadButton'

interface FileUploadProps {
  onSuccess: () => void
  onError: (message: string) => void
}

export function FileUpload({ onSuccess, onError }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0) // Track upload progress
  const [isUploading, setIsUploading] = useState(false) // Track if upload is in progress

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return onError('Please select a file first')

    const formData = new FormData()
    formData.append('video', file)
    formData.append('email', 'test@gmail.com') // Replace if needed

    setIsUploading(true) // Start uploading
    setProgress(0) // Reset progress bar

    try {
      await axios.post('http://vidcrop.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent: any) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percentage) // Update progress
        },
      })
      setIsUploading(false) // Stop uploading
      onSuccess()
      setFile(null) // Reset file input after successful upload
    } catch (err: any) {
      setIsUploading(false)
      onError(`❌ Upload failed: ${err.response?.data?.error || 'Unknown error'}`)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {isUploading && <ProgressBar progress={progress} />}
      <UploadButton isUploading={isUploading} onClick={handleUpload} />
    </div>
  )
}
