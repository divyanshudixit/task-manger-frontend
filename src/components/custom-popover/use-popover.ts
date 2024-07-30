import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

export default function usePopover() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    open: anchorEl,
    onOpen,
    onClose,
  };
}
