// ColorSlider.tsx
import React from 'react';
import { SliderPicker } from 'react-color';

interface ColorSliderProps {
  color: string;
  onChange: (color: any) => void;
}

const ColorSlider: React.FC<ColorSliderProps> = ({ color, onChange }) => {
  return (
    <div>
      <SliderPicker color={color} onChange={onChange} />
    </div>
  );
};

export default ColorSlider;
