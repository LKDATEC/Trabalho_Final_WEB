const supabase = require('../config/supabaseClient');



exports.listar = async(req,res)=>{


const {data,error}=await supabase
.from('servicos')
.select(`
*,
funcionarios(nome),
equipamentos(nome)
`);



if(error)
return res.status(400).json(error);



res.json(data);

};





exports.criar = async(req,res)=>{


const {data,error}=await supabase
.from('servicos')
.insert([req.body])
.select();



if(error)
return res.status(400).json(error);



res.status(201).json(data);

};





exports.atualizar = async(req,res)=>{


const {data}=await supabase
.from('servicos')
.update(req.body)
.eq('id',req.params.id)
.select();


res.json(data);

};




exports.remover = async(req,res)=>{


await supabase
.from('servicos')
.delete()
.eq('id',req.params.id);



res.json({
mensagem:"Serviço removido"
});


};