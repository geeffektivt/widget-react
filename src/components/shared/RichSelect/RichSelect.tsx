import React from "react";
import { RichSelectWrapper } from "./RichSelect.style";
import { OptionProps, RichSelectOption } from "./RichSelectOption";

interface RichSelectProps {
  children: React.ReactElement<OptionProps>[];
  // An enum
  selected: number;
  onChange: (value: number) => void;
}

export const RichSelect: React.FC<RichSelectProps> = ({
  children,
  selected,
  onChange,
}) => {
  return (
    <RichSelectWrapper>
      {children.map((child: React.ReactElement<OptionProps>, i) => (
        <RichSelectOption
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...child.props}
          selected={child.props.value === selected}
          select={(value: number) => onChange(value)}
        />
      ))}
    </RichSelectWrapper>
  );
};
