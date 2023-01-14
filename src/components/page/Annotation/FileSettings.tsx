import React, { useState } from 'react';
import { mutate } from 'swr';
import { makeStyles } from '@material-ui/core/styles';

import { getAPIUrl } from '../../../utils/path';
import { getRawFolderList } from '../../../api/annotation/getRawFolderList';
import { getWavFolderList } from '../../../api/annotation/getWavFolderList';
import { getRawFileList } from '../../../api/annotation/getRawFileList';
import { getWavFileList } from '../../../api/annotation/getWavFileList';
import { createRawFolder } from '../../../api/annotation/createRawFolder';
import { createWavFolder } from '../../../api/annotation/createWavFolder';
import { uploadRawFile } from '../../../api/annotation/uploadRawFile';
import { uploadWavFile } from '../../../api/annotation/uploadWavFile';

import { RawFolderList } from '../../base/Annotation/RawFolderList';
import { WavFolderList } from '../../base/Annotation/WavFolderList';
import { RawFileList } from '../../base/Annotation/RawFileList';
import { WavFileList } from '../../base/Annotation/WavFileList';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
  },
  rawFileContainer: {
    width: '50%',
    height: '782px',
    float: 'left',
    overflow: 'hidden',
    paddingRight: '10px',
  },
  wavFileContainer: {
    width: '50%',
    height: '782px',
    float: 'left',
    overflow: 'hidden',
    paddingLeftt: '10px',
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
  content: {
    width: '50%',
    marginTop: '20px',
    height: '710px',
    float: 'left',
    overflow: 'hidden',
    padding: '0px',
    backgroundColor: 'white',
    border: 'solid 1px lightGray',
  },
  customForm: {
    width: '100%',
    marginTop: '-15px',
    marginBottom: '20px',
  },
  loading: {
    width: '18px !important',
    height: '18px !important',
    marginLeft: '10px',
    verticalAlign: 'middle',
  },
});

interface Props {}

