import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiUploadCloud2Line, RiCheckLine, RiImageLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';


const EASE = [0.22, 1, 0.36, 1];

// ─── Field renderer ────────────────────────────────────────────────────────────

const Field = ({ field, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileRef = useRef();

  const baseInput =
    'w-full px-4 py-2.5 rounded-xl border border-[#2E7D32]/20 bg-white text-[#003000] text-sm ' +
    'placeholder-[#2E7D32]/40 focus:outline-none focus:ring-2 focus:ring-[#F57C00]/40 ' +
    'focus:border-[#F57C00] transition-all duration-200';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    if (field.type === 'image' && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
    onChange(field.name, file);
  };

  switch (field.type) {
    // ── Textarea ──
    case 'textarea':
      return (
        <textarea
          name={field.name}
          placeholder={field.placeholder || ''}
          required={field.required}
          rows={field.rows || 3}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${baseInput} resize-none`}
        />
      );

    // ── Select ──
    case 'select':
      return (
        <select
          name={field.name}
          required={field.required}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${baseInput} cursor-pointer`}
        >
          <option value="" disabled>Select {field.label}...</option>
          {(field.options || []).map((opt) => (
           <option
  key={typeof opt === 'object' ? opt.value : opt}
  value={typeof opt === 'object' ? opt.value : opt}
>
  {typeof opt === 'object' ? opt.label : opt}
</option>
          ))}
        </select>
      );
      case 'date':
  return (
    <input
      type="date"
      name={field.name}
      required={field.required}
      value={value || ''}
      onChange={(e) => onChange(field.name, e.target.value)}
      className={baseInput}
    />
  );

    // ── Radio ──
    case 'radio':
      return (
        <div className="flex flex-wrap gap-3 pt-1">
          {(field.options || []).map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const label = typeof opt === 'object' ? opt.label : opt;
            return (
              <label key={val} className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name={field.name}
                    value={val}
                    checked={value === val}
                    onChange={() => onChange(field.name, val)}
                    className="sr-only"
                    required={field.required}
                  />
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                    ${value === val ? 'border-[#F57C00] bg-[#F57C00]' : 'border-[#2E7D32]/30 bg-white group-hover:border-[#F57C00]/50'}`}>
                    {value === val && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <span className="text-sm text-[#003000]">{label}</span>
              </label>
            );
          })}
        </div>
      );

    // ── Checkbox ──
    case 'checkbox':
      return (
        <label className="flex items-center gap-3 cursor-pointer group w-fit">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              name={field.name}
              checked={!!value}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="sr-only"
              required={field.required}
            />
            <div className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center
              ${value ? 'border-[#F57C00] bg-[#F57C00]' : 'border-[#2E7D32]/30 bg-white group-hover:border-[#F57C00]/50'}`}>
              {value && <RiCheckLine className="text-white text-xs" />}
            </div>
          </div>
          <span className="text-sm text-[#003000]">{field.checkboxLabel || field.label}</span>
        </label>
      );

    // ── Password ──
    case 'password':
      return (
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name={field.name}
            placeholder={field.placeholder || '••••••••'}
            required={field.required}
            value={value || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={`${baseInput} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2E7D32]/50 hover:text-[#F57C00] transition-colors"
          >
            {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        </div>
      );

    // ── Image upload ──
    case 'image':
      return (
        <div>
          <input
            ref={fileRef}
            type="file"
            name={field.name}
            accept={field.accept || 'image/*'}
            required={field.required}
            onChange={handleFileChange}
            className="sr-only"
          />
          <div
            onClick={() => fileRef.current.click()}
            className="w-full border-2 border-dashed border-[#2E7D32]/30 rounded-xl p-4 cursor-pointer 
              hover:border-[#F57C00] hover:bg-[#FDF6EC] transition-all duration-200 group"
          >
            {imagePreview ? (
              <div className="flex items-center gap-3">
                <img src={imagePreview} alt="preview" className="w-14 h-14 rounded-lg object-cover border border-[#2E7D32]/20" />
                <div>
                  <p className="text-sm font-medium text-[#003000] truncate max-w-[180px]">{fileName}</p>
                  <p className="text-xs text-[#2E7D32] mt-0.5">Click to change</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-2">
                <RiImageLine className="text-3xl text-[#2E7D32]/40 group-hover:text-[#F57C00] transition-colors" />
                <p className="text-sm text-[#2E7D32]/60 group-hover:text-[#F57C00] transition-colors">
                  Click to upload image
                </p>
                <p className="text-xs text-[#2E7D32]/40">{field.accept || 'PNG, JPG, WEBP'}</p>
              </div>
            )}
          </div>
        </div>
      );

    // ── Generic file upload ──
    case 'file':
      return (
        <div>
          <input
            ref={fileRef}
            type="file"
            name={field.name}
            accept={field.accept || '*'}
            required={field.required}
            multiple={field.multiple || false}
            onChange={handleFileChange}
            className="sr-only"
          />
          <div
            onClick={() => fileRef.current.click()}
            className="w-full border-2 border-dashed border-[#2E7D32]/30 rounded-xl p-4 cursor-pointer 
              hover:border-[#F57C00] hover:bg-[#FDF6EC] transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#FDF6EC] group-hover:bg-[#F57C00]/10 rounded-lg transition-colors">
                <RiUploadCloud2Line className="text-xl text-[#F57C00]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#003000]">
                  {fileName || 'Click to upload file'}
                </p>
                <p className="text-xs text-[#2E7D32]/50 mt-0.5">
                  {field.accept ? `Accepted: ${field.accept}` : 'Any file type'}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <input
          type={field.type || 'text'}
          name={field.name}
          placeholder={field.placeholder || ''}
          required={field.required}
          min={field.min}
          max={field.max}
          step={field.step}
          pattern={field.pattern}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={baseInput}
        />
      );
  }
};

const PopupForm = ({
  formfield = [],
  title = 'Form',
  isOpen = true,
  onClose,
  onSubmit,
  submitLabel = 'Submit',
}) => {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({});
    }, 1800);
  };

  // Split checkbox fields — they render the label themselves
  const isLabelless = (type) => type === 'checkbox';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#003000]/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[100000900] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg bg-[#FDF6EC] rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#003000] via-[#F57C00] to-[#2E7D32]" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#2E7D32]/10">
                <div>
                  <h2 className="text-lg font-bold text-[#003000] capitalize">{title}</h2>
                  <p className="text-xs text-[#2E7D32] mt-0.5">
                    Fill in the details below
                    {formfield.some((f) => f.required) && (
                      <span className="ml-1 text-[#F57C00]">* required fields</span>
                    )}
                  </p>
                </div>
                {onClose && (
                  <motion.button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-[#2E7D32]/10 text-[#003000]/50 hover:text-[#F57C00] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <RiCloseLine className="text-xl" />
                  </motion.button>
                )}
              </div>

              {/* Scrollable body */}
              <form onSubmit={handleSubmit}>
                <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto
                  scrollbar-thin scrollbar-thumb-[#2E7D32]/20 scrollbar-track-transparent">
                  {formfield.map((field, index) => (
                    <motion.div
                      key={field.name || index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.045, ease: EASE }}
                    >
                      {/* Label — skip for checkbox (it renders its own) */}
                      {!isLabelless(field.type) && (
                        <label className="block text-xs font-semibold text-[#003000]/70 mb-1.5 uppercase tracking-wide">
                          {field.label}
                          {field.required && <span className="text-[#F57C00] ml-0.5">*</span>}
                        </label>
                      )}

                      <Field
                        field={field}
                        value={formData[field.name]}
                        onChange={handleChange}
                      />

                      {/* Helper text */}
                      {field.hint && (
                        <p className="mt-1 text-xs text-[#2E7D32]/60">{field.hint}</p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 pt-4 border-t border-[#2E7D32]/10 flex items-center gap-3">
                  {onClose && (
                    <motion.button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-2.5 rounded-xl border-2 border-[#2E7D32]/20 text-sm font-semibold text-[#003000] hover:bg-[#2E7D32]/5 transition-colors"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  )}

                  <motion.button
                    type="submit"
                    className="flex-[2] py-2.5 rounded-xl bg-[#F57C00] text-white text-sm font-bold 
                      shadow-lg shadow-[#F57C00]/20 hover:bg-[#e06900] transition-colors relative overflow-hidden"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.span
                          key="done"
                          className="flex items-center justify-center gap-2"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                        >
                          <RiCheckLine className="text-lg" /> Submitted!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="label"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                        >
                          {submitLabel}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PopupForm;