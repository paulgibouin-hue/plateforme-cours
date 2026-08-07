import exercicesData from "@/data/exercices.json";
import qcmData from "@/data/qcm.json";
import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  const maintenant = new Date();

  const pagesStatiques = ["", "/tarifs", "/a-propos", "/qcm"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: maintenant,
  }));

  const matieres = Array.from(
    new Set(exercicesData.chapitres.map((c) => c.matiere))
  ).map((matiere) => ({
    url: `${SITE_URL}/matieres/${matiere}`,
    lastModified: maintenant,
  }));

  const chapitres = exercicesData.chapitres.map((chapitre) => ({
    url: `${SITE_URL}/matieres/${chapitre.matiere}/${chapitre.id}`,
    lastModified: maintenant,
  }));

  const qcms = qcmData.qcms.map((qcm) => ({
    url: `${SITE_URL}/qcm/${qcm.id}`,
    lastModified: maintenant,
  }));

  return [...pagesStatiques, ...matieres, ...chapitres, ...qcms];
}
