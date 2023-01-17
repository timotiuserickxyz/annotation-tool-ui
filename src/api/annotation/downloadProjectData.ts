import { getAPIUrl } from '../../utils/path';
import { API_URL } from '../core';

export function downloadProjectData(param: string) {
  fetch(API_URL + getAPIUrl('annotation', 'downloadProjectData', {projectName: param}))
  .then(response => response.text()).then(text => {
    if (text.indexOf('"status": "error"'))
    {
      if (text.indexOf('"code": 500') >= 0) {
        alert('Project does not have any annotation yet');
        return;
      }
      else {
        alert('Error on downloading. Please try again later');
        return;
      }
    }
    
    const blob = new Blob([text], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.download = param + '.csv';
    anchor.href = url;
    anchor.click();
  });
}
