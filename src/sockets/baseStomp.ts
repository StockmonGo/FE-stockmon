import * as StompJs from "@stomp/stompjs";

const getAccessToken = () => {
  const accessToken: string | null = localStorage.getItem("accessToken");
  return accessToken ? `Bearer ${JSON.parse(accessToken)}` : "";
};

export const client = new StompJs.Client({
  brokerURL: "wss://api.stockmon.world/api/stock/gs-guide-websocket",
  debug: function (str) {
    console.log(str);
  },
  connectHeaders: {
    // Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    Authorization: getAccessToken(),
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

client.onStompError = function (frame) {
  console.log("Broker reported error: " + frame.headers["message"]);
  console.log("Additional details: " + frame.body);
};

// client.activate();
