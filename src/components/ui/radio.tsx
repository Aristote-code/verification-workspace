// AlignUI Radio v1.2
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

const RadioGroup = RadioGroupPrimitive.Root;

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...rest }, forwardedRef) => {
  const filterId = React.useId();

  return (
    <RadioGroupPrimitive.Item
      ref={forwardedRef}
      className={`align-radio${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <svg className="align-radio-base" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle className="align-radio-outer" cx="10" cy="10" r="8" />
        <g filter={`url(#${filterId})`}>
          <circle className="align-radio-inner" cx="10" cy="10" r="6.5" />
        </g>
        <defs>
          <filter id={filterId} x="1.5" y="3.5" width="17" height="17" filterUnits="userSpaceOnUse">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.105882 0 0 0 0 0.109804 0 0 0 0 0.113725 0 0 0 0.12 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
      <RadioGroupPrimitive.Indicator asChild>
        <svg className="align-radio-indicator" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="4" />
        </svg>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup as Group, RadioGroupItem as Item };
