import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const VersionContext = createContext('v1');

export function VersionProvider({ children }) {
    const location = useLocation();
    // Extract version from path (e.g., /v1/dashboard -> v1)
    const version = location.pathname.startsWith('/v2') ? 'v2' : 'v1';

    return (
        <VersionContext.Provider value={version}>
            {children}
        </VersionContext.Provider>
    );
}

export function useVersion() {
    return useContext(VersionContext);
}
