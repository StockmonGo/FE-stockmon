import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse bg-muted bg-stock-dark-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
