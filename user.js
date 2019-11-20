const { Category, UserItem, Item } = require('./models')

UserItem.create({
    UserId: 1,
    ItemId: 1,
    bid: 600000000
})
    .then(()=> {
        console.log('success')
    })
    .catch(er=> {
        console.log(er)
    })