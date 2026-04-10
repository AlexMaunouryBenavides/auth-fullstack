import { useState } from "react";
import { useNavigate } from "react-router";

export default function login() {
   const navigate = useNavigate();
   // state to hold the form data
   const [formData, setFormData] = useState({ email: "", password: "" });
   const [error, setError] = useState<string | null>(null);
   // function to handle login changes
   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   }
   //    function to handle submit,ready to send the form data to the server
   async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      // send formData to the server for authentication
      const res = await fetch("http://localhost:3000/api/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         credentials: "include",
         body: JSON.stringify(formData),
      });
      if (res.ok) {
         navigate("/dashboard");
      } else {
         const data = await res.json();
         setError(data.message || "Login failed");
      }
   }
   return (
      <div className="flex justify-center items-center flex-col h-screen">
         <h1 className="text-3xl text-green-400 font-bold ">LOGIN</h1>
         <form
            onSubmit={handleSubmit}
            className="bg-white p-5 h-100 text-black shadow-[2px_2px_25px_0px_#f7f7f7cc] flex flex-col justify-center items-center gap-5"
         >
            <div className="max-w-50 flex flex-col gap-2">
               <label htmlFor="email">email</label>
               <input
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="..."
                  type="email"
                  id="email"
                  name="email"
                  className="bg-black text-white border-0 shadow-[1px_1px_15px_0px_#14141466] placeholder:text-white placeholder:px-2 "
               />
            </div>
            <div className="max-w-50 flex flex-col gap-2">
               <label htmlFor="password">password</label>
               <input
                  placeholder="..."
                  onChange={handleChange}
                  value={formData.password}
                  type="password"
                  id="password"
                  name="password"
                  className="bg-black text-white border-0 shadow-[1px_1px_15px_0px_#14141466] placeholder:text-white placeholder:px-2  "
               />
            </div>
            {error && (
               <p className="alert text-red-500 text-sm font-semibold">
                  {error}
               </p>
            )}
            <button
               className=" cursor-pointer bg-green-400 w-50 p-2 font-bold text-md shadow-[1px_1px_15px_0px_#14141466]"
               type="submit"
            >
               Login
            </button>
         </form>
      </div>
   );
}
