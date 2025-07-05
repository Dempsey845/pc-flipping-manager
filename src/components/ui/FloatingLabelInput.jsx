export default function FloatingLabelInput({
  label,
  value,
  onChange,
  type = "text",
  id,
}) {
  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center border border-gray-300 hover:border-gray-500 rounded p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="peer w-full bg-transparent outline-none placeholder-transparent pt-5"
          placeholder={label}
        />
        <label
          htmlFor={id}
          className="absolute left-3 px-1 text-gray-400 pointer-events-none transition-all duration-200 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
            peer-focus:top-[10px] peer-focus:text-xs peer-focus:text-blue-600
            peer-not-placeholder-shown:top-[10px] peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-blue-600"
        >
          {label}
        </label>
      </div>
    </div>
  );
}
