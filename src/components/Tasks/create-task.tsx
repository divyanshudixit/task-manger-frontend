import React, { useMemo } from 'react';
import * as Yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required'),
  priority: Yup.string().required('Priority is required'),
});


interface Task {
  title: string;
  description: string;
  status: string;
  priority: string;
}

interface TaskCreateFormProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (task: Task) => void;
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({ open, onClose, onCreateTask }) => {
  const defaultValues = useMemo(
    () => ({
      title: '',
      description: '',
      status: '',
      priority: '',
    }),
    []
  );

  const methods = useForm<Task>({
    resolver: yupResolver(TaskSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = methods;

  const onSubmit: SubmitHandler<Task> = async (data) => {
    try {
      onCreateTask(data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const priority = watch('priority');
  const status = watch('status');

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Create a Task</DialogTitle>
        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Fill in the details below to create a new task
          </Alert>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="title" label="Title" />
            <RHFTextField name="description" label="Description" />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status || ''}
                onChange={(e) => setValue('status', e.target.value)}
                label="Status"
              >
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority || ''}
                onChange={(e) => setValue('priority', e.target.value)}
                label="Priority"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Create Task
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default TaskCreateForm;

