import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-center px-4">
      <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Error 404
      </p>
      <h1 className="text-5xl font-bold text-foreground tracking-tight leading-tight">
        Page not <br />
        <span className="text-primary/60">found.</span>
      </h1>
      <p className="text-sm text-muted-foreground max-w-xs">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        type="button"
        onClick={() => navigate("/tasks")}
        className="mt-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-80 active:scale-95 transition-all cursor-pointer border-none"
      >
        Back to tasks
      </button>
    </div>
  );
}