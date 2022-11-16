import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Home.css";
import "swiper/swiper.min.css";
import "@ionic/react/css/ionic-swiper.css";
import { useQuery } from "@tanstack/react-query";

const LIST_LENGTH = 20;

const RobotCard = ({ name, index }: { name: string; index: number }) => {
  console.log(index);
  return (
    <div className="robot-card">
      <div className="robot-card__image-container">
        <img src={`https://robohash.org/${name}?set=set3`} alt="robot" />
      </div>
      <div className="robot-card__info">
        {index} {name}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(
        `https://random-data-api.com/api/v2/users?size=${LIST_LENGTH}`
      ).then((res) => res.json()),
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Robolist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Robolist</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Swiper>
          {data
            ? data.map(
                (
                  user: { first_name: string; last_name: string },
                  index: number
                ) => {
                  const fullname = user.first_name + user.last_name;
                  return (
                    <SwiperSlide key={fullname}>
                      <RobotCard
                        name={`${user.first_name} ${user.last_name}`}
                        index={index}
                      />
                    </SwiperSlide>
                  );
                }
              )
            : null}
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Home;
