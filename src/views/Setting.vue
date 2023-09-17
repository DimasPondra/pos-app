<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="">
            <div v-if="authStore.ability == 'admin'">
                <ion-card router-link="/">
                    <ion-card-content>Home</ion-card-content>
                </ion-card>
                <ion-card router-link="/product-type">
                    <ion-card-content>Product Type</ion-card-content>
                </ion-card>
                <ion-card router-link="/product">
                    <ion-card-content>Product</ion-card-content>
                </ion-card>
                <ion-card router-link="/seller">
                    <ion-card-content>Seller</ion-card-content>
                </ion-card>
                <ion-card router-link="/role">
                    <ion-card-content>Role</ion-card-content>
                </ion-card>
                <ion-card router-link="/user">
                    <ion-card-content>User</ion-card-content>
                </ion-card>
                <ion-card router-link="/salary">
                    <ion-card-content>Salary</ion-card-content>
                </ion-card>
                <ion-card router-link="/unit-type">
                    <ion-card-content>Unit Type</ion-card-content>
                </ion-card>
                <ion-card router-link="/payroll-setting">
                    <ion-card-content>Payroll Setting</ion-card-content>
                </ion-card>
            </div>
            <div v-if="authStore.ability == 'finance'">
                <ion-card router-link="/purchase">
                    <ion-card-content>Purchase</ion-card-content>
                </ion-card>
                <ion-card router-link="/payroll">
                    <ion-card-content>Payroll</ion-card-content>
                </ion-card>
            </div>
            <div v-if="authStore.ability == 'cashier'">
                <ion-card router-link="/cart">
                    <ion-card-content>Cart</ion-card-content>
                </ion-card>
            </div>
            <ion-card @click="handleLogout">
                <ion-card-content>Logout</ion-card-content>
            </ion-card>
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import { IonPage, IonButton, IonCard, IonCardContent, IonList, IonItem, IonLabel } from "@ionic/vue";
import { useAuthStore } from "../stores/auth";

export default {
    components: {
        LayoutAdmin,
        IonPage,
        IonButton,
        IonCard,
        IonCardContent,
        IonList,
        IonItem,
        IonLabel,
    },
    setup() {
        const authStore = useAuthStore();

        const handleLogout = async () => {
            await authStore.logout();
        };

        return { authStore, handleLogout };
    },
};
</script>
