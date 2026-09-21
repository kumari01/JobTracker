import { Trash2, Edit ,MapPin} from "lucide-react";
function JobCard({ title, role, company, location, status, date, type, link, onDelete, onEdit }) {
    const jobTitle = role || title || "Senior Frontend Engineer";
    return (
        <div className="job-card">
            <div className="job-card-header">
                <div>
                    <div className="job-card-title">{jobTitle}</div>
                    <div className="job-card-company">{company || "TechCorp Inc."}</div>
                </div>
                {location && <span className="location"><MapPin />{location}</span>}
                <span className={`badge ${status === 'Offer' ? 'badge-cream' : 'badge-primary'}`}>
                    {status || "In Review"}
                </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span>{type || "Full-time"}</span>
                <span>Applied {date || "2 days ago"}</span>
            </div>
            {link && (
                <span><a href={link} target="_blank" rel="noreferrer">Link</a></span>
            )}
            <div className="job-card-footer">
                <button className="btn-primary" onClick={onEdit}>Edit <Edit size={16} /></button>
                <button className="btn-primary" onClick={onDelete}><Trash2 size={16} /></button>
            </div>
        </div>
    );
}

export default JobCard;
