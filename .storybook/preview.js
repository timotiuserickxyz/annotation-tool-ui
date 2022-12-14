import React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import {
  ThemeProvider as MaterialUIThemeProvider,
  StylesProvider,
} from '@material-ui/styles';
import theme from '../src/styles/theme';
import GlobalStyle from '../src/styles/base';

export const decorators = [
  (Story) => (
    <div>
      <StylesProvider injectFirst>
        <MaterialUIThemeProvider theme={theme}>
          <StyledComponentsThemeProvider theme={theme}>
          <GlobalStyle />
          <Story />
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </div>
  ),
];
