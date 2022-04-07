import {
    IonCard, IonCardContent, IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader, IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonPage,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import './Tab1.css';
import {useState} from "react";
import {EpisodeDate} from "../api/results/EpisodeDate";
import {Simulate} from "react-dom/test-utils";

const Tab1: React.FC = () => {
    const[series, setSeries] = useState<EpisodeDate>({
        page: 0,
        pages: 0,
        total: 0,
        tv_shows: [],
    });
    const[loadData, setLoadData] = useState(false);

    async function getAllSeries(url: string) {
        try {
            setLoadData(true);
            const response = await fetch(url);
            const data = await response.json();
            let newSeries = {
                page: data.page,
                pages: data.pages,
                total: data.total,
                tv_shows: [...series.tv_shows, ...data.tv_shows],
            };
            setSeries(newSeries);
            setLoadData(false);
        } catch (e) {
            console.log(e);
        }
    }

    useIonViewWillEnter(async () => {
        await getAllSeries('https://www.episodate.com/api/search?page=1');
    });

    let isInfiniteDisabled;
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 1</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {series?.tv_shows.map((value) => {
                        return (
                            <>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>{value.name}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonImg src={value.image_thumbnail_path}/>
                                    </IonCardContent>
                                </IonCard>
                            </>
                        )}
                )}

                <IonInfiniteScroll
                    onIonInfinite={async () => await getAllSeries(`https://www.episodate.com/api/search?page=${series.page + 1}`)}
                    threshold="100px"
                    disabled={loadData}>

                    <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more data..."/>
                </IonInfiniteScroll>

            </IonContent>
        </IonPage>
    );
};

export default Tab1;
