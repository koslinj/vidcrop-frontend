import Cropper from 'react-easy-crop'

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

interface VideoCropperProps {
  videoUrl: string
  crop: { x: number; y: number }
  zoom: number
  setCrop: (crop: { x: number; y: number }) => void
  setZoom: (zoom: number) => void
  onCropComplete: (croppedArea: any, croppedAreaPixels: CropArea) => void
}

export function VideoCropper({
  videoUrl,
  crop,
  zoom,
  setCrop,
  setZoom,
  onCropComplete,
}: VideoCropperProps) {

  return (
    <div className='relative w-full h-[400px]'>
      <Cropper
        objectFit='contain'
        video={videoUrl}
        crop={crop}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </div>
  )
}
