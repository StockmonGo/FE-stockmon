"use client";
import BottomNavBar from "@/components/ui/world/BottomNavBar";
import StockTowerModal from "@/components/ui/world/StockTowerModal";
import TopNavBar from "@/components/ui/world/TopNavBar";
import React, { useEffect, useRef, useState } from "react";
import mapAPI from "@/apis/mapAPI";
import { useAtom } from "jotai";
import { accessTokenAtom, stockmonGameAtom } from "@/store/store";
import { useRouter } from "next/navigation";
import BeforeInstallPrompt from "@/components/BeforeInstallPrompt";
import Modal from "@/components/ui/Modal";
import LoadingMap from "@/components/ui/world/LoadingMap";
import { useCookies } from "next-client-cookies";
import Loading from "@/components/ui/Loading";

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
  const [worldId, setWorldId] = useState(0);
  const [towerActive, setTowerActive] = useState(false);
  const [stockballs, setStockballs] = useState(0);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);
  const cookies = useCookies();

  const checkStockTower = (towerId: number) => {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }
    service.getStockTowerInfo(towerId).then((res) => {
      console.log(res);
      setTowerId(towerId);
      if (res?.spinnedAt === null) {
        setTowerActive(true);
      }
      if (res) {
        const spinnedAtDate = new Date(res.spinnedAt);
        const currentTimeDate = new Date(res.currentTime);
        const timeDifference =
          currentTimeDate.getTime() - spinnedAtDate.getTime();

        // 3분 넘었으면 돌릴 수 있음
        if (timeDifference > 3 * 60 * 1000) {
          setTowerActive(true);
        } else {
          setTowerActive(false);
        }
      }
      setTowerModalSee(true);
    });
  };
  const [stockmonGame, setStockmonGame] = useAtom(stockmonGameAtom);
  const service = new mapAPI();
  const bufferRef = useRef<{
    maxLat: number;
    minLat: number;
    maxLon: number;
    minLon: number;
  } | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const clickTower = (stockBall: number) => {
    setStockballs((prev) => prev + stockBall);
  };

  const startGame = (
    id: number,
    stockmonId: number,
    lat: number,
    lon: number
  ) => {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }
    setStockmonGame({ id, stockmonId });
    router.push(`/game?lat=${lat}&lon=${lon}`);
  };
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

        // 지도 초기화
        const initializeMap = (latitude: number, longitude: number) => {
          const myLocation = new window.kakao.maps.LatLng(latitude, longitude);
          const options = {
            center: myLocation,
            level: 2,
            draggable: false,
          };

          map = new window.kakao.maps.Map(container, options);

          const userImageSrc = "images/tempPerson.svg";
          const userImageSize = new window.kakao.maps.Size(100, 100);
          const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
          const markerImage = new window.kakao.maps.MarkerImage(
            userImageSrc,
            userImageSize,
            imageOption
          );

          userMarker = new window.kakao.maps.Marker({
            position: myLocation,
            image: markerImage,
            map: map,
            zIndex: 10,
          });
        };

        // 사용자 위치 추적 및 지도 업데이트
        const updateUserLocation = (latitude: number, longitude: number) => {
          const myLocation = new window.kakao.maps.LatLng(latitude, longitude);
          // console.log(myLocation);
          map.setCenter(myLocation);
          if (userMarker) {
            userMarker.setPosition(myLocation);
          }
        };

        // 주변 정보 얻어오기
        const getMapInfo = (latitude: number, longitude: number) =>
          service.getMapInfo({ latitude, longitude }).then((res) => {
            console.log(res);
            // 스톡타워 마커
            const stockTowerPositions = res?.stockTowers.map((tower) => ({
              id: tower.id,
              title: tower.name,
              latlng: new window.kakao.maps.LatLng(
                tower.latitude,
                tower.longitude
              ),
            }));
            const towerImageSrc = "images/peachTower.svg";

            if (stockTowerPositions) {
              for (let i = 0; i < stockTowerPositions.length; i++) {
                const towerImageSize = new window.kakao.maps.Size(80, 80);
                const towerImage = new window.kakao.maps.MarkerImage(
                  towerImageSrc,
                  towerImageSize
                );
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
              worldId: stockmon.id,
              stockmonId: stockmon.stockmonId,
              latlng: new window.kakao.maps.LatLng(
                stockmon.latitude,
                stockmon.longitude
              ),
            }));

            if (stockmonPositions) {
              for (let i = 0; i < stockmonPositions.length; i++) {
                const stockmonImaegSize = new window.kakao.maps.Size(100, 100);
                const stockmonImgSrc = `${process.env.NEXT_PUBLIC_S3_URL}/${stockmonPositions[i].stockmonId}.png`;
                const stockmonImage = new window.kakao.maps.MarkerImage(
                  stockmonImgSrc,
                  stockmonImaegSize
                );
                const stockmon = new window.kakao.maps.Marker({
                  map: map,
                  position: stockmonPositions[i].latlng,
                  worldId: stockmonPositions[i].worldId,
                  stockmonId: stockmonPositions[i].stockmonId,
                  image: stockmonImage,
                });

                window.kakao.maps.event.addListener(stockmon, "click", () => {
                  //TODO: 게임이동
                  startGame(
                    stockmonPositions[i].worldId,
                    stockmonPositions[i].stockmonId,
                    latitude,
                    longitude
                  );
                  console.log(
                    "click stockmon",
                    stockmonPositions[i].stockmonId,
                    stockmonPositions[i].worldId
                  );
                  setStockmonId(stockmonPositions[i].stockmonId);
                  setWorldId(stockmonPositions[i].worldId);
                });

                stockmon.setMap(map);
              }
            }
          });

        // 버퍼 계산
        const calcBuffer = (latitude: number, longitude: number) => {
          const maxLat = latitude + 0.0048;
          const minLat = latitude - 0.0048;
          const maxLon = longitude + 0.003;
          const minLon = longitude - 0.003;
          // buffer = { maxLat, minLat, maxLon, minLon };
          bufferRef.current = { maxLat, minLat, maxLon, minLon };
        };

        // 처음엔 getCurrentPosition
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            initializeMap(latitude, longitude);
            calcBuffer(latitude, longitude);
            getMapInfo(latitude, longitude);
            setMapLoading(false);

            // 그 후 watchPosition
            watchIdRef.current = navigator.geolocation.watchPosition(
              (position) => {
                const newLatitude = position.coords.latitude;
                const newLongitude = position.coords.longitude;
                // 지도와 마커 업데이트
                updateUserLocation(newLatitude, newLongitude);

                if (bufferRef.current) {
                  const { minLat, maxLat, minLon, maxLon } = bufferRef.current;

                  if (
                    newLatitude <= minLat ||
                    newLatitude >= maxLat ||
                    newLongitude <= minLon ||
                    newLongitude >= maxLon
                  ) {
                    getMapInfo(newLatitude, newLongitude);
                    calcBuffer(newLatitude, newLongitude);
                  }
                }
              }
            );
          });
        } else {
          console.log("Geolocation API를 지원하지 않습니다.");
        }
      });
    };
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
      document.head.removeChild(kakaoMapScript);
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    reload();
    const accessToken = cookies.get("accessToken");
    setIsClient(true);
    if (accessToken) {
      setIsLogin(true);
      service.getStockBallNum().then((res) => {
        if (res) {
          setStockballs(res.stockballs);
        }
      });
    } else {
      setIsLogin(false);
    }
  }, []);
  const reload = () => {
    setTimeout(() => {
      const mapElement = document.getElementById("map");

      // mapElement가 존재하고 자식 요소가 없는 경우
      if (mapElement && mapElement.children.length === 0) {
        console.log("No children in #map, reloading page...");
        window.location.reload();
      } else {
        console.log(
          "Children exist in #map or element does not exist, no reload.",
          mapElement
        );
      }
    }, 5000);
  };
  return (
    <div className="static flex flex-col items-center justify-items-center h-full">
      <div id="map" className="w-screen h-full max-w-xl opacity-85"></div>
      {mapLoading && <Loading />}
      {!mapLoading &&
        (towerModalSee ? (
          <>
            <StockTowerModal
              name={towerName}
              towerId={towerId}
              towerActive={towerActive}
              service={service}
              clickTower={clickTower}
            />
            <div
              className="w-10 h-10 bg-[url('/icons/CloseButton.svg')] fixed bottom-5 z-20 cursor-pointer"
              onClick={() => setTowerModalSee(false)}
            ></div>
          </>
        ) : (
          <>
            <TopNavBar stockballs={stockballs} />
            <BottomNavBar />
          </>
        ))}
      {isClient && <BeforeInstallPrompt />}
      <Modal
        open={!isLogin && showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
        }}
        onConfirm={() => router.push("/users/login")}
        hasClose={true}
        title="로그인 후 이용가능합니다"
        describe="로그인 페이지로 이동하시겠습니까?"
      />
    </div>
  );
}
