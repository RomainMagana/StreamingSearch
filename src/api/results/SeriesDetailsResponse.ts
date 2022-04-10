export interface SeriesDetailsResponse {
    tvShow: {
        id: number,
        name: string,
        permalink: string,
        description: string,
        start_date: string,
        end_date?: string,
        network: string,
        status: string,
        image_thumbnail_path: string,
        rating: string,
        rating_count: number,
        genres: string[];
    }
}