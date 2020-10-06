// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import si from 'systeminformation';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async (req, res) => {
  let connected = true;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');

  req.on('close', () => {
    connected = false;
  });

  req.on('end', () => {
    connected = false;
  });

  while (connected) {
    const s0 = req._hub.getUploadSpeed();
    // const s0 = (await si.networkStats())[0].rx_bytes;
    const s1 = req._hub.getTotalWritten();
    // const s1 = (await si.networkStats())[0].rx_bytes;
    const proc = (await si.processes()).list.filter(p => p.pid === process.pid)[0]
    const s2 = proc.pcpuu;
    const s3 = proc.mem_rss * 1024;
    res.write('data: ' + JSON.stringify([
      s0, s1, s2, s3
    ]) + '\n\n');
    await sleep(1000);
  }
  res.end('');
};
