

import React from 'react';

// TODO: Change to other toast provider
import ContextProvider from '../contexts/ContextProvider';

// Providers

/**
 *
 * @param Children --> This will be the rendered component in the current page
 * @returns --> A wrapper of providers such as Session, WalletContext around the Children param
 */

const LayoutWrapper = ({ children }) => {
  return (
    <ContextProvider>
        {children}
    </ContextProvider>

  );
};

export default LayoutWrapper;
