import axios from "axios";
import type { Joia } from "../Types/Joia"

const API_BASE = "http://localhost:5103/api";

export const getJoias = async (): Promise<Joia[]> => {
    try {
          const resposta = await axios.get(`${API_BASE}/Produto`);
        return resposta.data
    } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
        throw error;
    }
}

export const deleteJoia = async (idJoia: string): Promise<void> => {
    try {
        await axios.delete(` ${API_BASE}/Produto/${idJoia}`)
    } catch (error) {
        console.error("Erro ao deletar a joia: ", error);
        throw error;
    }
}

export const enviarFotoParaApi = async (file: File): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await axios.post(`${API_BASE}/upload`, formData, {
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
        await axios.post(`${API_BASE}/Produto`, joia);
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
    await axios.put(`${API_BASE}/Produto/${joia.id}`, joia);
  } catch (error) {
    console.error("Erro ao atualizar a joia", error);
    throw error;
  }
}
