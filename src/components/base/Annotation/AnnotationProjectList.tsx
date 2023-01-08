import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import HighlightOff from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
  tableContainer: {
    width: '100%',
    height: '100%',
  },
  customTable: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none !important',
    },
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
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
  labelText: {
    width: '100px',
    display: 'inline-block',
  },
  customButton: {
    minWidth: '40px !important',
    width: '40px',
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
  onClickEditProject: (targetProjectName: string, targetProjectRawFolderName: string, targetProjectWavFolderName: string) => void | Promise<void>,
  onClickDeleteProject: (targetProjectName: string) => void | Promise<void>,
  onClickCreateLabel: (targetProjectName: string) => void | Promise<void>,
  onClickDeleteLabel: (targetProjectName: string, targetLabelName: string) => void | Promise<void>,
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
    { field: 'project_name', headerName: 'Project Name', flex: 1 },
    { field: 'raw',
      headerName: 'Source Folder',
      flex: 1,
      valueGetter: (params: any) => params.row.source_path.raw_source_path.replace(/^.*[\\\/]/, '')
    },
    { field: 'wav',
      headerName: 'Wav Folder',
      flex: 1,
      valueGetter: (params: any) => params.row.source_path.wav_source_path.replace(/^.*[\\\/]/, '')
    },
    { field: 'label',
      headerName: 'Labels',
      flex: 1,
      renderCell: (params: any = {}) => (
        <ul className={classes.labelList}>
          {params.row.label_option.label_option.map((label: string) => 
            (<li>
              <span className={classes.labelText}>{label}</span>
              <Button className={classes.customButton} onClick={() => onClickDeleteLabel(params.row.project_name, label)}>
                <HighlightOff />
              </Button>
            </li>)
          )}
          <li>
            <Button onClick={() => onClickCreateLabel(params.row.project_name)}>
              Create New
            </Button>
          </li>
        </ul>
      ),
    },
    { field: 'action',
      headerName: 'Action',
      flex: 0.5,
      renderCell: (params: any = {}) => (
        <div>
          <Button className={classes.customButton} onClick={() => onClickEditProject(
            params.row.project_name,
            params.row.source_path.raw_source_path.replace(/^.*[\\\/]/, ''),
            params.row.source_path.wav_source_path.replace(/^.*[\\\/]/, '')
            )}>
            <Edit />
          </Button>
          <Button className={classes.customButton} onClick={() => onClickDeleteProject(params.row.project_name)}>
            <HighlightOff />
          </Button>
        </div>
      ),
    },
  ];

  const rowPerPage: number = 10;

  return (
    <div className={classes.tableContainer}>
      <DataGrid
        className={classes.customTable}
        getRowId={(row) => row.project_name}
        rows={rows}
        columns={columns}
        pageSize={rowPerPage}
        disableColumnSelector={true}
        disableSelectionOnClick={true}
      />
    </div>
  )
};
  