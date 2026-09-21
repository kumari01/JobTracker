import React from "react";
import { Plus, Calendar, Briefcase, CheckCircle2, Clock, MapPin, ExternalLink } from "lucide-react";
import JobCard from "./jobcard";

function Dashboard({ jobs, onAddNew, onEditJob, onDeleteJob }) {
  // Stats
  const totalApplications = jobs.length;
  const interviews = jobs.filter((j) => j.status === "Interview");
  const offers = jobs.filter((j) => j.status === "Offer");
  const inReview = jobs.filter((j) => j.status === "In Review" || j.status === "Applied");

  // Next 3 upcoming interviews
  const upcomingInterviews = interviews.slice(0, 3);

  // Recent 4 applications
  const recentJobs = jobs.slice(0, 4);

  return (
    <div className="dashboard-container">
      {/* Top Banner / Actions */}
      <div className="dashboard-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p className="dashboard-subtitle">Track your job search progress and upcoming interviews</p>
        </div>
        <button className="btn-primary" onClick={onAddNew}>
          <Plus size={18} /> Add New Application
        </button>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon icon-blue">
            <Briefcase size={22} />
          </div>
          <div>
            <span className="metric-label">Total Applied</span>
            <div className="metric-value">{totalApplications}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon icon-amber">
            <Calendar size={22} />
          </div>
          <div>
            <span className="metric-label">Interviews Scheduled</span>
            <div className="metric-value">{interviews.length}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon icon-green">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span className="metric-label">Offers Received</span>
            <div className="metric-value">{offers.length}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon icon-purple">
            <Clock size={22} />
          </div>
          <div>
            <span className="metric-label">In Review / Applied</span>
            <div className="metric-value">{inReview.length}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Upcoming Interviews & Recent Applications */}
      <div className="dashboard-sections-grid">
        {/* Upcoming Interviews Widget (Next 3) */}
        <div className="dashboard-widget">
          <div className="widget-header">
            <h3><Calendar size={18} /> Upcoming Interviews (Next 3)</h3>
            <span className="badge badge-primary">{interviews.length} Total</span>
          </div>
          
          {upcomingInterviews.length === 0 ? (
            <div className="empty-widget-state">
              <p>No interviews scheduled yet.</p>
            </div>
          ) : (
            <div className="upcoming-interviews-list">
              {upcomingInterviews.map((job, idx) => (
                <div className="interview-item-card" key={job._id || job.id || idx}>
                  <div className="interview-company-info">
                    <div className="interview-role">{job.title || job.role}</div>
                    <div className="interview-company">{job.company_name || job.company}</div>
                    {job.location && (
                      <div className="interview-location">
                        <MapPin size={13} /> {job.location}
                      </div>
                    )}
                  </div>
                  <div className="interview-date-badge">
                    <Clock size={13} />
                    {job.application_date ? new Date(job.application_date).toLocaleDateString() : (job.date || "Scheduled")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Status Updates / Quick Summary */}
        <div className="dashboard-widget">
          <div className="widget-header">
            <h3><Clock size={18} /> Status Overview</h3>
          </div>
          <div className="status-progress-list">
            <div className="status-progress-item">
              <span>Applied</span>
              <span className="status-count">{jobs.filter(j => j.status === 'Applied').length}</span>
            </div>
            <div className="status-progress-item">
              <span>In Review / Interview</span>
              <span className="status-count">{jobs.filter(j => j.status === 'Interview' || j.status === 'In Review').length}</span>
            </div>
            <div className="status-progress-item">
              <span>Offers</span>
              <span className="status-count">{jobs.filter(j => j.status === 'Offer').length}</span>
            </div>
            <div className="status-progress-item">
              <span>Rejected</span>
              <span className="status-count">{jobs.filter(j => j.status === 'Rejected').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Section */}
      <div className="dashboard-recent-section">
        <div className="section-header">
          <h3>Recent Job Applications</h3>
        </div>
        {recentJobs.length === 0 ? (
          <div className="empty-widget-state">
            <p>No job applications added yet.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {recentJobs.map((job, index) => {
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
                  onDelete={() => onDeleteJob(id)}
                  onEdit={() => onEditJob(job)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
