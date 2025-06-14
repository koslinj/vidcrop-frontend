import { useState, useCallback } from 'react'
import axios from 'axios'
import { ProgressBar } from './ProgressBar'
import { UploadButton } from './UploadButton'
import { VideoCropper } from './VideoCropper'

interface FileUploadProps {
  onSuccess: () => void
  onError: (message: string) => void
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export function FileUpload({ onSuccess, onError }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [email, setEmail] = useState('')

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setVideoUrl(URL.createObjectURL(selectedFile))
    }
  }

  const onCropComplete = useCallback((_: any, croppedPixels: CropArea) => {
    setCroppedAreaPixels(croppedPixels)
    console.log(croppedPixels)
  }, [])

  const handleUpload = async () => {
    if (!file) return onError('Please select a file first')
    if (!croppedAreaPixels) return onError('Please define a crop area')
    if (!email) return onError('Please enter your email to get notified when processing is finished')

    const formData = new FormData()
    formData.append('video', file)
    formData.append('email', email)
    formData.append('cropX', String(croppedAreaPixels.x))
    formData.append('cropY', String(croppedAreaPixels.y))
    formData.append('cropWidth', String(croppedAreaPixels.width))
    formData.append('cropHeight', String(croppedAreaPixels.height))

    setIsUploading(true)
    setProgress(0)

    try {
      await axios.post('http://vidcrop.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent: any) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percentage)
        },
      })
      setIsUploading(false)
      onSuccess()
      setFile(null)
      setVideoUrl(null)
    } catch (err: any) {
      setIsUploading(false)
      onError(`❌ Upload failed: ${err.response?.data?.error || 'Unknown error'}`)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {videoUrl && (
        <VideoCropper
          videoUrl={videoUrl}
          crop={crop}
          zoom={zoom}
          setCrop={setCrop}
          setZoom={setZoom}
          onCropComplete={onCropComplete}
        />
      )}

      {isUploading && <ProgressBar progress={progress} />}
      <div className="mb-4 w-64 mx-auto mt-4">
        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 text-center">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
      </div>

      <UploadButton isUploading={isUploading} onClick={handleUpload} />
    </div>
  )
}
