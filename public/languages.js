var strings = {
	"en": {
		"language" : "en",
		"english" : "English",
		"spanish" : "Spanish",
		"home" : "Home",
		"projects" : "Projects",
		"music" : "Music",
		"play" : "Play",
		"myCV" : "My CV",
		"cvDescription" : "Full-Stack Developer, Enterpreur, Bitcoiner.",
		"readMore" : "Read more",
		"previous" : "Previous",
		"first" : "First",
		"last" : "Last",
		"next" : "Next",
		"posted" : "Posted on",
		"in" : "in",
		"archives" : "Archives",
		"categories" : "Categories",
		"follow" : "Follow",
		"share" : "Share",
		"page" : "Page",
		"contact" : "Contact",
		"submit" : "Submit",
		"search" : "Search",
		"searchByTitle" : "Search by title.."
	},
	"es": {
		"language" : "es",
		"english" : "Ingles",
		"spanish" : "Español",
		"home" : "Home",
		"projects" : "Proyectos",
		"music" : "Musica",
		"play" : "Jugar",
		"myCV" : "Mi CV",
		"cvDescription" : "Desarrollador Full-Stack, Emprendedor, Bitcoiner.",
		"readMore" : "Ver mas",
		"previous" : "Anterior",
		"first" : "Primero",
		"last" : "Ultima",
		"next" : "Siguiente",
		"posted" : "Subido el",
		"in" : "en",
		"archives" : "Archivos",
		"categories" : "Categorias",
		"follow" : "Seguir",
		"share" : "Compartir",
		"page" : "Pagina",
		"contact" : "Contacto",
		"submit" : "Enviar",
		"search" : "Buscar",
		"searchByTitle" : "Buscar por titulo.."
	}
};

function getWords(lang){
	if (lang == 'es')
		return strings.es;
	else
		return strings.en;
}