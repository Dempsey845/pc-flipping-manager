import { useState, useEffect } from "react";
import Toggle from "./ui/Toggle";
import FloatingLabelInput from "./ui/FloatingLabelInput";

const DEFAULT_BREAKDOWN = [
  { component: "CPU", cost: "" },
  { component: "GPU", cost: "" },
  { component: "Motherboard", cost: "" },
  { component: "RAM", cost: "" },
  { component: "Storage", cost: "" },
  { component: "Case", cost: "" },
  { component: "PSU", cost: "" },
];

const formatCurrency = (value) =>
  isNaN(value) ? "" : `£${Number(value).toFixed(2)}`;

export default function PriceBreakdown() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState([...DEFAULT_BREAKDOWN]);
  const [sellPrice, setSellPrice] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [profitLoss, setProfitLoss] = useState("");

  const handleBreakdownChange = (index, field, value) => {
    const updated = [...priceBreakdown];
    updated[index][field] = value;
    setPriceBreakdown(updated);
  };

  const addNewComponentRow = () => {
    setPriceBreakdown([...priceBreakdown, { component: "", cost: "" }]);
  };

  const removeComponentRow = (index) => {
    setPriceBreakdown((prev) => prev.filter((_, i) => i !== index));
  };

  const resetBreakdown = () => {
    setPriceBreakdown([...DEFAULT_BREAKDOWN]);
  };

  useEffect(() => {
    const total = priceBreakdown.reduce((sum, item) => {
      const cost = parseFloat(item.cost);
      if (!isNaN(cost) && cost >= 0) {
        return sum + cost;
      }
      return sum;
    }, 0);
    setTotalCost(total);
  }, [priceBreakdown]);

  useEffect(() => {
    const sell = parseFloat(sellPrice);
    if (!isNaN(sell)) {
      const profit = sell - totalCost;
      setProfitLoss(profit.toFixed(2));
    } else {
      setProfitLoss("");
    }
  }, [sellPrice, totalCost]);

  return (
    <>
      <div className="flex items-center gap-4">
        <span className="text-lg">Price breakdown:</span>
        <Toggle
          value={isEnabled}
          onChange={setIsEnabled}
          labelOn=""
          labelOff=""
        />
      </div>
      {isEnabled && (
        <div className="price-breakdown flex flex-col gap-3 w-full max-w-xl">
          {priceBreakdown.map((item, index) => (
            <div key={index} className="row flex gap-2 items-end">
              <FloatingLabelInput
                label="Component"
                value={item.component}
                onChange={(e) =>
                  handleBreakdownChange(index, "component", e.target.value)
                }
                id={`component-${index}`}
              />
              <FloatingLabelInput
                label="Cost"
                type="number"
                value={item.cost}
                onChange={(e) =>
                  handleBreakdownChange(index, "cost", e.target.value)
                }
                id={`cost-${index}`}
              />
              {item.cost < 0 && (
                <span className="text-sm text-red-500">
                  Cost can't be negative
                </span>
              )}
              <button
                type="button"
                onClick={() => removeComponentRow(index)}
                className="text-red-500 font-bold px-2 pb-2 hover:text-red-700 text-xl"
                title="Remove"
              >
                ❌
              </button>
            </div>
          ))}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={addNewComponentRow}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + Add Component
            </button>
            <button
              type="button"
              onClick={resetBreakdown}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Reset to Default
            </button>
          </div>
        </div>
      )}
      {/* : ( //{" "}
      <div className="mt-3 text-sm text-gray-600 font-medium">
        // Estimated Total Cost: //{" "}
        <span className="font-semibold">{formatCurrency(totalCost)}</span>
        //{" "}
      </div>
       )} */}
      <div className="flex items-center gap-4 mt-4">
        <FloatingLabelInput
          label="Sell Price"
          type="number"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          id="sell price"
        />
        <FloatingLabelInput
          label="Total Cost"
          type="number"
          value={totalCost}
          onChange={(e) => !isEnabled && setTotalCost(e.target.value)}
          onBlur={() => {
            if (!isEnabled) {
              const val = parseFloat(totalCost);
              if (!isNaN(val)) setTotalCost(val.toFixed(2));
            }
          }}
          id="total cost"
          readOnly={isEnabled}
        />

        <FloatingLabelInput
          label="Profit / Loss"
          type="text"
          value={profitLoss !== "" ? formatCurrency(profitLoss) : ""}
          id="profit loss"
          readOnly
        />
      </div>
    </>
  );
}
