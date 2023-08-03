import axios from "axios";

export enum DeviceType {
  ios = "ios",
  android = "android",
  pc = "pc",
}

export type NewSession = {
  muid: string;
  dev_type: DeviceType;
  transferred: number;
  is_fraud: boolean;
};

export interface SessionData extends NewSession {
  _id: string;
}

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});
api.interceptors.response.use(
  ({ data }) => data,
  (error) => error?.message ?? error ?? "API Request Failed"
);

export const getSessions = (): Promise<SessionData[]> => api.get("/sessions");

export const getSession = (_id: SessionData["_id"]) =>
  api.get(`/sessions/${_id}`);

export const createSession = (newSession: NewSession) =>
  api.post("/session", newSession);

export const updateSession = (updateData: SessionData) =>
  api.patch(`/session/${updateData._id}`, updateData);

export const deleteSession = (_id: SessionData["_id"]) =>
  api.delete(`/session/${_id}`);
