// const countries = ['Albania', 'Austria', 'Belgium', 'Bosnia and Herzegovina','Bulgaria', 'Croatia','Cyprus', 'Czech Rebublic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation',  'Serbia', 'Sloavk Rebublic', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom' ];
var chosenCountry1;
var chosenCountry2;


function saveDropdownCountry(i){
    console.log(i);
    if(i==1){
        chosenCountry1 = document.getElementById("dropdown_country1").value;
        console.log(chosenCountry1);
    }
    else{
        chosenCountry2 = document.getElementById("dropdown_country2").value;
        console.log(chosenCountry2);
    }
    
}



function init() {
    d3.csv("data/data.csv")
      .then((data) => {
        dataSet = data;
        createScatterPlot(data);
        createBarChart(data);
        createLineChart(data, false);  
        createDropDownMenus();      
      })
      .catch((error) => {
        console.log(error);
      });
  }