export default function LoadingSpinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
    </div>
  );
}