import React, { useState, createContext } from "react";

type Filters = {
    module_id?: number;
    type?: string;
    title?: string,
    page: number,
};

export type FilterContextType = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};


export const FiltersContext = createContext<FilterContextType>({
    filters: { module_id: 0, type: "", title: "", page: 1 },
    setFilters: () => { },
});

const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filters, setFilters] = useState<Filters>({ module_id: 0, type: "", title: "", page: 1 });

    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};

export default FilterContextProvider;
