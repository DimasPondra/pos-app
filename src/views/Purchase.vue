<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Purchase">
            <div class="add-button margin-top-10">
                <ion-button size="small" color="warning" fill="outline" expand="block" @click="openModal"
                    >add new</ion-button
                >
            </div>
            <ModalPurchase
                :is-open="isModalOpen"
                @ionModalDidDismiss="closeModal"
                :products="productStore.data.products"
                :sellers="sellerStore.data.sellers"
            />

            <ListPurchase
                :purchases="purchaseStore.data.purchases"
                :total="purchaseStore.data.infinite_set.total"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                @handleLoadMore="handleLoadMore"
            />

            <RefresherComponent @handleRefresh="refresh" />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton, loadingController } from "@ionic/vue";
import { usePurchaseStore } from "../stores/purchases";
import { useProductStore } from "../stores/products";
import { useSellerStore } from "../stores/sellers";
import { computed, onMounted, ref } from "vue";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListPurchase from "../components/list/ListPurchase.vue";
import ModalPurchase from "../components/modal/ModalPurchase.vue";
import RefresherComponent from "../components/RefresherComponent.vue";

export default {
    components: { IonPage, IonButton, LayoutAdmin, ListPurchase, ModalPurchase, RefresherComponent },
    setup() {
        const purchaseStore = usePurchaseStore();
        const productStore = useProductStore();
        const sellerStore = useSellerStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                include: "product,seller,user",
                page: purchaseStore.data.infinite_set.page,
                per_page: purchaseStore.data.infinite_set.per_page,
            };
        });

        const loadPurchases = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await purchaseStore.get(params.value);
        };

        onMounted(async () => {
            try {
                await purchaseStore.get(params.value);
                await productStore.get();
                await sellerStore.get();
            } catch (error) {
                console.log(error);
            } finally {
                await loadingController.dismiss();
            }
        });

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
            purchaseStore.clear();
        };

        const handleEdit = async (id) => {
            await purchaseStore.show(id, params.value);

            openModal();
        };

        const handleDelete = async (id) => {
            await purchaseStore.deleteItem(id);

            loadPurchases(1);
        };

        const handleLoadMore = async () => {
            const loadPage = purchaseStore.data.infinite_set.page + 1;
            params.value.page = loadPage;

            await purchaseStore.get(params.value, true);
        };

        const refresh = async (event) => {
            params.value.page = 1;

            try {
                await purchaseStore.get(params.value);
                await productStore.get();
                await sellerStore.get();
            } catch (error) {
                console.log(error);
            } finally {
                event.target.complete();
            }
        };

        return {
            purchaseStore,
            productStore,
            sellerStore,
            isModalOpen,
            openModal,
            closeModal,
            handleEdit,
            handleDelete,
            handleLoadMore,
            refresh,
        };
    },
};
</script>
