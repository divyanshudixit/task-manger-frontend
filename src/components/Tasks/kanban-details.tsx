import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useBoolean } from '../../hooks/use-boolean';
import KanbanDetailsToolbar from '../kanban/kanban-details-toolbar';
import KanbanInputName from '../kanban/kanban-input-name';
import KanbanDetailsPriority from '../kanban/kanban-details-priority';

interface Task {
  priority?: string;
  title?: string;
  description: string;
  status: string;
  _id:any;
}

interface KanbanDetailsProps {
  task: Task | null;
  openDetails: boolean;
  onCloseDetails: () => void;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => Promise<void>; 
}

const KanbanDetails: React.FC<KanbanDetailsProps> = ({
  task,
  openDetails,
  onCloseDetails,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [priority, setPriority] = useState(task?.priority || '');
  const [taskName, setTaskName] = useState(task?.title || '');
  const [taskDescription, setTaskDescription] = useState(task?.description || '');
  const like = useBoolean();


  const handleChangeTaskName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  }, []);

  const createTask = async (task: Task) => {
    try {
      const response = await axios.post('/api/tasks', task);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Error creating task');
      } else {
        throw new Error('An unexpected error occurred while creating the task');
      }
    }
  };

  const handleUpdateTaskCallback = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && taskName) {
        onUpdateTask({
          ...task!,
          title: taskName,
        });
      }
    },
    [onUpdateTask, task, taskName]
  );

  const handleChangeTaskDescription = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(event.target.value);
  }, []);

  const handleChangePriority = useCallback((newValue: string) => {
    setPriority(newValue);
  }, []);

  const handleSave = useCallback(() => {
    if (task) {
      const updatedTask = {
        ...task,
        title: taskName,
        priority,
        description: taskDescription,
      };
      onUpdateTask(updatedTask);
    }
  }, [task, taskName, priority, taskDescription, onUpdateTask]);

  if (!task) return null;

  return (
    <>
      <KanbanDetailsToolbar
        liked={like.value}
        taskName={task.title || ''}
        onLike={like.onToggle}
        onDeleteTask={onDeleteTask}
        taskStatus={task.status}
        onCloseDetails={onCloseDetails}
        taskId={task?._id}
      />
      <Divider />
      <Stack spacing={3} sx={{ pt: 3, pb: 5, px: 2.5 }}>
        <KanbanInputName
          placeholder="Task name"
          value={taskName}
          onChange={handleChangeTaskName}
          onKeyUp={handleUpdateTaskCallback}
        />
        <Stack direction="row" alignItems="center">
          <div>Priority</div>
          <KanbanDetailsPriority priority={priority} onChangePriority={handleChangePriority} />
        </Stack>
        <Stack direction="row">
          <div>Description</div>
          <TextField
            fullWidth
            multiline
            size="small"
            value={taskDescription}
            onChange={handleChangeTaskDescription}
            InputProps={{ sx: { typography: 'body2' } }}
          />
        </Stack>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </>
  );
};

KanbanDetails.propTypes = {
  task: PropTypes.any,
  openDetails: PropTypes.bool.isRequired,
  onCloseDetails: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default KanbanDetails;
