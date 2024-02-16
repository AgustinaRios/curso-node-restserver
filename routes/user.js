
const {Router} = require('express');
const {check} = require('express-validator'); 

const {usersGet,usersPost,usersPut,usersDelete, usersPatch} = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');
const {esRolValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');
const router = Router();

router.get('/',usersGet);

  router.put('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos 
  ],usersPut)

  router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener al menos 6 caracteres').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(), 
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
  ],usersPost)

  router.delete('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

  ],usersDelete)

  router.patch('/',usersPatch)

module.exports = router;