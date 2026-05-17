import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: "1024px",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      {children}
    </div>
  );
}
