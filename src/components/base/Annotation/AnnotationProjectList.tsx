import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
  tableContainer: {
    width: '100%',
    height: '100%',
  },
  customTable: {
    '& .MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none !important',
    },
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
      overflowX: 'hidden',
      overflowY: 'scroll',
    },
    '& .MuiDataGrid-cell': {
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiDataGrid-row': {
      maxHeight: 'none !important',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: 'white !important',
    }
  },
  labelList: {
    padding: '10px',
  },
  customButton: {
    padding: '5px',
    marginLeft: '5px',
  },
});

export type BaseRow = {
  id: string | number;
  tableData?: {id: string | number, checked: boolean | undefined};
};

type Row = BaseRow & {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type Props = {
  projects: any[],
  onClickEditProject: (targetProjectName: string, targetProjectRawFolderName: string, targetProjectWavFolderName: string, targetProjectChunkingType: string, targetProjectDescription: string) => void | Promise<void>,
  onClickDeleteProject: (targetProjectName: string) => void | Promise<void>,
  onClickCreateLabel: (targetProjectName: string) => void | Promise<void>,
  onClickDeleteLabel: (targetProjectName: string, targetProjectLabel: string) => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const AnnotationProjectList: Component = ({ projects, onClickEditProject, onClickDeleteProject, onClickCreateLabel, onClickDeleteLabel }) => {
  const classes = useStyles();

  const rows: Row[] = !!projects
  ? projects.map((t) => {
      return {...t};
    })
  : [];

  const columns = [
    {
      field: 'project_name',
      headerName: 'Project Name',
      flex: 1,
    },
    {
      field: 'raw_source_path',
      headerName: 'Csv Folder',
      flex: 1,
      valueGetter: (params: any) => params.row.raw_source_path.replace(/^.*[\\\/]/, ''),
    },
    {
      field: 'wav_source_path',
      headerName: 'Wav Folder',
      flex: 1,
      valueGetter: (params: any) => params.row.wav_source_path.replace(/^.*[\\\/]/, ''),
    },
    {
      field: 'chunking_type',
      headerName: 'Chunking Type',
      flex: 1,
    },
    {
      field: 'label',
      headerName: 'Labels',
      flex: 1,
      renderCell: (params: any = {}) => (
        <ul className={classes.labelList}>
          {params.row.label_option.map((label_option: any) => 
            (<li>
              { label_option.label_type == 'garbage' ? (<span style={{color: 'red'}}>{label_option.label_name}</span>) : (<span>{label_option.label_name}</span>) }
              <IconButton className={classes.customButton} onClick={() => onClickDeleteLabel(params.row.project_name, label_option.label_name)}>
                <HighlightOffIcon />
              </IconButton>
            </li>)
          )}
          <li>
            <Button variant="contained" onClick={() => onClickCreateLabel(params.row.project_name)}>
              Create New
            </Button>
          </li>
        </ul>
      ),
    },
    {
      field: 'description',
      headerName: 'Explanation',
      flex: 2,
      renderCell: (params: any = {}) => (
        <span style={{width: '100%', textAlign: 'center', whiteSpace: 'pre-line'}}>
          {params.row.description}
        </span>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params: any = {}) => (
        <div>
          <IconButton className={classes.customButton} onClick={() => onClickEditProject(
            params.row.project_name,
            params.row.raw_source_path.replace(/^.*[\\\/]/, ''),
            params.row.wav_source_path.replace(/^.*[\\\/]/, ''),
            params.row.chunking_type,
            params.row.description
          )}>
            <EditIcon />
          </IconButton>
          <IconButton className={classes.customButton} onClick={() => onClickDeleteProject(params.row.project_name)}>
            <HighlightOffIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rowPerPage: number = 10;

  return (
    <div className={classes.tableContainer}>
      <DataGrid
        className={classes.customTable}
        rows={rows}
        columns={columns}
        pageSize={rowPerPage}
        disableColumnSelector={true}
        disableSelectionOnClick={true}
      />
    </div>
  )
};
  