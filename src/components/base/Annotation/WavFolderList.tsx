import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
      width: '100%',
      display: 'block',
      cursor: 'pointer',
    },
    '& .MuiDataGrid-cell': {
      overflow: 'visible',
      overflowX: 'auto',
      overflowY: 'hidden',
    },
  },
  customButton: {
    padding: '5px',
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
  wavFolderList: any[],
  selectedWavFolderIndex: number,
  onSelect: (index: number) => void | Promise<void>,
  onDelete: (index: number) => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const WavFolderList: Component = ({ wavFolderList, selectedWavFolderIndex, onSelect, onDelete }) => {
  const classes = useStyles();

  const rows: Row[] = !!wavFolderList
  ? wavFolderList.map((t) => {
      return {...t};
    })
  : [];

  const columns = [
    {
      field: 'name',
      headerName: 'Audio Folder',
      flex: 1,
      renderCell: (params: any = {}) => (
        <div>
          <span>{params.row.name}</span>
          <IconButton className={classes.customButton} onClick={() => onDelete(params.row.id)}>
            <HighlightOffIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rowPerPage: number = 100;

  return (
    <div className={classes.tableContainer}>
      <DataGrid
        className={classes.customTable}
        rows={rows}
        columns={columns}
        pageSize={rowPerPage}
        disableColumnSelector={true}
        selectionModel={[selectedWavFolderIndex]}
        onSelectionModelChange={(newSelectionModel) => {
          const index = newSelectionModel.selectionModel[0] as number;
          onSelect(index);
        }}
        rowsPerPageOptions={[100]}
        hideFooterRowCount={true}
        hideFooterSelectedRowCount={true}
      />
    </div>
  )
};
  