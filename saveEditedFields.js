const mongodb = require('mongodb')
const cloneDeep = require('lodash.clonedeep')

const ObjectID = mongodb.ObjectID

module.exports = exports = (db, editedFields) => {
  const ids = Object.keys(editedFields)
  if (ids.length === 0) {
    return Promise.resolve()
  }

  const items = ids.map((id) => {
    const editedField = cloneDeep(editedFields[id])
    delete editedField._id
    return {
      updateOne: {
        filter: { _id: new ObjectID(id) },
        update: { $set: editedField }
      }
    }
  })

  console.log('\n\n\nedited fields', JSON.stringify(items, null, 2), '\n\n\n', items, '\n\n\n\n')

  return db.collection('fields')
    .bulkWrite(items)
    .then((response) => {
      console.log('response', response.toJSON())
      return response.toJSON()
    })
}
