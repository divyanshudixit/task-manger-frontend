import { useEffect, useCallback, ReactNode } from 'react';
import { useRouter, useSearchParams } from '../../hooks';
import { SplashScreen } from '../../components/loading-screen';
import { useAuthContext } from '../../hooks/use-auth-context';

// ----------------------------------------------------------------------

interface GuestGuardProps {
  children: ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '';
  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
