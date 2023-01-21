import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import Checkbox from '../components/Checkbox';
import EmptyHabitDay from '../components/EmptyHabitDay';
import Loading from '../components/Loading';
import ProgressBar from '../components/ProgressBar';
import { api } from '../lib/axios';
import { generateProgressPercentage } from '../utils/generate-progress-percentage';

interface Params {
  date: string;
}

interface IDayInfo {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}

const Habit = () => {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<IDayInfo | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const isPastDate = parsedDate.endOf('day').isBefore(new Date());
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const habitProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);

      const res = await api.get(`/day`, { params: { date } });
      setDayInfo(res.data);
      setCompletedHabits(res.data.completedHabits);
    } catch (err) {
      Alert.alert('Oops!', 'Não foi possível carregar as informações');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(id: string) {
    try {
      await api.patch(`habits/${id}/toggle`);

      if (completedHabits.includes(id)) {
        setCompletedHabits((prev) => prev.filter((h) => h !== id));
      } else {
        setCompletedHabits((prev) => [...prev, id]);
      }
    } catch (err) {
      Alert.alert('Oops!', 'Não possível salvar a modificação');
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) return <Loading />;
  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
          {dayOfWeek}
        </Text>

        <Text className='text-white font-extrabold text-3xl'>
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitProgress} />

        <View className={`mt-6 ${isPastDate && 'opacity-40'}`}>
          {dayInfo?.possibleHabits.length ? (
            dayInfo.possibleHabits.map((habit) => {
              return (
                <Checkbox
                  key={habit.id}
                  title={habit.title}
                  checked={completedHabits.includes(habit.id)}
                  onPress={() => handleToggleHabit(habit.id)}
                  disabled={isPastDate}
                />
              );
            })
          ) : (
            <EmptyHabitDay />
          )}
        </View>

        {isPastDate && (
          <Text className='text-white mt-10 text-center'>
            Você não pode atualizar hábitos de um dia anterior.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Habit;
