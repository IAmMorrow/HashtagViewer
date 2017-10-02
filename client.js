import React from 'react';
import { render } from 'react-dom';
import Main from './components/main';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Main appData={window.appData} />
  </MuiThemeProvider>,
  document.getElementById('root')
);
