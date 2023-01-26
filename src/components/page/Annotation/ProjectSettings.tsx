import React, { useState } from 'react';
import { mutate } from 'swr';
import { makeStyles } from '@material-ui/core/styles';

import { getAPIUrl } from '../../../utils/path';
import { getProjectList } from '../../../api/annotation/getProjectList';
import { getRawFolderList } from '../../../api/annotation/getRawFolderList';
import { getWavFolderList } from '../../../api/annotation/getWavFolderList';
import { postProject } from '../../../api/annotation/postProject';
import { putProject } from '../../../api/annotation/putProject';
import { deleteProject } from '../../../api/annotation/deleteProject';
import { postProjectLabel } from '../../../api/annotation/postProjectLabel';
import { deleteProjectLabel } from '../../../api/annotation/deleteProjectLabel';

import { AnnotationProjectList } from '../../base/Annotation/AnnotationProjectList';
import {
  Button,
  Checkbox,
  Select,
  MenuItem,
  TextField,
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
  },
  header: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
  },
  headerItem: {
    float: 'left',
    marginRight: '10px',
  },
  customForm: {
    width: '100%',
    marginTop: '-15px',
    marginBottom: '20px',
  },
  content: {
    width: '100%',
    marginTop: '20px',
    height: '710px',
    overflow: 'hidden',
    padding: '20px',
    backgroundColor: 'white',
    border: 'solid 1px lightGray',
    borderRadius: '5px',
  },
  explanationTextArea: {
    width: '100%',
    minWidth: '180px',
    maxWidth: '420px',
    height: '100px',
    minHeight: '150px',
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '10px',
    textAlign: 'center',
  },
});

interface Props {}

