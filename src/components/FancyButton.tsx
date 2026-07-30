import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

type FancyButtonVariant =
  | "neutral"
  | "primary"
  | "destructive"
  | "basic"
  | "success";

type FancyButtonSize = "medium" | "small" | "xsmall";

type FancyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: FancyButtonVariant;
  size?: FancyButtonSize;
};

const FancyButtonRoot = React.forwardRef<HTMLButtonElement, FancyButtonProps>(
  (
    {
      asChild = false,
      children,
      variant = "neutral",
      size = "medium",
      className = "",
      ...rest
    },
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={forwardedRef}
        className={`fancy-button fancy-button--${variant} fancy-button--${size} ${className}`.trim()}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

FancyButtonRoot.displayName = "FancyButtonRoot";

function FancyButtonIcon({
  children,
  className = "",
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`fancy-button__icon ${className}`.trim()}>
      {children}
    </span>
  );
}

FancyButtonIcon.displayName = "FancyButtonIcon";

export const FancyButton = {
  Root: FancyButtonRoot,
  Icon: FancyButtonIcon,
};
