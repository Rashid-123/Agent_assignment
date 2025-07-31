import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Agent Management System",
  description: "Manage your agents efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <Navbar />
          <div className="pt-16 sm:pt-18 md:pt-20 lg:pt-20">
            <Toaster position="top-right" reverseOrder={false} />
            <main className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 min-h-screen">
              {children}
            </main>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}