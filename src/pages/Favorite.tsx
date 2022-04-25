import {
    IonCard, IonCardContent,
    IonContent,
    IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent,
    IonItem, IonLabel,
    IonList,
    IonPage, IonThumbnail,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './Favorite.css';
import React, {useEffect, useState} from "react";
import {Series} from "../api/response/Series";
import {getFav} from "../StorageServices/favoriteServices";
import HeartComponents from "../components/HeartComponents";

const Favorite: React.FC = () => {
    const [series, setSeries] = useState<Series[]>([]);

    // On récupère les favoris dans notre Stockage.
    async function catchFavs() {
        let favs = await getFav();
        setSeries(favs);
    }

    useIonViewWillEnter(async () => {
        await catchFavs();
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonContent fullscreen>
              <IonList>
                  {series.map((value) => {
                          return (
                              <IonItem routerLink={'details/' + value.id} key={value.id} >
                                  <IonThumbnail slot="start">
                                      <IonImg src={value.image_thumbnail_path} />
                                  </IonThumbnail>
                                  <IonLabel className={'series__title'} slot="start">{value.name}</IonLabel>
                                  <HeartComponents value={value}/>
                              </IonItem>
                          )
                      }
                  )}
              </IonList>
          </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Favorite;
