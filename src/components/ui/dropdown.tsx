// AlignUI Dropdown v1.2 — adapted to the Zemo CSS token layer.
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as Checkbox from "@/components/ui/checkbox";

const DropdownRoot = DropdownMenuPrimitive.Root;
const DropdownTrigger = DropdownMenuPrimitive.Trigger;

const DropdownContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, align = "start", ...rest }, forwardedRef) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={forwardedRef}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={8}
      className={`align-dropdown-content${className ? ` ${className}` : ""}`}
      {...rest}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownContent.displayName = "DropdownContent";

const DropdownCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, onSelect, checked, ...rest }, forwardedRef) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={forwardedRef}
    className={`align-dropdown-checkbox-item${className ? ` ${className}` : ""}`}
    checked={checked}
    onSelect={(event) => {
      event.preventDefault();
      onSelect?.(event);
    }}
    {...rest}
  >
    <Checkbox.Visual />
    <span className="align-dropdown-checkbox-label">{children}</span>
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownCheckboxItem.displayName = "DropdownCheckboxItem";

export {
  DropdownRoot as Root,
  DropdownTrigger as Trigger,
  DropdownContent as Content,
  DropdownCheckboxItem as CheckboxItem,
};
