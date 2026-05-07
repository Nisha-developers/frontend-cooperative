import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ImageUploadModal = ({ isOpen, onClose, listingId, uploadFn, onDone }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [done, setDone] = useState(false);
  const inputRef = useRef(null);
  const MAX = 5;

  const addFiles = useCallback((incoming) => {
    const images = [...incoming].filter((f) => f.type.startsWith('image/'));
    setFiles((prev) => {
      const merged = [...prev, ...images].slice(0, MAX);
      // rebuild previews in sync
      setPreviews(merged.map((f) => URL.createObjectURL(f)));
      return merged;
    });
  }, []);

  const removeFile = (index) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      setPreviews(next.map((f) => URL.createObjectURL(f)));
      return next;
    });
  };

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const handleDragOver = (e) => {
    e.preventDefault();
    if (files.length < MAX) setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (files.length < MAX) addFiles(e.dataTransfer.files);
  };

  const handleBrowse = () => {
    if (files.length >= MAX) return;
    inputRef.current?.click();
  };

  const handleInputChange = (e) => addFiles(e.target.files);

  // ── Upload ─────────────────────────────────────────────────────────────────
  const handleUpload = async () => {
    if (!files.length || !listingId) return;
    setUploading(true);
    setProgress(0);

    for (let i = 0; i < files.length; i++) {
      setStatusText(`Uploading ${i + 1} of ${files.length}…`);
      try {
        await uploadFn(listingId, files[i]);
      } catch (err) {
        console.error(`Failed to upload image ${i + 1}:`, err);
        // continue uploading remaining files even if one fails
      }
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setStatusText(`✓ ${files.length} photo${files.length > 1 ? 's' : ''} uploaded!`);
    setDone(true);
    setUploading(false);
  };

  const handleClose = () => {
    setFiles([]);
    setPreviews([]);
    setProgress(0);
    setStatusText('');
    setDone(false);
    setUploading(false);
    onClose();
    onDone?.();
  };

  if (!isOpen) return null;

  const isFull = files.length >= MAX;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-cooperative-dark px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white text-sm font-semibold tracking-widest uppercase">
              Upload Listing Photos
            </h2>
            <p className="text-cooperative-teal text-xs mt-0.5">
              Listing ID: <span className="text-cooperative-orange font-mono">{listingId}</span>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">

          {/* Dropzone */}
          <div
            onClick={handleBrowse}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 select-none
              ${isDragging ? 'border-cooperative-orange bg-amber-50 scale-[1.01]' : 'border-amber-300 bg-amber-50/40'}
              ${isFull ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-amber-500 hover:bg-amber-50'}
            `}
          >
           
            <p className="text-sm text-gray-600">
              {isFull
                ? 'Maximum of 5 photos reached'
                : <>Drag & drop photos here or <span className="text-cooperative-orange font-semibold">browse</span></>}
            </p>
            <span className="inline-block mt-2 px-3 py-0.5 bg-[#1c1c1c] text-amber-400 text-xs rounded-full tracking-wide">
              {files.length} / {MAX} photos
            </span>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleInputChange}
          />

          {/* Preview grid */}
          {files.length > 0 && (
            <div className="grid grid-cols-5 gap-2 mt-4">
              {previews.map((src, i) => (
                <div key={i} className="relative aspect-square rounded overflow-hidden border border-gray-200 group">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  {!uploading && !done && (
                    <button
                      onClick={() => removeFile(i)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  )}
                  {/* Upload status overlay */}
                  {uploading && i < Math.round((progress / 100) * files.length) && (
                    <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center">
                      <span className="text-white text-lg">✓</span>
                    </div>
                  )}
                </div>
              ))}
              {/* Empty slots */}
              {Array.from({ length: MAX - files.length }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square rounded border border-dashed border-gray-200 bg-gray-50" />
              ))}
            </div>
          )}

          {/* Progress bar */}
          {(uploading || done) && (
            <div className="mt-4">
              <div className="h-1.5 bg-amber-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-xs text-gray-500 mt-2">{statusText}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <button
            onClick={handleClose}
            className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
          >
            {done ? 'Close' : 'Skip for now'}
          </button>

          {!done ? (
            <button
              onClick={handleUpload}
              disabled={!files.length || uploading}
              className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors tracking-wide"
            >
              {uploading ? 'Uploading…' : `Upload ${files.length || ''} Photo${files.length !== 1 ? 's' : ''}`}
            </button>
          ) : (
            <button
              onClick={handleClose}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors tracking-wide"
            >
              ✓ Done
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageUploadModal;