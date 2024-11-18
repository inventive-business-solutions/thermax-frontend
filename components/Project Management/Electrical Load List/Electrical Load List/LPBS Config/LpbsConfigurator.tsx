import { JspreadsheetInstance } from "jspreadsheet-ce";
import React, { useRef, useEffect, useState } from "react";
import jspreadsheet from "jspreadsheet-ce";
import { Button } from "antd";
import AlertNotification from "components/AlertNotification";
import Modal from "components/Modal/Modal";

interface LpbsConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
  lpbsSchemes: any[];
  typedLpbsColumns: any[];
  onConfigurationComplete: (selectedSchemes: string[]) => void;
}

const LpbsConfigurator: React.FC<LpbsConfiguratorProps> = ({
  isOpen,
  onClose,
  lpbsSchemes,
  typedLpbsColumns,
  onConfigurationComplete,
}) => {
  const lpbsSheetRef = useRef<HTMLDivElement | null>(null);
  const lpbsSelectedSheetRef = useRef<HTMLDivElement | null>(null);
  const [lpbsInstance, setLpbsInstance] = useState<JspreadsheetInstance | null>(null);
  const [selectedLpbsInstance, setSelectedLpbsInstance] = useState<JspreadsheetInstance | null>(null);
  const [lpbsSchemesSelected, setLpbsSchemesSelected] = useState<any[]>([]);
  const [isLpbsSchemeEmpty, setIsLpbsSchemeEmpty] = useState(false);

  // Initialize main LPBS spreadsheet
  useEffect(() => {
    if (isOpen && lpbsSheetRef.current) {
      if (lpbsInstance) {
        lpbsInstance.destroy();
      }

      // Update selected schemes from localStorage
      const storedSchemes = localStorage.getItem("selected_lpbs_scheme");
      let updatedSchemes = [...lpbsSchemes];

      if (storedSchemes) {
        try {
          const selectedItems = JSON.parse(storedSchemes) as string[];
          updatedSchemes = lpbsSchemes.map((scheme) => {
            if (selectedItems.includes(scheme[2])) {
              return [true, ...scheme.slice(1)];
            }
            return scheme;
          });
        } catch (error) {
          console.error("Error parsing selected_lpbs_scheme:", error);
        }
      }

      const instance = jspreadsheet(lpbsSheetRef.current, {
        data: updatedSchemes,
        columns: typedLpbsColumns,
        columnSorting: true,
        columnDrag: true,
        columnResize: true,
        tableOverflow: true,
        lazyLoading: true,
        loadingSpin: true,
        onchange: () => setIsLpbsSchemeEmpty(false),
        filters: true,
        tableWidth: "100%",
        tableHeight: "500px",
        freezeColumns: 4,
        rowResize: true,
      });
      setLpbsInstance(instance);
    }

    return () => {
      if (lpbsInstance) {
        lpbsInstance.destroy();
        setLpbsInstance(null);
      }
    };
  }, [isOpen, lpbsSchemes, typedLpbsColumns]);

  // Initialize selected schemes spreadsheet
  useEffect(() => {
    if (lpbsSelectedSheetRef.current && lpbsSchemesSelected.length > 0) {
      if (selectedLpbsInstance) {
        selectedLpbsInstance.destroy();
      }

      const instance = jspreadsheet(lpbsSelectedSheetRef.current, {
        data: lpbsSchemesSelected,
        columns: typedLpbsColumns.map((column) => ({
          ...column,
          readOnly: true,
        })),
        columnSorting: true,
        columnDrag: true,
        columnResize: true,
        tableOverflow: true,
        lazyLoading: true,
        loadingSpin: true,
        filters: true,
        tableWidth: "100%",
        tableHeight: "250px",
        freezeColumns: 4,
        rowResize: true,
      });
      setSelectedLpbsInstance(instance);
    }

    return () => {
      if (selectedLpbsInstance) {
        selectedLpbsInstance.destroy();
        setSelectedLpbsInstance(null);
      }
    };
  }, [lpbsSchemesSelected, typedLpbsColumns]);

  const handleAdd = () => {
    const selected = lpbsInstance?.getData().filter((row) => row[0] === true);

    if (!selected?.length) {
      setIsLpbsSchemeEmpty(true);
      return;
    }

    setLpbsSchemesSelected(selected);
    setIsLpbsSchemeEmpty(false);
  };

  const handleConfirm = () => {
    const selectedSchemes = lpbsSchemesSelected.map((item) => item[1]);
    localStorage.setItem("selected_lpbs_scheme", JSON.stringify([...selectedSchemes,"NA"]));
    onConfigurationComplete(selectedSchemes);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="m-2 flex flex-col">
        <h2 className="mb-4 text-2xl font-bold">LPBS Configurator</h2>
        {isLpbsSchemeEmpty && <AlertNotification message="Please select LPBS scheme!" status="error" />}
        <div ref={lpbsSheetRef} />
        <div className="flex w-full flex-row justify-end py-2">
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>
        </div>
        {lpbsSchemesSelected.length > 0 && (
          <>
            <div ref={lpbsSelectedSheetRef} />
            <div className="flex w-full flex-row justify-end py-2">
              <Button type="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default LpbsConfigurator;