interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    font-[YouMurderer]
    rounded-sm
    tracking-widest
    shadow-xl
    transition-all
    flex items-center justify-center
    cursor-pointer
  `;

  const variants = {
    primary: `
      bg-red-700
      hover:bg-red-600
      text-white
      font-bold
      disabled:bg-red-800
      disabled:opacity-60
      disabled:cursor-not-allowed
    `,
    secondary: `
      bg-transparent
      border border-red-600
      text-red-600
      hover:bg-red-600
      hover:text-white
      disabled:opacity-50
      disabled:cursor-not-allowed
    `,
  };

  const sizes = {
    sm: "px-6 py-1 text-base",
    md: "px-10 py-2 text-xl",
    lg: "px-14 py-3 text-2xl",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        children
      )}
    </button>
  );
}
