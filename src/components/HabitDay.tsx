import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
const SCREEN_WIDTH = Dimensions.get('screen').width;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  SCREEN_WIDTH / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
  disabled?: boolean;
}

const HabitDay = ({ disabled = false, ...args }: Props) => {
  return (
    <TouchableOpacity
      {...args}
      activeOpacity={0.7}
      className={`bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 ${
        disabled && 'opacity-40'
      }`}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    />
  );
};

export default HabitDay;
