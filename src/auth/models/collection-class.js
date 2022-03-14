'use strict';

class collection {
    constructor(model){
        this.model = model
    }
    async  createRecord(obj) {
        try {
            return await this.model.create(obj) 
        } catch (error) {
            console.error('error in creating a record',this.model.name);
        }

        
    }
    async readRecord(id){
        try {
            if (id) {
                return await this.model.findOne({where:{id:id}});
            } else {
                return await this.model.findAll();
            }
        } catch (error) {
            console.error('error in Reading a record',this.model.name);
        }
    }
    async removeRecord(id){
        try {
            if (id) {
                return await this.model.destroy({where : {id:id}});
            }
        } catch (error) {
            console.error('error in removing a record',this.model.name);
        }
    }
        async updateRecord(obj,id){
            try {
                if (obj,id) {
                    return await this.model.update(obj,{where:{id:id}})
                }
            } catch (error) {
                console.error('error in updating a record',this.model.name);
            }
        }
}
module.exports = collection;