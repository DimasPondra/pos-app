<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title> {{ title_page }} </ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <slot></slot>
    </ion-content>
    <ion-footer>
        <ion-toolbar>
            <ion-title> Footer </ion-title>
        </ion-toolbar>
    </ion-footer>
</template>

<script>
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonFooter } from "@ionic/vue";

export default {
    components: {
        IonHeader,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonTitle,
        IonContent,
        IonFooter,
    },
    props: {
        title_page: {
            type: String,
            default: "",
        },
    },
};
</script>
