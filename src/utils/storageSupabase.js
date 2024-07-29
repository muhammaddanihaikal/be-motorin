import { supabase } from "../config/supabaseConfig.js";

export const uploadFile = async (
  bucket,
  folder,
  fileBuffer,
  originalFileName
) => {
  try {
    // set waktu ke jakarta indonesia
    const waktuWIB = new Date();
    waktuWIB.setHours(waktuWIB.getHours() + 7);
    const timestamp = waktuWIB.getTime();
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;

    // buat path
    const path = `/${folder}/${timestamp}${randomNumber}-${originalFileName}`;

    // proses upload
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, fileBuffer);

    if (error) {
      throw new Error(error.message);
    }

    // ambil url file yang baru diupload
    const fileUrl = supabase.storage.from(bucket).getPublicUrl(data.path)
      .data.publicUrl;

    // mengembalikan url file
    return fileUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteFile = async (path) => {
  try {
    // Mengurai path untuk mendapatkan bucket, folder, dan nama file
    const url = new URL(path);
    const parts = url.pathname.split("/");
    const bucket = parts[5]; // ambil bucket
    const folder = parts[6]; // ambil folder
    const fileName = parts[parts.length - 1]; // ambil file name

    // hapus file dari supabase storage
    const { error } = await supabase.storage
      .from(bucket)
      .remove([folder + "/" + fileName]);

    // validasi: jika terjadi error saat menghapus file
    if (error) {
      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
};
