
const Client = require("../models/Client")
const { default: mongoose } = require("mongoose")

const createClient = async (req, res) => {
    const {
        name
    } = req.body
    
    try {
        
        const newClient = new Client({
            name 
        });
        const savedClient = await newClient.save();
        res.json(savedClient)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a Client'
        })
    }
}
const insertManyClients = async (req, res) => {
    let {
        Clients
    } = req.body
    Clients = Clients.map(Client => (
        {
            name: Client
        }
    ))
    try {
        const savedClients = await Client.insertMany(Clients)
        res.json(savedClients)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong creating a Client'
        })
    }
}
const findClient = async (req,res) =>{
    try {
        const filter = !!req.query.document ? {
            "document" : req.query.document
        } : {};
        let clientFound = []
        if (!!req.query.document) {
            console.log(req.query.document)
            clientFound = await Client.find(filter);
        }
        res.send(clientFound)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong retrieving the Client'
        })
    }
}
const deleteClient = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedClient = await Client.findByIdAndDelete(id) || {}
        if (Object.keys(deletedClient).length === 0) {
            res.status(400).json({
                message: `Client with id ${id} doesn't exist`
            }) 
        } else {
            res.json({
                message: `Client ${deletedClient._id} was deleted succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
        message: error.message || 'something went wrong deleting the Client'
        })
    }
}

const updateClient = async (req, res) => {
    try {
        const {id} = req.params;
        const filter = req.body || {};
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, filter) || {};
        if (Object.keys(updatedClient).length === 0) {
            res.status(400).json({
                message: `Client with id ${id} doesn't exist, nothing updated`
            }) 
        } else {
            res.json({
                message: `Client ${updatedClient._id} was updated succesfully`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || 'something went wrong updating the Client'
        })
    }
}

module.exports = {createClient, findClient, updateClient, deleteClient, insertManyClients}