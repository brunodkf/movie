import Tmdb from "./modules/Tmdb.js";

let list = await Tmdb.getHomeList();


let ListaDeFilmes = list[2].items.results;
let ListaDeSeries = list[0].items.results;

SectionFilmes(ListaDeFilmes);
SectionSeries(ListaDeSeries);

function SectionFilmes(element){
  
    let Filmes = document.querySelector('.slide-filmes');

    element.forEach(element => {
   
        let figure = document.createElement('div');
        figure.classList.add('item-slide');
        figure.style = 'width: 270px; height: 360px; border-radius: 20px; margin-left: 10px; margin-right: 10px;'
        figure.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), center url(https://image.tmdb.org/t/p/original${element.poster_path})`;
        figure.style.backgroundSize = 'cover';
        Filmes.appendChild(figure);


        async function infoCatch() {
            let sobre = await Tmdb.getMovieInfo(element.id);
            let busca;
      
            if(busca == undefined){
                busca = sobre[0].info;
                  if(busca.success == false){
                       busca = sobre[1].info;
                  }
            }  

            let title = document.createElement('div');
            title.classList.add('item-slide-infos');
            title.innerHTML =`<h3>${element.title}</h3>`
            figure.appendChild(title);
    
    
            let infos = document.createElement('div');
            infos.classList.add('slide-infos');
            title.appendChild(infos);
      
            //Ano de Lancamento
            let data = new Date(busca.first_air_date || busca.release_date);
            let formata = Intl.DateTimeFormat('pt-BR', {
                year: "numeric"
            })
            let novaData = formata.format(data);
      
            let ano = document.createElement('p');
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
            time.innerHTML = `${hora}min`;
            infos.appendChild(time)
      
            //Avaliação
            let rating = document.createElement('p');
            rating.style = 'display: flex;  align-items: baseline;';
            rating.innerHTML = `<img width="15" height="15" style="margin-right: 3px; padding-top: 3px;" src="./css/image/icons/star.png" alt="Icone Estrela"> ${busca.vote_average.toFixed(1)}`;
            infos.appendChild(rating);
         
        }
      
          infoCatch();
    });

    
   
}
function SectionSeries(element){
    let Series = document.querySelector('.slide-series');

    element.forEach(element => {

        let season = document.createElement('div');
        season.classList.add('item-slide');
        season.style = 'width: 270px; height: 360px; border-radius: 20px; margin-left: 10px; margin-right: 10px;'
        season.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), center url(https://image.tmdb.org/t/p/original${element.poster_path})`;
        season.style.backgroundSize = 'cover';
        Series.appendChild(season);

        async function infoCatch() {
            let sobre = await Tmdb.getMovieInfo(element.id);
            let busca;
      
            if(busca == undefined){
                busca = sobre[0].info;
                  if(busca.success == false){
                       busca = sobre[1].info;
                  }
            }  

            let title = document.createElement('div');
            title.classList.add('item-slide-infos');
            title.innerHTML =`<h3>${element.title || element.name}</h3>`
            season.appendChild(title);
    
    
            let infos = document.createElement('div');
            infos.classList.add('slide-infos');
            title.appendChild(infos);
      
            //Ano de Lancamento
            let data = new Date(busca.first_air_date || busca.release_date);
            let formata = Intl.DateTimeFormat('pt-BR', {
                year: "numeric"
            })
            let novaData = formata.format(data);
      
            let ano = document.createElement('p');
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
            time.innerHTML = `${hora}min`;
            infos.appendChild(time)
      
            //Avaliação
            let rating = document.createElement('p');
            rating.style = 'display: flex;  align-items: baseline;';
            rating.innerHTML = `<img width="15" height="15" style="margin-right: 3px; padding-top: 3px;" src="./css/image/icons/star.png" alt="Icone Estrela"> ${busca.vote_average.toFixed(1)}`;
            infos.appendChild(rating);
         
        }
      
          infoCatch();
    });
   
}


$('.slide-filmes').slick({
    slidesToShow: 7,
    slidesToScroll: 3,
    arrow: true,
    prevArrow: $('.prevFilme'),
    nextArrow: $('.nextFilme'),
    responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 5
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3
      }
    },
    {
     breakpoint: 700,
     settings: {
        arrows: false,
        centerMode: true,
        slidesToShow: 2
      }
    },
    {
     breakpoint: 501,
     settings: {
        arrows: false,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  });

$('.slide-series').slick({
    slidesToShow: 7,
    slidesToScroll: 3,
    prevArrow: $('.prevSerie'),
    nextArrow: $('.nextSerie'),
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 700,
        settings: {
           arrows: false,
           centerMode: true,
           slidesToShow: 2
         }
       },
      {
          breakpoint: 501,
          settings: {
              arrows: false,
              autoplay: true,
              autoplaySpeed: 6000,
              centerMode: true,
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
    ]
    });
