const UrlInput = ({ value, onChange, onAdd, onCancel, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <div className="flex gap-2">
        <button
          onClick={onAdd}
          className="px-3 py-1 bg-blue-500 text-white rounded-md"
        >
          Add
        </button>
        <button onClick={onCancel} className="px-3 py-1 bg-gray-200 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UrlInput;
