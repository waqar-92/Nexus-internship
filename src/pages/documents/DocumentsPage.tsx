import React, { useState } from "react";

interface DocumentItem {
  id: number;
  name: string;
  status: "Pending" | "Approved";
  file: File;
}

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [file, setFile] = useState<File | null>(null);

  // Upload document
  const handleUpload = () => {
    if (!file) return alert("Please select a file");

    const newDoc: DocumentItem = {
      id: Date.now(),
      name: file.name,
      status: "Pending",
      file,
    };

    setDocuments(prev => [...prev, newDoc]);
    setFile(null);
  };

  // Delete document
  const deleteDocument = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  // Download document
  const downloadDocument = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Document Chamber</h2>
      <p>Upload and manage your business documents</p>

      {/* Upload Section */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px dashed #d1d5db",
          borderRadius: "8px",
        }}
      >
        <input
          type="file"
          onChange={e => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleUpload}
          style={{
            marginLeft: "10px",
            padding: "6px 12px",
            background: "#2563eb",
            color: "#fff",
          }}
        >
          Upload
        </button>
      </div>

      {/* Documents List */}
      <div style={{ marginTop: "30px" }}>
        {documents.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No documents uploaded yet.</p>
        ) : (
          <table width="100%" cellPadding={10}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                <th>Document Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {documents.map(doc => (
                <tr key={doc.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td>{doc.name}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        background:
                          doc.status === "Approved" ? "#dcfce7" : "#fef3c7",
                        color:
                          doc.status === "Approved" ? "#166534" : "#92400e",
                      }}
                    >
                      {doc.status}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => downloadDocument(doc.file)}
                      style={{ marginRight: "8px" }}
                    >
                      Download
                    </button>

                    <button
                      onClick={() => deleteDocument(doc.id)}
                      style={{ color: "#ef4444" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
