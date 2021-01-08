//

import { useState } from 'react';
import loadable from '@loadable/component';
import { useMount } from 'react-use';

const Chart = loadable(() => import('react-apexcharts'));

const Home = () => {
  const opts = {
    chart: {
      toolbar: { show: false },
    },
    legend: { show: false },
    tooltip: { enabled: false },
    xaxis: { labels: { show: false } },
    yaxis: { 
      forceNiceScale: true,
      decimalsInFloat: 0,
      labels: {
        formatter: (val) => {
          if (val > 1099511627776) {
            return `${(val / 1099511627776).toFixed(1)}t`;
          } else if (val > 1073741824) {
            return `${(val / 1073741824).toFixed(1)}g`;
          } else if (val > 1048576) {
            return `${(val / 1048576).toFixed(1)}m`;
          } else if (val > 1024) {
            return `${(val / 1024).toFixed(1)}k`;
          }
          return val.toFixed(1);
        }
      }
    }
  };

  const [s0, setS0] = useState([]);
  const [s1, setS1] = useState([]);
  const [s2, setS2] = useState([]);
  const [s3, setS3] = useState([]);

  const updateData = () => {
  };

  useMount(() => {
    const evtSource = new EventSource('/api/hello');
    evtSource.onmessage = (e) => {
      const current = JSON.parse(e.data);
      setS0(old => [...old, current[0]]);
      setS1(old => [...old, current[1]]);
      setS2(old => [...old, current[2]]);
      setS3(old => [...old, current[3]]);
    };

    evtSource.onerror = (e) => {
      console.log(e);
    };
  });

  return (
    <div className="container">
      <div className="header clearfix">
        <nav>
          <ul className="nav nav-pills float-right">
            <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Doc</a></li>
            <li className="nav-item"><a className="nav-link" href="#">About</a></li>
          </ul>
        </nav>
        <h3 className="text-muted">Project namE</h3>
      </div>

      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Jumbotron heading</h1>
          <p className="card-text">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
        </div>
      </div>

      <div className="row marketing">
        <div className="col-lg-6">
          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
          <p>
            <img src="/cover.png" />
          </p>

          <h4>Subheading</h4>
          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
          <Chart type="line" options={opts} series={[{ name: 's1', data: s1 }]} />

          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
          <p>
            <img src="/cover.webp" />
          </p>

          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
          <Chart type="line" options={opts} series={[{ name: 's3', data: s3 }]} />
        </div>

        <div className="col-lg-6">
          <h4>Subheading</h4>
          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
          <Chart type="line" options={opts} series={[{ name: 's0', data: s0 }]} />

          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
          <p>
            <img src="/cover.jpg" />
          </p>

          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
          <Chart type="line" options={opts} series={[{ name: 's2', data: s2 }]} />

          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
          <p>
            <img src="/cover.avif" />
          </p>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2020.</p>
      </footer>
    </div>
  );
};

export default Home;
