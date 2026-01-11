export default function Paper({ children, ref, className = "" }) {
  return (
    <div
      ref={ref}
      className={`id-card-container flex flex-col p-6 ${className}`}
      style={{ width: "324px", height: "512px", border: "1px solid #e2e8f0" }}
    >
      {children}
    </div>
  );
}
