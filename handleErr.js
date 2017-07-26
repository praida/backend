module.exports = exports = (err, req, res) => {
  console.error(err)
  res.status(500).json(err)
}