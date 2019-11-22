import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import {
  Container,
  HourList,
  Hour,
  Title,
  Unavailable,
  UnavailableText,
} from './styles';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const [unavailable, setUnavailable] = useState(false);

  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      setHours(response.data);
      setUnavailable(false);
    }

    loadAvailable();
  }, [date, provider.id]);

  useEffect(() => {
    const countAvailable = hours.find(h => h.available === true);

    if (!countAvailable) {
      setUnavailable(true);
    }
  }, [hours]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        {unavailable && (
          <Unavailable>
            <UnavailableText>
              Desculpe, não há horário disponível para essa data!
            </UnavailableText>
          </Unavailable>
        )}

        <HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={25} color="#FFF" />
    </TouchableOpacity>
  ),
});
