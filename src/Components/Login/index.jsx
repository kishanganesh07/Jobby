import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const LoginPage=()=> {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 }); 
    navigate("/", { replace: true });
  };

  const onSubmitFailure = (errorMsg) => {
    setErrorMsg(errorMsg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const userDetails = {username: username, password:password };

    try {
      const response = await fetch("https://apis.ccbp.in/login", {
        method: "POST",
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        onSubmitSuccess(data.jwt_token); 
      } else {
        onSubmitFailure(data.error_msg)
      }
    } catch  {
      setErrorMsg("Something went wrong. Please try again.");
    }
    const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-neutral-900 p-8 rounded-2xl shadow-lg w-96">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="Jobby Logo"
            className="h-12 mb-2"
          />
         
        </div>
        <h2 class="text-white text-2xl font-semibold text-center mb-10">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">USERNAME</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-13 py-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">PASSWORD</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-neutral-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            className="cursor-pointer w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
          >
            Login
          </button>
        </form>
         <p className="text-white text-[10px]">UserName:rahul</p>
              <p className="text-white text-[10px]">Password:rahul@2021</p> 
      </div>
    </div>
  );
}
export default LoginPage 
