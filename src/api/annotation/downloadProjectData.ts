import { getAPIUrl } from '../../utils/path';
import { API_URL } from '../core';

export function downloadProjectData(param: string) {
  
  fetch(API_URL + getAPIUrl('annotation', 'downloadProjectData', {projectName: param}))
  .then(response => response.text()).then(text => {
    const blob = new Blob([text], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  });
}
