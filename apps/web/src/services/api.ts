import axios from "axios";
import type { Painting } from "@david/shared";

const api = axios.create({
	baseURL: "http://localhost:3001/api",
});

export const getPaintings = async (): Promise<Painting[]> => {
	const res = await api.get("/paintings");
	return res.data;
};

export const getPainting = async (id: string): Promise<Painting> => {
	const res = await api.get(`/paintings/${id}`);
	return res.data;
};

export const getGallery = async (id: number): Promise<Painting[]> => {
	const res = await api.get(`/galleries/${id}`);
	return res.data;
};
