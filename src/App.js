import ThemeRoutes from './routes'
import { BrowserRouter } from 'react-router-dom';
import CustomTheme from './theme/CustomTheme';

function App() {
  return (
    <CustomTheme>
    <BrowserRouter >
      <ThemeRoutes/>
    </BrowserRouter>
    </CustomTheme>
  );
}

export default App;
