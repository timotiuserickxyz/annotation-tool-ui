import * as React from 'react';
import { DataGrid, DataGridProps } from '@material-ui/data-grid';

export const DataGridTable: React.FC<DataGridProps> = (props: DataGridProps) => {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', height: '100%', backgroundColor:'#FFF' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid 
            disableSelectionOnClick
            pageSize={10}
            disableColumnMenu={true}
            autoHeight={true}
            rowHeight={70}
            {...props} 
          />
        </div>
      </div>
    </div>
  )
};

export default DataGridTable;