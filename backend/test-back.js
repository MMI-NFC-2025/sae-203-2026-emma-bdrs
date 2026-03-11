import {
	getArtistById,
	getArtistsBySceneIdSortedByDate,
	getArtistsBySceneNameSortedByDate,
	getArtistsSortedByName,
	getArtistsSortedByRepresentationDate,
	getSceneById,
	getScenesSortedByName,
	saveArtistOrScene,
} from "./backend.mjs";

try {
	const res = await getArtistsSortedByRepresentationDate();
	console.log("OK - getArtistsSortedByRepresentationDate", res.length);
} catch (e) {
	console.error("KO - getArtistsSortedByRepresentationDate", e.message);
}

try {
	const res = await getScenesSortedByName();
	console.log("OK - getScenesSortedByName", res.length);
} catch (e) {
	console.error("KO - getScenesSortedByName", e.message);
}

try {
	const res = await getArtistsSortedByName();
	console.log("OK - getArtistsSortedByName", res.length);
} catch (e) {
	console.error("KO - getArtistsSortedByName", e.message);
}

try {
	const artists = await getArtistsSortedByRepresentationDate();
	if (artists.length > 0) {
		const res = await getArtistById(artists[0].id);
		console.log("OK - getArtistById", res.id);
	}
} catch (e) {
	console.error("KO - getArtistById", e.message);
}

try {
	const scenes = await getScenesSortedByName();
	if (scenes.length > 0) {
		const res = await getSceneById(scenes[0].id);
		console.log("OK - getSceneById", res.id);
	}
} catch (e) {
	console.error("KO - getSceneById", e.message);
}

try {
	const scenes = await getScenesSortedByName();
	if (scenes.length > 0) {
		const res = await getArtistsBySceneIdSortedByDate(scenes[0].id);
		console.log("OK - getArtistsBySceneIdSortedByDate", res.length);
	}
} catch (e) {
	console.error("KO - getArtistsBySceneIdSortedByDate", e.message);
}

try {
	const scenes = await getScenesSortedByName();
	if (scenes.length > 0) {
		const name = scenes[0].nom_scene ?? scenes[0].nom ?? "";
		const res = await getArtistsBySceneNameSortedByDate(name);
		console.log("OK - getArtistsBySceneNameSortedByDate", res.length);
	}
} catch (e) {
	console.error("KO - getArtistsBySceneNameSortedByDate", e.message);
}
