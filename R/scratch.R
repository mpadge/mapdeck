#
# library(shiny)
# library(shinydashboard)
#
# ui <- dashboardPage(
# 	dashboardHeader()
# 	, dashboardSidebar(
# 		actionButton(
# 			inputId = "btn"
# 			, label = "transition"
# 		)
# 	)
# 	, dashboardBody(
# 		mapdeckOutput(
# 			outputId = "map"
# 		)
# 	)
# )
# server <- function(input, output, session) {
#
# 	key <- read.dcf("~/Documents/.googleAPI", fields = "MAPBOX")
#
# 	df <- data.frame(lon = 0, lat = 0, radius = 10000)
#
# 	observeEvent({input$btn}, {
# 		session$sendCustomMessage("handler1", input$btn)
# 	})
#
# 	output$map <- renderMapdeck({
# 		mapdeck(
# 			token = key
# 			, location = c(0, 0)
# 			, zoom = 6
# 			, style = 'mapbox://styles/mapbox/dark-v9'
# 		) %>% add_scatterplot(
# 			data = df
# 			, lon = 'lon'
# 			, lat = 'lat'
# 			, radius = 'radius'
# 			, layer_id = 'scatter'
# 		)
# 	})
# }
#
# shinyApp(ui, server)



# mapdeck(
# 		token = key
# 		, location = c(0, 0)
# 		, zoom = 6
# 		, style = 'mapbox://styles/mapbox/dark-v9'
# 	) %>% add_scatterplot(
# 		data = df
# 		, lon = 'lon'
# 		, lat = 'lat'
# 		, radius = 'radius'
# 		, layer_id = 'scatter'
# 	)







