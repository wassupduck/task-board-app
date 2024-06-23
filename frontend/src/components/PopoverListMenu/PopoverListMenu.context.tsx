/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

interface PopoverListMenuContextType {
  hasOpenModal: boolean;
  onModalItemOpenChange: (open: boolean) => void;
}

const PopoverListMenuContext = createContext<
  PopoverListMenuContextType | undefined
>(undefined);

interface PopoverListMenuContextProviderProps {
  children: React.ReactNode;
  onModalItemOpenChange: (open: boolean) => void;
}

export function PopoverListMenuContextProvider(
  props: PopoverListMenuContextProviderProps
) {
  const [hasOpenModal, setHasOpenModal] = useState(false);

  function onModalItemOpenChange(open: boolean) {
    setHasOpenModal(open);
    props.onModalItemOpenChange(open);
  }

  return (
    <PopoverListMenuContext.Provider
      value={{ hasOpenModal, onModalItemOpenChange }}
    >
      {props.children}
    </PopoverListMenuContext.Provider>
  );
}

export function usePopoverListMenuContext() {
  const context = useContext(PopoverListMenuContext);
  if (context === undefined) {
    throw new Error(
      "usePopoverListMenuContext must be used within a PopoverListMenuContext.Provider"
    );
  }
  return context;
}
