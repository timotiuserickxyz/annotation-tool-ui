import * as React from 'react';
import AudioPlayer from "./AudioPlayer";

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
  projectName: string,
  selectedDataIndex: number,
};

type Component = (props: Props) => React.ReactElement<Props>;

export const AnnotateData: Component = ({ projectName, selectedDataIndex }) => {

  return (
    <div>
      
      <br/>
      <AudioPlayer url='/stereo_11025.wav' />
    </div>
  )
};
  