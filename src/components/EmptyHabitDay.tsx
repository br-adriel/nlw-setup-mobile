import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';

const EmptyHabitDay = () => {
  const { navigate } = useNavigation();
  return (
    <Text className='text-zinc-400 text-base'>
      Não há nenhum hábito ainda,{' '}
      <Text
        className='text-violet-400 text-base underline active:text-violet-500'
        onPress={() => navigate('new')}
      >
        adicione um novo hábito.
      </Text>
    </Text>
  );
};

export default EmptyHabitDay;
