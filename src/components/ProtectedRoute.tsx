import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import React from 'react';

type RoleBasedGuardProps = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
  sx?: object;
};

export default function RoleBasedGuard({ hasContent, roles, children, sx }: RoleBasedGuardProps) {
  const userKey = sessionStorage.getItem('userKey');
  const user = userKey ? JSON.parse(userKey) : null;
  const currentRole = user?.role ?? 'user';

  console.log("user", user);

  if (roles && !roles.includes(currentRole)) {
    return hasContent ? (
      <>
        <m.div>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission Denied
          </Typography>
        </m.div>

        <m.div>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>
      </>
    ) : null;
  } else {
    return <>{children}</>;
  }
}

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
  sx: PropTypes.object,
};
