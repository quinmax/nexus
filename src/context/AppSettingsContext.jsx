import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const LARAVEL_BACKEND_URL = "http://192.168.23.113";

export const AppSettingsContext = createContext();

export const AppSettingsProvider = ({ children }) => {
  const [appSettings, setAppSettings] = useState(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [settingsError, setSettingsError] = useState(null);

  const fetchAppSettings = useCallback(async () => {
    setIsLoadingSettings(true);
    setSettingsError(null);
    try {
      const response = await axios.get(`${LARAVEL_BACKEND_URL}/api/app-settings`);
      if (response.data &&
          Object.prototype.hasOwnProperty.call(response.data, 'alchemy_rpc_url') &&
          Object.prototype.hasOwnProperty.call(response.data, 'gold_price_per_gram')
          // Add other essential checks
      ) {
        setAppSettings({
            ...response.data,
            gold_price_per_gram: response.data.gold_price_per_gram !== null
              ? parseFloat(response.data.gold_price_per_gram)
              : null,
            total_coins_in_vault: response.data.total_coins_in_vault !== null && response.data.total_coins_in_vault !== undefined
            ? parseInt(response.data.total_coins_in_vault, 10)
            : null,
        });
      } else {
        throw new Error("Incomplete application settings received.");
      }
    } catch (error) {
      console.error("AppSettingsContext: Error fetching app settings:", error.message);
      setSettingsError("Could not load application settings.");
    } finally {
      setIsLoadingSettings(false);
    }
  }, []);

  useEffect(() => {
    fetchAppSettings();
  }, [fetchAppSettings]);

  return (
    <AppSettingsContext.Provider
      value={{ appSettings, isLoadingSettings, settingsError, fetchAppSettings }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};