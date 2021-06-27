import moment from 'moment'

export function currency (num) {
  const n = parseInt(num, 10)
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`
}

export const formatDate = (unixTime, format) => {
  moment.locale('zh-tw')
  // console.log(moment())
  // return moment.unix(time).format('YYYY-MM-DD')
  return moment.unix(unixTime).format(format)
}
