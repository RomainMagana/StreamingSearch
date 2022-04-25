import {Storage} from "@capacitor/storage";
import {Series} from "../api/response/Series";

async function isFavorite(obj: Series) : Promise<Boolean> {
    const favorites = await getFav(); // get favorites from storage
    return favorites.some(fav => fav.id === obj.id);
}

async function setOrRemoveFavorite(obj: Series) : Promise<void> {
    try {
        let favorites = await getFav(); // get favorites from storage

        if (await isFavorite(obj)) {
            favorites = favorites.filter(fav => fav.id !== obj.id); // remove from favorites
        } else {
            favorites.push(obj); // add to favorites
        }

        // save favorites to storage
        await Storage.set({
            key: 'favorite',
            value: JSON.stringify(favorites),
        });

    } catch (e) {
        console.log(e);
    }
}

async function getFav() : Promise<Series[]> {
    const {value} = await Storage.get({key: 'favorite'});
    let favorite: Series[] = [];

    if (value) {
        favorite = JSON.parse(value) as Series[];
    }
    return favorite;
}

async function getFavorites() {
    const {value} = await Storage.get({key: 'favorite'});

    if (value) {
        return JSON.parse(value);
    }
}

// Rafraîchit la page
function refreshPage() {
    window.location.reload();
}

export { getFavorites, setOrRemoveFavorite, refreshPage, getFav};
