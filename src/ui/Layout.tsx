import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, ExternalLink } from 'react-feather';
// import { ipcRenderer } from 'electron';

import Button from './Button';

interface LayoutProps {
  children: React.ReactNode,
}

const openFullWindow = () => {
  // if (ipcRenderer) {
  //   ipcRenderer.send('openFull');
  // }
}

const Layout = ({ children } : LayoutProps) => {
  return (
    <div style={{ minHeight: '100vh' }} className="flex flex-col">
      {/* Header */}
      <div className="grid grid-cols-2 py-4 px-8">
        <h1 className="flex items-center text-2xl font-bold">
          <Link to="/" className="flex items-center">
            <img 
              src='/icons/0_unknown.svg'
              style={{
                width: 45,
                height: 45,
              }}
              alt="Sauropod Icon"
              className="rounded-md shadow-lg mr-5 rounded-md inline"
            />
            Sauropod
          </Link>
        </h1>
        <div className="text-right">
          <span className="mr-3 only-in-menubar">
            <Button onClick={openFullWindow}>
              <ExternalLink />
            </Button>
          </span>
          <Link to="/settings">
            <Button>
              <Settings />
            </Button>
          </Link>
        </div>
      </div>

      {/* Body */}
      <div 
        className="rounded-t-md h-full text-black p-5 flex-1" 
        style={{
          backgroundColor: '#F7F9FC',
          borderTopLeftRadius: '0.75rem',
          borderTopRightRadius: '0.75rem',
        }}>
          <div className="page-body">
            {children}
          </div>
      </div>
    </div>
  );
}

export default Layout;