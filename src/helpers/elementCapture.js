import html2canvas from 'html2canvas';
export const save = () => {
  new html2canvas(document.getElementById('capture'), {
    backgroundColor: null,
    scrollX: 0,
    scrollY: -window.scrollY,
    scale: 1,
    allowTaint: true,
    useCORS: true
  }).then(function(canvas) {
    let uri = canvas.toDataURL();
    let filename = 'data-capture';
    let link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      //Firefox requires the link to be in the body
      document.body.appendChild(link);
      //simulate click
      link.click();
      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  });
};
