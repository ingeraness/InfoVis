var country;
var dataSet;
var  selectedCountry = "Ukraine"

function init() {
    d3.csv("data/data.csv")
      .then((data) => {
        dataSet = data;
        createLineChart(data, false);
      })
      .catch((error) => {
        console.log(error);
      });
  }


function createLineChart(data, update) {
    margin = { top: 20, right: 20, bottom: 20, left: 40 };
    width = 400;
    height = 400;

    var data = data.filter(function (d) {
        if (d.country == selectedCountry) {
          return d;
        }
      });
  
    line = d3
      .line()
      .defined(function (d) {
        return d.hf_score > 0;
      })
      .x((d) => x(d.year))
      .y((d) => y(d.hf_score));
  
    x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year))
      .range([margin.left, width - margin.right]);
  
    y = d3
      .scaleLinear()
      .domain([0, 10])
      .range([height - margin.bottom , margin.top +100]);
  
    xAxis = (g) =>
      g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((x) => x)
          .tickSizeOuter(0)
      );
  
    yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat((x) => x))
        .call((g) => g.select(".domain").remove())
        .call(d3.axisLeft(y));
        
  
    if (!update) {
      d3.select("div#lineChart")
        .append("svg")
        .append("g")
        .attr("class", "line")
        .append("path");
    }
  
    const svg = d3
      .select("div#lineChart")
      .select("svg")
      .attr("width", width)
      .attr("height", height);
  
    if (!update) {
      svg.append("g").attr("class", "lineXAxis");
      svg.append("g").attr("class", "lineYAxis");
    }
  
    svg.select("g.lineXAxis").call(xAxis);
  
    svg.select("g.lineYAxis").call(yAxis);
  
    svg
      .select("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .transition()
      .duration(1000)
      .attr("d", line);
  
    svg
      .select("g.line")
      .selectAll("circle")
      .data(data, function (d) {
        return d.year;
      })
      .join(
        (enter) => {
          return enter
            .append("circle")
            .attr("cx", (d) => x(d.year))
            .attr("cy", (d) => y(d.hf_score))
            .attr("r", 2)
            .style("fill", "steelblue")
            .text(function (d) {
              return d.title;
            })
        /*
        //Here comes more code when the user can chose country and year
        .on("mouseover", handleMouseOver)
          .on("mouseleave", handleMouseLeave)
          .on("click", handleClick)
          .transition()
          .duration(1000)
          .style("opacity", "100%");
      },
        
        (update) => {
          update
            .transition()
            .duration(1000)
            .attr("cx", (d) => x(d.year))
            .attr("cy", (d) => y(d.hf_score))
            .attr("r", 2)
            .style("fill", "steelblue");*/
        },
        (exit) => {
          exit.remove();
        }
      );
  }