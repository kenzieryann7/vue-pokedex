export const generate_graph_url = async function() {
  const keys = ['wow'];
  const vals = [20];

  const template = {
    config: {
      type: 'radar',
      data: {
        labels: keys,
        datasets: [
          {
            lineTension: 0.5,
            backgroundColor: 'rgba(178, 201, 235, 0.4)',
            borderColor: 'rgb(178, 201, 235)',
            pointBackgroundColor: 'rgba(94, 154, 238, 0.99)',
            data: vals,
            pointHoverRadius: 30
          }
        ]
      },
      options: {
        legend: { display: false },
        title: { display: true, text: 'Musical Analysis' },
        scale: { ticks: { display: false } }
      }
    },
    width: 320,
    height: 240
  };

  const path = 'http://localhost:8090/generateGraph';

  const response = await fetch(path, {
    method: 'POST',
    body: JSON.stringify(template),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const val = await response.json();
  console.log(val.graph_url);
  return val.graph_url;
};
