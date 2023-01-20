import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import HabitDay, { DAY_SIZE } from '../components/HabitDay';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { api } from '../lib/axios';
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

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

const Home = () => {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await api.get('/summary');
      setSummary(res.data);
    } catch (error) {
      Alert.alert('Oops...', 'Não foi possível carregar o resumo de hábitos');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;
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
        {summary && (
          <View className='flex-row flex-wrap'>
            {datesFromYearStart.map((date) => {
              const dayWithHabits = summary.find((day) => {
                return dayjs(date).isSame(day.date, 'day');
              });

              return (
                <HabitDay
                  key={date.toISOString()}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  onPress={() =>
                    navigate('habit', { date: date.toISOString() })
                  }
                />
              );
            })}

            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, i) => {
                return (
                  <View
                    key={i}
                    className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  />
                );
              })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
