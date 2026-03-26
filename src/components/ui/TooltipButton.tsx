import { Tooltip } from "@base-ui/react";
import type { ReactElement } from "react";

type TooltipButtonProps = {
  render: ReactElement;
  tooltip: ReactElement;
};

export default function TooltipButton({ render, tooltip }: TooltipButtonProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger render={render} />
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={5}>
          <Tooltip.Popup className="flex items-center bg-(--color-background) border border-(--gray-4) px-3 h-8 rounded-xl">
            <Tooltip.Arrow className="rotate-180 top-7">
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path
                  d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
                  fill="var(--color-background)"
                />
                <path
                  d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
                  className="fill-(--gray-4)"
                />
              </svg>
            </Tooltip.Arrow>
            {tooltip}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
