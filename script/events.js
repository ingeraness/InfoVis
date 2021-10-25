function handleMouseOver(event, d) {
    lineChart = d3.select("div#lineChart").select("svg");
    scatterPlot = d3.select("div#scatterPlot").select("svg");
    
    
    lineChart
      .selectAll(event.path[0].id == "" ? "circle" : `circle#${event.path[0].id}`)
      .filter(function (b) {
        if (d.country == b.country && d.year == b.year ) {
          return b;
        }
      })
      .style("fill", "red");    

    scatterPlot
        .selectAll("circle")
        .filter(function (b) {
            if(d.country == b.country) {
                return b;
            }
        })  
        .style("fill", "red")  

}


function handleMouseLeave(event, d) {
      
    if(event.path[0].id == "one"){
        d3.select("div#lineChart")
        .select("svg")
        .selectAll(`circle#${event.path[0].id}`)
        .style("fill", "steelblue"); 
    }

    if(event.path[0].id == "two"){
        d3.select("div#lineChart")
        .select("svg")
        .selectAll(`circle#${event.path[0].id}`)
        .style("fill", "blue"); 
    }

    if(event.path[0].id == "three"){
        d3.select("div#lineChart")
        .select("svg")
        .selectAll(`circle#${event.path[0].id}`)
        .style("fill", "PaleVioletRed"); 
    }

    if(event.path[0].id == "four"){
        d3.select("div#lineChart")
        .select("svg")
        .selectAll(`circle#${event.path[0].id}`)
        .style("fill", "pink"); 
    }

    d3.select("div#scatterPlot")
    .select("svg")
    .selectAll(`circle`)
    .style("fill", "blue");

  }