
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom"
const JWT_TOKEN=Cookies.get("jwt_token")
const HomePage = () => {
    const navigate=useNavigate()
    const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-900">
        <Link to="/">
        
        <div className="flex items-center">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="w-28 h-auto"
          />
        </div></Link>
        <div className="flex space-x-30 font-medium">
          <a href="/" className="hover:text-blue-400 transition-colors">
            Home
          </a>
          <a href="/jobs" className="hover:text-blue-400 transition-colors">
            Jobs
          </a>
        </div>
        <Link to="/login">
        <button  className="cursor-pointer logout px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition" onClick={handleLogout}>
          Logout
        </button>
        </Link>
      </nav>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between flex-1 px-8 md:px-16 lg">
        <div className="max-w-xl text-center lg:text-left mt-10 lg:mt-0">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Find The Job That <br /> Fits Your Life
          </h1>
          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potential.
          </p>
          <Link to="/jobs">
          <button  className="cursor-pointer mt-8 px-8 py-3 bg-blue-600 rounded-md hover:bg-blue-700 transition font-semibold">
            Find Jobs
          </button>
          </Link>
        </div>

        
        <div className="w-full lg:w-1/2 flex justify-center">
    
           <img
            src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
            alt="home banner"
            className="  lg:block w-[600px] xl:w-[900px] h-[600px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
