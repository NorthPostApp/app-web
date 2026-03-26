import type { PropsWithChildren } from "react";

type KbdProps = {} & PropsWithChildren;

export default function Kbd({ children }: KbdProps) {
  return (
    <p className="bg-(--gray-3) w-4.5 h-4.5 leading-4.5 rounded-md p-0 text-center">
      {children}
    </p>
  );
}
