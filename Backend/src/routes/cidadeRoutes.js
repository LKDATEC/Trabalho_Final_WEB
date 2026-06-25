const router=require('express').Router();

const c=require('../controllers/cidadeController');


router.get('/',c.listar);
router.post('/',c.criar);
router.put('/:id',c.atualizar);
router.delete('/:id',c.remover);


module.exports=router;