"use client";
import BottomNavBar from "@/components/ui/world/BottomNavBar";
import StockTowerModal from "@/components/ui/world/StockTowerModal";
import TopNavBar from "@/components/ui/world/TopNavBar";
import React, { useEffect, useState } from "react";
import mapAPI from "@/apis/mapAPI";
import { useAtom } from "jotai";
import { buffetAtom } from "@/store/store";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function World() {
  const [towerModalSee, setTowerModalSee] = useState(false);
  const [towerName, setTowerName] = useState("");
  const [towerId, setTowerId] = useState(0);
  const [stockmonId, setStockmonId] = useState(0);
  const [towerActive, setTowerActive] = useState(false);
  const checkStockTower = (towerId: number) => {
    service.getStockTowerInfo(towerId).then((res) => {
      console.log(res);
      setTowerId(towerId);
      if (res?.spinnedAt === null) {
        setTowerActive(true);
      }
      if (res) {
        const spinnedAtDate = new Date(res.spinnedAt);
        const currentTimeDate = new Date(res.currentTime);
        const timeDifference = currentTimeDate.getTime() - spinnedAtDate.getTime();

        // 5분 넘었으면 돌릴 수 있음
        if (timeDifference > 5 * 60 * 1000) {
          setTowerActive(true);
        } else {
          setTowerActive(false);
        }
      }
      setTowerModalSee(true);
    });
  };
  const service = new mapAPI();

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JS_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        let map: any;
        let userMarker: any;

        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function (position) {
            // 사용자 위치
            const latitude = position.coords.latitude; // 위도
            const longitude = position.coords.longitude; // 경도
            const myLocation = new window.kakao.maps.LatLng(latitude, longitude);
            console.log("사용자 위치 ", myLocation);

            // 지도를 처음 한 번만 생성
            if (!map) {
              const options = {
                center: myLocation,
                level: 2,
                draggable: false,
              };
              map = new window.kakao.maps.Map(container, options);
            } else {
              map.setCenter(myLocation);
            }

            // 사용자 마커
            if (!userMarker) {
              const userImageSrc = "images/tempPerson.svg";
              const userImageSize = new window.kakao.maps.Size(100, 100);
              const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
              const markerImage = new window.kakao.maps.MarkerImage(userImageSrc, userImageSize, imageOption);

              userMarker = new window.kakao.maps.Marker({
                position: myLocation,
                image: markerImage,
                map: map,
              });
            } else {
              userMarker.setPosition(myLocation);
            }

            // 버퍼 없거나 버퍼를 벗어나면 버퍼 계산 후 주변 정보 불러오기
            if (
              buffer.maxLat == 0 ||
              latitude <= buffer.minLat ||
              latitude >= buffer.maxLat ||
              longitude <= buffer.minLon ||
              longitude >= buffer.maxLon
            ) {
              const maxLat = latitude + 0.0048;
              const minLat = latitude - 0.0048;
              const maxLon = longitude + 0.003;
              const minLon = longitude - 0.003;
              setBuffer({ maxLat, minLat, maxLon, minLon });
              console.log(buffer);
              // 주변 스톡타워, 스톡몬 정보
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
                      checkStockTower(stockTowerPositions[i].id);
                      setTowerName(stockTowerPositions[i].title);
                    });

                    stockTower.setMap(map);
                  }
                }

                // 스톡몬 마커
                const stockmonPositions = res?.stockmons.map((stockmon) => ({
                  id: stockmon.id,
                  latlng: new window.kakao.maps.LatLng(stockmon.latitude, stockmon.longitude),
                }));

                if (stockmonPositions) {
                  for (let i = 0; i < stockmonPositions.length; i++) {
                    const stockmonImaegSize = new window.kakao.maps.Size(100, 100);
                    const stockmonImgSrc = `${process.env.NEXT_PUBLIC_S3_URL}/${i}.png`;
                    const stockmonImage = new window.kakao.maps.MarkerImage(stockmonImgSrc, stockmonImaegSize);
                    const stockmon = new window.kakao.maps.Marker({
                      map: map,
                      position: stockmonPositions[i].latlng,
                      id: stockmonPositions[i].id,
                      image: stockmonImage,
                    });

                    window.kakao.maps.event.addListener(stockmon, "click", () => {
                      setStockmonId(stockmonPositions[i].id);
                    });

                    stockmon.setMap(map);
                  }
                }
              });
            }
          });
        } else {
          // Geolocation API 사용 불가 시 기본 위치 설정
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 2,
            draggable: false,
          };
          map = new window.kakao.maps.Map(container, options);
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
          <StockTowerModal name={towerName} towerId={towerId} towerActive={towerActive} service={service} />
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
