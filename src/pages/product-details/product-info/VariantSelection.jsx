import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantityControls from "./QuantityControl";

export default function VariantSelection({
  hasVariants,
  availableColors,
  selectedColor,
  onColorSelect,
  colorError,
  availableSizes,
  selectedSize,
  onSizeSelect,
  sizeError,
  quantity,
  onIncrement,
  onDecrement,
  currentVariant,
  productQuantity,
}) {
  return (
    <div>
      {/* Color and Quantity Section - Fixed Layout */}
      <div className="my-6">
        {hasVariants ? (
          // Layout when variants exist
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <ColorSelector
                availableColors={availableColors}
                selectedColor={selectedColor}
                onColorSelect={onColorSelect}
              />
              {/* Color error message */}
              {colorError && (
                <div className="text-red-500 text-sm font-medium">
                  {colorError}
                </div>
              )}
            </div>

            <div className="ml-6">
              <QuantityControls
                quantity={quantity}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                currentVariant={currentVariant}
              />
            </div>
          </div>
        ) : (
          // Layout when no variants - quantity control positioned normally
          <div className="flex justify-start">
            <QuantityControls
              quantity={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              currentVariant={currentVariant}
              productQuantity={productQuantity}
            />
          </div>
        )}
      </div>

      {/* Size options */}
      <div>
        <SizeSelector
          availableSizes={availableSizes}
          selectedSize={selectedSize}
          onSizeSelect={onSizeSelect}
        />
        {/* Size error message */}
        {sizeError && (
          <div className="text-red-500 text-sm font-medium">{sizeError}</div>
        )}
      </div>
    </div>
  );
}
