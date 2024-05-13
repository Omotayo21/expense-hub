
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "../redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Hub",
  description: "Track yor expenses with ease",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          < ToastContainer />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
  }

