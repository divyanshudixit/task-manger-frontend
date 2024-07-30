import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanDetails from '../Tasks/kanban-details';
import { Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import TaskCreateForm from './create-task';

interface Task {
  _id: any;
  priority?: string;
  title?: string;
  description: string;
  status: string;
  createdAt?: string; 
}

const TaskManager = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openDetails, setOpenDetails] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [sortCriteria, setSortCriteria] = useState<string>('createdAt'); // Default sorting by date

  const handleCloseDetails = () => setOpenDetails(false);
  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => setOpenCreateDialog(false);
  const rawToken = sessionStorage.getItem('accessToken');
  const accessToken = rawToken ? rawToken.replace(/"/g, '') : '';

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://task-manager-backend-1-ysvg.onrender.com/api/tasks', {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`https://task-manager-backend-1-ysvg.onrender.com/api/tasks/${taskId}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      await fetchTasks();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error deleting task:', error.response.data.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const response = await axios.put(`https://task-manager-backend-1-ysvg.onrender.com/api/tasks/${updatedTask._id}`, updatedTask, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      const updatedTasks = tasks.map(task => task._id === response.data._id ? response.data : task);
      setTasks(updatedTasks);
      setSelectedTask(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error updating task:', error.response.data.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const handleCreateTask = async (newTask: any) => {
    try {
      const response = await axios.post('https://task-manager-backend-1-ysvg.onrender.com/api/tasks', newTask, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      setTasks([...tasks, response.data]);
      handleCloseCreateDialog();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error creating task:', error.response.data.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const filteredAndSortedTasks = () => {
    let filteredTasks = tasks;
  
    if (filterStatus) {
      filteredTasks = filteredTasks.filter(task => task.status === filterStatus);
    }
  
    if (filterPriority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filterPriority);
    }


    
    
    filteredTasks = filteredTasks.sort((a, b) => {
      if (sortCriteria === 'createdAt') {
       
        return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
      } else if (sortCriteria === 'priority') {
        const priorityOrder: { [key: string]: number } = { low: 1, medium: 2, high: 3 };
        return (priorityOrder[b.priority || 'low'] || 0) - (priorityOrder[a.priority || 'low'] || 0);
      }
      return 0;
    });
  
    console.log("filteredTasks", filteredTasks);
  
    return filteredTasks;
  };
  

  const handleResetFiltersAndSort = () => {
    setFilterStatus('');
    setFilterPriority('');
    setSortCriteria('createdAt');
  };

  useEffect(() => {
    fetchTasks();
  }, [accessToken]);

  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handleOpenCreateDialog}>
        Add Task
      </Button> */}

      <Box sx={{ my: 2, display: 'flex', gap: 2,justifyContent: 'space-between',}}>
        <Box sx={{ my: 2, display: 'flex', gap: 2}}>
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e:any) => setFilterStatus(e.target.value as string)}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Ready To Test">Ready To Test</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filterPriority}
            onChange={(e: any) => setFilterPriority(e.target.value as string)}
            label="Priority"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortCriteria}
            onChange={(e: any) => setSortCriteria(e.target.value as string)}
            label="Sort By"
          >
            <MenuItem value="createdAt">Date Created</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" onClick={handleResetFiltersAndSort} sx={{
          backgroundColor: 'black',
          color: 'white',
          borderColor: 'black',
          '&:hover': {
            backgroundColor: 'black',
            borderColor: 'black',
            opacity: 0.8,
          },
        }}>
          Reset Filters and Sorting
        </Button>
        </Box>

        <Button variant="contained" color="primary" onClick={handleOpenCreateDialog}>
        Add Task
      </Button>
      </Box>

      {selectedTab === 0 && (
        <div>
          {filteredAndSortedTasks().map(task => (
            
            <KanbanDetails
              key={task._id}
              task={task}
              openDetails={openDetails}
              onCloseDetails={handleCloseDetails}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      )}

      <TaskCreateForm
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default TaskManager;
