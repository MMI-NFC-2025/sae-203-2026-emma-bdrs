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

const runWrite = process.argv.includes("--write");

const hasFields = (obj, fields) => fields.every((f) => Object.prototype.hasOwnProperty.call(obj, f));
const sortedByDate = (rows) => rows.every((r, i) => i === 0 || new Date(rows[i - 1].date_representation) <= new Date(r.date_representation));
const sortedByName = (rows, field) => rows.every((r, i) => i === 0 || String(rows[i - 1][field] ?? "").localeCompare(String(r[field] ?? ""), "fr") <= 0);

let ok = 0;
let ko = 0;
const report = (name, pass, detail = "") => {
	console.log(`${pass ? "OK" : "KO"} - ${name}${detail ? ` | ${detail}` : ""}`);
	if (pass) ok += 1;
	else ko += 1;
};

try {
	const artistsByDate = await getArtistsSortedByRepresentationDate();
	report("getArtistsSortedByRepresentationDate", Array.isArray(artistsByDate) && sortedByDate(artistsByDate), `${artistsByDate.length} artistes`);

	const scenesByName = await getScenesSortedByName();
	report("getScenesSortedByName", Array.isArray(scenesByName) && sortedByName(scenesByName, "nom_scene"), `${scenesByName.length} scenes`);

	const artistsByName = await getArtistsSortedByName();
	report("getArtistsSortedByName", Array.isArray(artistsByName) && sortedByName(artistsByName, "nom_artiste"), `${artistsByName.length} artistes`);

	const firstArtist = artistsByDate[0];
	const firstScene = scenesByName[0];

	if (firstArtist) {
		const artist = await getArtistById(firstArtist.id);
		report("getArtistById", artist.id === firstArtist.id && hasFields(artist, ["id", "nom_artiste", "date_representation", "scene"]));
	} else {
		report("getArtistById", false, "Aucun artiste");
	}

	if (firstScene) {
		const scene = await getSceneById(firstScene.id);
		report("getSceneById", scene.id === firstScene.id && hasFields(scene, ["id", "nom_scene"]));

		const bySceneId = await getArtistsBySceneIdSortedByDate(firstScene.id);
		report("getArtistsBySceneIdSortedByDate", Array.isArray(bySceneId) && sortedByDate(bySceneId), `${bySceneId.length} artistes`);

		const bySceneName = await getArtistsBySceneNameSortedByDate(firstScene.nom_scene ?? firstScene.nom ?? "");
		report("getArtistsBySceneNameSortedByDate", Array.isArray(bySceneName) && sortedByDate(bySceneName), `${bySceneName.length} artistes`);
	} else {
		report("getSceneById", false, "Aucune scene");
		report("getArtistsBySceneIdSortedByDate", false, "Aucune scene");
		report("getArtistsBySceneNameSortedByDate", false, "Aucune scene");
	}

	if (runWrite && firstArtist) {
		const saved = await saveArtistOrScene("artiste", firstArtist, firstArtist.id);
		report("saveArtistOrScene", saved.id === firstArtist.id, "update artiste");
	} else {
		report("saveArtistOrScene", true, "skip (--write pour activer)");
	}

	console.log(`\nResume: ${ok} OK / ${ko} KO`);
	if (ko > 0) process.exit(1);
} catch (error) {
	console.error("Erreur test-back:", error?.message ?? error);
	process.exit(1);
}
