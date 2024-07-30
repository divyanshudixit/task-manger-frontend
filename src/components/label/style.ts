import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

interface StyledLabelOwnerState {
  color?: 'default' | 'primary' | 'secondary' | string; 
  variant?: 'filled' | 'outlined' | 'soft';
}


interface StyledLabelProps extends React.ComponentPropsWithoutRef<typeof Box> {
  ownerState?: StyledLabelOwnerState;
}

// ----------------------------------------------------------------------

export const StyledLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'ownerState', 
})<StyledLabelProps>(({ theme, ownerState }: { theme: Theme; ownerState?: StyledLabelOwnerState }) => {
  const lightMode = theme.palette.mode === 'light';

  const filledVariant = ownerState?.variant === 'filled';
  const outlinedVariant = ownerState?.variant === 'outlined';
  const softVariant = ownerState?.variant === 'soft';

  const defaultStyle = {
    ...(ownerState?.color === 'default' && {
      
      ...(filledVariant && {
        color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
        backgroundColor: theme.palette.text.primary,
      }),
     
      ...(outlinedVariant && {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
        border: `2px solid ${theme.palette.text.primary}`,
      }),
     
      ...(softVariant && {
        color: theme.palette.text.secondary,
        backgroundColor: alpha(theme.palette.grey[500], 0.16),
      }),
    }),
  };

  const colorStyle = {
    ...(ownerState?.color !== 'default' && {
    }),
  };

  return {
    height: 24,
    minWidth: 24,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    textTransform: 'capitalize',
    padding: theme.spacing(0, 0.75),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shorter,
    }),
    ...defaultStyle,
    ...colorStyle,
  };
});
