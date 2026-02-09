document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

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

  const updateOutput = (inputEl, outputEl, outputId) => {
    const value = (inputEl.value || "").trim();
    if (outputId === "o_date") {
      outputEl.textContent = value || "......./......./.......";
      return;
    }
    outputEl.textContent = value;
  };

  const bindField = ({ input, output }) => {
    const inputEl = $(input);
    const outputEl = $(output);
    if (!inputEl || !outputEl) return;
    const handler = () => updateOutput(inputEl, outputEl, output);
    ["input", "change", "keyup", "paste"].forEach((evt) => inputEl.addEventListener(evt, handler));
    handler(); 
  };

  bindings.forEach(bindField);

  // --- LocalStorage Profile Logic ---
  const profileFields = ["i_name", "i_id", "i_batch", "i_sec", "i_sem"];

  const loadProfile = () => {
    profileFields.forEach(id => {
      const savedValue = localStorage.getItem(id);
      if (savedValue) {
        const input = $(id);
        if(input) {
          input.value = savedValue;
          input.dispatchEvent(new Event("input"));
        }
      }
    });
  };

  $("save-profile-btn")?.addEventListener("click", () => {
    profileFields.forEach(id => {
      const input = $(id);
      if(input) localStorage.setItem(id, input.value);
    });
    alert("Profile info saved to this browser!");
  });

  $("clear-profile-btn")?.addEventListener("click", () => {
    if(confirm("This will clear the form and delete your saved info. Proceed?")) {
      document.querySelectorAll("input").forEach(i => i.value = "");
      localStorage.clear();
      location.reload();
    }
  });

  loadProfile();
  // --- End Profile Logic ---

  // --- Responsive Preview Scaling ---
  const scalePreview = () => {
    const container = $("preview-container");
    const element = $("page-to-print");
    if (!container || !element) return;

    // Get available width (subtracting padding 16px*2 = 32px)
    const containerWidth = container.clientWidth - 40; 
    const elementWidth = 794; // approx 210mm in px at 96dpi

    if (containerWidth < elementWidth) {
      const scale = containerWidth / elementWidth;
      element.style.transform = `scale(${scale})`;
      
      // Remove extra whitespace created by scaling
      const heightDifference = element.offsetHeight * (1 - scale);
      element.style.marginBottom = `-${heightDifference}px`;
    } else {
      element.style.transform = "scale(1)";
      element.style.marginBottom = "0px";
    }
  };
  
  window.addEventListener("resize", scalePreview);
  setTimeout(scalePreview, 200); // Initial scale
  // --- End Responsive Preview ---

  // Auto-fill today's date
  const dateInput = $("i_date");
  if (dateInput && !dateInput.value.trim()) {
    const now = new Date();
    dateInput.value = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
    dateInput.dispatchEvent(new Event("input"));
  }

  $("download-btn")?.addEventListener("click", async () => {
    const element = $("page-to-print");
    const mergeFileInput = $("i_merge_pdf");
    if (!element || typeof html2pdf === "undefined") return;

    // Reset transform & margin for PDF generation
    const originalTransform = element.style.transform;
    const originalMargin = element.style.marginBottom;
    element.style.transform = "none";
    element.style.marginBottom = "0px";

    window.scrollTo(0, 0);
    const title = $("i_title")?.value?.trim() || "DIU-Cover-Page";
    const safeTitle = title.replace(/[\\/:*?"<>|]/g, "-");

    const opt = {
      margin: 0, 
      filename: `${safeTitle}.pdf`,
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { 
        scale: 3, 
        useCORS: true, 
        scrollY: 0, 
        windowHeight: 1123, 
        letterRendering: true
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: 'avoid-all' }
    };

    const downloadBtn = $("download-btn");
    downloadBtn.textContent = "Processing...";
    downloadBtn.disabled = true;

    try {
      await document.fonts.ready;
      if (!mergeFileInput.files.length) {
        await html2pdf().set(opt).from(element).save();
      } else {
        const coverPdfBuffer = await html2pdf().set(opt).from(element).outputPdf('arraybuffer');
        const userFileBuffer = await mergeFileInput.files[0].arrayBuffer();
        const { PDFDocument } = PDFLib;
        const mergedPdf = await PDFDocument.create();
        const coverDoc = await PDFDocument.load(coverPdfBuffer);
        const userDoc = await PDFDocument.load(userFileBuffer);
        (await mergedPdf.copyPages(coverDoc, coverDoc.getPageIndices())).forEach(p => mergedPdf.addPage(p));
        (await mergedPdf.copyPages(userDoc, userDoc.getPageIndices())).forEach(p => mergedPdf.addPage(p));
        const blob = new Blob([await mergedPdf.save()], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${safeTitle}-merged.pdf`;
        link.click();
      }
    } catch (err) {
      alert("Error generating PDF.");
    } finally {
      element.style.transform = originalTransform;
      element.style.marginBottom = originalMargin;
      downloadBtn.textContent = "DOWNLOAD PDF";
      downloadBtn.disabled = false;
    }
  });
});
