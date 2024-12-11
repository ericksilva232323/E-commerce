
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'TEST-5856292931190045-120908-6bc7101d55b66dcb7e0f38cb882694e4-317680353' });

const payment = new Payment(client);
payment.create({ body: req.body })
.then(console.log)
.catch(console.log);
