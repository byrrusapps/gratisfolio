import { useEffect } from "react";

interface UseUpdateSettingsProps {
  dynamicTheme: string;
}

const useUpdateSettings = ({
  dynamicTheme,
}: UseUpdateSettingsProps): void => {
  // Persist individual settings

  useEffect(() => {
    localStorage.setItem("dynamicTheme", dynamicTheme);
  }, [dynamicTheme]);

};

export default useUpdateSettings;
