import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  customTable: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
  }
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
  onClickDelete: (targetProjectName: string) => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const AnnotationProjects: Component = ({ projects, onClickDelete }) => {
  const classes = useStyles();

  const rows: Row[] = !!projects
  ? projects.map((t) => {
      return {...t};
    })
  : [];

  function getRawFolderFromProject(params: any) {
    return params.row.source_path.raw_source_path;
  }

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
    { field: 'action',
      headerName: 'Action',
      flex: 0.5,
      renderCell: (params: any = {}) => (
        <Button onClick={() => onClickDelete(params.row.project_name)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const rowPerPage: number = 10;

  return (
    <DataGrid
      className={classes.customTable}
      getRowId={(row) => row.project_name}
      autoHeight
      rows={rows}
      columns={columns}
      pageSize={rowPerPage}
      disableColumnSelector={true}
    />
  )
};
  