<template>
    <ion-header>
        <ion-toolbar>
            <ion-title> {{ title_page }} </ion-title>
            <ion-buttons slot="end">
                <ion-menu-button :auto-hide="false" router-link="/setting"></ion-menu-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <slot></slot>
    </ion-content>
</template>

<script>
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from "@ionic/vue";

export default {
    components: {
        IonHeader,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonTitle,
        IonContent,
    },
    props: {
        title_page: {
            type: String,
            default: "",
        },
    },
};
</script>
