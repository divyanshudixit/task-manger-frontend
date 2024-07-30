import { forwardRef, Ref } from 'react';
import { Icon, IconProps } from '@iconify/react';
import Box, { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

interface IconifyProps extends BoxProps {
  icon: IconProps['icon'];
  width?: number;
}

const Iconify = forwardRef<HTMLDivElement, IconifyProps>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref as Ref<HTMLDivElement>}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

export default Iconify;
