import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [agreed, setAgreed] = useState(false);

  const passwordStrength = (pwd) => {
    if (!pwd) return { level: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const levels = [
      { level: 0, label: "", color: "" },
      { level: 1, label: "Weak", color: "#ef4444" },
      { level: 2, label: "Fair", color: "#f97316" },
      { level: 3, label: "Good", color: "#eab308" },
      { level: 4, label: "Strong", color: "#22c55e" },
    ];
    return levels[score] || levels[0];
  };

  const strength = passwordStrength(form.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Signup:", form);
  };

  const fields = [
    { id: "fullName", label: "Full Name", type: "text", placeholder: "Jane Smith", icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: "username", label: "Username", type: "text", placeholder: "janesmith", icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
    )},
    { id: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-cooperative-cream flex items-center justify-center px-4 py-12">
      {/* Background */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, #2E7D3215 0%, transparent 50%),
                            radial-gradient(circle at 20% 80%, #F57C0010 0%, transparent 50%)`,
        }}
      />

      <div className="w-full max-w-md relative">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cooperative-dark mb-5 shadow-lg">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4v20M4 14h20" stroke="#F57C00" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <h1
            className="text-3xl font-bold text-cooperative-dark tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.02em" }}
          >
            Join the cooperative and patronize our Apartments' Services 
          </h1>
          <p className="mt-2 text-sm text-cooperative-dark opacity-50 font-medium">
            Create your account it only takes a minute
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-3xl p-8 border border-gray-100"
          style={{ boxShadow: "0 4px 40px rgba(0,48,0,0.10)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Standard fields */}
            {fields.map(({ id, label, type, placeholder, icon }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-xs font-semibold text-cooperative-dark uppercase tracking-widest mb-2 opacity-60"
                >
                  {label}
                </label>
                <div
                  className={`relative rounded-xl border-2 transition-all duration-200 ${
                    focused === id ? "border-cooperative-teal shadow-sm" : "border-gray-200"
                  }`}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cooperative-dark opacity-40">
                    {icon}
                  </div>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={form[id]}
                    onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused("")}
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent rounded-xl text-cooperative-dark placeholder-gray-400 text-sm font-medium outline-none"
                    required
                  />
                </div>
              </div>
            ))}

            {/* Gender */}
            <div>
              <label className="block text-xs font-semibold text-cooperative-dark uppercase tracking-widest mb-2 opacity-60">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "male", label: "Male", icon: (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="10" cy="14" r="5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 5l-5.5 5.5M19 5h-4m4 0v4" />
                    </svg>
                  )},
                  { value: "female", label: "Female", icon: (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="9" r="5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6m-3-3h6" />
                    </svg>
                  )},
                  { value: "other", label: "Other", icon: (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M2 12h2m16 0h2" />
                    </svg>
                  )},
                ].map(({ value, label, icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm({ ...form, gender: value })}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 text-xs font-semibold transition-all duration-200 ${
                      form.gender === value
                        ? "border-cooperative-teal bg-cooperative-teal text-white shadow-sm"
                        : "border-gray-200 text-cooperative-dark opacity-60 hover:border-gray-300 hover:opacity-80"
                    }`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-cooperative-dark uppercase tracking-widest mb-2 opacity-60"
              >
                Password
              </label>
              <div
                className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focused === "password" ? "border-cooperative-teal shadow-sm" : "border-gray-200"
                }`}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cooperative-dark opacity-40">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-11 pr-12 py-3.5 bg-transparent rounded-xl text-cooperative-dark placeholder-gray-400 text-sm font-medium outline-none"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cooperative-dark opacity-40 hover:opacity-70 transition-opacity"
                >
                  {showPassword ? (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {/* Password strength bar */}
              {form.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: i <= strength.level ? strength.color : "#e5e7eb",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-semibold" style={{ color: strength.color }}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-cooperative-dark uppercase tracking-widest mb-2 opacity-60"
              >
                Confirm Password
              </label>
              <div
                className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focused === "confirmPassword"
                    ? form.confirmPassword && form.password !== form.confirmPassword
                      ? "border-red-400"
                      : "border-cooperative-teal shadow-sm"
                    : form.confirmPassword && form.password !== form.confirmPassword
                    ? "border-red-300"
                    : "border-gray-200"
                }`}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cooperative-dark opacity-40">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  onFocus={() => setFocused("confirmPassword")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-11 pr-4 py-3.5 bg-transparent rounded-xl text-cooperative-dark placeholder-gray-400 text-sm font-medium outline-none"
                  required
                />
                {form.confirmPassword && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {form.password === form.confirmPassword ? (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-red-500 font-medium mt-1">Passwords don't match</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group pt-1">
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:bg-cooperative-teal peer-checked:border-cooperative-teal transition-all" />
                <svg
                  className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-cooperative-dark opacity-60 font-medium leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-cooperative-orange font-semibold opacity-100 hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-cooperative-orange font-semibold opacity-100 hover:underline">Privacy Policy</a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-cooperative-orange text-white rounded-xl font-bold text-sm tracking-wide hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 mt-2"
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Sign in link */}
        <p className="text-center mt-6 text-sm text-cooperative-dark opacity-50 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cooperative-orange font-bold opacity-100 hover:underline"
          >
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
}