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
