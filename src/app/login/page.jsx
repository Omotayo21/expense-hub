import background from "../../../public/background.svg";
import Image from "next/image";
import Login from "../_components/Login";

export default function LoginPage() {
  return (
    <div className="w-full absolute inset-0">
      {/* Background Image */}
      <Image
        src={background}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className=" w-full h-full absolute top-0 left-0 transition-opacity duration-300 opacity-90 bg-black "
      />

      {/* Content Div */}
      <div className="w-full h-full absolute left-0 flex items-center justify-center">
        <div className="rounded-lg w-[60rem] h-[35rem] bg-white z-10 text-red-500 flex flex-row  justify-between">
          <div className="w-40 ml-24 gap-y-8">
            <h2 className="text-xl font-bold mt-12 mb-8">
              Track your <span className="">Expenses</span>
              <div className="w-24 h-1 bg-black"></div>
              without any hassle
            </h2>
            <p>
              install our app and keep an eye on your daily expenses. Spenotrack
              is easy to understand and can be your best friend in saving
              suggestions
            </p>
            <div className="flex flex-col gap-y-4">
              <button className=" bg-black text-white w-20  "> start</button>
              <button className=" bg-black text-white w-24  ">
                contact us
              </button>
            </div>
          </div>
          <Login />
        </div>
      </div>
    </div>
  );
}

// ExpenseTracker.js
