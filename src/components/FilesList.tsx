import axios from 'axios';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface File {
  filename: string
}

export function FilesList() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await axios.get<File[]>("http://vidcrop.com/files");
        const onlyCropped = response.data.filter(item => item.filename.includes("cropped/"))
        setFiles(onlyCropped)
      } catch (err: any) {
        setError(err.response?.data?.error || err.message || "Failed to fetch files");
      }
    }
    fetchFiles();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!files.length) return <div>No files found.</div>;

  return (
    <ul className='flex flex-wrap gap-4'>
      {files.map((file) => (
        <div className='flex flex-col items-center'>
          <video
            src={`http://vidcrop.com/download/${encodeURIComponent(file.filename)}`}
            controls
            playsInline
            preload="metadata"
            className="h-64 object-cover rounded"
          >
            Your browser does not support the video tag.
          </video>
          <Link to={`download/${encodeURIComponent(file.filename)}`} className='flex gap-x-2 mt-2 text-lg hover:underline hover:scale-110 duration-200'>
            <div>...{file.filename.slice(-16)}</div>
            <SquareArrowOutUpRight />
          </Link>
        </div>
      ))}
    </ul>
  );
}
