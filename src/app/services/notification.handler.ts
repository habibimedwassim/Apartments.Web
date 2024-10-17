// import * as signalR from "@microsoft/signalr";
// import { useNotificationStore } from "@/hooks/use-notifications";
// import { useEffect } from "react";

// export const useNotificationHandler = () => {
//   const addNotification = useNotificationStore(
//     (state) => state.setNotifications
//   );

//   useEffect(() => {
//     const connection = new signalR.HubConnectionBuilder()
//       .withUrl("https://your-api-url/notifications")
//       .withAutomaticReconnect()
//       .build();

//     connection.on("ReceiveNotification", (message) => {
//       addNotification([message]); // Adds notification in the store
//     });

//     connection
//       .start()
//       .catch((err) => console.error("SignalR Connection Error: ", err));

//     return () => {
//       connection.stop();
//     };
//   }, [addNotification]);
// };
