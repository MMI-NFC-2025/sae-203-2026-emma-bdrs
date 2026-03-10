import PocketBase from "pocketbase";

export const pb = new PocketBase("https://festival.badarous.fr");

export async function getArtistsSortedByRepresentationDate(collection = "artiste") {
	const artists = await pb.collection(collection).getFullList();
	return artists.sort(
		(a, b) => new Date(a.date_representation) - new Date(b.date_representation)
	);
}

export async function getScenesSortedByName(collection = "scene") {
	const scenes = await pb.collection(collection).getFullList();
	return scenes.sort((a, b) => (a.nom_scene ?? "").localeCompare(b.nom_scene ?? "", "fr"));
}

export async function getArtistsSortedByName(collection = "artiste") {
	const artists = await pb.collection(collection).getFullList();
	return artists.sort((a, b) => (a.nom_artiste ?? "").localeCompare(b.nom_artiste ?? "", "fr"));
}

export async function getArtistById(artistId, collection = "artiste") {
	return pb.collection(collection).getOne(artistId);
}

export async function getSceneById(sceneId, collection = "scene") {
	return pb.collection(collection).getOne(sceneId);
}

export async function getArtistsBySceneIdSortedByDate(sceneId, collection = "artiste") {
	const artists = await pb.collection(collection).getFullList({
		filter: `scene = "${sceneId}"`,
	});

	return artists.sort(
		(a, b) => new Date(a.date_representation) - new Date(b.date_representation)
	);
}

export async function getArtistsBySceneNameSortedByDate(sceneName, sceneCollection = "scene", artistCollection = "artiste") {
	const scenes = await pb.collection(sceneCollection).getFullList();
	const targetScene = scenes.find(
		(scene) => (scene.nom_scene ?? scene.nom ?? "").toLowerCase() === sceneName.toLowerCase()
	);

	if (!targetScene) {
		return [];
	}

	return getArtistsBySceneIdSortedByDate(targetScene.id, artistCollection);
}

export async function saveArtistOrScene(entityType, data, id = null) {
	const collection =
		entityType === "artiste" || entityType === "artist"
			? "artiste"
			: entityType === "scene"
				? "scene"
				: null;

	if (!collection) {
		throw new Error('entityType must be "artiste" or "scene"');
	}

	const { id: dataId, ...payload } = data;
	const recordId = id ?? dataId;

	if (recordId) {
		return pb.collection(collection).update(recordId, payload);
	}

	return pb.collection(collection).create(payload);
}
