import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="text-red-400 text-sm tracking-widest font-semibold">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full px-4 py-3
          bg-black/40 border rounded-lg
          text-red-200 placeholder-red-500
          focus:outline-none
          focus:border-red-500
          focus:shadow-[0_0_15px_rgba(255,0,0,0.45)]
          border-red-800
          transition-all
        `}
      />

      {error && (
        <span className="text-red-500 text-xs tracking-wider">{error}</span>
      )}
    </div>
  );
}
