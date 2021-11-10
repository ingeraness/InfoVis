//Inspiration from https://www.d3-graph-gallery.com/graph/lollipop_cleveland.html

function createClevelandPlot(data, update) {
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 30 };
  const width = 300;
  const height = 730;

  const keys = Object.keys(data[0]);

  let attributesDict = {
    pf_ss: keys[8].valueOf(),
    pf_ss_women: keys[9].valueOf(),
    ef_legal_police: keys[10].valueOf(),
    pf_ss_disappearances_violent: keys[6].valueOf(),
    pf_religion_freedom: keys[7].valueOf(),
    hf_score: keys[4].valueOf(),
  };

  let dataShown = [];
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].year == chosenYear) {
      temp.push(data[i]);
    }
  }
  temp.sort(function (a, b) {
    // Sort array after value for chosen attribute x for chosenYear
    return (
      a[attributesDict[chosenAttributeX]] - b[attributesDict[chosenAttributeX]]
    );
  });
  let newTemp = temp.slice(0, 20); // Only pick bottom 20 countries
  let i = 0;
  while (i < data.length) {
    // Add data for both years
    if (newTemp.includes(data[i])) {
      diff = chosenYear2 - chosenYear;
      newTemp.push(data[i - diff]);
    } else if (
      (data[i].country == chosenCountry1 ||
        data[i].country == chosenCountry2) &&
      (data[i].year == chosenYear || data[i].year == chosenYear2)
    ) {
      console.log("In else if");
      newTemp.push(data[i]);
    }
    i++;
  }

  newTemp.sort(function (a, b) {
    // Sort array so that countries are next to each other
    return a.ISO_code.localeCompare(b.ISO_code);
  });

  /* for (let i = 0; i < data.length; i++) {
    if (newTemp.includes(data[i]) && data[i].year == chosenYear) {
      console.log("In first if");
      dataShown.push(data[i]);
    } else if (newTemp.includes(data[i]) && data[i].year == chosenYear2) {
      console.log("In second  if");
      dataShown.push(data[i]);
    } else if (
      (data[i].country == chosenCountry1 ||
        data[i].country == chosenCountry2) &&
      (data[i].year == chosenYear || data[i].year == chosenYear2)
    ) {
      console.log("In else if");
      dataShown.push(data[i]);
    }
  }
  console.log("DATA SHOWN: " + dataShown);*/

  // append the svg object to the body of the page
  if (!update) {
    d3.select("div#clevelandPlot")
      .append("svg")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  }
  svg = d3
    .select("div#clevelandPlot")
    .select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // Add X axis
  const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Y axis
  const y = d3
    .scaleBand()
    .range([0, height])
    .domain(
      newTemp.map(function (d) {
        return d.ISO_code;
      })
    )
    .padding(1);
  svg.append("g").call(d3.axisLeft(y));

  // Lines
  // This is the part not working. I want to draw the line between x1 = the chosen attribute for 2008 and x2 = the chosen attribute for 2018
  svg
    .selectAll("line")
    .data(newTemp)
    .join("line")
    .attr("x1", function (d) {
      if (d.year == 2008) {
        //console.log(d.year);
        //console.log(d[attributesDict[chosenAttributeX]]);
        return x(d[attributesDict[chosenAttributeX]]);
      }
    })
    .attr("x2", function (d) {
      if (d.year == 2018) {
        //console.log(d.year);
        //console.log(d[attributesDict[chosenAttributeX]]);
        return x(d[attributesDict[chosenAttributeX]]);
      }
    })
    .attr("y1", function (d) {
      return y(d.ISO_code);
    })
    .attr("y2", function (d) {
      return y(d.ISO_code);
    })
    .attr("stroke", "grey")
    .attr("stroke-width", "1px")
    .attr("id", "linesCleveland");

  // Circles for selected year 1
  svg
    .selectAll("mycircle")
    .data(newTemp)
    .join("circle")
    .filter((d) => d.year == chosenYear)
    .attr("cx", function (d) {
      return x(d[attributesDict[chosenAttributeX]]);
    })
    .attr("cy", function (d) {
      return y(d.ISO_code);
    })
    .attr("r", "6")
    .style("fill", "#69b3a2")
    .attr("id", "dotsClevelandYear1")
    .on("mousemove", handleMouseMove)
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave)
    .on("click", handleClickCleveland);

  // Circles for selected year 2
  svg
    .selectAll("mycircle")
    .data(newTemp)
    .join("circle")
    .filter((d) => d.year == chosenYear2)
    .attr("cx", function (d) {
      return x(d[attributesDict[chosenAttributeX]]);
    })
    .attr("cy", function (d) {
      return y(d.ISO_code);
    })
    .attr("r", "6")
    .style("fill", "pink")
    .attr("id", "dotsClevelandYear2")
    .on("mousemove", handleMouseMove)
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseLeave)
    .on("click", handleClickCleveland);
}
