const supabase = require('../config/supabaseClient');


exports.listar = async(req,res)=>{

const {data,error}=await supabase
.from('cidades')
.select('*');


if(error)
return res.status(400).json(error);


res.json(data);

};



exports.criar = async(req,res)=>{


const {data,error}=await supabase
.from('cidades')
.insert([req.body])
.select();



if(error)
return res.status(400).json(error);


res.status(201).json(data);

};



exports.atualizar = async(req,res)=>{


const {id}=req.params;


const {data,error}=await supabase
.from('cidades')
.update(req.body)
.eq('id',id)
.select();



if(error)
return res.status(400).json(error);


res.json(data);

};



exports.remover = async(req,res)=>{


await supabase
.from('cidades')
.delete()
.eq('id',req.params.id);



res.json({
mensagem:"Cidade removida"
});


};