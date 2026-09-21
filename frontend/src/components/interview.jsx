import { useEffect, useState } from "react";
import { getJobs } from "../services/jobservice";
import JobCard from "./jobcard";
import { Calendar } from "lucide-react";

const Interviews = ({ jobs: propsJobs, onAddNew, onEditJob, onDeleteJob }) => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    if (propsJobs) {
      setInterviews(propsJobs.filter((job) => job.status === "Interview"));
    } else {
      const fetchInterviews = async () => {
        try {
          const jobsData = await getJobs();
          setInterviews(jobsData.filter((job) => job.status === "Interview"));
        } catch (error) {
          console.error("Error fetching interviews:", error);
        }
      };
      fetchInterviews();
    }
  }, [propsJobs]);

  return (
    <div className="interviews-page-container">
      <div className="section-header">
        <div>
          <h2>Scheduled Interviews</h2>
          <p className="dashboard-subtitle">
            Manage your upcoming interviews and prep for target roles
          </p>
        </div>
        
      </div>

      {interviews.length === 0 ? (
        <div className="empty-widget-state">
          <Calendar size={32} style={{ marginBottom: "10px", opacity: 0.5 }} />
          <p>No interviews scheduled at the moment.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {interviews.map((job, index) => {
            const id = job._id || job.id || `interview-${index}`;
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
                onDelete={() => onDeleteJob && onDeleteJob(id)}
                onEdit={() => onEditJob && onEditJob(job)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Interviews;