import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
  type MouseEvent,
} from "react";

/**
 * Simple class joiner to avoid needing `cn` / `class-variance-authority`.
 */
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Types
 */
type DropdownContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

function useDropdown() {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error("Dropdown components must be used inside <DropdownMenu />");
  }
  return ctx;
}

/**
 * Top-level component that provides context and handles outside clicks / Esc key.
 */
export function DropdownMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // click outside to close
  useEffect(() => {
    function onDocClick(e: MouseEvent | globalThis.MouseEvent) {
      const target = e.target as Node | null;
      if (!target) return;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("click", onDocClick as any);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick as any);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

/**
 * Trigger - a button (forwardRef) that toggles the menu.
 * Use as: <DropdownMenuTrigger><YourTrigger /></DropdownMenuTrigger>
 */
export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLButtonElement> & { className?: string }
>(function DropdownMenuTrigger({ children, className, ...props }, ref) {
  const { open, setOpen, triggerRef } = useDropdown();

  // combine refs
  const localRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!ref) {
      triggerRef.current = localRef.current;
      return;
    }
    // if caller provided a ref, try to set it (works for function refs and object refs)
    // @ts-ignore - a best-effort merge for typical cases
    if (typeof ref === "function") {
      ref(localRef.current);
    } else if (ref && typeof ref === "object") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref.current = localRef.current;
    }
    triggerRef.current = localRef.current;
  }, [ref, triggerRef]);

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    setOpen(!open);
    props.onClick && props.onClick(e);
  }

  return (
    <button
      ref={localRef}
      {...props}
      onClick={onClick}
      className={cx("outline-none", className ?? "")}
      type="button"
    >
      {children}
    </button>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

/**
 * Content - the actual dropdown panel. Renders only when open.
 * Accepts className, style, etc.
 */
export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { align?: "left" | "right" }
>(function DropdownMenuContent({ children, className, align = "right", ...props }, ref) {
  const { open, contentRef } = useDropdown();

  // Attach forwarded ref to contentRef
  const localRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // @ts-ignore safe assignment for common ref shapes
    if (ref) {
      if (typeof ref === "function") ref(localRef.current);
      else (ref as any).current = localRef.current;
    }
    contentRef.current = localRef.current;
  }, [ref, contentRef]);

  if (!open) return null;

  const alignClass = align === "right" ? "right-0" : "left-0";

  return (
    <div
      ref={localRef}
      role="menu"
      {...props}
      className={cx(
        "absolute mt-2 w-48 rounded-md bg-black/90 border border-red-600/40 shadow-xl p-2 z-50 animate-in",
        alignClass,
        className ?? ""
      )}
    >
      {children}
    </div>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

/**
 * Label
 */
export function DropdownMenuLabel({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cx("px-2 py-1.5 text-xs uppercase opacity-70", className ?? "")}>
      {children}
    </div>
  );
}

/**
 * Item - clickable item that automatically closes the menu after click.
 * Accepts onClick.
 */
export const DropdownMenuItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { onSelect?: (e: MouseEvent) => void }
>(function DropdownMenuItem({ children, className, onClick, onSelect, ...props }, ref) {
  const { setOpen } = useDropdown();
  return (
    <div
      ref={ref as any}
      role="menuitem"
      tabIndex={0}
      {...props}
      onClick={(e) => {
        onClick && onClick(e as any);
        onSelect && onSelect(e as any);
        setOpen(false);
      }}
      onKeyDown={(e) => {
        // Enter or Space should activate item
        if (e.key === "Enter" || e.key === " ") {
          // @ts-ignore
          onSelect && onSelect(e);
          setOpen(false);
        }
      }}
      className={cx("px-2 py-2 text-sm cursor-pointer rounded-md hover:bg-red-600/30 transition", className ?? "")}
    >
      {children}
    </div>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

/**
 * Separator
 */
export function DropdownMenuSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("h-px bg-red-500/40 my-2", className ?? "")} />;
}
