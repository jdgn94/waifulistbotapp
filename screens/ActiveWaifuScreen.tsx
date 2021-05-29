import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from '@expo/vector-icons/Ionicons'

import { Text, View, ScrollView } from '../components/Themed';
import LoadingIndicatorComponent from '../components/LoadingIndicatorComponent';

import FetchController from '../utils/FetchController';
import globalStyles from '../utils/GlobalStyles';

interface IwaifusActives {
  id: number;
  chat_id: number;
  waifu_name: string;
  waifu_nickname: string;
  image_url: string;
  franchise_name: string;
  franchise_nickname: string;
};

export default function TabTwoScreen() {
  const [waifusActives, setWaifusActives] = React.useState([] as IwaifusActives[]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => { fetchData() }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await FetchController.get('waifus/active_chats');

    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);

      setWaifusActives(data);
    }
    setLoading(false);
  }

  const noItems = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 25 }}>No WaifuActive</Text>
      </View>
    )
  }

  const WaifuActive = (active: IwaifusActives) => {
    return (
      <View
        key={active.id}
        style={styles.waifuContainer}
      >
        <Image
          source={{ uri: active.image_url, }}
          style={globalStyles.imageWaifu}
        />
        <Text>Chat Id: {active.chat_id}</Text>
        <Text>Name: {active.waifu_name + (active.waifu_nickname ? ` - ${active.waifu_nickname}` : '')}</Text>
        <Text>Franchise: {active.franchise_name + (active.franchise_nickname ? ` - ${active.franchise_nickname}` : '')}</Text>
      </View>
    )
  };

  return (
    <ScrollView style={styles.container}>
      <Button
        mode="contained"
        onPress={fetchData}
      >
        <Icon name="reload" size={16} style={{ marginRight: 10 }} />
        Reload
      </Button>

      <View style={{ padding: 5 }}>
        {
          loading ?
            <LoadingIndicatorComponent /> :
            waifusActives.length === 0 ?
              noItems() :
              waifusActives.map(waifu => WaifuActive(waifu))
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  waifuContainer: {
    marginTop: 10,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
