import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { generateProgressPercentage } from '../utils/generate-progress-percentage';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
const SCREEN_WIDTH = Dimensions.get('screen').width;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  SCREEN_WIDTH / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
}

const HabitDay = (props: Props) => {
  const { amountOfHabits = 0, amountCompleted = 0, date, ...args } = props;

  const percentage = amountOfHabits
    ? generateProgressPercentage(amountOfHabits, amountCompleted)
    : 0;

  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  const styleClasses = clsx(`m-1 rounded-lg border-2`, {
    'bg-zinc-900 border-zinc-800': percentage === 0,
    'bg-violet-900 border-violet-700': percentage > 0 && percentage < 20,
    'bg-violet-800 border-violet-600': percentage >= 20 && percentage < 40,
    'bg-violet-700 border-violet-500': percentage >= 40 && percentage < 60,
    'bg-violet-600 border-violet-500': percentage >= 60 && percentage < 80,
    'bg-violet-500 border-violet-400': percentage >= 80,
    'border-violet-300 border-3': isCurrentDay,
  });

  return (
    <TouchableOpacity
      {...args}
      activeOpacity={0.7}
      className={styleClasses}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    />
  );
};

export default HabitDay;
