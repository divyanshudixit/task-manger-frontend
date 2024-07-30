import React, { forwardRef, ForwardedRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

// ----------------------------------------------------------------------

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  href: string;
}

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(({ href, ...other }, ref: ForwardedRef<HTMLAnchorElement>) => (
  <Link ref={ref} to={href} {...other} />
));

export default RouterLink;
