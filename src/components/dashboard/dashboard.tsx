import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { removeItemFromStorage, KEY_ACCESS_TOKEN } from '../../utils/storage-helper';
import TaskManager from '../Tasks/Task-manager';
import RoleBasedGuard from '../ProtectedRoute'; 

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout");
    removeItemFromStorage(KEY_ACCESS_TOKEN);
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <RoleBasedGuard roles={['admin']} hasContent>
          <TaskManager />
        </RoleBasedGuard>
      </Box>
    </Box>
  );
}

export default Dashboard;
