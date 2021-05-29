import * as React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { TextInput, List, Menu, Button } from "react-native-paper";
import FetchController from "../utils/FetchController";
import { View, ScrollView } from "./Themed";

interface IAutocomplete {
  type: 'waifu';
  label: string;
  setSelectValue: Function;
};

export interface Waifu {
  id: number;
  name: string;
  nickname: string;
  franchise_name: string;
  franchise_nickname: string;
  image_url: string;
  servant: boolean;
  waifu_type_name: string;
  age: number;
}

export interface Option {
  value: number,
  label: string;
  description: string;
}

interface ItemOption extends Option {
  onSelect: Function;
}

export default function AutocompleteComponent({ type, setSelectValue, label }: IAutocomplete) {
  const textFieldRef = React.useRef(null);
  const [id, setId] = React.useState(0);
  const [inputText, setInputText] = React.useState('');
  const [waifus, setWaifus] = React.useState([] as Waifu[]);
  const [options, setOptions] = React.useState([] as Option[]);
  const [viewResult, setViewResult] = React.useState(false);
  const [timer, setTimer] = React.useState(null as any);

  React.useEffect(() => { _onFetch('') }, []);

  const _onChangeText = (text: string) => {
    setViewResult(true)
    setInputText(text);
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      _onFetch(text);
    }, 500));
  }

  const _onFetch = (text: string) => {
    console.log('debo buscar por el nombre', text);
    switch (type) {
      case 'waifu': return _searchWaifu(text);
      default: return;
    }
  }

  const _onSelect = (waifu: Option) => {
    // console.log(waifu);
    setInputText(waifu.label);
    setId(waifu.value);
    setViewResult(false);
    const waifuSelected = waifus.filter((w) => w.id == waifu.value);
    // console.log(waifuSelected);
    setSelectValue(waifuSelected[0]);
  }

  const _searchWaifu = async (text: string) => {
    const data = await FetchController.get(`waifus?name=${text}`);
    // console.log(data);
    if (data.status === 200) {
      const allWaifus = await data.json();
      const waifus: Waifu[] = await allWaifus.waifus;
      setWaifus(waifus);
      const waifusFormated = await Promise.all(waifus.map(waifu => {
        return {
          value: waifu.id,
          label: `${waifu.name} ${waifu.nickname.length > 0 ? ('- ' + waifu.nickname) : ''}`,
          description: `${waifu.franchise_name} ${waifu.franchise_nickname.length > 0 ? ('- ' + waifu.franchise_name) : ''}`
        } as Option;
      }));
      setOptions(waifusFormated);
    }
  }

  const _changeViewResult = () => {
    setViewResult(!viewResult);
  }

  const _renderOptions = () => {
    if (options.length > 0) {
      return options.map(waifu => (
        <List.Item
          key={waifu.value}
          onPress={() => _onSelect(waifu)}
          title={waifu.label}
          description={waifu.description}
          right={
            waifu.value == id
              ? (props) => <List.Icon {...props} icon="check" />
              : undefined
          }
        />
      ));
    } else {
      return (
        <List.Item
          title="No item"
          description=""
        />
      );
    }
  }

  return (
    <View style={{ position: 'relative', zIndex: 1 }}>
      <TextInput
        label={label}
        mode="outlined"
        value={inputText}
        onChangeText={_onChangeText}
        onFocus={() => setViewResult(true)}
        right={
          <TextInput.Icon
            name={viewResult ? "chevron-up" : "chevron-down"}
            onPress={_changeViewResult}
          />
        }
      />
      {
        viewResult && (
          <View style={{ paddingHorizontal: 5 }}>
            <ScrollView style={styles.menu}>
              {_renderOptions()}
            </ScrollView>
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    width: "100%",
    // position: "absolute",
    maxHeight: 500,
    minHeight: 50,
    borderRadius: 10,
    marginTop: 5,
    zIndex: 1,
    // top: 65,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dismisFetch: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "red"
  }
})