const { Category, UserItem, Item } = require('./models')

UserItem.create({
    UserId: 2,
    ItemId: 1,
    bid: 60000000
})
    .then(()=> {
        console.log('success')
    })
    .catch(er=> {
        console.log(er)
    })