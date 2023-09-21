import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./router/MainRouter";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";

interface Theme {
  color: {
    mainColor: "#18CD8C";
    subColor: "#F4FEF6";
    borderColor: "#C1C1C1";
  };
  border: {
    defaultRadius: "20px";
  };
}

function App() {
  const queryClient = new QueryClient();

  const theme: Theme = {
    color: {
      mainColor: "#18CD8C",
      subColor: "#F4FEF6",
      borderColor: "#C1C1C1",
    },
    border: {
      defaultRadius: "20px",
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <MainRouter />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
