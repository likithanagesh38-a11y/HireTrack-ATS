function Button({ text, onClick }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
    >
      {text}
    </button>
  );
}

export default Button;