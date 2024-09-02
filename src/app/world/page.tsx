"use client";
import BottomNavBar from "@/components/ui/world/BottomNavBar";
import StockTowerModal from "@/components/ui/world/StockTowerModal";
import TopNavBar from "@/components/ui/world/TopNavBar";
import React, { useEffect, useState } from "react";
import mapAPI from "@/apis/mapAPI";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function World() {
  const [towerModalSee, setTowerModalSee] = useState(false);
  const service = new mapAPI();
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JS_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          // navigator.geolocation.watchPosition(function (position) {
          navigator.geolocation.getCurrentPosition(async function (position) {
            const latitude = position.coords.latitude; // 위도
            const longitude = position.coords.longitude; // 경도
            const myLocation = new window.kakao.maps.LatLng(latitude, longitude);
            // 성수로 일단 고정
            // const myLocation = new window.kakao.maps.LatLng(37.5451626, 127.0568792);
            console.log(myLocation);

            const container = document.getElementById("map");
            const options = {
              center: myLocation,
              level: 2,
              draggable: false,
            };
            console.log(myLocation);

            const map = new window.kakao.maps.Map(container, options);
            const mapInfo = await service.getMapInfo({ latitude, longitude });

            const imageSrc = "images/tempPerson.svg";
            const imageSize = new window.kakao.maps.Size(100, 100);
            const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

            const marker = new window.kakao.maps.Marker({
              position: myLocation,
              image: markerImage,
            });

            // 임시 스톡타워
            const imageSrc2 = "images/peachTower.svg";
            const imageSize2 = new window.kakao.maps.Size(80, 80);
            const markerImage2 = new window.kakao.maps.MarkerImage(imageSrc2, imageSize2, imageOption);
            var markerPosition = new window.kakao.maps.LatLng(37.5461626, 127.0568792);
            var stockTower = new window.kakao.maps.Marker({
              position: markerPosition,
              image: markerImage2,
            });
            stockTower.setMap(map);
            window.kakao.maps.event.addListener(stockTower, "click", () => {
              setTowerModalSee(true);
            });

            marker.setMap(map);
          });
        } else {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 2,
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
    <div className="static grid justify-items-center">
      <div id="map" className="w-screen h-screen max-w-xl opacity-85"></div>
      {towerModalSee ? (
        <>
          <StockTowerModal />
          <div
            className="w-10 h-10 bg-[url('/icons/CloseButton.svg')] fixed bottom-5 z-20"
            onClick={() => setTowerModalSee(false)}
          ></div>
        </>
      ) : (
        <>
          <TopNavBar />
          <BottomNavBar />
        </>
      )}
    </div>
  );
}
