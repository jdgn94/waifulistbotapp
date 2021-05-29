import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';

const Header = ({ scene, previous, navigation }: StackHeaderProps) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;

  return (
    <Appbar.Header>
      {previous && (
        <Appbar.BackAction
          onPress={() => navigation.pop()}
        />
      )}
      <Appbar.Content
        title={
          title
        }
      />
    </Appbar.Header>
  );
};

export default Header;