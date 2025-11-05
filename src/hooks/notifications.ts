import * as signalR from "@microsoft/signalr";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) ?? '';
let connection: signalR.HubConnection | null = null;

export const getSignalRConnection = (token: string) => {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/notifications`, {
        accessTokenFactory: () => token,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("SignalR Connection Established"))
      .catch((err) => console.error("SignalR Connection Error:", err));
  }

  return connection;
};
