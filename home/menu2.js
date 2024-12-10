function openNavDir() {
    // Check the window width and adjust the width of the profile navigation accordingly
    var windowWidth = window.innerWidth;

    if (windowWidth <= 768) {
        // For mobile devices (or smaller screens), set a smaller width
        document.getElementById("profileNav").style.width = '70%';  // Example: 70% width for mobile
    } else {
        // For larger screens (like tablets and desktops), set a larger width
        document.getElementById("profileNav").style.width = '30%';  // Example: 30% width for larger screens
    }
}

function closeNav(){
    document.getElementById("profileNav").style.width = '0%';
}