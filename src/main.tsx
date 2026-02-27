import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ─── Capture Calendly query params BEFORE React mounts ───
// Calendly redirects to /thank-you/?param=value...
// We must grab them here, synchronously, before React Router touches the URL.
(function persistCalendlyParams() {
  try {
    const sp = new URLSearchParams(window.location.search);
    const keys = [
      "invitee_first_name", "invitee_last_name", "invitee_full_name",
      "event_start_time", "event_end_time", "assigned_to", "answer_5", "answer_6",
    ];
    const params: Record<string, string> = {};
    let found = false;
    for (const key of keys) {
      const v = sp.get(key);
      if (v && v.trim() !== "") {
        params[key] = v.trim();
        found = true;
      }
    }
    if (found) {
      sessionStorage.setItem("calendly_params", JSON.stringify(params));
    }
  } catch { /* ignore */ }
})();

createRoot(document.getElementById("root")!).render(<App />);
