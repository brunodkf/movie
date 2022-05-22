import Tmdb from "./modules/Tmdb.js";

let list = await Tmdb.getHomeList();


destaque(list);

//Funcão acessa posição de array onde está a lista de Recomendados e com ela implementa o Destaque
function destaque(list){ 

    //Selecionando a section Destaque
    let principal = document.querySelector('.destaque');

    //Seleção de filme aleatório
    let movie = list[1].items.results;
    var i = Math.round(Math.random() * (movie.length - 1));

    //Informações do Destaque
    let destaque = document.createElement('div');
    destaque.classList.add('container-destaque');
    principal.appendChild(destaque);

    //Informações de Subtitulo do Destaque
    let span = document.createElement('span');
    span.classList.add('subtitulo');
    span.innerHTML =  `${movie[i].title || movie[i].name}  já disponível !`;
    destaque.appendChild(span);

     //Informações do Titulo e Logo do Destaque
    let titulo = document.createElement('div');
    titulo.classList.add('titulo');

    //Funcão responsável por identificar o ID do filme gerado aleatóriamente e buscar na API uma Lista de Logos disponíveis para determinado filme ou série.
    async function infoImage(){
        let TipoLista = await Tmdb.getMovieImage(movie[i].id);

        let NewList = new Promise((resolve, reject) =>{   //LOGOTIPO DOS FILMES E SERIES
            const listaDeLogosFilmes =  TipoLista[0].info.logos;
            const listaDeLogosSeries =  TipoLista[1].info.logos;
             
            if(movie[i].media_type == "tv"){
                resolve(listaDeLogosSeries);
              
            }else{
                
                reject(listaDeLogosFilmes);
            }
        });

        NewList.then((element)=>{
     
            element.forEach((logo)=>{
                if(logo.iso_639_1 == "pt" && true){
                   
                    titulo.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${logo.file_path}">`;
                    
                }else if(logo.iso_639_1 == 'en'){
               
                    titulo.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${logo.file_path}">`;
                }
            })
        }).catch((element)=>{
      
           let listaLogoFilmePT = [];
           let listaLogoFilmeEN = [];
           element.forEach((background)=>{
               if(background.iso_639_1 == "pt"){

                  listaLogoFilmePT.push(background.file_path)
               }else if(background.iso_639_1 == "en"){
                  listaLogoFilmeEN.push(background.file_path)
               }
           });


           if(listaLogoFilmePT.length === 0){
            const randomElement = listaLogoFilmeEN[Math.floor(Math.random() * listaLogoFilmeEN.length)];
            titulo.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${randomElement}">`;
           }else{
            const randomElement = listaLogoFilmePT[Math.floor(Math.random() * listaLogoFilmePT.length)];
            titulo.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${randomElement}">`;
           }
           
        })


        // BACKGROUND image destaque (Seleção Aleatória de Background) 
        let BackList = new Promise((resolve, reject) =>{   //LOGOTIPO DOS FILMES E SERIES
            const listaBackFilmes =  TipoLista[0].info.backdrops;
            const listaBackSeries =  TipoLista[1].info.backdrops;
            
            if(movie[i].media_type == "tv"){
                resolve(listaBackSeries);

            }else{
    
                reject(listaBackFilmes);
        
            }
        });

        BackList.then((element)=>{  //SÉRIES
        
               let listaBackSerie = [];
               element.forEach((background)=>{
                   if(background.iso_639_1 === null){
            
                      listaBackSerie.push(background.file_path)
                   }
               });
 
               const randomElement = listaBackSerie[Math.floor(Math.random() * listaBackSerie.length)];
   
               principal.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5), rgba(2, 11, 20, 0.6), rgba(2, 11, 20, 1)), url(https://image.tmdb.org/t/p/original${randomElement})`;
               principal.style.backgroundSize = 'cover';
        }).catch((element)=>{ //FILMES
       
            let listaBackFilme = [];
            element.forEach((background)=>{
                if(background.iso_639_1 === null){
          
                   listaBackFilme.push(background.file_path)
                }
            });

            const randomElement = listaBackFilme[Math.floor(Math.random() * listaBackFilme.length)];

            principal.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5), rgba(2, 11, 20, 0.6), rgba(2, 11, 20, 1)), url(https://image.tmdb.org/t/p/original${randomElement})`;
            principal.style.backgroundSize = 'cover';
        });

    }

    infoImage();
    
    titulo.innerHTML = movie[i].title || movie[i].name ;
    destaque.appendChild(titulo);
    
 //Funcão responsável por identificar o ID do filme gerado aleatóriamente e buscar na API uma Lista de Informações disponíveis para determinado filme ou série.
    async function infoCatch() {
      let sobre = await Tmdb.getMovieInfo(movie[i].id);
      let busca;

    

      if(busca == undefined){
          busca = sobre[0].info;
            if(busca.success == false){
                 busca = sobre[1].info;
            }
      }  
   

      let infos = document.createElement('div');
      infos.classList.add('container-infos');
      destaque.appendChild(infos);

      //Ano de Lancamento
      let data = new Date(busca.first_air_date || busca.release_date);
      let formata = Intl.DateTimeFormat('pt-BR', {
          year: "numeric"
      })
      let novaData = formata.format(data);

      let ano = document.createElement('p');
      ano.classList.add('ano');
      ano.innerHTML = novaData;
      infos.appendChild(ano);

      //Duração dos Episodios
        let hora = 0;
        if((busca.runtime || busca.episode_run_time[0]) < 60){
            hora = `${(busca.runtime || busca.episode_run_time[0])}`;
        }else if((busca.runtime || busca.episode_run_time[0]) < 120){
            hora = `1h${(busca.runtime || busca.episode_run_time[0]) - 60}`;
        }else if((busca.runtime || busca.episode_run_time[0]) < 180){
            hora = `2h${(busca.runtime || busca.episode_run_time[0]) - 120}`;
        }else if((busca.runtime || busca.episode_run_time[0]) < 240){
            hora = `3h${(busca.runtime || busca.episode_run_time[0]) - 180}`;
        }else if((busca.runtime || busca.episode_run_time[0]) < 300){
            hora = `4h${(busca.runtime || busca.episode_run_time[0]) - 240}`;
        }

      let time = document.createElement('p');
      time.classList.add('duracao');
      time.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="20" height="50"
      viewBox="0 0 226 226"
      style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,226v-226h226v226z" fill="none"></path><g fill="#ffffff"><path d="M113,0c-62.4222,0 -113,50.5778 -113,113c0,62.4222 50.5778,113 113,113c62.4222,0 113,-50.5778 113,-113c0,-62.4222 -50.5778,-113 -113,-113zM113,18.83333c52.01237,0 94.16667,42.1543 94.16667,94.16667c0,52.01237 -42.15429,94.16667 -94.16667,94.16667c-52.01237,0 -94.16667,-42.15429 -94.16667,-94.16667c0,-52.01237 42.1543,-94.16667 94.16667,-94.16667zM102.99479,36.48958l-4.11979,77.09896l0.88281,8.23958l57.97135,51.20313l9.1224,-9.41667l-47.96615,-50.90885l-4.11979,-76.21615z"></path></g></g></svg> ${hora}min`;
      infos.appendChild(time)

      //Avaliação
      let rating = document.createElement('p');
      rating.classList.add('avaliacao');
      rating.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="20" height="50"
      viewBox="0 0 172 172"
      style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M35.088,167.184c-0.688,0 -1.376,-0.344 -2.064,-0.688c-1.032,-0.688 -1.72,-2.408 -1.376,-3.784l15.136,-56.416l-45.408,-36.808c-1.376,-0.688 -1.72,-2.408 -1.376,-3.784c0.344,-1.376 1.72,-2.408 3.096,-2.408l58.48,-3.096l20.984,-54.696c0.688,-1.032 2.064,-2.064 3.44,-2.064c1.376,0 2.752,1.032 3.096,2.064l20.984,54.696l58.48,3.096c1.376,0 2.752,1.032 3.096,2.408c0.344,1.376 0,2.752 -1.032,3.784l-45.408,36.808l15.136,56.416c0.344,1.376 0,2.752 -1.376,3.784c-1.032,0.688 -2.752,1.032 -3.784,0l-49.192,-31.648l-49.192,31.648c-0.688,0.688 -1.032,0.688 -1.72,0.688z"></path></g></g></svg> ${busca.vote_average} /10`;
      infos.appendChild(rating);

      //Criando botoes
      let botoes = document.createElement('div');
      botoes.classList.add('container-botoes');
      destaque.appendChild(botoes);

      let assistir = document.createElement('button');
      assistir.classList.add('botao-assistir');
      assistir.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="50" viewBox="0 0 226 226" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,226v-226h226v226z" fill="none"></path><g fill="#ffffff"><path d="M113,9.04c-57.36516,0 -103.96,46.59484 -103.96,103.96c0,57.36516 46.59484,103.96 103.96,103.96c57.36516,0 103.96,-46.59484 103.96,-103.96c0,-57.36516 -46.59484,-103.96 -103.96,-103.96zM113,18.08c52.47437,0 94.92,42.44562 94.92,94.92c0,52.47437 -42.44563,94.92 -94.92,94.92c-52.47437,0 -94.92,-42.44563 -94.92,-94.92c0,-52.47437 42.44562,-94.92 94.92,-94.92zM81.36,59.89v106.22l6.78,-3.955l76.84,-45.2l6.63875,-3.955l-6.63875,-3.955l-76.84,-45.2zM90.4,75.71l63.28,37.29l-63.28,37.29z"></path></g></g></svg> assistir'
      botoes.appendChild(assistir);

      let trailer = document.createElement('button');
      trailer.classList.add('botao-trailer');
      trailer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 226 226" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,226v-226h226v226z" fill="none"></path><g fill="#ffffff"><path d="M149.16,0.2825c-3.24875,0 -6.40922,1.37719 -8.89875,3.81375l-0.14125,-0.14125l-26.69625,26.41375c-0.72391,0.44141 -1.30656,1.07703 -1.695,1.83625l-108.1975,107.35c0,0.05297 0,0.08828 0,0.14125c-4.99672,4.99672 -4.99672,13.08328 0,18.08l14.125,13.98375c1.58906,1.60672 4.13156,1.78328 5.9325,0.42375c3.88437,-3.1075 8.95172,-5.3675 13.98375,-5.3675c12.02391,0 21.1875,9.605 21.1875,21.1875c0,5.24391 -1.90687,10.01109 -5.22625,13.70125c-1.57141,1.81859 -1.44781,4.55531 0.2825,6.215l13.98375,13.98375c4.99672,4.99672 13.08328,4.99672 18.08,0l106.92625,-106.92625h0.14125c1.73031,-0.40609 3.05453,-1.78328 3.39,-3.53125c0,-0.05297 0,-0.08828 0,-0.14125l25.1425,-25.00125c0.17656,-0.12359 0.26484,-0.2825 0.42375,-0.42375c5.43813,-4.55531 5.42047,-12.80078 0.565,-17.65625l-14.125,-13.98375c-1.58906,-1.60672 -4.13156,-1.78328 -5.9325,-0.42375c-3.86672,3.08984 -8.17484,4.94375 -13.41875,4.94375c-12.02391,0 -21.32875,-9.605 -21.32875,-21.1875c0,-5.24391 1.85391,-9.69328 4.94375,-13.56c1.35953,-1.80094 1.18297,-4.34344 -0.42375,-5.9325l-13.98375,-13.98375c-2.48953,-2.48953 -5.75594,-3.81375 -9.04,-3.81375zM149.16,9.46375c1.00641,0 2.01281,0.31781 2.68375,0.98875l11.5825,11.5825c-2.75438,4.52 -4.8025,9.69328 -4.8025,15.5375c0,16.43797 13.45406,30.2275 30.36875,30.2275c5.86187,0 10.87625,-2.04812 15.39625,-4.8025l11.5825,11.5825c1.34188,1.34187 1.44781,3.54891 0.14125,4.52c-0.19422,0.12359 -0.38844,0.26484 -0.565,0.42375l-24.15375,24.15375c-0.91813,-0.82984 -2.15406,-1.23594 -3.39,-1.13c-1.695,0.15891 -3.14281,1.25359 -3.77844,2.84266c-0.61797,1.57141 -0.31781,3.37234 0.81219,4.64359l-105.51375,105.51375c-1.34188,1.34187 -4.02563,1.34187 -5.3675,0l-11.5825,-11.5825c3.07219,-4.73188 5.22625,-10.09937 5.22625,-15.96125c0,-16.43797 -13.31281,-30.2275 -30.2275,-30.2275c-6.05609,0 -11.37062,2.33062 -15.96125,5.22625l-11.5825,-11.5825c-1.34187,-1.34187 -1.34187,-4.02562 0,-5.3675l105.79625,-105.23125c1.74797,1.80094 4.62594,1.81859 6.42687,0.07062c1.80094,-1.74797 1.81859,-4.62594 0.07063,-6.42688l24.15375,-24.0125c0.67094,-0.67094 1.67734,-0.98875 2.68375,-0.98875zM130.93875,45.765l-3.39,2.26l-0.14125,4.09625l0.98875,1.27125l6.215,6.35625l3.955,1.27125l3.24875,-2.40125l0.14125,-3.955l-0.8475,-1.4125l-6.35625,-6.215zM149.86625,64.6925l-3.24875,2.40125l-0.14125,3.955l0.8475,1.4125l6.35625,6.35625l3.81375,1.27125l3.39,-2.40125l0.14125,-3.955l-0.8475,-1.4125l-6.35625,-6.35625zM168.935,83.76125l-3.24875,2.26l-0.14125,4.09625l0.8475,1.27125l6.35625,6.35625l3.81375,1.27125l3.39,-2.26l0.14125,-4.09625l-0.98875,-1.27125l-6.35625,-6.35625z"></path></g></g></svg> veja o trailer';
      botoes.appendChild(trailer);
   
    }

    infoCatch();
   
};



///////////////////////////////////////////

//Hamburguer Mobile
const button = document.querySelector('[data-button-menu]');


button.addEventListener('click', function(){
    const navMenu = document.querySelector('.menu');
    navMenu.classList.toggle('active');
});


