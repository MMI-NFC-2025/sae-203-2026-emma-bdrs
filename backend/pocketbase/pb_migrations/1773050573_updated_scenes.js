/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1254289504")

  // remove field
  collection.fields.removeById("text2716462395")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number2716462395",
    "max": null,
    "min": null,
    "name": "capacite",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1254289504")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2716462395",
    "max": 0,
    "min": 0,
    "name": "capacite",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number2716462395")

  return app.save(collection)
})
