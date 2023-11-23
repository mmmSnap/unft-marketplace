import CounrtyList from './countryList.json'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let list  = JSON.stringify(CounrtyList,null, 4)
export default function handler(req, res) {
  res.status(200).json({ CounrtyList: JSON.parse(list) })
}
