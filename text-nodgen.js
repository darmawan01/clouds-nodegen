module.exports = {
    text_nodgen: function(args, params){
        let text = ``;

        if (args === 'controllers') {
            text= `
import ExampleModel from './model'; //direct to your model directory

const ${params}Controller = {}

${params}Controller.createAudit = (req, res) => {
    if (!req.body.example) {
        return res.status(400).json({
            "success": "false",
            "msg": "Ada field tidak boleh kosong !",
        })
    }

    let example = new ExampleModel(req.body)
    example.save(function (_err, example) {
        if(_err){
            return res.status(400).json({
                "success": "false",
                "msg": _err
            })
        }
        
        ExampleModel.findById(example._id,function (_err, example){
            if (_err) {
                res.status(500).json({
                    "success": false,
                    "msg": "Terjadi masalah saat menambahkan example !",
                    "error": _err
                })
            }

            res.status(201).json({
                "success": true,
                "msg": "Data berhasil ditambahkan.",
                "data": {
                    "example": {
                        "id": example._id,
                    }
                }
            })
        })
    })
}

${params}Controller.findAudits = (req, res) => {
    ExampleModel.find(function (_err, example) {
        console.log(example);
        
        if (_err) {
            console.log(_err)
            return res.status(500).json({
                "success": false,
                "msg": "Server error, terjadi masalah saat manmpilkan data example !",
                "error": _err
            })
        }
        
        res.status(200).json({
            "success": true,
            "msg": "Data berhasil ditampilkan !",
            "data": {
                "example": example
            }
        })
        
    })
}

${params}Controller.findAudit = (req, res) => {
    if(!req.body.example_id){
        return res.status(400).json({
            "success": "false",
            "msg": "example_id tidak boleh kosong !",
        })
    }

    ExampleModel.findById(req.body.example_id, function (_err, example) {
        if (_err) {
            return res.status(500).json({
                "success": false,
                "msg": "Server error, terjadi masalah saat manampilkan data example !",
                "error": _err
            })
        }

        if (!example) {
            return res.status(400).json({
                "success": false,
                "msg": "Data dengan id '" + req.body.example_id + "' tidak ditemukan !"
            })
        }

        res.status(200).json({
            "success": true,
            "msg": "Data berhasil ditemukan !",
            "data": {
                "example": {
                    "id": example._id,
                }
            }
        })
    })
}

${params}Controller.updateAudit = (req, res) => {
    if(!req.body.example_id){
        return res.status(400).json({
            "success": "false",
            "msg": "example_id tidak boleh kosong !",
        })
    }

    ExampleModel.findById(req.body.example_id, function (_err, example) {
        if (_err) {
            return res.status(500).json({
                "success": false,
                "msg": "Server error, terjadi masalah saat manampilkan data example !",
                "error": _err
            })
            
        }

        if (!example) {
            return res.status(400).json({
                "success": false,
                "msg": "Data dengan id '" + req.body.example_id + "' tidak ditemukan !"
            })
        }else{
            let body = req.body
            example.example  = body.example 
            

            example.save(function (_err) {
                ExampleModel.findById(req.example_id,function (_err, example){
                    if (_err) {
                        return res.status(400).json({
                            "success": false,
                            "msg": "Gagal menambahkan data !",
                            "error": _err
                        })
                    }

                    res.json({
                        "success": true,
                        "msg": "Data dengan id '" + req.body.example_id +"' berhasil diubah.",
                        "data": {
                            "example": {
                                "id": example._id,
                                'createdAt': example.createdAt,
                                'updatedAt': example.updatedAt
                            }
                        }
                    })
                })
            })
        }
    })
}

${params}Controller.deleteAudit = (req, res) => {
    if(!req.body.example_id){
        return res.status(400).json({
            "success": "false",
            "msg": "example_id tidak boleh kosong !",
        })
    }
    
    ExampleModel.findByIdAndRemove(req.body.example_id, function (_err, example) {
        if (_err) {
        
            return res.status(500).json({
                "success": false,
                "msg": "Server error, terjadi masalah saat manampilkan data example !",
                "error": _err
            })
            
        }

        if (!example) {
            return res.status(400).json({
                "success": false,
                "msg": "Data dengan id '" + req.body.example_id + "' tidak ditemukan !"
            })
        }

        res.staus(200).json({
            "success": true,
            "msg": "Data dengan id '" + req.body.example_id +"' berhasil dihapus !"
        })

    })
}

export default ${params}Controller;
            `
        }else if (args === 'models') {
            text= `
import Mongoose, { SchemaTypes } from 'mongoose';

const ${params}Schema = Mongoose.Schema({
    
}, {
    timestamps: true
});

const ${params} = Mongoose.model(${params}, ${params}Schema);
export default ${params};
            `
        }else if (args === 'routes') {
            text= `
import ExampleController from './Example'; // direct to your controller directory
import Config from '../config/Passport';
import Passport from 'passport';
import express from 'express';

Config.passportMiddleware(Passport)

const middleware  = Config.passportProtect()

const router = express.Router()
    .post('/user/create', middleware, ExampleController.creatExample)
    .post('/user/all', middleware, ExampleController.findExamples)
    .post('/user/one', middleware, ExampleController.finExample)
    .put('/user/update', middleware, ExampleController.updatExample)
    .delete('/user/delete', middleware, ExampleController.deletExample)

export default router
            `
        }else{
            return console.log("Sorry, wrong argument '"+args+"'!\nPlease check user guide or try 'node main.js cloud:help'");
        }

        return text
    },

    route_index: function(){
        return text = `
import express from 'express';

const router = express.Router()

export default router;
        `;
    }
}