import { LayoutDashboard, FilePenLine, CalendarClock, TrendingUp , Settings} from "lucide-react";
function Sidebar({ activeTab, onSelectTab }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section-title">Navigation</div>
      <nav className="sidebar-nav">
        <button
          type="button"
          onClick={() => onSelectTab && onSelectTab("dashboard")}
          className={`sidebar-item ${activeTab === "dashboard" ? "active" : ""}`}
        >
          <span><LayoutDashboard /></span> Dashboard
        </button>
        <button
          type="button"
          onClick={() => onSelectTab && onSelectTab("applications")}
          className={`sidebar-item ${activeTab === "applications" ? "active" : ""}`}
        >
          <span><FilePenLine /></span> All Applications
        </button>
        <button
          type="button"
          onClick={() => onSelectTab && onSelectTab("interviews")}
          className={`sidebar-item ${activeTab === "interviews" ? "active" : ""}`}
        >
          <span><CalendarClock /></span> Interviews
        </button>
      </nav>

      <div className="sidebar-section-title" style={{ marginTop: 'auto' }}>
        Settings
      </div>
      <nav className="sidebar-nav">
        <button
          type="button"
          className="sidebar-item"
        >
          <span><Settings /></span> Preferences
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
