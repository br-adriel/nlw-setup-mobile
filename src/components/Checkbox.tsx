import { Feather } from '@expo/vector-icons';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import colors from 'tailwindcss/colors';

interface Props extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

const Checkbox = ({ title, checked = false, ...args }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row mb-2 items-center'
      {...args}
    >
      {checked ? (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'
        >
          <Feather name='check' size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className='h-8 w-8 bg-zinc-900 rounded-lg border border-zinc-800' />
      )}
      <Text className='text-white ml-3 font-semibold'>{title}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;
