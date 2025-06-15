import axios from 'axios';
import { useEffect, useState } from 'react';

export function FilesList() {
  const [files, setFiles] = useState<{filename: string}[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await axios.get("http://vidcrop.com/files");
        setFiles(response.data)
      } catch (err: any) {
        setError(err.response?.data?.error || err.message || "Failed to fetch files");
      }
    }
    fetchFiles();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!files.length) return <div>No files found.</div>;

  return (
    <ul>
      {files.map((file) => (
        <li key={file.filename}>{file.filename}</li>
      ))}
    </ul>
  );
}
