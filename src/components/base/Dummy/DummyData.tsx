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
  selectedDataIndex: number,
  onSelect: (id: number, audioPath: string) => void | Promise<void>,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const DummyData: Component = ({ data, selectedDataIndex, onSelect }) => {
  const classes = useStyles();

  if (selectedDataIndex == 0) return (<div></div>);

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
          checked={selectedDataIndex === params.id}
          value={params.id}
        />
      ),
    },
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
  ];

  const rowPerPage: number = 5;
  const currentPage: number = !!data ? Math.ceil(selectedDataIndex / rowPerPage) - 1 : 0;

  return (
    <DataGrid
      className={classes.customTable}
      autoHeight
      rows={rows}
      columns={columns}
      page={currentPage}
      pageSize={rowPerPage}
      selectionModel={[selectedDataIndex]}
      onSelectionModelChange={(newSelectionModel) => {
        onSelect(newSelectionModel.selectionModel[0] as number, 'test');
      }}
    />
  )
};
  