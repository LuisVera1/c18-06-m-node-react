const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
        "Las variables de entorno de Supabase no están configuradas correctamente."
    );
}

// Aquí puedes usar las variables supabaseUrl y supabaseServiceKey según sea necesario
