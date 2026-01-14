import { cn } from "@/lib/utils";

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function Paper({ children, ref, className = "" }: PaperProps) {
  return (
    <div
      ref={ref}
      className={cn("id-card-container flex flex-col p-6", className)}
      style={{ width: "324px", height: "512px", border: "1px solid #e2e8f0" }}
    >
      {children}
    </div>
  );
}
