"use client";
import allianceAPI from "@/apis/allianceAPI";
import React, { useCallback, useMemo } from "react";

export default function useAlliance() {
  const service = useMemo(() => new allianceAPI(), []);

  const getAlliances = useCallback(async () => {
    const res = await service.getAlliances();
    return res;
  }, [service]);

  return { getAlliances };
}