export const FileSettings: React.FC<Props> = () => {
  const classes = useStyles();

  const [selectedRawFolderIndex, setSelectedRawFolderIndex] = useState<number>(-1);
  const [selectedWavFolderIndex, setSelectedWavFolderIndex] = useState<number>(-1);
  const [selectedRawFileIndex, setSelectedRawFileIndex] = useState<number>(-1);
  const [selectedWavFileIndex, setSelectedWavFileIndex] = useState<number>(-1);

  const [newRawFolderName, setNewRawFolderName] = useState<string>('');
  const [newWavFolderName, setNewWavFolderName] = useState<string>('');

  const [newRawFiles, setNewRawFiles] = useState<FileList>();
  const [newRawFileName, setNewRawFileName] = useState<string>('');
  const [newWavFiles, setNewWavFiles] = useState<FileList>();
  const [newWavFileName, setNewWavFileName] = useState<string>('');
  
  const [uploadingRawFile, setUploadingRawFile] = useState(false);
  const [uploadingWavFile, setUploadingWavFile] = useState(false);

  const [openCreateRawFolderModal, setOpenCreateRawFolderModal] = useState<boolean>(false);
  const handleCloseCreateRawFolderModal = () => setOpenCreateRawFolderModal(false);

  const [openCreateWavFolderModal, setOpenCreateWavFolderModal] = useState<boolean>(false);
  const handleCloseCreateWavFolderModal = () => setOpenCreateWavFolderModal(false);

  const [openUploadRawFileModal, setOpenUploadRawFileModal] = useState<boolean>(false);
  const handleCloseUploadRawFileModal = () => {
    if (uploadingRawFile)
    {
      alert('Uploading on progress');
      return;
    }

    setOpenUploadRawFileModal(false);
  }

  const [openUploadWavFileModal, setOpenUploadWavFileModal] = useState<boolean>(false);
  const handleCloseUploadWavFileModal = () => {
    if (uploadingWavFile)
    {
      alert('Uploading on progress');
      return;
    }

    setOpenUploadWavFileModal(false);
  }

  const [openDeleteRawFolderModal, setOpenDeleteRawFolderModal] = useState<boolean>(false);
  const handleCloseDeleteRawFolderModal = () => setOpenDeleteRawFolderModal(false);

  const [openDeleteWavFolderModal, setOpenDeleteWavFolderModal] = useState<boolean>(false);
  const handleCloseDeleteWavFolderModal = () => setOpenDeleteWavFolderModal(false);

  const [openDeleteRawFileModal, setOpenDeleteRawFileModal] = useState<boolean>(false);
  const handleCloseDeleteRawFileModal = () => setOpenDeleteRawFileModal(false);

  const [openDeleteWavFileModal, setOpenDeleteWavFileModal] = useState<boolean>(false);
  const handleCloseDeleteWavFileModal = () => setOpenDeleteWavFileModal(false);

  const tempRawFolderList = getRawFolderList();
  const rawFolderList = !!tempRawFolderList.data ? tempRawFolderList.data.directories.map((t, id) => {
    return {id: id, ...t};
  }) : [];

  const tempWavFolderList = getWavFolderList();
  const wavFolderList = !!tempWavFolderList.data ? tempWavFolderList.data.directories.map((t, id) => {
    return {id: id, ...t};
  }) : [];

  const tempRawFileList = getRawFileList(selectedRawFolderIndex >= 0 ? rawFolderList[selectedRawFolderIndex].name : '');
  const rawFileList = !!tempRawFileList && !!tempRawFileList.data ? tempRawFileList.data.files.map((t, id) => {
    return {id: id, ...t};
  }) : [];

  const tempWavFileList = getWavFileList(selectedWavFolderIndex >= 0 ? wavFolderList[selectedWavFolderIndex].name : '');
  const wavFileList = !!tempWavFileList && !!tempWavFileList.data ? tempWavFileList.data.files.map((t, id) => {
    return {id: id, ...t};
  }) : [];

  const selectRawFolder = (index: number) => {
    setSelectedRawFolderIndex(index);
  };

  const selectWavFolder = (index: number) => {
    setSelectedWavFolderIndex(index);
  };

  const selectRawFile = (index: number) => {
    setSelectedRawFileIndex(index);
  };

  const selectWavFile = (index: number) => {
    setSelectedWavFileIndex(index);
  };

  const prepareCreateRawFolder = () => {
    setNewRawFolderName('');
    setOpenCreateRawFolderModal(true);
  };

  const createRawFolderAndRefresh = async() => {
    let errorMessage = '';

    const response = await createRawFolder(newRawFolderName);

    if (response.error) {
    errorMessage = 'InternalServerError';
    }
    else if (response.data && response.data.error) {
    errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
    alert(errorMessage);
    return;
    }
        
    // Refresh
    await mutate(getAPIUrl('annotation', 'getRawFolderList'));

    setOpenCreateRawFolderModal(false);
  };

  const prepareCreateWavFolder = () => {
    setNewWavFolderName('');
    setOpenCreateWavFolderModal(true);
  };

  const createWavFolderAndRefresh = async() => {
    let errorMessage = '';

    const response = await createWavFolder(newWavFolderName);

    if (response.error) {
    errorMessage = 'InternalServerError';
    }
    else if (response.data && response.data.error) {
    errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
    alert(errorMessage);
    return;
    }
        
    // Refresh
    await mutate(getAPIUrl('annotation', 'getWavFolderList'));

    setOpenCreateWavFolderModal(false);
  };

  const prepareUploadRawFile = () => {
    if (selectedRawFolderIndex == -1)
    {
      alert('Source folder not chosen yet');
      return;
    }

    setNewRawFiles(undefined);
    setNewRawFileName('');
    setOpenUploadRawFileModal(true);
  };

  const uploadRawFileAndRefresh = async() => {
    if (newRawFiles == undefined || newRawFileName == '')
    {
      alert('Source file not chosen yet');
      return;
    }
    
    if (uploadingRawFile)
    {
      alert('Uploading on progress');
      return;
    }

    setUploadingRawFile(true);

    let errorMessage = '';
    const selectedRawFolderName = rawFolderList[selectedRawFolderIndex].name;
    const response = await uploadRawFile(selectedRawFolderName, newRawFiles);

    if (response.error) {
      errorMessage = 'InternalServerError';
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      setUploadingRawFile(false);
      alert(errorMessage);
      return;
    }
        
    // Refresh
    await mutate(getAPIUrl('annotation', 'getRawFileList', {folderName: selectedRawFolderName}));

    setUploadingRawFile(false);
    setOpenUploadRawFileModal(false);
  };

  const prepareUploadWavFile = () => {
    if (selectedWavFolderIndex == -1)
    {
      alert('Wav folder not chosen yet');
      return;
    }

    setNewWavFiles(undefined);
    setNewWavFileName('');
    setOpenUploadWavFileModal(true);
  };

  const uploadWavFileAndRefresh = async() => {
    if (newWavFiles == undefined || newWavFileName == '')
    {
      alert('Wav file not chosen yet');
      return;
    }
    
    if (uploadingWavFile)
    {
      alert('Uploading on progress');
      return;
    }

    setUploadingWavFile(true);

    let errorMessage = '';
    const selectedWavFolderName = wavFolderList[selectedWavFolderIndex].name;
    const response = await uploadWavFile(selectedWavFolderName, newWavFiles);

    if (response.error) {
      errorMessage = 'InternalServerError';
    }
    else if (response.data && response.data.error) {
      errorMessage = response.data.error.message;
    }

    if (errorMessage != '') {
      setUploadingWavFile(false);
      alert(errorMessage);
      return;
    }
        
    // Refresh
    await mutate(getAPIUrl('annotation', 'getWavFileList', {folderName: selectedWavFolderName}));

    setUploadingWavFile(false);
    setOpenUploadWavFileModal(false);
  };

  const prepareDeleteRawFolder = (index: number) => {
    setSelectedRawFolderIndex(index);
    setOpenDeleteRawFolderModal(true);
  };

  const deleteRawFolderAndRefresh = async() => {
    console.log('Deleting raw folder');
  };

  const prepareDeleteWavFolder = (index: number) => {
    setSelectedWavFolderIndex(index);
    setOpenDeleteWavFolderModal(true);
  };

  const deleteWavFolderAndRefresh = async() => {
    console.log('Deleting wav folder');
  };

  const prepareDeleteRawFile = (index: number) => {
    setSelectedRawFileIndex(index);
    setOpenDeleteRawFileModal(true);
  };

  const deleteRawFileAndRefresh = async() => {
    console.log('Deleting raw file');
  };

  const prepareDeleteWavFile = (index: number) => {
    setSelectedWavFileIndex(index);
    setOpenDeleteWavFileModal(true);
  };

  const deleteWavFileAndRefresh = async() => {
    console.log('Deleting wav file');
  };

  const changeNewRawFolderName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setNewRawFolderName(value);
  };

  const changeNewWavFolderName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setNewWavFolderName(value);
  };

  const changeNewRawFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    if (target.files) {
        setNewRawFiles(target.files);
    }
    
    if (target.files?.length == 1)
    {
      setNewRawFileName(target.value.replace(/^.*[\\\/]/, ''));
    }
    else if (target.files?.length != 1)
    {
      setNewRawFileName('' + target.files?.length.toString() + ' files selected');
    }
  };

  const changeNewWavFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    if (target.files) {
        setNewWavFiles(target.files);
    }
    
    if (target.files?.length == 1)
    {
      setNewWavFileName(target.value.replace(/^.*[\\\/]/, ''));
    }
    else if (target.files?.length != 1)
    {
      setNewWavFileName('' + target.files?.length.toString() + ' files selected');
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.rawFileContainer}>
        <div className={classes.header}>
          <span className={classes.headerItem}>Source</span>
          <Button variant="contained" className={classes.headerItem} onClick={prepareCreateRawFolder}>
            Create Folder
          </Button>
          <Button variant="contained" className={classes.headerItem} onClick={prepareUploadRawFile}>
            Upload File
          </Button>
        </div>
        <div className={classes.content}>
          <RawFolderList
            rawFolderList={rawFolderList}
            selectedRawFolderIndex={selectedRawFolderIndex}
            onSelect={selectRawFolder}
            onDelete={prepareDeleteRawFolder}
          />
        </div>
        <div className={classes.content}>
          <RawFileList
            rawFileList={rawFileList}
            selectedRawFileIndex={selectedRawFileIndex}
            onSelect={selectRawFile}
            onDelete={prepareDeleteRawFile}
          />
        </div>
      </div>
      <div className={classes.wavFileContainer}>
        <div className={classes.header}>
          <span className={classes.headerItem}>Wav</span>
          <Button variant="contained" className={classes.headerItem} onClick={prepareCreateWavFolder}>
            Create Folder
          </Button>
          <Button variant="contained" className={classes.headerItem} onClick={prepareUploadWavFile}>
            Upload File
          </Button>
        </div>
        <div className={classes.content}>
          <WavFolderList
            wavFolderList={wavFolderList}
            selectedWavFolderIndex={selectedWavFolderIndex}
            onSelect={selectWavFolder}
            onDelete={prepareDeleteWavFolder}
          />
        </div>
        <div className={classes.content}>
          <WavFileList
            wavFileList={wavFileList}
            selectedWavFileIndex={selectedWavFileIndex}
            onSelect={selectWavFile}
            onDelete={prepareDeleteWavFile}
          />
        </div>
      </div>

      <Dialog open={openCreateRawFolderModal} onClose={handleCloseCreateRawFolderModal}>
        <DialogTitle>Create New Source Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            className={classes.customForm}
            autoFocus={true}
            value={newRawFolderName}
            onChange={changeNewRawFolderName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateRawFolderModal}>Cancel</Button>
          <Button onClick={createRawFolderAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCreateWavFolderModal} onClose={handleCloseCreateWavFolderModal}>
        <DialogTitle>Create New Wav Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            className={classes.customForm}
            autoFocus={true}
            value={newWavFolderName}
            onChange={changeNewWavFolderName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateWavFolderModal}>Cancel</Button>
          <Button onClick={createWavFolderAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUploadRawFileModal} onClose={handleCloseUploadRawFileModal}>
        <DialogTitle>Upload New Source File</DialogTitle>
        <DialogContent>
          <Button variant="contained" component="label">
            Select
            <input hidden accept=".csv" multiple type="file" onChange={changeNewRawFile} />
          </Button>
          <span style={{marginLeft: '10px'}}>
            {newRawFileName}
          </span>
          { uploadingRawFile ? <CircularProgress className={classes.loading} /> : ''}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadRawFileModal}>Cancel</Button>
          <Button onClick={uploadRawFileAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUploadWavFileModal} onClose={handleCloseUploadWavFileModal}>
        <DialogTitle>Upload New Wav File</DialogTitle>
        <DialogContent>
          <Button variant="contained" component="label">
            Select
            <input hidden accept=".wav" multiple type="file" onChange={changeNewWavFile} />
          </Button>
          <span style={{marginLeft: '10px'}}>
            {newWavFileName}
          </span>
          { uploadingWavFile ? <CircularProgress className={classes.loading} /> : ''}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadWavFileModal}>Cancel</Button>
          <Button onClick={uploadWavFileAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openDeleteRawFolderModal} onClose={handleCloseDeleteRawFolderModal}>
        <DialogTitle>Delete Source Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete source folder "{rawFolderList[selectedRawFolderIndex]?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteRawFolderModal}>Cancel</Button>
          <Button onClick={deleteRawFolderAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openDeleteWavFolderModal} onClose={handleCloseDeleteWavFolderModal}>
        <DialogTitle>Delete Wav Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete wav folder "{wavFolderList[selectedWavFolderIndex]?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteWavFolderModal}>Cancel</Button>
          <Button onClick={deleteWavFolderAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openDeleteRawFileModal} onClose={handleCloseDeleteRawFileModal}>
        <DialogTitle>Delete Source File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete source folder "{rawFileList[selectedRawFileIndex]?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteRawFileModal}>Cancel</Button>
          <Button onClick={deleteRawFileAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openDeleteWavFileModal} onClose={handleCloseDeleteWavFileModal}>
        <DialogTitle>Delete Wav File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete wav file "{wavFileList[selectedWavFileIndex]?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteWavFileModal}>Cancel</Button>
          <Button onClick={deleteWavFileAndRefresh}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
