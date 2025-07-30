
const ConditionSelector = ({
  category,
  selectedCondition,
  onConditionChange,
}) => {
  // Condition options based on category
  const conditionsByCategory = {
    food: ["fresh", "frozen", "canned"], // Special conditions for food
    default: ["brand new", "used"], // Default conditions for all other categories
  };

  // Get conditions for the selected category
  const conditions =
    category === "foods"
      ? conditionsByCategory.food
      : conditionsByCategory.default;

  return (
    <div className="mb-6">
      <h3 className="text-[16px] font-medium mb-2">Condition</h3>
      <div className=" border-[1px] border-neutral-200 p-4 rounded-md">
        <div className="flex flex-wrap gap-3 border-[1px] border-neutral-200 p-4 rounded-md">
          {conditions.map((condition) => (
            <label key={condition} className="inline-flex items-center">
              <input
                type="radio"
                name="condition"
                value={condition}
                checked={selectedCondition === condition}
                onChange={() => onConditionChange(condition)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">{condition}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConditionSelector;
