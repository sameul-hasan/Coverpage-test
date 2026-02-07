document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  if (!sessionStorage.getItem("cp_first_version_alert")) {
    alert("Note: This is the first version, so there may be bugs on mobile devices.");
    sessionStorage.setItem("cp_first_version_alert", "1");
  }

  const bindings = [
    { input: "i_title", output: "o_title" },
    { input: "i_sem", output: "o_sem" },
    { input: "i_name", output: "o_name" },
    { input: "i_id", output: "o_id" },
    { input: "i_batch", output: "o_batch" },
    { input: "i_sec", output: "o_sec" },
    { input: "i_code", output: "o_code" },
    { input: "i_cname", output: "o_cname" },
    { input: "i_tname", output: "o_tname" },
    { input: "i_desig", output: "o_desig" },
    { input: "i_date", output: "o_date" }
  ];

  // Update output fields in real-time
  const updateOutput = (inputEl, outputEl, outputId) => {
    const value = (inputEl.value || "").trim();
    if (outputId === "o_date") {
      outputEl.textContent = value || "......./......./.......";
      return;
    }
    outputEl.textContent = value;
  };

  // Bind input field to output element
  const bindField = ({ input, output }) => {
    const inputEl = $(input);
    const outputEl = $(output);
    if (!inputEl || !outputEl) return;

    const handler = () => updateOutput(inputEl, outputEl, output);
    ["input", "change", "keyup", "paste"].forEach((evt) => {
      inputEl.addEventListener(evt, handler);
    });
    handler(); // initialize immediately
  };

  // Auto-fill today's date if empty
  const setTodayIfEmpty = () => {
    const dateInput = $("i_date");
    if (!dateInput || dateInput.value.trim()) return;

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    dateInput.value = `${dd}/${mm}/${yyyy}`;
    dateInput.dispatchEvent(new Event("input"));
  };

  // Bind all fields
  bindings.forEach(bindField);
  setTodayIfEmpty();

  // Download PDF with print-safe margins
  $("download-btn")?.addEventListener("click", async () => {
    const element = $("page-to-print");
    if (!element || typeof html2pdf === "undefined") {
      alert("PDF library not loaded");
      return;
    }

    const title = $("i_title")?.value?.trim() || "DIU-Cover-Page";
    const safeTitle = title.replace(/[\\/:*?"<>|]/g, "-");

    const opt = {
      margin: [0, 0], // print-safe margins in mm
      filename: `${safeTitle}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    };

    // Ensure fonts are loaded before export
    await document.fonts.ready;

    html2pdf().set(opt).from(element).save();
  });
});
