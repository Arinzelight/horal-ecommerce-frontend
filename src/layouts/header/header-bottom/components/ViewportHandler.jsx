import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const ViewportHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Reset viewport for all pages by default
    const defaultViewport = "width=device-width, initial-scale=1";
    const homeViewport = "width=960";

    // Choose viewport depending on current path
    const viewportContent =
      location.pathname === "/" ? homeViewport : defaultViewport;

    // Dynamically update the meta tag
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement("meta");
      viewportMeta.name = "viewport";
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute("content", viewportContent);
  }, [location]);

  return null;
};

export default ViewportHandler;
