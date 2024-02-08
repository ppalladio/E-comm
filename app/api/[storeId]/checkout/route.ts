import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } },
) {
    const { productIds } = await req.json();
    console.log(productIds);
    if (!productIds || productIds.length === 0) {
        return new NextResponse('Product Ids are required', { status: 400 });
    }

    const products = await prismadb.product.findMany({
        where: {
            id: { in: productIds },
        },
    });
    console.log(products);

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((el) => {
        line_items.push({
            quantity: 1,
            price_data: {
                currency: 'EUR',
                product_data: { name: el.name },
                unit_amount: el.price.toNumber() * 100,
            },
        });
    });

    const order = await prismadb.order.create({
        data: {
            storeId: params.storeId,
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: { connect: { id: productId } },
                })),
            },
        },
    });
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${process.env.FRONT_END_STORE_URL}/cart?success=1`,
        cancel_url: `${process.env.FRONT_END_STORE_URL}/cart?canceled=1`,
        metadata: { orderId: order.id },
    });
    console.log(order, session);

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
