interface MessageProps {
  message: string
  type: 'success' | 'error'
}

export function Message({ message, type }: MessageProps) {
  return (
    <div className={`text-sm text-center ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
      {message}
    </div>
  )
}
