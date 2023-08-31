<template>
    <ion-page id="admin-main-content">
        <LayoutAdmin title_page="Product Type">
            <h1>Product Type</h1>
            <ion-button router-link="/">Home</ion-button>
            <ion-button router-link="/product-type">Product Type</ion-button>

            <ion-button @click="openModal">Open Modal</ion-button>
            <ModalProductType :is-open="isModalOpen" @ionModalDidDismiss="closeModal" />

            <ListProductType
                :product_types="productTypeStore.data.product_types"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                :total="productTypeStore.data.infinite_set.total"
                @handleLoadMore="handleLoadMore"
            />
        </LayoutAdmin>
    </ion-page>
</template>

<script>
import LayoutAdmin from "../components/layout/LayoutAdmin.vue";
import { IonPage, IonButton } from "@ionic/vue";
import ListProductType from "../components/list/ListProductType.vue";
import ModalProductType from "../components/modal/ModalProductType.vue";
import { onMounted, ref, computed } from "vue";
import { useProductTypeStore } from "../stores/product_types";

export default {
    components: { LayoutAdmin, IonPage, IonButton, ListProductType, ModalProductType },
    setup() {
        const productTypeStore = useProductTypeStore();
        const isModalOpen = ref(false);

        const params = computed(() => {
            return {
                page: productTypeStore.data.infinite_set.page,
                per_page: productTypeStore.data.infinite_set.per_page,
            };
        });

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

            loadProductTypes(0);
        };

        const handleEdit = async (id) => {
            await productTypeStore.show(id);

            openModal();
        };

        const handleDelete = async (id) => {
            await productTypeStore.deleteItem(id);

            loadProductTypes(0);
        };

        const handleLoadMore = async () => {
            const loadPage = productTypeStore.data.infinite_set.page + 1;
            params.value.page = loadPage;

            await productTypeStore.get(params.value, true);
        };

        return { productTypeStore, isModalOpen, openModal, closeModal, handleEdit, handleDelete, handleLoadMore };
    },
};
</script>