export const ProjectSettings: React.FC<Props> = () => {
  const classes = useStyles();

  const [newProjectName, setNewProjectName] = useState<string>('');
  const [newRawFolderName, setNewRawFolderName] = useState<string>('');
  const [newWavFolderName, setNewWavFolderName] = useState<string>('');
  const [newChunkingType, setNewChunkingType] = useState<string>('Talk Unit');
  const [newDescription, setNewDescription] = useState<string>('');

  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [selectedProjectLabel, setSelectedProjectLabel] = useState<string>('');

  const [newProjectLabel, setNewProjectLabel] = useState<string>('');
  const [ignoreNewProjectLabel, setIgnoreNewProjectLabel] = useState<boolean>(false);

  const [openCreateProjectModal, setOpenCreateProjectModal] = useState<boolean>(false);
  const handleCloseCreateProjectModal = () => setOpenCreateProjectModal(false);

  const [openEditProjectModal, setOpenEditProjectModal] = useState<boolean>(false);
  const handleCloseEditProjectModal = () => setOpenEditProjectModal(false);

  const [openDeleteProjectModal, setOpenDeleteProjectModal] = useState<boolean>(false);
  const handleCloseDeleteProjectModal = () => setOpenDeleteProjectModal(false);

  const [openCreateLabelModal, setOpenCreateLabelModal] = useState<boolean>(false);
  const handleCloseCreateLabelModal = () => setOpenCreateLabelModal(false);

  const [openDeleteLabelModal, setOpenDeleteLabelModal] = useState<boolean>(false);
  const handleCloseDeleteLabelModal = () => setOpenDeleteLabelModal(false);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');


  const tempProjectList = getProjectList();
  const projectList = !!tempProjectList.data ? tempProjectList.data.projects.map((t, id) => {
    return {id: id, ...t};
  }) : [];

  const tempRawFolderList = getRawFolderList();
  const rawFolderList = !!tempRawFolderList.data ? tempRawFolderList.data.directories.map((t) => {
    return {...t};
  }) : [];

  const tempWavFolderList = getWavFolderList();
  const wavFolderList = !!tempWavFolderList.data ? tempWavFolderList.data.directories.map((t) => {
    return {...t};
  }) : [];

  const initializeAllInputs = () => {
    setNewProjectName('');
    setNewRawFolderName('');
    setNewWavFolderName('');
    setNewChunkingType('Talk Unit');
    setNewDescription('');
    setSelectedProjectName('');
    setSelectedProjectLabel('');
    setNewProjectLabel('');
    setIgnoreNewProjectLabel(false);
  };

  const prepareCreateProject = () => {
    initializeAllInputs();
    setOpenCreateProjectModal(true);
  };

  const prepareEditProject = (targetProjectName: string, targetProjectRawFolderName: string, targetProjectWavFolderName: string, targetProjectChunkingType: string, targetProjectDescription: string) => {
    initializeAllInputs();
    setSelectedProjectName(targetProjectName);
    setNewRawFolderName(targetProjectRawFolderName);
    setNewWavFolderName(targetProjectWavFolderName);
    setNewChunkingType(targetProjectChunkingType);
    setNewDescription(targetProjectDescription);
    setOpenEditProjectModal(true);
  };

  const createProjectAndRefresh = async() => {
    if (newProjectName == '')
    {
      setSnackbarMessage('Project name is empty');
      setOpenSnackbar(true);
      return;
    }
    else if (newRawFolderName == '')
    {
      setSnackbarMessage('Csv folder not chosen yet');
      setOpenSnackbar(true);
      return;
    }
    else if (newWavFolderName == '')
    {
      setSnackbarMessage('Wav folder not chosen yet');
      setOpenSnackbar(true);
      return;
    }

    const params = {
      project_name: newProjectName,
      raw_source: newRawFolderName,
      wav_source: newWavFolderName,
      chunking_type: newChunkingType,
      description: newDescription
    }

    let errorMessage = '';

    const response = await postProject(params);

    if (response.error) {
      errorMessage = response.error;
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }

    // Refresh
    await mutate(getAPIUrl('annotation', 'getProjectList'));

    setOpenCreateProjectModal(false);
    setSnackbarMessage('Create new project successful');
    setOpenSnackbar(true);

    initializeAllInputs();
  };

  const editProjectAndRefresh = async() => {
    if (selectedProjectName == '')
    {
      setSnackbarMessage('Project not selected yet');
      setOpenSnackbar(true);
      return;
    }
    else if (newRawFolderName == '')
    {
      setSnackbarMessage('Csv folder not chosen yet');
      setOpenSnackbar(true);
      return;
    }
    else if (newWavFolderName == '')
    {
      setSnackbarMessage('Wav folder not chosen yet');
      setOpenSnackbar(true);
      return;
    }

    const params = {
      raw_source: newRawFolderName,
      wav_source: newWavFolderName,
      chunking_type: newChunkingType,
      description: newDescription
    }

    let errorMessage = '';

    const response = await putProject(selectedProjectName, params);

    if (response.error) {
      errorMessage = response.error;
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }

    // Refresh
    await mutate(getAPIUrl('annotation', 'getProjectList'));

    setOpenEditProjectModal(false);
    setSnackbarMessage('Edit project successful');
    setOpenSnackbar(true);

    initializeAllInputs();
  };

  const prepareDeleteProject = (targetProjectName: string) => {
    initializeAllInputs();
    setSelectedProjectName(targetProjectName);
    setOpenDeleteProjectModal(true);
  };

  const deleteProjectAndRefresh = async () => {
    let errorMessage = '';

    const response = await deleteProject(selectedProjectName);

    if (response.error) {
      errorMessage = response.error;
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }
        
    // Refresh
    await mutate(getAPIUrl('annotation', 'getProjectList'));

    setOpenDeleteProjectModal(false);
    setSnackbarMessage('Delete project successful');
    setOpenSnackbar(true);

    initializeAllInputs();
  };

  const prepareCreateLabel = (targetProjectName: string) => {
    initializeAllInputs();
    setSelectedProjectName(targetProjectName);
    setOpenCreateLabelModal(true);
  };

  const createLabelAndRefresh = async() => {
    if (selectedProjectName == '')
    {
      setSnackbarMessage('Selected project is empty');
      setOpenSnackbar(true);
      return;
    }
    else if (newProjectLabel == '')
    {
      setSnackbarMessage('New label is empty');
      setOpenSnackbar(true);
      return;
    }

    const params = {
      project_name: selectedProjectName,
      label_type: ignoreNewProjectLabel === true ? 'garbage' : 'active',
      label_name: newProjectLabel,
    }

    let errorMessage = '';

    const response = await postProjectLabel(params);

    if (response.error) {
      errorMessage = response.error;
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }
        
    // Refresh
    await mutate(getAPIUrl('annotation', 'getProjectList'));

    setOpenCreateLabelModal(false);
    setSnackbarMessage('Create new label successful');
    setOpenSnackbar(true);

    initializeAllInputs();
  };

  const prepareDeleteLabel = (targetProjectName: string, targetProjectLabel: string) => {
    initializeAllInputs();
    setSelectedProjectName(targetProjectName);
    setSelectedProjectLabel(targetProjectLabel);
    setOpenDeleteLabelModal(true);
  };

  const deleteLabelAndRefresh = async () => {
    let errorMessage = '';

    const response = await deleteProjectLabel(selectedProjectName, selectedProjectLabel);

    if (response.error) {
      errorMessage = response.error;
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }
        
    // Refresh
    await mutate(getAPIUrl('annotation', 'getProjectList'));

    setOpenDeleteLabelModal(false);
    setSnackbarMessage('Delete label successful');
    setOpenSnackbar(true);

    initializeAllInputs();
  };

  const changeNewProjectName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setNewProjectName(value);
  };

  const selectNewRawFolder = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setNewRawFolderName(value);
  };

  const selectNewWavFolder = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setNewWavFolderName(value);
  };

  const changeNewChunkingType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewChunkingType(value);
  };

  const changeNewDescription = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setNewDescription(value);
  };

  const changeNewProjectLabel = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setNewProjectLabel(value);
  };

  const changeNewProjectLabelType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setIgnoreNewProjectLabel(value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Button variant="contained" className={classes.headerItem} onClick={prepareCreateProject}>
            Create New
        </Button>
      </div>
      <div className={classes.content}>
        <AnnotationProjectList
            projects={projectList}
            onClickEditProject={prepareEditProject}
            onClickDeleteProject={prepareDeleteProject}
            onClickCreateLabel={prepareCreateLabel}
            onClickDeleteLabel={prepareDeleteLabel}
        />
      </div>

      <Dialog open={openCreateProjectModal} onClose={handleCloseCreateProjectModal}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Project Name
          </DialogContentText>
          <TextField
            className={classes.customForm}
            autoFocus={true}
            value={newProjectName}
            onChange={changeNewProjectName}
          />
          <br/>
          <DialogContentText>
            Csv Folder
          </DialogContentText>
          <Select
            className={classes.customForm}
            value={newRawFolderName}
            onChange={selectNewRawFolder}
          >
            <MenuItem></MenuItem>
            {rawFolderList && rawFolderList.map(f => 
              (<MenuItem value={f.name}>{f.name}</MenuItem>)
            )} 
          </Select>
          <br/>
          <DialogContentText>
            Wav Folder
          </DialogContentText>
          <Select
            className={classes.customForm}
            value={newWavFolderName}
            onChange={selectNewWavFolder}
          >
            <MenuItem></MenuItem>
            {wavFolderList && wavFolderList.map(f => 
              (<MenuItem value={f.name}>{f.name}</MenuItem>)
            )} 
          </Select>
          <br/>
          <FormControl>
            <FormLabel id="chunking-type-radio-buttons-group">Chunking Type</FormLabel>
            <RadioGroup
              aria-labelledby="chunking-type-radio-buttons-group"
              name="chunking-type-radio-buttons-group"
              value={newChunkingType}
              onChange={changeNewChunkingType}
            >
              <FormControlLabel
                control={<Radio />}
                value="Talk Unit"
                label="Talk Unit"
              />
              <FormControlLabel
                control={<Radio />}
                value="Whole Wav"
                label="Whole Wav"
              />
            </RadioGroup>
          </FormControl>
          <br/>
          <DialogContentText>
            Explanation
          </DialogContentText>
          <textarea className={classes.explanationTextArea}
            placeholder="Explanation"
            value={newDescription}
            onChange={changeNewDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateProjectModal}>Cancel</Button>
          <Button onClick={createProjectAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openEditProjectModal} onClose={handleCloseEditProjectModal}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Project Name
          </DialogContentText>
          <TextField
            className={classes.customForm}
            autoFocus={true}
            value={selectedProjectName}
            disabled={true}
          />
          <br/>
          <DialogContentText>
            Csv Folder
          </DialogContentText>
          <Select
            className={classes.customForm}
            value={newRawFolderName}
            onChange={selectNewRawFolder}
          >
            <MenuItem></MenuItem>
            {rawFolderList && rawFolderList.map(f => 
              (<MenuItem value={f.name}>{f.name}</MenuItem>)
            )} 
          </Select>
          <br/>
          <DialogContentText>
            Wav Folder
          </DialogContentText>
          <Select
            className={classes.customForm}
            value={newWavFolderName}
            onChange={selectNewWavFolder}
          >
            <MenuItem></MenuItem>
            {wavFolderList && wavFolderList.map(f => 
              (<MenuItem value={f.name}>{f.name}</MenuItem>)
            )} 
          </Select>
          <br/>
          <FormControl>
            <FormLabel id="chunking-type-radio-buttons-group">Chunking Type</FormLabel>
            <RadioGroup
              aria-labelledby="chunking-type-radio-buttons-group"
              name="chunking-type-radio-buttons-group"
              value={newChunkingType}
              onChange={changeNewChunkingType}
            >
              <FormControlLabel
                control={<Radio />}
                value="Talk Unit"
                label="Talk Unit"
              />
              <FormControlLabel
                control={<Radio />}
                value="Whole Wav"
                label="Whole Wav"
              />
            </RadioGroup>
          </FormControl>
          <br/>
          <DialogContentText>
            Explanation
          </DialogContentText>
          <textarea className={classes.explanationTextArea}
            placeholder="Explanation"
            value={newDescription}
            onChange={changeNewDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditProjectModal}>Cancel</Button>
          <Button onClick={editProjectAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openDeleteProjectModal} onClose={handleCloseDeleteProjectModal}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete project "{selectedProjectName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteProjectModal}>Cancel</Button>
          <Button onClick={deleteProjectAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCreateLabelModal} onClose={handleCloseCreateLabelModal}>
        <DialogTitle>Create New Label</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Label Name
          </DialogContentText>
          <TextField
            className={classes.customForm}
            autoFocus={true}
            value={newProjectLabel}
            onChange={changeNewProjectLabel}
          />
          <br/>
          <FormControlLabel
            control={<Checkbox checked={ignoreNewProjectLabel} onChange={changeNewProjectLabelType} />}
            label="Garbage?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateLabelModal}>Cancel</Button>
          <Button onClick={createLabelAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openDeleteLabelModal} onClose={handleCloseDeleteLabelModal}>
        <DialogTitle>Delete Label</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete label "{selectedProjectLabel}" from project "{selectedProjectName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteLabelModal}>Cancel</Button>
          <Button onClick={deleteLabelAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </div>
  );
};
