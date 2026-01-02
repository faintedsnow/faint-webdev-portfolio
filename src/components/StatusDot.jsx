export function StatusDot({ label, location }) {
  return (
    <div className="status-container">
      <div className="status-indicator">
        <span className="pulse-ring"></span>
        <span className="pulse-dot"></span>
      </div>
      <div className="status-text">
        {label && <span className="status-label">{label}</span>}
        {location && <span className="status-location">{location}</span>}
      </div>
    </div>
  );
}
