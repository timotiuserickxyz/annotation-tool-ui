import React, { useState } from 'react';
import { mutate } from 'swr';
import { makeStyles } from '@material-ui/core/styles';

import { getRawFolderList } from '../../../api/annotation/getRawFolderList';
import { getWavFolderList } from '../../../api/annotation/getWavFolderList';
import { getRawFileList } from '../../../api/annotation/getRawFileList';
import { getWavFileList } from '../../../api/annotation/getWavFileList';

import { RawFolderList } from '../../base/Annotation/RawFolderList';
import { WavFolderList } from '../../base/Annotation/WavFolderList';
import { RawFileList } from '../../base/Annotation/RawFileList';
import { WavFileList } from '../../base/Annotation/WavFileList';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@material-ui/core';

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
});

interface Props {}

export const FileSettings: React.FC<Props> = () => {
  const classes = useStyles();

  const [selectedRawFolderName, setSelectedRawFolderName] = useState<string>('');
  const [selectedWavFolderName, setSelectedWavFolderName] = useState<string>('');
  const [selectedRawFileName, setSelectedRawFileName] = useState<string>('');
  const [selectedWavFileName, setSelectedWavFileName] = useState<string>('');

  const [newRawFolderName, setNewRawFolderName] = useState<string>('');
  const [newWavFolderName, setNewWavFolderName] = useState<string>('');

  const [openCreateRawFolderModal, setOpenCreateRawFolderModal] = useState<boolean>(false);
  const handleCloseCreateRawFolderModal = () => setOpenCreateRawFolderModal(false);

  const [openCreateWavFolderModal, setOpenCreateWavFolderModal] = useState<boolean>(false);
  const handleCloseCreateWavFolderModal = () => setOpenCreateWavFolderModal(false);

  const [openDeleteRawFolderModal, setOpenDeleteRawFolderModal] = useState<boolean>(false);
  const handleCloseDeleteRawFolderModal = () => setOpenDeleteRawFolderModal(false);

  const [openDeleteWavFolderModal, setOpenDeleteWavFolderModal] = useState<boolean>(false);
  const handleCloseDeleteWavFolderModal = () => setOpenDeleteWavFolderModal(false);

  const [openDeleteRawFileModal, setOpenDeleteRawFileModal] = useState<boolean>(false);
  const handleCloseDeleteRawFileModal = () => setOpenDeleteRawFileModal(false);

  const [openDeleteWavFileModal, setOpenDeleteWavFileModal] = useState<boolean>(false);
  const handleCloseDeleteWavFileModal = () => setOpenDeleteWavFileModal(false);

  const tempRawFolderList = getRawFolderList();
  const rawFolderList = !!tempRawFolderList.data ? tempRawFolderList.data.directories.map((t) => {
    return {...t};
  }) : [];

  const tempWavFolderList = getWavFolderList();
  const wavFolderList = !!tempWavFolderList.data ? tempWavFolderList.data.directories.map((t) => {
    return {...t};
  }) : [];

  const tempRawFileList = getRawFileList(selectedRawFolderName);
  const rawFileList = !!tempRawFileList && !!tempRawFileList.data ? tempRawFileList.data.files.map((t) => {
    return {...t};
  }) : [];

  const tempWavFileList = getWavFileList(selectedWavFolderName);
  const wavFileList = !!tempWavFileList && !!tempWavFileList.data ? tempWavFileList.data.files.map((t) => {
    return {...t};
  }) : [];
//const wavFileList = rawFileList;

  const selectRawFolder = (folderName: string) => {
    setSelectedRawFolderName(folderName);
  };

  const selectWavFolder = (folderName: string) => {
    setSelectedWavFolderName(folderName);
  };

  const selectRawFile = (fileName: string) => {
    setSelectedRawFileName(fileName);
  };

  const selectWavFile = (fileName: string) => {
    setSelectedWavFileName(fileName);
  };

  const prepareCreateRawFolder = () => {
    setNewRawFolderName('');
    setOpenCreateRawFolderModal(true);
  };

  const createRawFolderAndRefresh = async() => {
    
  };

  const prepareCreateWavFolder = () => {
    setNewWavFolderName('');
    setOpenCreateWavFolderModal(true);
  };

  const createWavFolderAndRefresh = async() => {
    
  };

  const prepareDeleteRawFolder = (folderName: string) => {
    setSelectedRawFolderName(folderName);
    setOpenDeleteRawFolderModal(true);
  };

  const deleteRawFolderAndRefresh = async() => {
    
  };

  const prepareDeleteWavFolder = (folderName: string) => {
    setSelectedWavFolderName(folderName);
    setOpenDeleteWavFolderModal(true);
  };

  const deleteWavFolderAndRefresh = async() => {
    
  };

  const prepareDeleteRawFile = (fileName: string) => {
    setSelectedRawFileName(fileName);
    setOpenDeleteRawFileModal(true);
  };

  const deleteRawFileAndRefresh = async() => {
    
  };

  const prepareDeleteWavFile = (fileName: string) => {
    setSelectedWavFileName(fileName);
    setOpenDeleteWavFileModal(true);
  };

  const deleteWavFileAndRefresh = async() => {
    
  };

  const changeNewRawFolderName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setNewRawFolderName(value);
  };

  const changeNewWavFolderName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setNewWavFolderName(value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.rawFileContainer}>
        <div className={classes.header}>
          <span className={classes.headerItem}>Source</span>
          <Button className={classes.headerItem} onClick={prepareCreateRawFolder}>
            Create Folder
          </Button>
          <Button className={classes.headerItem}>
            Upload File
          </Button>
        </div>
        <div className={classes.content}>
          <RawFolderList
            rawFolderList={rawFolderList}
            selectedRawFolderName={selectedRawFolderName}
            onSelect={selectRawFolder}
            onDelete={prepareDeleteRawFolder}
          />
        </div>
        <div className={classes.content}>
          <RawFileList
            rawFileList={rawFileList}
            selectedRawFileName={selectedRawFileName}
            onSelect={selectRawFile}
            onDelete={prepareDeleteRawFile}
          />
        </div>
      </div>
      <div className={classes.wavFileContainer}>
        <div className={classes.header}>
          <span className={classes.headerItem}>Wav</span>
          <Button className={classes.headerItem} onClick={prepareCreateWavFolder}>
            Create Folder
          </Button>
          <Button className={classes.headerItem}>
            Upload File
          </Button>
        </div>
        <div className={classes.content}>
          <WavFolderList
            wavFolderList={wavFolderList}
            selectedWavFolderName={selectedWavFolderName}
            onSelect={selectWavFolder}
            onDelete={prepareDeleteWavFolder}
          />
        </div>
        <div className={classes.content}>
          <WavFileList
            wavFileList={wavFileList}
            selectedWavFileName={selectedWavFileName}
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
      
      <Dialog open={openDeleteRawFolderModal} onClose={handleCloseDeleteRawFolderModal}>
        <DialogTitle>Delete Source Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete source folder "{selectedRawFolderName}"?
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
            Are you sure to delete wav folder "{selectedWavFolderName}"?
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
            Are you sure to delete source folder "{selectedRawFileName}"?
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
            Are you sure to delete wav file "{selectedWavFileName}"?
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
