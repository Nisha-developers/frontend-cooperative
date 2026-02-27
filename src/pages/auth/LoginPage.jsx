import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", form);
  };

  return (
    <div className="min-h-screen bg-cooperative-cream flex items-center justify-center px-4 py-12">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, #2E7D3215 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, #F57C0010 0%, transparent 50%)`,
        }}
      />

      <div className="w-full max-w-md relative">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cooperative-dark mb-5 shadow-lg">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="10" r="5" fill="#F57C00" />
              <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#FDF6EC" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1
            className="text-3xl font-bold text-cooperative-dark tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.02em" }}
          >
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-cooperative-dark opacity-50 font-medium">
            Sign in to your cooperative account and patronize our housing services
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-3xl shadow-xl p-8 border border-cooperative-dark"
          style={{ borderOpacity: 0.08, boxShadow: "0 4px 40px rgba(0,48,0,0.10)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email / Username */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-semibold text-cooperative-dark uppercase tracking-widest mb-2 opacity-60"
              >
                Email or Username
              </label>
              <div
                className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focused === "identifier"
                    ? "border-cooperative-teal shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cooperative-dark opacity-40">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="identifier"
                  type="text"
                  placeholder="you@example.com"
                  value={form.identifier}
                  onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                  onFocus={() => setFocused("identifier")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-11 pr-4 py-3.5 bg-transparent rounded-xl text-cooperative-dark placeholder-gray-400 text-sm font-medium outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-cooperative-dark uppercase tracking-widest opacity-60"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-cooperative-orange hover:opacity-80 transition-opacity"
                >
                  Forgot password?
                </button>
              </div>
              <div
                className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focused === "password"
                    ? "border-cooperative-teal shadow-sm"
                    : "border-gray-200"
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
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-11 pr-12 py-3.5 bg-transparent rounded-xl text-cooperative-dark placeholder-gray-400 text-sm font-medium outline-none"
                  required
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
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:bg-cooperative-teal peer-checked:border-cooperative-teal transition-all" />
                <svg
                  className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-cooperative-dark opacity-60 font-medium group-hover:opacity-80 transition-opacity">
                Keep me signed in
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              to='/dashboard'
              className="w-full py-4 bg-cooperative-dark text-cooperative-cream rounded-xl font-bold text-sm tracking-wide hover:bg-cooperative-teal transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 mt-2"
            >
              Sign In
            </button>
          </form>

          
        </div>

        {/* Sign up link */}
        <p className="text-center mt-6 text-sm text-cooperative-dark opacity-50 font-medium">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="text-cooperative-orange font-bold opacity-100 hover:underline"
          >
            Create an account →
          </Link>
        </p>
      </div>
    </div>
  );
}