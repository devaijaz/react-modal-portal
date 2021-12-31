import React, { useContext } from 'react';
const DataContext = React.createContext("Context Value");

const DataProvider = ({ children }) => {
  return <DataContext.Provider value="Context Value">
    {children}
  </DataContext.Provider>
}
export default DataProvider;

export const useDataContext = () => useContext(DataContext);