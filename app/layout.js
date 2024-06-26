
import "./globals.css";



export const metadata = {
  title: "tok2dbs",
  description: "Talk2DB is a simple chat app that uses talk to scientific databases.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
