import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { registerIcons } from 'lib/iconify/iconify-register';
import AppLocalizationProvider from 'providers/AppLocalizationProvider';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import NotistackProvider from 'providers/NotistackProvider';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import SettingsProvider from 'providers/SettingsProvider';
import ThemeProvider from 'providers/ThemeProvider';
import VisionModeProvider from 'providers/VisionModeProvider';
import rootRouter from 'routes/root-router';
import SWRConfiguration from 'services/configuration/SWRConfiguration';
import './assets/fonts/plus-jakarta-sans/index.css';
import './locales/i18n';

registerIcons();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SWRConfiguration>
      <SettingsProvider>
        <VisionModeProvider>
          <ThemeProvider>
            <AppLocalizationProvider>
              <NotistackProvider>
                <BreakpointsProvider>
                  <SettingsPanelProvider>
                    <RouterProvider router={rootRouter} />
                  </SettingsPanelProvider>
                </BreakpointsProvider>
              </NotistackProvider>
            </AppLocalizationProvider>
          </ThemeProvider>
        </VisionModeProvider>
      </SettingsProvider>
    </SWRConfiguration>
  </React.StrictMode>,
);
