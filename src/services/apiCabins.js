import { supabase } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from("cabins")
        .select("*")
        // .order("name", { ascending: true });

        if (error) {
            console.error(error);
            throw new Error("Cabins not found");
        }
        return data
}

export async function deleteCabins(id) {
    const {data, error } = await supabase
        .from("cabins")
        .delete()
        .eq("id", id);
    if (error) {
        console.error(error);
        throw new Error("Cabins not found");
    }
    return data
}

export async function createCabin(newCabin) {
    const {data, error } = await supabase
        .from("cabins")
        .insert(newCabin);
    if (error) {
        console.error(error);
        throw new Error("Cabins not found");
    }
    return data
}