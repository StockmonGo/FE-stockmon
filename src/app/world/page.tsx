"use client";
import BottomNavBar from "@/components/ui/world/BottomNavBar";
import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function World() {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JS_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude; // 위도
            const lon = position.coords.longitude; // 경도
            const myLocation = new window.kakao.maps.LatLng(lat, lon);

            const container = document.getElementById("map");
            const options = {
              center: myLocation,
              level: 3,
              draggable: false,
            };

            const map = new window.kakao.maps.Map(container, options);

            const imageSrc = "images/tempPerson.svg";
            const imageSize = new window.kakao.maps.Size(100, 100);
            const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

            const marker = new window.kakao.maps.Marker({
              position: myLocation,
              image: markerImage,
            });

            marker.setMap(map);
          });
        } else {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
            draggable: false,
          };

          const map = new window.kakao.maps.Map(container, options);
        }
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
      document.head.removeChild(kakaoMapScript);
    };
  }, []);

  return (
    <div>
      <div id="map" className="w-screen h-screen max-w-xl"></div>
      <BottomNavBar />
    </div>
  );
}
