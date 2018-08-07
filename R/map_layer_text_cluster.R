mapdeckTextDependency <- function() {
	list(
		htmltools::htmlDependency(
			"textcluster",
			"1.0.0",
			system.file("htmlwidgets/lib/textcluster", package = "mapdeck"),
			script = c("textcluster.js")
		)
	)
}


#' Add Text Cluster
#'
#' The Text Layer takes in coordinate points and renders them as circles
#' with a certain radius.
#'
#' @inheritParams add_text
#'
#' @examples
#'
#' \dontrun{
#'
#' ## You need a valid access token from Mapbox
#' key <- 'abc'
#'
#' df <- capitals
#' df$weight <- sample(1:500, size = nrow(df))
#'
#' mapdeck(
#'   token = key,
#'   style = mapdeck_style('dark')
#' ) %>%
#'   add_text_cluster(
#'     data = capitals
#'     , lon = 'lon'
#'     , lat = 'lat'
#'     , weight = 'weight'
#'     , text = 'capital'
#'     , layer_id = 'text'
#'   )
#' }
#'
#' @export
add_text_cluster <- function(
	map,
	data = get_map_data(map),
	text,
	lon = NULL,
	lat = NULL,
	polyline = NULL,
	weight = NULL,
	layer_id,
	digits = 6,
	palette = viridisLite::viridis
) {

	objArgs <- match.call(expand.dots = F)

	data <- normaliseSfData(data, "POINT")
	polyline <- findEncodedColumn(data, polyline)

	if( !is.null(polyline) && !polyline %in% names(objArgs) ) {
		objArgs[['polyline']] <- polyline
		data <- unlistMultiGeometry( data, polyline )
	}

	## parmater checks
	usePolyline <- isUsingPolyline(polyline)

	## end parameter checks
	if ( !usePolyline ) {
		## TODO(check only a data.frame)
		data[['polyline']] <- googlePolylines::encode(data, lon = lon, lat = lat, byrow = TRUE)
		polyline <- 'polyline'
		## TODO(check lon & lat exist / passed in as arguments )
		objArgs[['lon']] <- NULL
		objArgs[['lat']] <- NULL
		objArgs[['polyline']] <- polyline
	}

	allCols <- textclusterColumns()
	requiredCols <- requiredTextclusterColumns()

	colourColumns <- shapeAttributes(
		fill_colour = NULL
		, stroke_colour = NULL
		, stroke_from = NULL
		, stroke_to = NULL
	)

	shape <- createMapObject(data, allCols, objArgs)

	pal <- createPalettes(shape, colourColumns)

	colour_palettes <- createColourPalettes(data, pal, colourColumns, palette)
	colours <- createColours(shape, colour_palettes)

	if(length(colours) > 0){
		shape <- replaceVariableColours(shape, colours)
	}

	requiredDefaults <- setdiff(requiredCols, names(shape))

	if(length(requiredDefaults) > 0){
		shape <- addDefaults(shape, requiredDefaults, "textcluster")
	}
	shape <- jsonlite::toJSON(shape, digits = digits)

	map <- addDependency(map, mapdeckTextDependency())
	invoke_method(map, "add_text_cluster", shape, layer_id)
}


requiredTextclusterColumns <- function() {
	c('weight')
}


textclusterColumns <- function() {
	c('polyline', 'weight')
}

textclusterDefaults <- function(n) {
	data.frame(
		"weight" = rep(1, n),
		stringsAsFactors = F
	)
}
