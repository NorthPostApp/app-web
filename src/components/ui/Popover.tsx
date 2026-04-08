import { Popover as BasePopover } from "@base-ui/react";
import type { PropsWithChildren, ReactElement } from "react";

type PopoverProps = {
  trigger: ReactElement;
  title: string;
} & PropsWithChildren;

export default function Popover({ trigger, title, children }: PopoverProps) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger className="group hover:cursor-pointer">
        {trigger}
      </BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={9}>
          <BasePopover.Popup className="flex flex-col items-center bg-(--color-background) border border-(--gray-4) px-3 py-2 rounded-xl gap-2">
            <BasePopover.Arrow className="-top-1.5">
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
            </BasePopover.Arrow>
            <BasePopover.Title className="text-sm border-b pb-0.5 border-(--gray-6) w-full text-center">
              {title}
            </BasePopover.Title>
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
