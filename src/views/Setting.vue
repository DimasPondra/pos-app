<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="">
            <div v-if="authStore.ability == 'admin'">
                <ion-card router-link="/">
                    <ion-card-content>
                        <ion-label><p>Home</p> </ion-label>
                    </ion-card-content>
                </ion-card>
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle> Product </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <ion-item router-link="/product-type">
                                <ion-label><p>Product Type</p> </ion-label>
                            </ion-item>
                            <ion-item router-link="/product">
                                <ion-label><p>Product</p> </ion-label>
                            </ion-item>
                            <ion-item router-link="/seller">
                                <ion-label><p>Seller</p> </ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-card-content>
                </ion-card>
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle> User </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <ion-item router-link="/role">
                                <ion-label><p>Role</p> </ion-label>
                            </ion-item>
                            <ion-item router-link="/user">
                                <ion-label><p>User</p> </ion-label>
                            </ion-item>
                            <ion-item router-link="/salary">
                                <ion-label><p>Salary</p> </ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-card-content>
                </ion-card>
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle> Transaction </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <ion-item router-link="/transaction">
                                <ion-label><p>Transaction</p> </ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-card-content>
                </ion-card>
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle> Setting </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <ion-item router-link="/unit-type">
                                <ion-label><p>Unit Type</p> </ion-label>
                            </ion-item>
                            <ion-item router-link="/payroll-setting">
                                <ion-label><p>Payroll Setting</p> </ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-card-content>
                </ion-card>
            </div>
            <div v-if="authStore.ability == 'finance'">
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle> Finance </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <ion-item router-link="/purchase">
                                <ion-label><p>Purchase</p> </ion-label>
                            </ion-item>
                            <ion-item router-link="/payroll">
                                <ion-label><p>Payroll</p> </ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-card-content>
                </ion-card>
            </div>
            <div v-if="authStore.ability == 'cashier'">
                <ion-card router-link="/cart">
                    <ion-card-content>
                        <ion-label><p>Cart</p> </ion-label>
                    </ion-card-content>
                </ion-card>
            </div>
            <div class="logout">
                <ion-card @click="handleLogout">
                    <ion-card-content>
                        <ion-label>Logout </ion-label>
                    </ion-card-content>
                </ion-card>
            </div>
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import {
    IonPage,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
} from "@ionic/vue";
import { useAuthStore } from "../stores/auth";

export default {
    components: {
        LayoutAdmin,
        IonPage,
        IonButton,
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
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
