import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import { menuItemClasses } from '@mui/material/MenuItem';
import { getPosition } from './utils';
import { StyledArrow } from './styles';

interface CustomPopoverProps {
  open: HTMLElement | null; 
  children: React.ReactNode;
  arrow?: 'top-left' | 'top-center' | 'top-right' | 
          'bottom-left' | 'bottom-center' | 'bottom-right' |
          'left-top' | 'left-center' | 'left-bottom' | 
          'right-top' | 'right-center' | 'right-bottom';
  hiddenArrow?: boolean;
  sx?: any; 
  onClose?: () => void; 
}

// ----------------------------------------------------------------------

export default function CustomPopover({
  open,
  children,
  arrow = 'top-right',
  hiddenArrow,
  sx,
  onClose, 
  ...other
}: CustomPopoverProps) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={{
        paper: {
          sx: {
            width: 'auto',
            overflow: 'inherit',
            ...style,
            [`& .${menuItemClasses.root}`]: {
              '& svg': {
                mr: 2,
                flexShrink: 0,
              },
            },
            ...sx,
          },
        },
      }}
      onClose={onClose}
      {...other}
    >
      {!hiddenArrow && <StyledArrow arrow={arrow} />}

      {children}
    </Popover>
  );
}

CustomPopover.propTypes = {
  sx: PropTypes.object,
  open: PropTypes.instanceOf(Element), 
  children: PropTypes.node.isRequired,
  hiddenArrow: PropTypes.bool,
  arrow: PropTypes.oneOf([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'left-top',
    'left-center',
    'left-bottom',
    'right-top',
    'right-center',
    'right-bottom',
  ]),
  onClose: PropTypes.func, 
};
