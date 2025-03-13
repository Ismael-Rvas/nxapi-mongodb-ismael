import { connectToDatabase } from "@/lib/mongodb";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: corsHeaders });
}


export async function GET(request) {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const results = await collection.find({}).toArray();

    return Response.json(results,{headers: corsHeaders});
}

export async function POST(request) {
    const content = request.headers.get('content-type')

    if (content != 'application/json')
        return Response.json({ message: 'Debes proporcionar datos JSON' },
    { headers: corsHeaders });

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION)

    const { name, price, img, inventoryDate } = await request.json() // Read body request
    const results = await collection.insertOne({ name, price, img, inventoryDate });

    return Response.json(results, { headers: corsHeaders });
}

