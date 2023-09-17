<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Product Type">
            <FilterProductType :filter="productTypeStore.data.filter" @clearFilter="clearFilter" />

            <div class="add-button">
                <ion-button size="small" color="warning" fill="outline" expand="block" @click="openModal">
                    add new
                </ion-button>
            </div>
            <ModalProductType :is-open="isModalOpen" @ionModalDidDismiss="closeModal" />

            <ListProductType
                :product_types="productTypeStore.data.product_types"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                :total="productTypeStore.data.infinite_set.total"
                @handleLoadMore="handleLoadMore"
            />

            <RefresherComponent @handleRefresh="refresh" />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import { IonPage, IonButton, IonInput } from "@ionic/vue";
import { useProductTypeStore } from "../stores/product_types";
import { onMounted, ref, computed, watch } from "vue";

import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import ListProductType from "../components/list/ListProductType.vue";
import FilterProductType from "../components/filter/FilterProductType.vue";
import ModalProductType from "../components/modal/ModalProductType.vue";
import RefresherComponent from "../components/RefresherComponent.vue";

export default {
    components: {
        LayoutAdmin,
        IonPage,
        IonButton,
        IonInput,
        ListProductType,
        ModalProductType,
        FilterProductType,
        RefresherComponent,
    },
    setup() {
        const productTypeStore = useProductTypeStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                name: productTypeStore.data.filter.name,
                page: productTypeStore.data.infinite_set.page,
                per_page: productTypeStore.data.infinite_set.per_page,
            };
        });

        watch(
            () => productTypeStore.data.filter.name,
            () => {
                loadProductTypes(1);
            }
        );

        const loadProductTypes = async (value) => {
            params.value.page = value != null ? value : params.value.page;

            await productTypeStore.get(params.value);
        };

        onMounted(() => {
            loadProductTypes();
        });

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
            productTypeStore.clear();
        };

        const handleEdit = async (id) => {
            await productTypeStore.show(id);

            openModal();
        };

        const handleDelete = async (id) => {
            await productTypeStore.deleteItem(id);

            loadProductTypes(1);
        };

        const handleLoadMore = async () => {
            const loadPage = productTypeStore.data.infinite_set.page + 1;
            params.value.page = loadPage;

            await productTypeStore.get(params.value, true);
        };

        const clearFilter = () => {
            productTypeStore.data.filter.name = "";
        };

        const refresh = (event) => {
            loadProductTypes(1);
            event.target.complete();
        };

        return {
            productTypeStore,
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
