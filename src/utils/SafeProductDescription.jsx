import DOMPurify from 'dompurify'
const SafeProductDescription = ({ description }) => {
  const sanitizedHTML = DOMPurify.sanitize(description, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "p",
      "div",
      "b",
      "strong",
      "i",
      "em",
      "u",
      "ul",
      "ol",
      "li",
      "a",
    ],
    ALLOWED_ATTR: ["href", "target"],
  });

  return (
    <div className="product-description">
      <div
        className="rich-text-content"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        style={{
          lineHeight: "1.6",
          color: "#374151",
        }}
      />

      
    </div>
  );
};
export default SafeProductDescription;
