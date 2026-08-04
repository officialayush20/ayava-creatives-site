import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
};

/**
 * Shared max-width/gutter wrapper matching the 12-col editorial grid from
 * the layout spec (1760/1280/944/688/fluid across breakpoints).
 */
// Outer-margin spec table: 375px->16px, 428px->20px, 768px->32px, 1024px->40px.
// Tailwind's default breakpoints (md=768, lg=1024) line up with the spec's
// 768/1024 rows, so px-8 (32px) at md and px-10 (40px) at lg already match
// exactly; px-4/px-5 below 428 are the closest reasonable approximation to
// 16/20px without a deeper grid rework.
export function Container({ children, className = "", as = "div" }: ContainerProps) {
  const Tag = as;
  return (
    <Tag
      className={`mx-auto w-full max-w-[1760px] px-4 min-[428px]:px-5 md:px-8 lg:px-10 xl:px-16 2xl:px-20 ${className}`}
    >
      {children}
    </Tag>
  );
}
