import DOMPurify from "dompurify";

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
      "img",
      "br",
      "hr",
      "span",
      "blockquote",
      "code",
      "pre",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
    ],
    ALLOWED_ATTR: ["href", "target", "src", "alt", "width", "height"],
  });

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div
        className="rich-text-content prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        style={{
          lineHeight: "1.6",
          color: "#374151",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          hyphens: "auto",
        }}
      />

      <style jsx>{`
        .rich-text-content {
          /* Ensure all content stays within bounds */
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        /* Handle specific elements that can cause overflow */
        .rich-text-content table {
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          display: block;
          white-space: nowrap;
          border-collapse: collapse;
        }

        .rich-text-content thead,
        .rich-text-content tbody,
        .rich-text-content tr {
          display: table;
          width: 100%;
        }

        .rich-text-content th,
        .rich-text-content td {
          display: table-cell;
          padding: 8px;
          border: 1px solid #e5e7eb;
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 200px; /* Prevent cells from getting too wide */
        }

        .rich-text-content pre {
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow-wrap: break-word;
          overflow-x: auto;
          max-width: 100%;
        }

        .rich-text-content code {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .rich-text-content img {
          max-width: 100%;
          height: auto;
        }

        .rich-text-content div,
        .rich-text-content p,
        .rich-text-content span,
        .rich-text-content h1,
        .rich-text-content h2,
        .rich-text-content h3 {
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
        }

        .rich-text-content ul,
        .rich-text-content ol {
          padding-left: 1.5rem;
          max-width: 100%;
        }

        .rich-text-content li {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .rich-text-content blockquote {
          margin: 1rem 0;
          padding-left: 1rem;
          border-left: 4px solid #e5e7eb;
          font-style: italic;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
      `}</style>
    </div>
  );
};

export default SafeProductDescription;
