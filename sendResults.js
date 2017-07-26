module.exports = exports = (res) => {
  return (results) => {
    console.log('RESPONDING', results, '\n\n\n')
    res.status(200).json(results)
  }
}