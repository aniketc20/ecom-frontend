import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
      window.location.replace('/')
    }
  }),
  defaultOptions: {
      queries: {
          retry: (failureCount, err) => {
              if (err.response?.status === 401) {
                localStorage.removeItem('userLoginStatus')
                return false; // do not retry, trigger error
              }

              // otherwise, restore default
              const defaultRetry = new QueryClient().getDefaultOptions().queries?.retry;

              return Number.isSafeInteger(defaultRetry) ? failureCount < (defaultRetry ?? 0) : false;
          },
      },
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
