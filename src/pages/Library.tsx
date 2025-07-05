import { FilesList } from '../components/FilesList';

export function Library() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Video Library</h1>
        <FilesList />
      </div>
    </div>
  );
}
