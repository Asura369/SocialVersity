import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const VersionContext = createContext('v1');

export function VersionProvider({ children }) {
    const location = useLocation();
    // Extract version from path (e.g., /v1/dashboard -> v1)
    let version = 'v1';
    if (location.pathname.startsWith('/v3')) {
        version = 'v3';
    } else if (location.pathname.startsWith('/v2')) {
        version = 'v2';
    }

    return (
        <VersionContext.Provider value={version}>
            {children}
        </VersionContext.Provider>
    );
}

export function useVersion() {
    return useContext(VersionContext);
}
