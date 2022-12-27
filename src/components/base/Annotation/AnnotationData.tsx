import * as React from 'react';
import { Radio } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

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
  data: any[],
  selectedTableIndex: number,
  onSelect: (tableIndex: number) => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const AnnotationData: Component = ({ data, selectedTableIndex, onSelect }) => {
  const classes = useStyles();

  if (data.length > 0 && selectedTableIndex == 0)
  {
    selectedTableIndex = 1;
  }
  else if (data.length <= 0)
  {
    return (<div></div>);
  }

  const rows: Row[] = !!data
  ? data.map((t) => {
      return {...t};
    })
  : [];

  const columns = [
    { field: '',
      headerName: '',
      flex: 0.5,
      renderCell: (params: any = {}) => (
        <Radio
          checked={selectedTableIndex === params.id}
          value={params.id}
        />
      ),
    },
    { field: 'sequence_number', headerName: 'Sequence', flex: 0.5 },
    { field: 'channel', headerName: 'Channel', flex: 0.5 },
    { field: 'file_name', headerName: 'Filename', flex: 1 },
    { field: 'label', headerName: 'Label', flex: 0.5 },
    { field: 'comment', headerName: 'Comment', flex: 1 },
  ];

  const rowPerPage: number = 5;
  const currentPage: number = !!data ? Math.ceil(selectedTableIndex / rowPerPage) - 1 : 0;

  return (
    <DataGrid
      className={classes.customTable}
      autoHeight
      rows={rows}
      getRowId={(row) => row.record_id}
      columns={columns}
      page={currentPage}
      pageSize={rowPerPage}
      selectionModel={[selectedTableIndex]}
      onSelectionModelChange={(newSelectionModel) => {
        const index = newSelectionModel.selectionModel[0] as number;
        onSelect(index);
      }}
    />
  )
};
  