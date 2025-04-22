interface UploadButtonProps {
  isUploading: boolean
  onClick: () => void
}

export function UploadButton({ isUploading, onClick }: UploadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4"
      disabled={isUploading} // Disable button while uploading
    >
      {isUploading ? 'Uploading...' : 'Upload Video'}
    </button>
  )
}
