const Role = require('../models/Role')

const createRoles = async () =>{
    try {
            const count =  await Role.estimatedDocumentCount();
            if(count > 0){
                return
            }
            const values = await Promise.all([
                new Role({name: 'admin'}).save(),
                new Role({name: 'employee'}).save(),
                new Role({name: 'billing'}).save(),
                new Role({name: 'delivery'}).save(),
                new Role({name: 'dispatch'}).save()
            ])
    } catch (error) {
        console.error(error);
    }
}

module.exports = {createRoles} 