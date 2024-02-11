import { supabase } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from("cabins")
        .select("*")
        .order("name", { ascending: true });

        if (error) {
            console.error(error);
            throw new Error("Cabins not found");
        }
        return data
}