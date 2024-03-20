
import Header from "../_components/Navbar";

import Sidebar from "../_components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function sharedLayout({ children }) {
 
  
  return (
    <div>
      <ToastContainer />
      <Sidebar />
      <Header />
      {children}
    </div>
  );
}
