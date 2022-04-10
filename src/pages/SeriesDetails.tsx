import {
    IonButton, IonButtons,
    IonBackButton,
    IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonCol,
    IonContent,
    IonHeader, IonIcon, IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent, IonItem, IonLabel, IonList,
    IonPage, IonRow, IonSearchbar,
    IonTitle,
    IonToolbar, useIonViewWillEnter, withIonLifeCycle, IonText, IonFab, IonCardSubtitle,
} from '@ionic/react';
import './Home.css';
import React, {useState} from "react";
import {RouteComponentProps} from "react-router";
import {SeriesDetailsResponse} from "../api/results/SeriesDetailsResponse";
import {star, starHalf} from "ionicons/icons";
import StarRate from "../components/StarRate";

interface SeriesDetailsProps extends RouteComponentProps<{ id: string; }> {
}

const SeriesDetails: React.FC<SeriesDetailsProps> = ({match}) => {
    const [series, setSeries] = useState<SeriesDetailsResponse>({
        tvShow: {
            description: "",
            genres: [],
            id: 0,
            image_thumbnail_path: "",
            name: "",
            network: "",
            status: "",
            permalink: "",
            rating: "",
            rating_count: 0,
            start_date: ""
        }
    });

    async function getSeriesDetails(url: string) {
        try {
            const response = await fetch(url);
            const data = await response.json() as SeriesDetailsResponse;
            setSeries(data);
        }catch (e) {
            console.log(e);
        }
    }

    useIonViewWillEnter(async () => {
        await getSeriesDetails(`https://www.episodate.com/api/show-details?q=${match.params.id}`);
    });

    function createMarkup() {
        return {__html: series.tvShow.description};
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot={"start"}>
                        <IonBackButton defaultHref={"/"}/>
                    </IonButtons>
                    <IonTitle>{series.tvShow.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>{series.tvShow.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonRow>
                            <IonCol>
                                <IonImg src={series.tvShow.image_thumbnail_path}/>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonText dangerouslySetInnerHTML={createMarkup()} />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonText>Station : {series.tvShow.network}</IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                               <StarRate>{parseInt(series.tvShow.rating)}</StarRate>
                                <IonText>{series.tvShow.rating_count} votes</IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCardSubtitle>Start : {series.tvShow.start_date}</IonCardSubtitle>
                                <IonCardSubtitle>Status : {series.tvShow.status}</IonCardSubtitle>
                            </IonCol>
                        </IonRow>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};
export default withIonLifeCycle(SeriesDetails);
