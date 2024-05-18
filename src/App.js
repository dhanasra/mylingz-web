import ThemeRoutes from './routes'
import { BrowserRouter } from 'react-router-dom';
import CustomTheme from './theme/CustomTheme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <ReduxProvider store={ store }>
      <CustomTheme>
      <BrowserRouter >
        <ThemeRoutes/>
      </BrowserRouter>
      </CustomTheme>
    </ReduxProvider>
  );
}

export default App;
