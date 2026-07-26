import { type ReactNode } from "react";

export const ButtonGlow = ({ children }: { children: ReactNode }) => (
  <span className="wrapper">
    {Array.from({ length: 12 }, (_, index) => (
      <span className={`circle circle-${index + 1}`} key={index} />
    ))}
    <span>{children}</span>
  </span>
);

export default ButtonGlow;
