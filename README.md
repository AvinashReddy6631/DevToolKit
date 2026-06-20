# Developer Productivity Toolkit

<div align="center">

![DevToolkit Banner](https://img.shields.io/badge/DevToolkit-Productivity_Suite-6366f1?style=for-the-badge&logo=react&logoColor=white)

**A modern, free, browser-based suite of essential developer tools.**

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

Built by **Avinash Reddy** · [dareddy2005@gmail.com](mailto:dareddy2005@gmail.com)

[![Built for Digital Heroes](https://img.shields.io/badge/Built_for-Digital_Heroes-ec4899?style=flat-square)](https://digitalheroesco.com)

</div>



## ✨ Features

| Tool | Description |
|------|-------------|
| 🗂️ **JSON Formatter & Validator** | Beautify, validate, and minify JSON with precise error messages |
| 🔐 **Secure Password Generator** | Crypto-random passwords with strength meter and entropy stats |
| 📱 **QR Code Generator** | Generate QR codes from text/URLs, download as PNG |
| 📝 **Word & Character Counter** | Real-time text analysis: words, characters, sentences, reading time |



## 🛠️ Tech Stack

- **React 18** — UI framework
- **Vite 5** — Lightning-fast bundler
- **Tailwind CSS v3** — Utility-first styling
- **qrcode.react** — QR code generation
- **lucide-react** — Icon library
- **Web Crypto API** — Cryptographically secure password generation



## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd dev-productivity-toolkit

# Install dependencies
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```



## 📦 Deployment

### Deploy to Vercel (Recommended)

**Option 1: One-click via Vercel Dashboard**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and click **New Project**
3. Import your GitHub repository
4. Vercel auto-detects Vite — click **Deploy**

**Option 2: Vercel CLI**
```bash
npm install -g vercel
vercel
```

**Option 3: via GitHub Actions**
Push to `main` branch → Vercel auto-deploys via GitHub integration.

> **Note:** No environment variables needed. The app is fully static.


## 📁 Project Structure

```
dev-productivity-toolkit/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx       # Sticky nav with Digital Heroes CTA
│   │   │   └── Footer.jsx       # Author info + attribution
│   │   ├── tools/
│   │   │   ├── JsonFormatter.jsx
│   │   │   ├── PasswordGenerator.jsx
│   │   │   ├── QrCodeGenerator.jsx
│   │   │   └── WordCounter.jsx
│   │   └── ui/
│   │       ├── Card.jsx         # Glassmorphism card wrapper
│   │       ├── Button.jsx       # Multi-variant button
│   │       ├── CopyButton.jsx   # Animated copy button
│   │       ├── Badge.jsx        # Status badge
│   │       └── Toast.jsx        # Notification toasts
│   ├── hooks/
│   │   ├── useClipboard.js
│   │   └── useToast.js
│   ├── utils/
│   │   ├── jsonUtils.js
│   │   ├── passwordUtils.js
│   │   └── textUtils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```



## 🎨 Design Highlights

- **Dark mode** glassmorphism UI with animated background mesh
- **Indigo → Violet → Pink** gradient accent system
- **Inter** + **JetBrains Mono** typography
- Smooth tab transitions and micro-animations
- Fully responsive: mobile-first, tested at 375px–2560px



## 🔒 Privacy

All tools run entirely in your browser. No data is ever sent to any server.



## 👤 Author

**Avinash Reddy**  
📧 [dareddy2005@gmail.com](mailto:dareddy2005@gmail.com)


## 🏆 Built for Digital Heroes

This project was created as part of a software developer assessment.  
[Visit Digital Heroes Co →](https://digitalheroesco.com)


## 📄 License

MIT © 2026 Avinash Reddy
