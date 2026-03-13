import { useState } from "react";

const UserSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const fields = [
    { id: "userName", label: "Username", icon: "👤", editable: false },
    { id: "fullName", label: "Full Name", icon: "🪪", editable: true },
    { id: "membershipId", label: "membershipId", icon: "✉️", editable: true },
    { id: "phoneNumber", label: "Phone Number", icon: "📞", editable: true },
    { id: "accountNumber", label: "Account Number", icon: "🏦", editable: false },
    { id: "location", label: "Location", icon: "📍", editable: true },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: "#FDF6EC", fontFamily: "'Playfair Display', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        .dm-sans { font-family: 'DM Sans', sans-serif; }
        .playfair { font-family: 'Playfair Display', serif; }
        .field-input { transition: all 0.3s ease; border-bottom: 2px solid #d4c9b8; }
        .field-input:focus { outline: none; border-bottom: 2px solid #F57C00; background: rgba(245,124,0,0.04); }
        .field-input:disabled { background: transparent; color: #003000; cursor: default; border-bottom: 2px solid transparent; }
        .btn-transition { transition: all 0.25s ease; }
        .btn-transition:hover { transform: translateY(-1px); }
        .btn-orange:hover { box-shadow: 0 6px 20px rgba(245,124,0,0.35); }
        .btn-green:hover { box-shadow: 0 6px 20px rgba(46,125,50,0.35); }
        .field-icon { transition: transform 0.2s ease; }
        .field-row:hover .field-icon { transform: scale(1.1); }
        .avatar-ring { background: conic-gradient(#F57C00 0deg, #2E7D32 120deg, #003000 240deg, #F57C00 360deg); }
      `}</style>

      <main className="bg-white w-[90%] max-w-[860px] rounded-[20px] overflow-hidden"
        style={{ boxShadow: "0 20px 60px rgba(0,48,0,0.1), 0 4px 16px rgba(0,48,0,0.06)" }}>

        {/* Header */}
        <div className="relative flex items-center gap-6 px-10 py-8 overflow-hidden" style={{ background: "#003000" }}>
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: "rgba(245,124,0,0.08)" }} />
          <div className="absolute -bottom-5 right-28 w-20 h-20 rounded-full" style={{ background: "rgba(46,125,50,0.12)" }} />

          {/* Avatar */}
          <div className="avatar-ring flex-shrink-0 rounded-full p-[3px]">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-[3px]"
              style={{ background: "#1a4a1a", borderColor: "#003000" }}>
              🌿
            </div>
          </div>

          {/* Name & username */}
          <div className="flex-1 z-10">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="playfair text-[1.4rem] font-bold m-0" style={{ color: "#FDF6EC" }}>
                {form.fullName}
              </h1>
              <span className="dm-sans text-[0.65rem] tracking-widest font-medium bg-orange-500 text-white px-3 py-[2px] rounded-full" style={{ background: "#F57C00" }}>
                VERIFIED
              </span>
            </div>
            <p className="dm-sans text-[0.8rem] m-0" style={{ color: "rgba(253,246,236,0.6)" }}>
              @{form.userName} · Cooperative Member
            </p>
          </div>

          {/* Account number */}
          <div className="text-right z-10">
            <div className="dm-sans text-[0.65rem] uppercase tracking-widest" style={{ color: "rgba(253,246,236,0.45)" }}>Account</div>
            <div className="playfair text-[0.85rem] mt-[2px]" style={{ color: "#F57C00" }}>{form.accountNumber}</div>
          </div>
        </div>

        {/* Body */}
        <div className="px-10 py-8">

          {/* Section heading */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="playfair text-[1.1rem] font-semibold m-0" style={{ color: "#003000" }}>
              Profile Information
            </h2>
            <span className="dm-sans text-[0.72rem] tracking-wide px-3 py-1 rounded-full"
              style={{ color: "#2E7D32", background: "rgba(46,125,50,0.08)" }}>
              {isEditing ? "✏️ Editing Mode" : "🔒 View Mode"}
            </span>
          </div>

          {/* Fields grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {fields.map((field) => (
              <div key={field.id} className="field-row border-b pb-4" style={{ borderColor: "#f0ebe2" }}>
                <div className="dm-sans text-[0.7rem] font-medium tracking-widest uppercase mb-1" style={{ color: "#2E7D32" }}>
                  {field.label}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="field-icon text-[0.9rem]">{field.icon}</span>
                  <input
                    type="text"
                    id={field.id}
                    className="field-input w-full bg-transparent border-none p-1"
                    value={form[field.id]}
                    onChange={handleChange}
                    disabled={!isEditing || !field.editable}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: field.editable ? 400 : 500,
                      color: field.editable ? "#003000" : "#5a7a5a",
                    }}
                  />
                  {!field.editable && (
                    <span className="text-[0.65rem] text-gray-400 flex-shrink-0" title="This field cannot be edited">🔒</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #d4c9b8, transparent)" }} />

          {/* Actions */}
          <div className="flex justify-end gap-4">
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="btn-transition dm-sans text-[0.82rem] font-medium tracking-wide px-6 py-2 rounded-lg bg-transparent cursor-pointer"
                style={{ border: "1.5px solid #d4c9b8", color: "#666" }}>
                Cancel
              </button>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`btn-transition dm-sans text-[0.82rem] font-semibold tracking-widest uppercase px-8 py-2 rounded-lg border-none text-white cursor-pointer ${isEditing ? "btn-green" : "btn-orange"}`}
              style={{ background: isEditing ? "#2E7D32" : "#F57C00" }}>
              {isEditing ? "✓ Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserSetting;