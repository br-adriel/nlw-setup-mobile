import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import HabitDay, { DAY_SIZE } from '../components/HabitDay';
import Header from '../components/Header';
import { generateDaysFromYearBeginning } from '../utils/generate-days-from-year-beginning';

const weekDays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];
const datesFromYearStart = generateDaysFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill =
  minimumSummaryDatesSize - datesFromYearStart.length + 1;

const Home = () => {
  const { navigate } = useNavigation();
  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <Header />
      <View className='flex-row mb-2 mt-6'>
        {weekDays.map((wd) => {
          return (
            <Text
              key={wd}
              className='text-zinc-400 text-xl font-bold text-center mx-1'
              style={{ width: DAY_SIZE, height: DAY_SIZE }}
            >
              {wd[0]}
            </Text>
          );
        })}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className='flex-row flex-wrap'>
          {datesFromYearStart.map((date) => {
            return (
              <HabitDay
                key={date.toISOString()}
                onPress={() => navigate('habit', { date: date.toISOString() })}
              />
            );
          })}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, i) => {
              return <HabitDay key={i} disabled />;
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
