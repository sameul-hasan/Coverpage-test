<div align="center">

# 📄 DIU Cover Page Generator

### _Create Professional Academic Cover Pages in Seconds_

![HTML](https://img.shields.io/badge/HTML-79.3%25-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-20.7%25-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

[✨ Live Demo](https://sameul-hasan.github.io/Coverpage-test/) • [🐛 Report Bug](https://github.com/sameul-hasan/Coverpage-test/issues) • [💡 Request Feature](https://github.com/sameul-hasan/Coverpage-test/issues)

<img src="https://raw.githubusercontent.com/sameul-hasan/Coverpage-test/main/diulogoside.png" alt="DIU Logo" width="300"/>

</div>

---

## 🎯 Overview

**DIU Cover Page Generator** is a beautifully designed, user-friendly web application that helps students at Daffodil International University (DIU) create professional cover pages for their academic submissions. Simply fill in your details, preview in real-time, and download as a PDF—no design skills required!

### ✨ Key Features

- 🎨 **Instant Preview** - See your cover page update in real-time as you type
- 📥 **One-Click PDF Export** - High-quality PDF generation with proper formatting
- 📱 **Responsive Design** - Works seamlessly on desktop (mobile support coming soon!)
- 🎓 **Multiple Templates** - Choose from various assignment types:
  - Theory Assignment
  - Lab Assignment Report
  - Lab Report
  - Lab Final Report
- 🚀 **Zero Installation** - Runs directly in your browser
- 💾 **Auto-Save** - Your data is preserved in the session

---

## 🖼️ Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x450/003366/FFFFFF?text=Preview+Coming+Soon" alt="App Preview" width="700"/>
  <p><i>Intuitive form interface with real-time preview</i></p>
</div>

---

## 🚀 Getting Started

Visit **[https://sameul-hasan.github.io/Coverpage-test/](https://sameul-hasan.github.io/Coverpage-test/)** to start creating your professional cover pages instantly!

No installation, no setup—just open and use! 🎉

---

## 📖 How to Use

1. **Fill in Your Details**
   - Select your assignment type from the dropdown
   - Enter your semester, name, student ID, batch, and section
   - Add course information and instructor details
   - Optionally set a submission date (defaults to today)

2. **Preview Your Cover Page**
   - Watch as your cover page updates in real-time
   - Ensure all information is correct

3. **Download as PDF**
   - Click the "Download PDF" button
   - Your cover page will be saved as a high-quality PDF file
   - Ready to submit!

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Structure and markup |
| **Tailwind CSS** | Modern, responsive styling |
| **JavaScript (ES6+)** | Interactive functionality |
| **html2pdf.js** | PDF generation |

---

## 📂 Project Structure

```
Coverpage-test/
│
├── index.html          # Main HTML file with form and preview
├── app.js              # JavaScript logic for data binding and PDF export
├── diulogoside.png     # DIU institutional logo
└── README.md           # You are here!
```

---

## 🎨 Features in Detail

### Real-Time Data Binding
The application uses efficient DOM manipulation to update the preview instantly as you type. All form inputs are bound to their corresponding output elements.

### Intelligent Date Handling
If you don't provide a submission date, the app automatically fills in today's date in DD/MM/YYYY format.

### PDF Export with Quality
- High-resolution output (scale: 2x)
- A4 format with proper margins
- JPEG compression for optimal file size
- Filename based on your assignment type

---

## 🔧 Configuration

The PDF generation can be customized in `app.js`:

```javascript
const opt = {
  margin: [0, 0],        // Print-safe margins (mm)
  filename: `${safeTitle}.pdf`,
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
};
```

---

## 🐛 Known Issues

- ⚠️ **Mobile Experience**: First version may have bugs on mobile devices. We recommend using a desktop or laptop for best results.
- The alert notification shows on first visit (stored in session storage).

---

## 🗺️ Roadmap

- [ ] Full mobile device support
- [ ] Additional cover page templates
- [ ] Custom logo upload option
- [ ] Dark mode support
- [ ] Save/Load templates locally
- [ ] Multi-language support
- [ ] Batch PDF generation for multiple students

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👥 Authors

**Sameul Hasan** & **Efti**

- GitHub: [@sameul-hasan](https://github.com/sameul-hasan)

---

## 💙 Acknowledgments

- Built with ❤️ for DIU students
- Powered by [Tailwind CSS](https://tailwindcss.com/)
- PDF generation by [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
- DIU institutional logo and branding

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with 💙 for DIU Community**

</div>
