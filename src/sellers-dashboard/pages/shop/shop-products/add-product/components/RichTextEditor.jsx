import React, { useRef, useCallback, useEffect, useState } from "react";
import {
  FiBold,
  FiList,
  FiLink,
  FiItalic,
  FiUnderline,
  FiType,
} from "react-icons/fi";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Enter description...",
}) => {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeStates, setActiveStates] = useState({});

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const updateActiveStates = useCallback(() => {
    const states = {
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
    };
    setActiveStates(states);
  }, []);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateActiveStates();
    }
  }, [onChange, updateActiveStates]);

  const executeCommand = useCallback(
    (command, value) => {
      // Ensure the editor is focused before executing command
      editorRef.current?.focus();

      // handling for lists
      if (
        command === "insertUnorderedList" ||
        command === "insertOrderedList"
      ) {
        // Get current selection
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        // Execute the command
        const success = document.execCommand(command, false, value);

        if (success) {
          // Force a re-render by triggering input event
          setTimeout(() => {
            handleInput();
          }, 10);
        }
      } else {
        document.execCommand(command, false, value);
        handleInput();
      }
    },
    [handleInput]
  );

  const isCommandActive = useCallback(
    (command) => {
      return activeStates[command] || false;
    },
    [activeStates]
  );

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  }, [executeCommand]);

  const handleKeyDown = useCallback(
    (e) => {
      // Handle common keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault();
            executeCommand("bold");
            break;
          case "i":
            e.preventDefault();
            executeCommand("italic");
            break;
          case "u":
            e.preventDefault();
            executeCommand("underline");
            break;
        }
      }
    },
    [executeCommand]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    updateActiveStates();
  }, [updateActiveStates]);

  const handleBlur = () => setIsFocused(false);

  const handleSelectionChange = useCallback(() => {
    // Update active states when selection changes
    if (
      editorRef.current &&
      editorRef.current.contains(document.getSelection().anchorNode)
    ) {
      updateActiveStates();
    }
  }, [updateActiveStates]);

  // Listen for selection changes to update button states
  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [handleSelectionChange]);

  return (
    <div
      className={`rich-text-container border rounded-lg overflow-hidden transition-all duration-200 ${
        isFocused
          ? "border-blue-500 ring-1 ring-blue-500 ring-opacity-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
    >
      {/* Toolbar */}
      <div className="rich-text-toolbar bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center gap-1 flex-wrap">
        {/* Format Selector */}
        <div className="flex items-center gap-1 mr-2">
          <FiType size={14} className="text-gray-500" />
          <select
            onChange={(e) => executeCommand("formatBlock", e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            defaultValue=""
          >
            <option value="">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => executeCommand("bold")}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              isCommandActive("bold")
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
            title="Bold (Ctrl+B)"
          >
            <FiBold size={14} />
          </button>

          <button
            type="button"
            onClick={() => executeCommand("italic")}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              isCommandActive("italic")
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
            title="Italic (Ctrl+I)"
          >
            <FiItalic size={14} />
          </button>

          <button
            type="button"
            onClick={() => executeCommand("underline")}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              isCommandActive("underline")
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
            title="Underline (Ctrl+U)"
          >
            <FiUnderline size={14} />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Lists */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => executeCommand("insertUnorderedList")}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              isCommandActive("insertUnorderedList")
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
            title="Bullet List"
          >
            <FiList size={14} />
          </button>

          <button
            type="button"
            onClick={() => executeCommand("insertOrderedList")}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              isCommandActive("insertOrderedList")
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
            title="Numbered List"
          >
            <div className="flex items-center justify-center w-3.5 h-3.5">
              <span className="text-xs font-medium">1.</span>
            </div>
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Link */}
        <button
          type="button"
          onClick={insertLink}
          className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
          title="Insert Link"
        >
          <FiLink size={14} />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="rich-text-editor px-4 py-3 min-h-[120px] bg-white focus:outline-none text-gray-800 leading-relaxed"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
        style={{
          minHeight: "120px",
        }}
      />
    </div>
  );
};

export default RichTextEditor;
