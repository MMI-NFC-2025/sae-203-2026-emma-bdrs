import {
  pb,
  getArtistById,
  getArtistsBySceneIdSortedByDate,
  getArtistsSortedByRepresentationDate,
  getSceneById,
  getScenesSortedByName,
} from "../../backend/backend.mjs";

export async function fetchArtists() {
  return getArtistsSortedByRepresentationDate();
}

export async function fetchScenes() {
  return getScenesSortedByName();
}

export async function fetchArtistById(id: string) {
  return getArtistById(id);
}

export async function fetchSceneById(id: string) {
  return getSceneById(id);
}

export async function fetchArtistsBySceneId(sceneId: string) {
  return getArtistsBySceneIdSortedByDate(sceneId);
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
