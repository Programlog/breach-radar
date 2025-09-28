import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './navigation';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}