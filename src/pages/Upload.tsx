import { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { Message } from '../components/Message';

export function Upload() {
  const [uploadMessage, setUploadMessage] = useState('');

  const handleUploadSuccess = () => {
    setUploadMessage('✅ Upload successful!');
  };

  const handleUploadError = (message: string) => {
    setUploadMessage(message);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Upload Video</h1>
        <p className="text-center text-gray-600">Choose a video to upload.</p>

        <FileUpload onSuccess={handleUploadSuccess} onError={handleUploadError} />

        {uploadMessage && (
          <Message
            message={uploadMessage}
            type={uploadMessage.includes('success') ? 'success' : 'error'}
          />
        )}

      </div>
    </div>
  );
}
