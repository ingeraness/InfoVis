const countries = ['Albania', 'Austria', 'Belgium', 'Bosnia and Herzegovina','Bulgaria', 'Croatia','Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation',  'Serbia', 'Sloavk Republic', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom' ];

function createDropDownMenus() {
      var select1 = document.getElementById("dropdown_country1");
      var select2 = document.getElementById("dropdown_country2");

      for(var i = 0; i <countries.length; i++){
          // Country menu 1
          var country = countries[i];
          var el1 = document.createElement("option");
          el1.textContent = country;
          el1.value = country;

          // Country menu 2
          var el2 = document.createElement("option");
          el2.textContent = country;
          el2.value = country;
          select1.appendChild(el1);
          select2.appendChild(el2);
        }

    
}

