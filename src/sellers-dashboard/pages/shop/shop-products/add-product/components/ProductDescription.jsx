import RichTextEditor from "./RichTextEditor";

const ProductDescription = ({ description, onDescriptionChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-[16px] font-medium mb-2">Product Description</h3>

      <div className="border-[1px] border-neutral-200 p-4 rounded-md">
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Product Description
          </label>
          <RichTextEditor
            value={description || ""}
            onChange={onDescriptionChange}
            placeholder="Provide detailed information about the product, including features, materials, usage instructions, and any other relevant details."
          />
        </div>
      </div>
    </div>
  );
};
export default ProductDescription;