import { MercadoPagoConfig, Payment } from 'mercadopago';

    const client = new MercadoPagoConfig({ accessToken: 'TEST-5856292931190045-120908-6bc7101d55b66dcb7e0f38cb882694e4-317680353' });
    
    const payment = new Payment(client);
    payment.create({ body: {
        transaction_amount: 100,
        description: '<DESCRIPTION>',
        payment_method_id: '<PAYMENT_METHOD_ID>',
        payer: {
        email: '<EMAIL>'
       },
       } }).then(console.log).catch(console.log);

