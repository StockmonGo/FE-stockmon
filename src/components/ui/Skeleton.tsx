import { cn } from "@/lib/utils";
import "@/app/animations.css";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "skeleton-animate-pulse bg-muted bg-stock-dark-200",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
