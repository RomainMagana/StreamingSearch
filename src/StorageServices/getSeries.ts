import {EpisodeDate} from "../api/results/EpisodeDate";

async function getSeries(url: string, series: EpisodeDate) : Promise<EpisodeDate> {
    const response = await fetch(url);
    const data = await response.json() as EpisodeDate;
    return {
        page: data.page,
        pages: data.pages,
        total: data.total,
        tv_shows: [...series.tv_shows, ...data.tv_shows],
    };
}

export default getSeries;