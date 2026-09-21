import { Search } from "lucide-react";
import { useState, useEffect } from "react";

import { getJobs, addJob, updateJob, deleteJob } from "./services/jobservice";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import JobCard from "./components/jobcard";
import Addjob from "./components/Addjob";
import Dashboard from "./components/Dashboard";
import Interviews from "./components/interview";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddJob, setShowAddJob] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortFilter, setSortFilter] = useState("Newest First");

  const filteredJobs = jobs
    .filter((job) => {
      const searchText = search.toLowerCase();

      const title = (job.title || job.role || "").toLowerCase();
      const company = (job.company_name || job.company || "").toLowerCase();
      const location = (job.location || "").toLowerCase();

      const matchesSearch =
        title.includes(searchText) ||
        company.includes(searchText) ||
        location.includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        statusFilter === "All Status" ||
        job.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        typeFilter === "All Types" ||
        (job.job_type || job.type) === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      if (sortFilter === "Oldest First") {
        return (
          new Date(a.createdAt || a.application_date || 0) -
          new Date(b.createdAt || b.application_date || 0)
        );
      }
      if (sortFilter === "Company A-Z") {
        const compA = (a.company_name || a.company || "").toLowerCase();
        const compB = (b.company_name || b.company || "").toLowerCase();
        return compA.localeCompare(compB);
      }
      // Default: Newest First
      return (
        new Date(b.createdAt || b.application_date || 0) -
        new Date(a.createdAt || a.application_date || 0)
      );
    });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleJobApplication = () => {
    setShowAddJob((prev) => !prev);
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs((prevJobs) => prevJobs.filter((job) => (job._id || job.id) !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleAddJob = async (newJob) => {
    try {
      const payload = {
        title: newJob.role || newJob.title,
        company_name: newJob.company || newJob.company_name,
        location: newJob.location || "Not specified",
        status: newJob.status || "Applied",
        job_type: newJob.type || newJob.job_type || "Full-time",
        application_date: newJob.date || new Date(),
        joblink: newJob.link || newJob.joblink || "",
      };
      const createdJob = await addJob(payload);
      setJobs((prevJobs) => [createdJob, ...prevJobs]);
      setShowAddJob(false);
    } catch (error) {
      console.error("Error adding job to DB:", error);
    }
  };

  const handleUpdateJob = async (updatedJob) => {
    const id = updatedJob._id || updatedJob.id;
    try {
      const payload = {
        title: updatedJob.role || updatedJob.title,
        company_name: updatedJob.company || updatedJob.company_name,
        location: updatedJob.location || "Not specified",
        status: updatedJob.status || "Applied",
        job_type: updatedJob.type || updatedJob.job_type || "Full-time",
        application_date: updatedJob.date || updatedJob.application_date,
        joblink: updatedJob.link || updatedJob.joblink || "",
      };
      await updateJob(id, payload);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          (job._id || job.id) === id ? { ...job, ...payload } : job
        )
      );
      setEditingJob(null);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />
      <div className="main-content">
        <Navbar />

        <main className="content-area">
          {activeTab === "dashboard" && (
            <Dashboard
              jobs={jobs}
              onAddNew={handleJobApplication}
              onEditJob={(job) => setEditingJob(job)}
              onDeleteJob={handleDelete}
            />
          )}

          {activeTab === "applications" && (
            <div>
              <div className="section-header">
                <h2>All Applications</h2>
                <button className="btn-primary" onClick={handleJobApplication}>
                  + Add New Application
                </button>
              </div>
              <div className="searchbar-container">
                <div className="upper-search">
                  <Search className="search-icon" size={18} />
                  <input
                    className="search-bar-input"
                    placeholder="Search company or role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="lower-filter">
                  <div className="filter-box">
                    <span className="filter-label">Status</span>
                    <select
                      className="filter-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="All">All Status</option>
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="filter-box">
                    <span className="filter-label">Job Type</span>
                    <select
                      className="filter-select"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="All">All Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div className="filter-box">
                    <span className="filter-label">Sort by</span>
                    <select
                      className="filter-select"
                      value={sortFilter}
                      onChange={(e) => setSortFilter(e.target.value)}
                    >
                      <option value="Newest First">Newest First</option>
                      <option value="Oldest First">Oldest First</option>
                      <option value="Company A-Z">Company (A-Z)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="cards-grid">
                {filteredJobs.length === 0 ? (
                  <div className="empty-widget-state" style={{ gridColumn: "1 / -1" }}>
                    <p>No applications match your filter criteria.</p>
                  </div>
                ) : (
                  filteredJobs.map((job, index) => {
                    const id = job._id || job.id || `job-${index}`;
                    return (
                      <JobCard
                        key={id}
                        role={job.title || job.role}
                        title={job.title || job.role}
                        company={job.company_name || job.company}
                        location={job.location}
                        status={job.status}
                        date={
                          job.application_date
                            ? new Date(job.application_date).toLocaleDateString()
                            : job.date
                        }
                        type={job.job_type || job.type}
                        link={job.joblink || job.link}
                        onDelete={() => handleDelete(id)}
                        onEdit={() => setEditingJob(job)}
                      />
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === "interviews" && (
            <Interviews
              jobs={jobs}
              onAddNew={handleJobApplication}
              onEditJob={(job) => setEditingJob(job)}
              onDeleteJob={handleDelete}
            />
          )}
        </main>
      </div>

      {/* Add Job Application Modal */}
      {showAddJob && (
        <Addjob
          onAddJob={handleAddJob}
          onClose={() => setShowAddJob(false)}
        />
      )}

      {/* Edit Job Application Modal */}
      {editingJob && (
        <Addjob
          initialData={editingJob}
          onUpdateJob={handleUpdateJob}
          onClose={() => setEditingJob(null)}
        />
      )}
    </div>
  );
}

export default App;