import { useTheme, Theme, Breakpoint } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------

type QueryType = 'up' | 'down' | 'between' | 'only';

export function useResponsive(query: QueryType, start: Breakpoint, end?: Breakpoint) {
  const theme: Theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));
  const mediaDown = useMediaQuery(theme.breakpoints.down(start));
  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end || 'xl')); // Provide a default value for end
  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  switch (query) {
    case 'up':
      return mediaUp;
    case 'down':
      return mediaDown;
    case 'between':
      return mediaBetween;
    case 'only':
      return mediaOnly;
    default:
      throw new Error(`Invalid query type: ${query}`);
  }
}

// ----------------------------------------------------------------------

export function useWidth(): Breakpoint {
  const theme: Theme = useTheme();

  const upXs = useMediaQuery(theme.breakpoints.up('xs'));
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const upXl = useMediaQuery(theme.breakpoints.up('xl'));

  if (upXl) return 'xl';
  if (upLg) return 'lg';
  if (upMd) return 'md';
  if (upSm) return 'sm';
  if (upXs) return 'xs';

  return 'xs';
}
