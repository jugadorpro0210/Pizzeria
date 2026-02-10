import React from 'react';
import { StoreProvider, useStore } from './store/StoreContext';
import Layout from './components/Layout';
import Menu from './views/Menu';
import Checkout from './views/Checkout';
import Returns from './views/Returns';
import Inventory from './views/Inventory';
import About from './views/About';
import { AppView } from './types';

const MainContent: React.FC = () => {
    const { view } = useStore();

    switch (view) {
        case AppView.MENU:
            return <Menu />;
        case AppView.CHECKOUT:
            return <Checkout />;
        case AppView.RETURNS:
            return <Returns />;
        case AppView.INVENTORY:
            return <Inventory />;
        case AppView.ABOUT:
            return <About />;
        default:
            return <Menu />;
    }
};

const App: React.FC = () => {
    return (
        <StoreProvider>
            <Layout>
                <MainContent />
            </Layout>
        </StoreProvider>
    );
};

export default App;
