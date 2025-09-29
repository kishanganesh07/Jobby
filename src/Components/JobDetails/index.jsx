import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get jobId from URL
import { FaMapMarkerAlt, FaBriefcase, FaExternalLinkAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const JobDetailsPage = () => {
  const { id } = useParams(); // Get jobId from route
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token =Cookies.get("jwt_token")
    ;
 const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };
  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://apis.ccbp.in/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setJob(data.job_details);
        setSimilarJobs(data.similar_jobs);
        setError("");
      } else {
        setError("Failed to fetch job details");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error)
    return (
      <div className="text-center mt-10">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="mx-auto w-60"
        />
        <p className="mt-4 text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
       <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 pb-20">
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
      {job && (
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg mb-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={job.company_logo_url}
                alt={job.title}
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <p className="text-yellow-400">⭐ {job.rating}</p>
              </div>
            </div>
            <p className="text-lg font-bold">{job.package_per_annum}</p>
          </div>

          {/* Location & Type */}
          <div className="flex items-center space-x-6 mt-4 text-gray-400">
            <span className="flex items-center space-x-1">
              <FaMapMarkerAlt /> <span>{job.location}</span>
            </span>
            <span className="flex items-center space-x-1">
              <FaBriefcase /> <span>{job.employment_type}</span>
            </span>
          </div>

          {/* Link */}
          <div className="flex justify-end mt-4">
            <a
              href={job.company_website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center space-x-1"
            >
              <span>Visit</span>
              <FaExternalLinkAlt />
            </a>
          </div>

          {/* Description */}
          <h2 className="text-xl font-bold mt-6">Description</h2>
          <p className="text-gray-300 mt-2">{job.job_description}</p>

          {/* Skills */}
          <h2 className="text-xl font-bold mt-6">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
            {job.skills.map((skill) => (
              <div key={skill.name} className="flex items-center space-x-2">
                <img src={skill.image_url} alt={skill.name} className="w-8" />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>

          {/* Life at Company */}
          <h2 className="text-xl font-bold mt-6">Life at Company</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start mt-3 gap-4">
            <p className="text-gray-300 flex-1">{job.life_at_company.description}</p>
            <img
              src={job.life_at_company.image_url}
              alt="life at company"
              className="w-60 rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Similar Jobs */}
      <h2 className="text-2xl font-bold mb-6">Similar Jobs</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarJobs.map((job) => (
          <div
            key={job.id}
            className="bg-gray-900 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={job.company_logo_url}
                alt={job.title}
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-yellow-400">⭐ {job.rating}</p>
              </div>
            </div>
            <p className="text-gray-300 mt-4">{job.job_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobDetailsPage;
