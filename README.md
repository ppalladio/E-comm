## For Stripe testing:

### Set up
[doc](https://stripe.com/docs/stripe-cli)

```bash
stripe login
```

get the token, add to .env => STRIPE_WEBHOOK_SECRET

```bash
stripe listen --forward-to localhost:4242/webhook # standard step up
stripe listen --forward-to localhost:4242/api/webhook #in this project
```

Trigger a success payment event

```bash
stripe trigger payment_intent.succeeded
```

### Card

Visa 4242424242424242 Any 3 digits Any future date
