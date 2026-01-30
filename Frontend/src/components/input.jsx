export default function Input({ label, ...props }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "14px", color: "#555" }}>{label}</label>
            <input
                {...props}
                style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    outline: "none",
                    fontSize: "15px",
                }}
            />
        </div>
    );
}