const DownloadImg = (src) => {
  const link = document.createElement('a');
  link.href = src;
  link.download = 'image.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export default DownloadImg;
