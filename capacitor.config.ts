
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.edb0235d599d4bdda2fdfe1bd3cf0b59',
  appName: 'sprout-synergy-garden',
  webDir: 'dist',
  server: {
    url: 'https://edb0235d-599d-4bdd-a2fd-fe1bd3cf0b59.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    captureInput: true,
  }
};

export default config;
