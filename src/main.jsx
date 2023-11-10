import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'
import './index.css'
import Auth0ProviderWithNavigate from './auth/auth0Provider';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Auth0ProviderWithNavigate>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <App />
        </main>
      </NextUIProvider>
    </Auth0ProviderWithNavigate>
  </Router>
)
