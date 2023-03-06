import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { Nav } from '../../Nav/Nav';
import './MobileNav.scss';
import { FooterButtons } from '../../Footer/FooterButtons/FooterButtons';
type Props = {
  wherePlaced: string;
 }

export const MobileNav: React.FC<Props> = ({ wherePlaced }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='mobile-nav'>
      <Button
        sx={{color: '#000000'}}
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       {wherePlaced}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {wherePlaced === 'menu' && <Nav direction={'column'}/>}
        {wherePlaced === 'links' && <FooterButtons direction={'column'}/>}
      </Menu>
    </div>
  );
}