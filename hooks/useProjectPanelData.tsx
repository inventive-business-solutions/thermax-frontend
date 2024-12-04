import { getData } from "@/actions/crud-actions";
import { PROJECT_PANEL_API } from "@/configs/api-endpoints";
import { useEffect, useRef, useState } from "react";

// First, create a custom hook for fetching data
export const useProjectPanelData = (revision_id: string | null) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!revision_id || fetchedRef.current) return;

      try {
        const response = await getData(
          `${PROJECT_PANEL_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
        );
        setData(response);
        fetchedRef.current = true;
      } catch (error) {
        console.error("Error fetching project panel data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [revision_id]);

  return { data, isLoading };
};
