import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import HighlightOff from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
  tableContainer: {
    width: '100%',
    height: '100%',
  },
  customTable: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '& .MuiDataGrid-row': {
      cursor: 'pointer',
    },
  },
  customButton: {
    minWidth: '40px !important',
    width: '40px',
    marginLeft: '5px',
    visibility: 'hidden',
  },
});

export type BaseRow = {
  id: string | number;
  tableData?: {id: string | number, checked: boolean | undefined};
};

type Row = BaseRow & {
  name: string;
};

type Props = {
  rawFolderList: any[],
  selectedRawFolderName: string,
  onSelect: (folderName: string) => void | Promise<void>,
  onDelete: (folderName: string) => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const RawFolderList: Component = ({ rawFolderList, selectedRawFolderName, onSelect, onDelete }) => {
  const classes = useStyles();

  const rows: Row[] = !!rawFolderList
  ? rawFolderList.map((t) => {
      return {...t};
    })
  : [];

  const columns = [
    { field: 'name',
      headerName: 'Source Folder',
      flex: 1,
      renderCell: (params: any = {}) => (
        <div>
          <span>{params.row.name}</span>
          <Button className={classes.customButton} onClick={() => onDelete(params.row.name)}>
            <HighlightOff />
          </Button>
        </div>
      ),
    },
  ];

  const rowPerPage: number = 100;

  return (
    <div className={classes.tableContainer}>
      <DataGrid
        className={classes.customTable}
        getRowId={(row) => row.name}
        rows={rows}
        columns={columns}
        pageSize={rowPerPage}
        disableColumnSelector={true}
        selectionModel={[selectedRawFolderName]}
        onSelectionModelChange={(newSelectionModel) => {
          const folderName = newSelectionModel.selectionModel[0] as string;
          onSelect(folderName);
        }}
        rowsPerPageOptions={[100]}
        hideFooterRowCount={true}
        hideFooterSelectedRowCount={true}
      />
    </div>
  )
};
  