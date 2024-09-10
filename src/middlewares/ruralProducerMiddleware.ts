import { body } from 'express-validator';

export function ruralProducerMiddleware(){
  return [
    body('cpf_cpnj')
      .isLength({ min: 11 })
      .withMessage('CPF/CNPJ must be at least 11 chars long')
      .isLength({ max: 14 })
      .withMessage('CPF/CNPJ must be less than 14 chars long')
      .exists()
      .withMessage('CPF/CNPJ is required')
      .trim()
      .escape(),
    body('producerName').matches('([a-zA-Z_\s]+)').withMessage('Invalid producer name').exists().withMessage('Producer name is required'),
    body('farmName').matches('([a-zA-Z_\s]+)').withMessage('Invalid farm name').exists().withMessage('Farm name is required'),
    body('city').matches('([a-zA-Z_\s]+)').withMessage('Invalid city').exists().withMessage('City is required'),
    body('state').matches('([a-zA-Z_\s]+)').withMessage('Invalid state').exists().withMessage('State is required'),
    body('totalArea').isNumeric().withMessage('Invalid total area.').exists().withMessage('Total area is required'),
    body('arableArea').isNumeric().withMessage('Invalid arable area.').exists().withMessage('Arable area is required'),
    body('vegetableArea').isNumeric().withMessage('Invalid vegetable area.').exists().withMessage('Vegetable area is required'),
    body('plantedCrops').isArray().withMessage('Crop contain invalid value.'),//.isIn(['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar']).withMessage('Crop contain invalid value.'),
  ];
}