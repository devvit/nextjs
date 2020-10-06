//

import axios from 'axios'

export default async (req, res) => {
  res.statusCode = 200
  res.send((await axios.get(req.query.url)).data)
}
