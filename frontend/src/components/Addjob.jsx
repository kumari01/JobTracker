import { useState, useEffect } from "react";
import { X } from "lucide-react";

function Addjob({ onAddJob, onUpdateJob, initialData, onClose }) {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    location: "",
    status: "Applied",
    date: new Date().toISOString().split("T")[0],
    type: "Full-time",
    link: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (initialData && onUpdateJob) {
      onUpdateJob(formData);
    } else if (onAddJob) {
      onAddJob(formData);
    }
  };

  const isEditing = Boolean(initialData);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEditing ? "Edit Job Application" : "Add New Application"}</h3>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-job-form">
          <div className="form-group">
            <label htmlFor="role">Job Title / Role</label>
            <input
              id="role"
              name="role"
              type="text"
              required
              placeholder="e.g. Full Stack Developer"
              value={formData.role}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="e.g. TechCorp Inc."
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Remote / New York"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="type">Job Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date">Application Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="link">Job Link / URL</label>
            <input
              id="link"
              name="link"
              type="url"
              placeholder="e.g. https://company.com/careers/job"
              value={formData.link}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? "Save Changes" : "Add Job Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addjob;