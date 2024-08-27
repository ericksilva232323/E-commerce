function openModal () {
    const modal = document.getElementById('windowModal')

    modal.classList.add('abrir')

    modal.addEventListener( 'click', (e) => {
        if( e.target.id == 'close' || e.target.id == 'windowModal' ){
            modal.classList.remove('abrir')
        }
    })
}
