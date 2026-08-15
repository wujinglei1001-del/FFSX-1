import React from 'react';
import ReactDOM from 'react-dom/client';
import { userLocations } from 'data/analytics/dashboard';
import { registerIcons } from 'lib/iconify/iconify-register';
import 'locales/i18n';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import SettingsProvider from 'providers/SettingsProvider';
import ThemeProvider from 'providers/ThemeProvider';
import VisionModeProvider from 'providers/VisionModeProvider';
import RealtimeEngagement from 'components/sections/dashboards/analytics/realtime-engagement/RealtimeEngagement';

registerIcons();

const RealtimeEngagementExport = () => (
  <SettingsProvider>
    <VisionModeProvider>
      <ThemeProvider defaultMode="dark" modeStorageKey="ffa-x-map-mode">
        <BreakpointsProvider>
          <div className="ffa-x-realtime-engagement-export" style={{ userSelect: 'none' }}>
            <RealtimeEngagement data={userLocations} />
          </div>
        </BreakpointsProvider>
      </ThemeProvider>
    </VisionModeProvider>
  </SettingsProvider>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RealtimeEngagementExport />
  </React.StrictMode>,
);
