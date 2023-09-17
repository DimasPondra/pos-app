<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="dismissModal">
        <ion-header>
            <ion-toolbar>
                <ion-title>Show</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card>
                <ion-card-content>
                    <ion-list>
                        <ion-item>
                            <ion-label>
                                <h3>Cashier Name</h3>
                                <p>{{ transactionStore.data.transaction.user.username }}</p>
                            </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                <h3>Sub Total</h3>
                                <p>Rp {{ transactionStore.data.transaction.sub_total }}</p>
                            </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                <h3>Total</h3>
                                <p>Rp {{ transactionStore.data.transaction.total }}</p>
                            </ion-label>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>

            <ion-card v-for="detail in transactionStore.data.transaction.details" :key="detail.id">
                <ion-card-content>
                    <h3>{{ detail.product.name }}</h3>
                    <p>Rp {{ detail.price }} - {{ detail.amount }} item.</p>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-modal>
</template>

<script>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonModal,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonThumbnail,
    IonList,
    IonItem,
    IonLabel,
} from "@ionic/vue";
import { useTransactionStore } from "../../stores/transactions";

export default {
    components: {
        IonButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonModal,
        IonTitle,
        IonToolbar,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonThumbnail,
        IonList,
        IonItem,
        IonLabel,
    },
    props: {
        isOpen: Boolean,
    },
    setup(props, { emit }) {
        const transactionStore = useTransactionStore();

        const dismissModal = () => {
            emit("ionModalDidDismiss");
        };

        return { transactionStore, dismissModal };
    },
};
</script>
