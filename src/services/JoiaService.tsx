import axios from "axios";
import type { Joia } from "../Types/Joia"

export const getJoias = async (): Promise<Joia[]> => {
    try {
        const resposta = await axios.get("http://localhost:3000/produtos");
        return resposta.data
    } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
        throw error;
    }
}

export const deleteJoia = async (idJoia: string): Promise<void> => {
    try {
        await axios.delete(` http://localhost:3000/produtos/${idJoia}`)
    } catch (error) {
        console.error("Erro ao deletar a joia: ", error);
        throw error;
    }
}

export const enviarFotoParaApi = async (file: File): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await axios.post("http://localhost:3000/upload", formData, {
            headers: { "Content-type": "multipart/form-data" }
        });
        return res.data.filename;
    } catch (error) {
        console.error("Erro no uploade da imagem", error);
        return undefined;
    }
};

export const postJoia = async (joia: Joia): Promise<void> => {
    try {
        await axios.post("http://localhost:3000/produtos", joia);
    } catch (error) {
          console.error("Erro ao cadastar a joia:" , error);
          throw error;
    }

}

export const putJoia = async (joia: Joia): Promise<void> => {
  try {
    if (!joia.id) {
      throw new Error("ID da joia não informado");
    }
    await axios.put(`http://localhost:3000/produtos/${joia.id}`, joia);
  } catch (error) {
    console.error("Erro ao atualizar a joia", error);
    throw error;
  }
}
