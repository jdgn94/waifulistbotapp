import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Snackbar } from 'react-native-paper';

import { Text, View } from '../components/Themed';

import { IShackBar } from '../types';
import { info, error, warning, success } from '../constants/Colors';

interface ISnackBarComponent extends IShackBar {
  onDismiss: Function;
}

const { height } = Dimensions.get('window');

export default function snackBarComponent(props: ISnackBarComponent) {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={props.open}
        onDismiss={() => props.onDismiss()}
        style={styles[props.type]}
        action={{
          label: '',
          icon: 'close',
          color: 'white',
          onPress: () => props.onDismiss(),
        }}
      >
        {props.message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: height - 120,
    width: '100%',
    zIndex: 2,
  },
  info: {
    backgroundColor: info,
    color: 'white'
  },
  warning: {
    backgroundColor: warning,
    color: 'white'
  },
  success: {
    backgroundColor: success,
    color: 'white'
  },
  error: {
    backgroundColor: error,
    color: 'white'
  },
});