import {
  pb,
  getArtistById,
  getArtistsBySceneIdSortedByDate,
  getArtistsSortedByRepresentationDate,
  getSceneById,
  getScenesSortedByName,
} from "../../backend/backend.mjs";

function logPocketBaseError(scope: string, error: any) {
  const message = error?.message ?? "Unknown PocketBase error";
  console.warn(`[PocketBase:${scope}] ${message}`);
}

function isClientError(error: any, status: number) {
  return Number(error?.status) === status;
}

export async function fetchArtists() {
  try {
    return await getArtistsSortedByRepresentationDate();
  } catch (error) {
    logPocketBaseError("fetchArtists", error);
    return [];
  }
}

export async function fetchScenes() {
  try {
    return await getScenesSortedByName();
  } catch (error) {
    logPocketBaseError("fetchScenes", error);
    return [];
  }
}

export async function fetchArtistById(id: string) {
  try {
    return await getArtistById(id);
  } catch (error) {
    if (!isClientError(error, 404) && !isClientError(error, 403)) {
      logPocketBaseError("fetchArtistById", error);
    }
    return null;
  }
}

export async function fetchSceneById(id: string) {
  try {
    return await getSceneById(id);
  } catch (error) {
    if (!isClientError(error, 404) && !isClientError(error, 403)) {
      logPocketBaseError("fetchSceneById", error);
    }
    return null;
  }
}

export async function fetchArtistsBySceneId(sceneId: string) {
  try {
    return await getArtistsBySceneIdSortedByDate(sceneId);
  } catch (error) {
    logPocketBaseError("fetchArtistsBySceneId", error);
    return [];
  }
}

export function dateLabel(dateRaw?: string) {
  if (!dateRaw) return "Date inconnue";
  return new Date(dateRaw).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function dayKey(dateRaw?: string) {
  if (!dateRaw) return "";
  return String(dateRaw).slice(0, 10);
}

export function concertLabel(dateRaw?: string) {
  if (!dateRaw) return "Date inconnue";
  const date = new Date(dateRaw);
  if (Number.isNaN(date.getTime())) return "Date inconnue";

  const day = date.toLocaleDateString("fr-FR", { day: "numeric" });
  const month = date.toLocaleDateString("fr-FR", { month: "long" });
  const time = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h");
  return `${day} ${month} - ${time}`;
}

export function fileUrl(record: any, fieldName: string, thumb?: string) {
  const value = record?.[fieldName];
  const fileName = Array.isArray(value) ? value[0] : value;
  if (!fileName) return "";
  return thumb ? pb.files.getURL(record, fileName, { thumb }) : pb.files.getURL(record, fileName);
}

export function galleryUrls(record: any, fieldName: string, thumb?: string) {
  const value = record?.[fieldName];
  if (!Array.isArray(value) || value.length === 0) return [];
  return value.map((fileName: string) =>
    thumb ? pb.files.getURL(record, fileName, { thumb }) : pb.files.getURL(record, fileName)
  );
}
