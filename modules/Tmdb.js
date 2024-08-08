const apiKey = '71515a021dc8b5338eb9596bb54175f4';

const apiBase = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${apiBase}${endpoint}`);
    const json = await req.json();

    return json;
}

export default {
    getHomeList: async () =>{
        return [
            {
                slug: 'tv',
                title: 'Séries Para Maratonar',
                items: await basicFetch(`/trending/tv/week?language=pt-BR&api_key=${apiKey}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${apiKey}`)
            },
            {
                slug: 'popular',
                title: 'Populares',
                items:  await basicFetch(`/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`)
            }
        ]
    },
    getMovieInfo: async(movieId)=>{
        return [
            {
                info: await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${apiKey}`)
            },
            {
                info: await basicFetch(`/movie/${movieId}?api_key=${apiKey}&language=pt-BR`)
            }
        ]
    },
    getMovieImage: async(movieId)=>{
        return [
            {
                title: 'Imagens Filmes',
                info: await basicFetch(`/movie/${movieId}/images?api_key=${apiKey}`)
            },
            {
                title: 'Imagens TV',
                info: await basicFetch(`/tv/${movieId}/images?api_key=${apiKey}`)
            }
        ]
    }
}

