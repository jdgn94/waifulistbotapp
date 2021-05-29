/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  Span: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type SpanWaifuParamList = {
  SpanWaifuScreen: undefined;
}

export type IShackBar = {
  type: 'info' | 'error' | 'warning' | 'success';
  open: boolean;
  message: string;
}