import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://gennydee.com"),
  title: { default: "Genny Dee", template: "%s — Genny Dee" },
  description:
    "Creative leader building brands, teams, and systems for ambitious technology companies.",
  openGraph: { type: "website", siteName: "Genny Dee" },
};

// Reads the saved theme before first paint so dark mode never flashes white.
const themeScript = `(function(){try{var t=localStorage.getItem("gd-theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Pixel:ELSH@1..5&family=Geist:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
