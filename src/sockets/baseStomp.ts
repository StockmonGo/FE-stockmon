import { Client } from "@stomp/stompjs";

export const client = new Client({
  brokerURL: "wss://api.stockmon.world/api/stock/gs-guide-websocket",
  // debug: function (str) {
  //   console.log(str);
  // },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

client.onStompError = function (frame) {
  console.log("Broker reported error: " + frame.headers["message"]);
  console.log("Additional details: " + frame.body);
};
