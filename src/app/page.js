
import Login from "./_components/Login";
import Header from "./_components/Header";


export default function Page() {
  return (
    <div className="w-full absolute inset-0">
      {/* Background Image */}
     

      {/* Content Div */}
      <div className="w-full h-full absolute left-0 flex items-center justify-center">
       
        <div className="rounded-lg lg:w-[60rem] sm:w-[21rem] lg:h-[35rem] sm:h-[45rem] bg-white z-10 flex lg:flex-row sm:flex-col  justify-between border border-black sm:mt-8">
          <div className="lg:w-40 lg:ml-24 sm:ml-4 mt-2 gap-y-4">
             <Header />
            <h2 className="lg:text-xl sm:text-sm font-bold mt-8 mb-8">
              Track your <span className="">Expenses</span>
              <div className="lg:w-24 sm:w-12 h-1 bg-black"></div>
              without any hassle
            </h2>
            <p className="sm:text-[0.675rem] lg:text-sm">
              Login or Signup into our website and keep an eye on your daily expenses. Expense Hub
              is easy to understand and can be your best friend in saving
              suggestions.
            </p>
           
          </div>
          
          <Login />
     
        </div>
      </div>
    </div>
  );
}

// ExpenseTracker.js
