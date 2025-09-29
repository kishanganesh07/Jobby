import React, { useEffect, useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const JobPage = () => {
    const navigate=useNavigate()
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [employmentType, setEmploymentType] = useState([]); // array of selected types
  const [salaryRange, setSalaryRange] = useState(""); // single selected range
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token =Cookies.get("jwt_token"); 
  const url = "https://apis.ccbp.in";
  const handleLogOut=()=>{
    Cookies.remove("jwt_token")
    navigate("/", { replace: true })
  }
  const loader=()=>{
    return(
      <div className="flex justify-center pt-50">
      
<div role="status ">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
</div>
    )
  }
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${url}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.profile_details);
      }
    } catch {
      setError("Profile fetch failed");
    }
  };
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();

      if (employmentType.length > 0) {
        query.append("employment_type", employmentType.join(","));
      }
      if (salaryRange) {
        query.append("minimum_package", salaryRange);
      }
      if (search) {
        query.append("search", search);
      }

      const res = await fetch(`${url}/jobs?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setJobs(data.jobs);
        setError("");
      }
      console.log(data)
    } catch  {
      setError("Jobs fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  
  useEffect(() => {
    fetchJobs();
  }, [employmentType, salaryRange]);
  const toggleEmployment = (type) => {
    setEmploymentType((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-900">
        <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="w-28"
        />
        </Link>
        <div className="flex space-x-6">
          <a href="/" className="hover:text-blue-400">Home</a>
          <a href="/jobs" className="hover:text-blue-400">Jobs</a>
        </div>
        <Link >
        <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600" onClick={handleLogOut}>
          Logout
        </button>
        </Link>
      </nav>

      <div className="flex flex-1 px-6 py-8 space-x-8">
        <div className="w-1/4">
          {profile && (
            <div className="bg-gray-900 text-white p-6 rounded-xl shadow mb-6">
              <img
                src={profile.profile_image_url}
                alt={profile.name}
                className="w-16 h-16 rounded-full border-2 border-white mb-4"
              />
              <h2 className="text-lg font-bold">{profile.name}</h2>
              <p className="text-gray-400 text-sm">{profile.short_bio}</p>
            </div>
          )}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Type of Employment</h3>
            {[
              { label: "Full Time", value: "FULLTIME" },
              { label: "Part Time", value: "PARTTIME" },
              { label: "Freelance", value: "FREELANCE" },
              { label: "Internship", value: "INTERNSHIP" },
            ].map(({ label, value }) => (
              <div key={value} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={employmentType.includes(value)}
                  onChange={() => toggleEmployment(value)}
                />
                <label>{label}</label>
              </div>
            ))}
          </div>

          <hr className="border-gray-700 mb-6" />

          {/* Salary Range */}
          <div>
            <h3 className="font-bold mb-2">Salary Range</h3>
            {[
              { label: "10 LPA and above", value: "1000000" },
              { label: "20 LPA and above", value: "2000000" },
              { label: "30 LPA and above", value: "3000000" },
              { label: "40 LPA and above", value: "4000000" },
            ].map(({ label, value }) => (
              <div key={value} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="salary"
                  className="mr-2"
                  checked={salaryRange === value}
                  onChange={() => setSalaryRange(value)}
                />
                <label>{label}</label>
              </div>
            ))}
          </div>
        </div>

       
        <div className="w-3/4">
        
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 p-2 rounded-l-md bg-gray-800 border border-gray-700 text-white"
            />
            <button
              className="p-2 bg-blue-600 rounded-r-md"
              onClick={fetchJobs}
            >
              <FaSearch />
            </button>
          </div>
          {loading && loader()}
          {error && (
            <div className="text-center mt-10">
              <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
                className="mx-auto w-60"
              />
              <p className="mt-4 text-red-500">{error}</p>
              <button
                onClick={fetchJobs}
                className="mt-4 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          )}
          {!loading && !error && jobs.length === 0 && (
            <div className="text-center mt-20">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
                className="mx-auto w-60"
              />
              <p className="mt-4 text-gray-400">No jobs found</p>
            </div>
          )}

          {/* Jobs List */}
          {!loading &&
            !error &&
            jobs.map((job) => (
              <Link to={`/jobs/${job.id}`} key={job.id}>
              <div
                
                className="bg-gray-900 text-white p-6 rounded-xl shadow mb-6"
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={job.company_logo_url}
                      alt={job.title}
                      className="w-12 h-12"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <p className="text-yellow-400">⭐ {job.rating}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold">{job.package_per_annum}</p>
                </div>

                <div className="flex items-center space-x-6 mt-4 text-gray-400">
                  <span className="flex items-center space-x-1">
                    <FaMapMarkerAlt /> <span>{job.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FaBriefcase /> <span>{job.employment_type}</span>
                  </span>
                </div>

                <hr className="border-gray-700 my-4" />

                <div>
                  <h3 className="font-bold mb-2">Description</h3>
                  <p className="text-gray-300 text-sm">{job.job_description}</p>
                </div>
              </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default JobPage;
