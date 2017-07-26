module.exports = exports = (db, newFields) => {
  if (newFields.length === 0) {
    return Promise.resolve()
  }
  const items = newFields.map((newField) => {
    return { name: newField }
  })
  console.log('\n\n\nnew fields', JSON.stringify(items, null, 2), '\n\n\n')

  return db.collection('fields')
    .insertMany(items)
}
