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
import {heart, home} from "ionicons/icons";

const Home: React.FC = () => {
    const [series, setSeries] = useState<EpisodeDate>({
        page: 0,
        pages: 0,
        total: 0,
        tv_shows: [],
    });
    const [loadData, setLoadData] = useState(false);
    const[searchText, setSearchText] = useState('');

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
                            return (
                                    <IonItem key={value.id}>
                                        <IonCard className={'ion-margin-bottom series__card'}>
                                            <IonCardContent className={'ion-no-padding'}>
                                                <IonImg src={value.image_thumbnail_path} className={'series__image'}/>
                                                <IonItem>
                                                    <IonLabel className={'series__title'} slot="start">{value.name}</IonLabel>
                                                    <IonIcon icon={heart} style={{width:'25px', height:"25px"}} slot="end"/>
                                                </IonItem>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonItem>
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
