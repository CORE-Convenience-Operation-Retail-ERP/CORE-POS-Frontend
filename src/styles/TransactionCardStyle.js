export const cardStyle = {
    backgroundColor: "#ffffffee",
    backdropFilter: "blur(6px)",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    minWidth: "260px",
    margin: "10px",
  };
  
  export const statusTextStyle = (isRefunded) => ({
    color: isRefunded ? "#dc2626" : "#16a34a",
    fontWeight: "bold",
    marginBottom: "8px",
  });
  
  export const detailButtonStyle = {
    marginBottom: "10px",
    backgroundColor: "#f3f4f6",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "13px",
  };
  
  export const actionButtonStyle = (bgColor = "#10b981") => ({
    flex: 1,
    backgroundColor: bgColor,
    color: "#fff",
    padding: "10px 0",
    fontSize: "14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  });
  
  export const refundBoxStyle = {
    marginTop: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px",
    backgroundColor: "#f9f9f9",
  };
  
  export const refundInputStyle = {
    marginTop: "8px",
    width: "100%",
    padding: "6px",
  };
  
  export const productTableContainer = {
    fontSize: "14px",
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "8px",
    marginTop: "8px",
  };
  
  export const productHeaderRow = {
    display: "flex",
    fontWeight: 600,
    marginBottom: "6px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "4px",
  };
  
  export const productRow = {
    display: "flex",
    marginBottom: "4px",
  };
  
  export const colFlex = (flex = 1, align = "left") => ({
    flex,
    textAlign: align,
  });
  