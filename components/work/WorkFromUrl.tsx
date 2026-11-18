"use client";

import { useSearchParams } from "next/navigation";
import { services, type Service } from "@/content/cases";
import { WorkView } from "./WorkView";

const ids = new Set<string>(services.map((s) => s.id));

/** Reads ?service= and ?view= (unknown values fall back to «All» / Grid). */
export function WorkFromUrl() {
  const params = useSearchParams();
  const raw = params.get("service");
  const service = raw && ids.has(raw) ? (raw as Service) : null;
  const view = params.get("view") === "list" ? "list" : "grid";
  return <WorkView service={service} view={view} />;
}
