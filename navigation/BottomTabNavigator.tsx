/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import SpanWaifuScreen from '../screens/SpanWaifuScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, SpanWaifuParamList } from '../types';

import Header from '../components/Header';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
      }}
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint
      }}
    >
      {/* <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      /> */}
      <BottomTab.Screen
        name="Span"
        component={SpanWaifuNavigation}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="face-woman" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="code-array" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const header = ({ scene, previous, navigation }: StackHeaderProps) => {
  return <Header scene={scene} previous={previous} navigation={navigation} />;
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<SpanWaifuParamList>();

function SpanWaifuNavigation() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="SpanWaifuScreen"
        component={SpanWaifuScreen}
        options={{
          header,
          headerTitle: 'Span Waifu in Chat'
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          header,
          headerTitle: 'Tab Two Title'
        }}
      />
    </TabTwoStack.Navigator>
  );
}
