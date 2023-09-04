<template>
    <ion-header>
        <ion-toolbar>
            <ion-title> {{ title_page }} </ion-title>
            <ion-buttons slot="end">
                <ion-menu-button :auto-hide="false" router-link="/setting"></ion-menu-button>
            </ion-buttons>
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
