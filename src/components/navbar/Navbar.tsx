import * as React from 'react';
import { Btn } from '../btn';
import useStore from '../../context/store';

export const Navbar: React.FC = () => {
  const logOut = useStore((s) => s.logOut);

  const handleLogout = React.useCallback(() => {
    logOut();
    window.location.reload();
  }, [logOut]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="bg-white px-10 py-4 shadow-md"
    >
      <Btn
        onClick={handleLogout}
        className="bg-gray-800 text-white"
        aria-label="Log out of your account"
      >
        Logout
      </Btn>
    </nav>
  );
};

export default Navbar;
