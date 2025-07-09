import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
      <Navbar />
        {children}
      </body>
    </html>
  );
}
export const metadata = {
  title: "Ailoitte Times",
  description: "Stay updated with the latest news from around the world.",
};