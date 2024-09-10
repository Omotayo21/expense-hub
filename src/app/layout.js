
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
  const FetchExpenses = async () => {
         const res = await axios.get("/api/users/me");
         console.log(res.data);

         const userExpenses = res.data.data.expenses;
         dispatch(setExpenses(userExpenses));
       };
       const FetchRevenues = async () => {
         const res = await axios.get("/api/users/me");
         console.log(res.data);

         const userRevenues = res.data.data.revenues;
         dispatch(setRevenue(userRevenues));
       };
        useEffect(() => {
          FetchExpenses();
          FetchRevenues()
        }, []);
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

