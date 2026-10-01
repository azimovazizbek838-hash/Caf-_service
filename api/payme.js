const crypto = require('crypto');

// Данные мерчанта из кабинета Payme
const PAYME_MERCHANT_ID = process.env.PAYME_MERCHANT_ID;
const PAYME_SECRET_KEY = process.env.PAYME_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Проверка Basic Auth от Payme
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Basic ', '');
  const credentials = Buffer.from(token, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  if (password !== PAYME_SECRET_KEY) {
    return res.json({
      error: {
        code: -32504,
        message: { ru: 'Неверный пароль', uz: 'Parol noto‘gri' }
      },
      id: req.body.id
    });
  }

  const { method, params, id } = req.body;

  // Обработка RPC-методов Payme
  switch (method) {
    case 'CheckPerformTransaction':
      // Проверка возможности оплаты (сумма 450 000 сум = 45000000 тийинов)
      if (params.amount !== 45000000) {
        return res.json({
          error: {
            code: -31001,
            message: { ru: 'Неверная сумма', uz: 'Summa noto‘gri' }
          },
          id
        });
      }
      return res.json({ result: { allow: true }, id });

    case 'CreateTransaction':
      return res.json({
        result: {
          create_time: Date.now(),
          transaction: params.id,
          state: 1
        },
        id
      });

    case 'PerformTransaction':
      // Здесь при успехе активируем подписку на 30 дней
      return res.json({
        result: {
          transaction: params.id,
          perform_time: Date.now(),
          state: 2
        },
        id
      });

    case 'CancelTransaction':
      return res.json({
        result: {
          transaction: params.id,
          cancel_time: Date.now(),
          state: -1
        },
        id
      });

    case 'CheckTransaction':
      return res.json({
        result: {
          create_time: Date.now(),
          perform_time: Date.now(),
          cancel_time: 0,
          transaction: params.id,
          state: 2,
          reason: null
        },
        id
      });

    default:
      return res.json({
        error: {
          code: -32601,
          message: { ru: 'Запрашиваемый метод не найден', uz: 'Metod topilmadi' }
        },
        id
      });
  }
}
