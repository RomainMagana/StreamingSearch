import {
    IonButton,
    IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonCol,
    IonContent,
    IonHeader, IonIcon, IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent, IonItem, IonLabel, IonList,
    IonPage, IonRow, IonSearchbar,
    IonTitle,
    IonToolbar, useIonViewWillEnter, withIonLifeCycle,
} from '@ionic/react';
import './Home.css';
import React, {useState} from "react";
import {EpisodeDate} from "../api/results/EpisodeDate";
import getSeries from "../StorageServices/getSeries";
import HeartComponents from "../components/HeartComponents";

const Home: React.FC = () => {
    const [series, setSeries] = useState<EpisodeDate>({
        page: 0,
        pages: 0,
        total: 0,
        tv_shows: [],
    });
    const [loadData, setLoadData] = useState(false);

    async function getAllSeries(url: string) {
        try {
            setLoadData(true);
            const newSeries = await getSeries(url, series);
            setSeries(newSeries);
            setLoadData(false);
        } catch (e) {
            console.log(e);
        }
    }

    useIonViewWillEnter(async () => {
        await getAllSeries('https://www.episodate.com/api/most-popular?page=1');
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Popular Series</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {series?.tv_shows.map((value) => {
                        return(
                            <IonCard routerLink={"details/" + value.permalink} key={value.id} className={"cardStyle"}>
                                <IonImg src={value.image_thumbnail_path}/>
                                <IonCardContent>
                                    <IonItem key={value.id}>
                                        <IonLabel slot={"start"} className={"labelStyle"}>{value.name}</IonLabel>
                                        <HeartComponents value={value}/>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        )
                        }
                    )}
                </IonList>

                <IonInfiniteScroll
                    onIonInfinite={async () => await getAllSeries(`https://www.episodate.com/api/most-popular?page=${series.page + 1}`)}
                    threshold="100px"
                    disabled={loadData}>
                    <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more data..."/>
                </IonInfiniteScroll>

            </IonContent>
        </IonPage>
    );
};
export default withIonLifeCycle(Home);
