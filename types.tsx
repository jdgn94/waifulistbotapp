/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Span: undefined;
  Active: undefined;
};

export type SpanWaifuParamList = {
  SpanWaifuScreen: undefined;
}

export type ActiveWaifuParamList = {
  ActoveWaifuScreen: undefined;
}

export type IShackBar = {
  type: 'info' | 'error' | 'warning' | 'success';
  open: boolean;
  message: string;
}