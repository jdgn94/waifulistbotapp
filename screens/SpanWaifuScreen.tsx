import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { Text, View, ScrollView } from '../components/Themed';
import SnackBarComponent from '../components/SnackBarComponent';
import Autocomplete, { Waifu } from '../components/Autocomplete';

import GlobalStyles from '../utils/GlobalStyles';
import fetchController from '../utils/FetchController';
import { IShackBar } from '../types';

const initStateSnackBar: IShackBar = {
  type: 'info',
  open: false,
  message: ''
};

export default function SpanWaifuScreen() {
  const [selectWaifu, setSelectWaifu] = React.useState({} as Waifu);
  const [chatId, setChatId] = React.useState('');
  const [snackBarStatus, setSnackBarStatus] = React.useState(initStateSnackBar);

  const createWaifuInChat = async () => {
    const url = 'waifus/span_specific';
    const body = {
      waifu_id: selectWaifu.id,
      chat_id: chatId
    };

    const response = await fetchController.post(url, body);
    const data = await response.json();
    console.log(response);

    if (response.status === 201) {
      setSnackBarStatus({
        open: true,
        type: 'success',
        message: data.message
      });
      setSelectWaifu({} as Waifu);
      setChatId('');
    } else {
      setSnackBarStatus({
        open: true,
        type: 'error',
        message: data.message
      });
    }
  }

  const _dismisSnackBar = () => {
    setSnackBarStatus({ ...snackBarStatus, open: false });
  }

  return (
    <ScrollView style={styles.container}>
      <Autocomplete
        label="waifu"
        type={'waifu'}
        setSelectValue={setSelectWaifu}
      />
      <View style={styles.resultContainer}>
        <Image
          source={selectWaifu.image_url ?
            { uri: selectWaifu.image_url } :
            require('../assets/images/default/waifuNotFound.jpg')
          }
          style={[GlobalStyles.imageWaifu, styles.space]}
        />

        <Text>name: {selectWaifu.name ? selectWaifu.name : 'no waifu'} </Text>
        <Text>franchise: {selectWaifu.franchise_name ? selectWaifu.franchise_name : 'no franchise'} </Text>
        <Text>age: {selectWaifu.age ? selectWaifu.age : 'no age'} </Text>
      </View>
      <TextInput
        mode="outlined"
        label="chat id"
        value={chatId}
        onChangeText={setChatId}
        keyboardType="numeric"
        style={styles.space}
      />
      <Button
        mode="contained"
        style={styles.space}
        disabled={!selectWaifu.id || chatId.length === 0}
        onPress={createWaifuInChat}
      >
        Span Waifu
      </Button>
      <SnackBarComponent
        message={snackBarStatus.message}
        type={snackBarStatus.type}
        open={snackBarStatus.open}
        onDismiss={_dismisSnackBar}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  resultContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  space: {
    marginTop: 20
  }
});
