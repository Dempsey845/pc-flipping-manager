const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  name,
  id,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={id || name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-xl border border-gray-300 hover:border-gray-500 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      />
    </div>
  );
};

export default TextArea;
