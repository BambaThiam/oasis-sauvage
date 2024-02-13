import { supabase, supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  // .order("name", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Cabins not found");
  }
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins not found");
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https://rasikrbwvuzserwmapxw.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //1. Create cabin
  const { data, error } = await supabase.from("cabins").insert({...newCabin, image:imagePath});
  if (error) {
    console.error(error);
    throw new Error("Cabins not found");
  }
    //2. Upload image
    const { error:StorageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image);

  //3. Delete the cabin IF there was an error uploading image

  if(StorageError){
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabins image could not be uploaded and the cabin was not created");
  }
  return data;
}
