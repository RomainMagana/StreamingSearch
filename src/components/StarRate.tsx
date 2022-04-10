import {IonIcon, IonText} from "@ionic/react";
import {star, starHalf} from "ionicons/icons";
import React from "react";

class StarRate extends React.Component {

    render() {
        function getSeriesRatingStars(rating: number) {
            rating = (Math.round(rating)/2);
            let starsNumber = 5;
            let starsTab = [];
            for (let i = 1; i <= starsNumber; i++) {
                if (rating >= i && rating >= i + 0.5) {
                    starsTab.push(<IonIcon key={i} icon={star} color={'danger'}/>);
                } else if (rating >= i - 0.5) {
                    starsTab.push(<IonIcon key={i} icon={starHalf} color={'danger'}/>);
                } else {
                    starsTab.push(<IonIcon key={i} icon={star}/>);
                }
            }

            return starsTab;
        }

        return (
            <div>
                <IonText>Rating : {getSeriesRatingStars(this.props.children as number)}</IonText>
            </div>
        );
    };
}

export default StarRate;