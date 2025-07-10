export default function Toggle({
  value,
  onChange,
  labelOn = "On",
  labelOff = "Off",
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative w-14 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        value ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          value ? "translate-x-8" : ""
        }`}
      />
      <span className="absolute left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold">
        {value ? labelOn : labelOff}
      </span>
    </button>
  );
}
