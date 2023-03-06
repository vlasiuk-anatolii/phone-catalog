import {
  AppBar, Toolbar, IconButton,
} from '@mui/material';

import './Footer.scss';
import { Logo } from '../Logo/Logo';
import { FooterButtons } from './FooterButtons/FooterButtons';
import { MobileNav } from '../Header/MobileNav/MobileNav';

export const Footer = () => {
  function topFunction() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#fff' }}
      >
        <Toolbar className="footer">
          <IconButton color="inherit">
            <Logo />
          </IconButton>
          <FooterButtons direction='row'/>
          <MobileNav wherePlaced='links'/>
          <span className="footer__text-button"> Back to top </span>
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            onClick={() => {
              topFunction();
            }}
          >
            <div className="footer__rectangle">
              <div className="footer__box-arrow">
                <div className="footer__arrow" />
              </div>
            </div>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
