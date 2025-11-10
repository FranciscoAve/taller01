"use strict";

// Plantilla para cada canción:


// Formateador de números
let formatter = new Intl.NumberFormat('en-US');

// Ejemplo de uso:
// let views_witoutformat = 2536628;


// let views_withformat= formatter.format(views_witoutformat); 
// Valor de views_withformat: "2,536,628"
const contenedorCanciones = document.getElementsByClassName("songs-grid");

const cargaAsincronicaDatos =async ()=>{
    try{
        const response = await fetch("https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Youtube/only_songs.json");

        if(!response.ok){
            console.log(response.status);
        }else{
            const data = response.json();
            let canciones = data.slice(0,12);

            canciones.forEach(cancion => {
                    let card_song = `<div class="cover">
                                        <img src="[CANCION.THUMBNAIL]"
                                                alt="Portada: [CANCION.TITTLE]">
                                        <span class="badge">[CANCION.DURATION_STRING]</span>
                                    </div>
                                    <div class="content">
                                        <h2 class="title">[CANCION.TITTLE]</h2>
                                        <div class="meta">[CANCION.VIEW_COUNT] vistas</div>
                                        <div class="footer">
                                        <span class="channel">Canal: <a href="[CANCION.CHANNEL_URL]"
                                        target="_blank" rel="noopener noreferrer">[CANCION.CHANNEL]</a></span>
                                        </div>
                                    </div>`

                    card_song = card_song.replaceAll('[CANCION.THUMBNAIL]',cancion.thumbnail);
                    card_song = card_song.replaceAll('[CANCION.TITTLE]',cancion.title);
                    card_song = card_song.replaceAll('[CANCION.DURATION_STRING]',cancion.duration_string);

                    let cancion_view_count = formatter.format(cancion.view_count);

                    card_song = card_song.replaceAll('[CANCION.VIEW_COUNT]',cancion_view_count);
                    card_song = card_song.replaceAll('[CANCION.CHANNEL_URL]',cancion.channel_url);
                    card_song = card_song.replaceAll('[CANCION.CHANNEL]',cancion.channel);
                    
                    contenedorCanciones.innerHTML+= card_song;
            });

        }
    }catch(error){
        console.log(error.message);
    }
    

}



( ()=>{
    cargaAsincronicaDatos(); 
} ) ();