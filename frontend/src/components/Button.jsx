export default function Button({ text, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full bg-indigo-500 hover:bg-indigo-600 transition text-white py-2 rounded-lg font-semibold flex justify-center items-center"
    >
      {loading ? "Processing..." : text}
    </button>
  );
}
