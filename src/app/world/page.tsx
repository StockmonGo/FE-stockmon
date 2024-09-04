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
  const [towerName, setTowerName] = useState("");
  const [towerId, setTowerId] = useState(0);
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
          // TODO 위치가 변경됐을 때 요청을 다시 보내는 부분
          navigator.geolocation.getCurrentPosition(function (position) {
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

            const userImageSrc = "images/tempPerson.svg";
            const userImageSize = new window.kakao.maps.Size(100, 100);
            const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
            const markerImage = new window.kakao.maps.MarkerImage(userImageSrc, userImageSize, imageOption);

            const userMarker = new window.kakao.maps.Marker({
              position: myLocation,
              image: markerImage,
            });

            service.getMapInfo({ latitude, longitude }).then((res) => {
              console.log(res);
              // 스톡타워 마커
              const stockTowerPositions = res?.stockTowers.map((tower) => ({
                id: tower.id,
                title: tower.name,
                latlng: new window.kakao.maps.LatLng(tower.latitude, tower.longitude),
              }));
              const towerImageSrc = "images/peachTower.svg";

              if (stockTowerPositions) {
                for (let i = 0; i < stockTowerPositions.length; i++) {
                  const towerImageSize = new window.kakao.maps.Size(80, 80);
                  const towerImage = new window.kakao.maps.MarkerImage(towerImageSrc, towerImageSize);
                  const stockTower = new window.kakao.maps.Marker({
                    map: map,
                    position: stockTowerPositions[i].latlng,
                    title: stockTowerPositions[i].title,
                    image: towerImage,
                  });

                  window.kakao.maps.event.addListener(stockTower, "click", () => {
                    setTowerModalSee(true);
                    setTowerName(stockTowerPositions[i].title);
                    setTowerId(stockTowerPositions[i].id);
                  });

                  stockTower.setMap(map);
                }
              }

              userMarker.setMap(map);
            });

            // TODO 스톡몬들 추가
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
          <StockTowerModal name={towerName} id={towerId} />
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
