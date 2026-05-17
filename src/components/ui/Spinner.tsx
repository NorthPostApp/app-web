import { Loader } from "lucide-react";

type Variants = "sm" | "base" | "lg";

const getSize = (variant: Variants = "base") => {
  switch (variant) {
    case "sm":
      return 14;
    case "lg":
      return 24;
    default:
      return 20;
  }
};

type SpinnerProps = {
  variant?: Variants;
};

export default function Spinner({ variant }: SpinnerProps) {
  const size = getSize(variant);
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      data-testid="ui-spinner"
    >
      <Loader
        className="animate-spin stroke-(--color-background)"
        size={size}
        data-testid={`ui-spinner-svg-${size}`}
      />
    </div>
  );
}
