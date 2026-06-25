const supabase = require('../config/supabaseClient');



exports.listar = async(req,res)=>{


const {data,error}=await supabase
.from('equipamentos')
.select('*');


if(error)
return res.status(400).json(error);


res.json(data);

};




exports.criar = async(req,res)=>{


const {data,error}=await supabase
.from('equipamentos')
.insert([req.body])
.select();


if(error)
return res.status(400).json(error);


res.status(201).json(data);

};




exports.atualizar = async(req,res)=>{


const {data,error}=await supabase
.from('equipamentos')
.update(req.body)
.eq('id',req.params.id)
.select();



res.json(data);

};




exports.remover = async(req,res)=>{


await supabase
.from('equipamentos')
.delete()
.eq('id',req.params.id);


res.json({
mensagem:"Equipamento removido"
});


};