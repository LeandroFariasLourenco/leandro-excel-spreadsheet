import { GlobalProvider } from './core/contexts/global/global';
import Home from './pages/home/home';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <GlobalStyle />
      <GlobalProvider>
        <Home />
      </GlobalProvider>
    </>
  );
}

export default App;
