<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Seller">
            <FilterSeller :filter="sellerStore.data.filter" @clearFilter="clearFilter" />

            <div class="add-button">
                <ion-button size="small" color="warning" fill="outline" expand="block" @click="openModal">
                    add new
                </ion-button>
            </div>
            <ModalSeller :is-open="isModalOpen" @ionModalDidDismiss="closeModal" />

            <ListSeller
                :sellers="sellerStore.data.sellers"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                :total="sellerStore.data.infinite_set.total"
                @handleLoadMore="handleLoadMore"
            />

            <RefresherComponent @handleRefresh="refresh" />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton } from "@ionic/vue";
import { useSellerStore } from "../stores/sellers";
import { computed, onMounted, ref, watch } from "vue";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListSeller from "../components/list/ListSeller.vue";
import FilterSeller from "../components/filter/FilterSeller.vue";
import ModalSeller from "../components/modal/ModalSeller.vue";
import RefresherComponent from "../components/RefresherComponent.vue";

export default {
    components: { IonPage, IonButton, LayoutAdmin, ListSeller, FilterSeller, ModalSeller, RefresherComponent },
    setup() {
        const sellerStore = useSellerStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                name: sellerStore.data.filter.name,
                page: sellerStore.data.infinite_set.page,
                per_page: sellerStore.data.infinite_set.per_page,
            };
        });

        watch(
            () => sellerStore.data.filter.name,
            () => {
                loadSellers(1);
            }
        );

        const loadSellers = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await sellerStore.get(params.value);
        };

        onMounted(() => {
            loadSellers();
        });

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;

            sellerStore.clear();
        };

        const handleEdit = async (id) => {
            await sellerStore.show(id);

            openModal();
        };

        const handleDelete = async (id) => {
            await sellerStore.deleteItem(id);

            loadSellers(1);
        };

        const handleLoadMore = async () => {
            const loadPage = sellerStore.data.infinite_set.page + 1;
            params.value.page = loadPage;
            await sellerStore.get(params.value, true);
        };

        const clearFilter = () => {
            sellerStore.data.filter.name = "";
        };

        const refresh = (event) => {
            loadSellers(1);
            event.target.complete();
        };

        return {
            sellerStore,
            isModalOpen,
            openModal,
            closeModal,
            handleEdit,
            handleDelete,
            handleLoadMore,
            clearFilter,
            refresh,
        };
    },
};
</script>
