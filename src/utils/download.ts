export const handleDownloadFile = async (data: any, filename: string, type = 'blob') => {
  if (type == 'blob' || type == 'link') {
    try {
      let href: any = '';

      if (type == 'blob') {
        href = window.URL.createObjectURL(data);
      } else {
        href = data;
      }
      const downloadElement = document.createElement('a');
      downloadElement.href = href;
      downloadElement.download = filename;
      document.body.appendChild(downloadElement);
      downloadElement.click();
      document.body.removeChild(downloadElement);
      window.URL.revokeObjectURL(href);
    } catch (error) {
      console.log('error', error);
    }
  }
};
