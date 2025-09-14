function toggleBurgerMenu() {
    const dropdown = document.getElementById('burgerDropdown');
    dropdown.classList.toggle('d_none');
  }
  
  // Optional: Klick außerhalb schließt das Menü
  document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('burgerDropdown');
    const burgerBtn = document.querySelector('.burger-icon');
  
    if (!dropdown.contains(event.target) && !burgerBtn.contains(event.target)) {
      dropdown.classList.add('d_none');
    }
  });