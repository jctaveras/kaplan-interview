import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';

import '../../styles/components/theme-picker.css';

import icon from '../../icons/paint.svg';
import useTheme from '../../hooks/use-theme';

export default function ThemePicker() {
  const currentTheme = useTheme();
  const [themeColor, setThemeColor] = useState(currentTheme);
  const [colorPickerVisibility, setColorPickerVisibility] = useState(false);

  useEffect(() => {
    const style = document.documentElement.style;

    style.setProperty('--main-theme-color', themeColor);
    style.setProperty('--main-hover-color', getHoverColor(themeColor));

    sessionStorage.setItem('theme', themeColor);
  }, [themeColor]);
  
  return (
    <div className="theme-picker">
      <SketchPicker
        className={colorPickerVisibility ? 'visible' : 'hidden'}
        color={themeColor}
        onChange={(color) => setThemeColor(color.hex)}
      />
      <button
        className="theme-picker-btn"
        onClick={() => setColorPickerVisibility(colorPickerVisibility => !colorPickerVisibility)}
      >
        <img src={icon} alt="Theme Picker Button"/>
      </button>
    </div>
  );
}

function getHoverColor(color: string): string {
  const hex = parseInt(color.substring(1), 16);
  const AMOUNT = 89;
  const red = (hex >> 16) + AMOUNT;
  const blue = ((hex >> 8) & 0x00FF) + AMOUNT;
  const green = (hex & 0x0000FF) + AMOUNT;
  return `#${(green | (blue << 8) | (red << 16)).toString(16)}`;
}
