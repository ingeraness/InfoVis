function changeDropdownCountry() {
    let dropdown = document.getElementById("dropdown_country");
    let dropdownVal = dropdown.value.toLowerCase();

    main.call('stateSelectedEvent', dropdownVal, dropdownVal);
}